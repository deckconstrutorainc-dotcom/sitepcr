// Camada pública dos dados das obras. Lê src/data/obras.json (gerado por scripts/publicar-dados.mjs a partir
// da extração completa em privado/), src/content/obras-texto.json e src/data/fotos.json.
// O repositório é público: os arquivos lidos aqui já não têm valores em R$, fontes documentais nem nomes
// de pessoas físicas.

import "server-only";
import type { Locale } from "@/i18n/config";
import { intlLocale } from "@/i18n/dictionary";
import obrasRaw from "@/data/obras.json";
import textosRaw from "@/content/obras-texto.json";
import fotosRaw from "@/data/fotos.json";
import quantEnRaw from "@/content/quantitativos-en.json";

const quantEn = quantEnRaw as Record<string, string>;

export type Tipo = "residencial" | "comercial" | "industrial" | "institucional" | "laudo-pericia" | "estrutura";
export const tipos: Tipo[] = ["residencial", "comercial", "industrial", "institucional", "laudo-pericia", "estrutura"];
export type Status = "concluida" | "em-andamento";

export type Foto = { src: string; width: number; height: number };
export type Quantitativo = { item: string; unidade: string; quantidade: number; base: "medicao" | "contrato" | "documento" };

export type Obra = {
  slug: string;
  tipo: Tipo;
  status: Status;
  titulo: string;
  resumo: string;
  escopo: string;
  local: string;
  cidade: string;
  cliente: string;
  ano: string | null;
  periodo: string | null;
  area: number | null;
  quantitativos: Quantitativo[];
  fotos: Foto[];
  alt: string;
  destaque: boolean;
};

type Raw = {
  slug: string;
  nome: string;
  cliente: string;
  tipo: string;
  cidade: string | null;
  bairro: string | null;
  inicio: string | null;
  fim: string | null;
  status: string;
  area_m2: number | null;
  destaque: boolean;
  quantitativos: Quantitativo[];
};
type L10n = { pt: string; en: string };
type Texto = { titulo: L10n; resumo: L10n; escopo: L10n; local: L10n; alt: L10n };
const textos = textosRaw as unknown as Record<string, Texto>;
const fotos = fotosRaw as Record<string, Foto[]>;
const publicas = obrasRaw as Raw[];

// Ordem fixa dos destaques da Home (aprovada na prancha v2.1)
export const destaquesHome = ["ed-nahum-prado", "hospital-sao-luiz-ampliacao", "casas-geminadas-jacaraipe-luamar"];

function periodo(locale: Locale, inicio?: string | null, fim?: string | null): string | null {
  const f = (v: string) => {
    if (/^\d{4}$/.test(v)) return v;
    const [y, m] = v.split("-").map(Number);
    if (!y || !m) return v;
    return new Intl.DateTimeFormat(intlLocale(locale), { month: "short", year: "numeric", timeZone: "UTC" })
      .format(new Date(Date.UTC(y, m - 1, 1)))
      .replace(".", "")
      .replace(" de ", " ");
  };
  if (inicio && fim) return f(inicio) === f(fim) ? f(fim) : `${f(inicio)} - ${f(fim)}`;
  if (fim) return f(fim);
  if (inicio) return f(inicio);
  return null;
}

function toObra(raw: Raw, locale: Locale): Obra {
  const t = textos[raw.slug];
  const pick = (v: L10n | undefined, fallback: string) => (v ? v[locale] || v.pt : fallback);
  const cliente =
    raw.cliente === "Cliente particular"
      ? locale === "pt" ? "Cliente particular" : "Private client"
      : raw.cliente === "Incorporação própria"
        ? locale === "pt" ? "Incorporação própria" : "In-house development"
        : raw.cliente;

  return {
    slug: raw.slug,
    tipo: raw.tipo as Tipo,
    status: raw.status as Status,
    titulo: pick(t?.titulo, raw.nome),
    resumo: pick(t?.resumo, ""),
    escopo: pick(t?.escopo, ""),
    local: pick(t?.local, [raw.bairro, raw.cidade].filter(Boolean).join(", ")),
    cidade: raw.cidade ?? "",
    cliente,
    ano: (raw.fim || raw.inicio || "").slice(0, 4) || null,
    periodo: periodo(locale, raw.inicio, raw.fim),
    area: raw.area_m2,
    quantitativos: raw.quantitativos
      .slice(0, 8)
      .map((q) => ({ ...q, item: locale === "en" ? (quantEn[q.item] ?? q.item) : q.item })),
    fotos: fotos[raw.slug] ?? [],
    alt: pick(t?.alt, raw.nome),
    destaque: raw.destaque,
  };
}

export function getObras(locale: Locale): Obra[] {
  return publicas
    .map((r) => toObra(r, locale))
    .sort(
      (a, b) =>
        Number(a.status !== "concluida") - Number(b.status !== "concluida") ||
        Number(b.fotos.length > 0) - Number(a.fotos.length > 0) ||
        (b.ano ?? "").localeCompare(a.ano ?? "") ||
        a.titulo.localeCompare(b.titulo),
    );
}

export function getObra(locale: Locale, slug: string): Obra | undefined {
  const raw = publicas.find((o) => o.slug === slug);
  return raw ? toObra(raw, locale) : undefined;
}

export const slugs = () => publicas.map((o) => o.slug);

export function semelhantes(locale: Locale, obra: Obra, n = 3): Obra[] {
  return getObras(locale)
    .filter((o) => o.slug !== obra.slug && o.tipo === obra.tipo && o.status === "concluida")
    .sort((a, b) => b.fotos.length - a.fotos.length)
    .slice(0, n);
}
