import type { Metadata } from "next";
import { href, type Locale, type RouteKey } from "@/i18n/config";
import { site } from "./site";

const ogLocale = { pt: "pt_BR", en: "en_US" } as const;

/** Metadados de uma página com canonical, hreflang (pt-BR, en, x-default) e Open Graph. */
export function pageMetadata(opts: {
  locale: Locale;
  route: RouteKey;
  rest?: string[];
  title: string;
  description: string;
  image?: { url: string; width: number; height: number; alt: string };
  absoluteTitle?: boolean;
}): Metadata {
  const { locale, route, rest = [], title, description } = opts;
  const pt = href("pt", route, ...rest);
  const en = href("en", route, ...rest);
  const canonical = locale === "pt" ? pt : en;
  const image = opts.image ?? { url: "/og.jpg", width: 1200, height: 630, alt: "PCR Engenharia e Incorporação" };
  return {
    // títulos já incluem a marca quando cabe (seoTitle); nunca passam pelo modelo "%s | ..."
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: { "pt-BR": pt, en, "x-default": pt },
    },
    openGraph: {
      type: "website",
      siteName: "PCR Engenharia e Incorporação",
      locale: ogLocale[locale],
      alternateLocale: ogLocale[locale === "pt" ? "en" : "pt"],
      url: canonical,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** Título de até 60 caracteres: acrescenta a marca só quando cabe. */
export function seoTitle(base: string, marca = "PCR Engenharia"): string {
  const comMarca = `${base} | ${marca}`;
  return comMarca.length <= 60 ? comMarca : base;
}

/** Descrição entre ~110 e 160 caracteres: completa frases curtas e corta as longas na palavra. */
export function seoDescription(texto: string, complemento: string): string {
  let s = texto.trim();
  if (s.length < 110 && complemento) s = `${s} ${complemento}`.trim();
  if (s.length <= 160) return s;
  const corte = s.slice(0, 157);
  return corte.slice(0, corte.lastIndexOf(" ")).replace(/[,;:.]$/, "") + "…";
}

export function organizationJsonLd(locale: Locale) {
  const id = `${site.url}/#organizacao`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "GeneralContractor"],
        "@id": id,
        name: site.nome,
        legalName: site.razaoSocial,
        taxID: site.cnpj,
        foundingDate: site.fundacao,
        url: site.url + (locale === "en" ? "/en" : ""),
        logo: `${site.url}/brand/pcr-simbolo.png`,
        image: `${site.url}/og.jpg`,
        email: site.email,
        telephone: site.telefones.map((t) => "+55 " + t.replace(/[()]/g, "").trim()),
        address: {
          "@type": "PostalAddress",
          streetAddress: site.endereco.rua,
          addressLocality: site.endereco.cidade,
          addressRegion: site.endereco.uf,
          postalCode: site.endereco.cep,
          addressCountry: "BR",
        },
        areaServed: { "@type": "State", name: "Espírito Santo" },
        parentOrganization: { "@type": "Organization", name: site.grupo },
        employee: {
          "@type": "Person",
          name: site.responsavelTecnico.nome.replace("Eng. Civil ", ""),
          jobTitle: locale === "pt" ? "Engenheiro civil, responsável técnico" : "Civil engineer of record",
          hasCredential: { "@type": "EducationalOccupationalCredential", name: site.responsavelTecnico.crea },
        },
        knowsLanguage: ["pt-BR", "en"],
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: site.url + it.path,
    })),
  };
}

/** Serializa JSON-LD com escape de "<" para não fechar a tag <script>. */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
