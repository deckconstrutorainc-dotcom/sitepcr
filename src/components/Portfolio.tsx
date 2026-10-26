"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useDeferredValue, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { publicPath } from "@/i18n/config";

export type PortfolioItem = {
  slug: string;
  href: string;
  titulo: string;
  tipo: string;
  local: string;
  ano: string | null;
  cliente: string;
  status: string;
  capa: { src: string; width: number; height: number } | null;
  alt: string;
};

type Labels = {
  filtro: string;
  todas: string;
  busca: string;
  buscaPlaceholder: string;
  resultado: string;
  resultadoUm: string;
  vazio: string;
  limpar: string;
  semFoto: string;
  emAndamento: string;
  tipos: Record<string, string>;
};

type Props = { items: PortfolioItem[]; labels: Labels };

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export function Portfolio(props: Props) {
  // Sem JS (ou durante o prerender) a lista completa é renderizada: boa para indexação.
  return (
    <Suspense fallback={<View {...props} tipo={null} q="" />}>
      <WithParams {...props} />
    </Suspense>
  );
}

function WithParams(props: Props) {
  const params = useSearchParams();
  const tipo = params.get("tipo");
  return <View {...props} tipo={tipo && props.labels.tipos[tipo] ? tipo : null} q={params.get("q") ?? ""} interactive />;
}

function View({ items, labels, tipo, q, interactive = false }: Props & { tipo: string | null; q: string; interactive?: boolean }) {
  const router = useRouter();
  const interno = usePathname(); // pode vir como "/pt/obras" (caminho reescrito pelo proxy)
  const pathname = publicPath(interno, interno.split("/")[1] === "en" ? "en" : "pt");
  const [query, setQuery] = useState(q);
  const deferred = useDeferredValue(query);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const it of items) c[it.tipo] = (c[it.tipo] ?? 0) + 1;
    return c;
  }, [items]);

  const visible = useMemo(() => {
    const nq = norm(deferred.trim());
    return items.filter(
      (it) => (!tipo || it.tipo === tipo) && (!nq || norm(`${it.titulo} ${it.cliente} ${it.local}`).includes(nq)),
    );
  }, [items, tipo, deferred]);

  const update = (next: { tipo?: string | null; q?: string }) => {
    const sp = new URLSearchParams();
    const t = next.tipo === undefined ? tipo : next.tipo;
    const qq = next.q === undefined ? query : next.q;
    if (t) sp.set("tipo", t);
    if (qq.trim()) sp.set("q", qq.trim());
    const s = sp.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  const tabs: (string | null)[] = [null, ...Object.keys(labels.tipos).filter((t) => counts[t])];
  const n = visible.length;
  const featured = !tipo && !deferred.trim();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-hairline">
        <div role="group" aria-label={labels.filtro} className="flex max-w-full gap-x-6 overflow-x-auto [scrollbar-width:none]">
          {tabs.map((t) => {
            const active = t === tipo;
            return (
              <button
                key={t ?? "todas"}
                type="button"
                aria-pressed={active}
                disabled={!interactive}
                onClick={() => update({ tipo: t })}
                className={`-mb-px min-h-12 flex-none border-b-2 text-[14.5px] font-bold transition-colors ${
                  active ? "border-primary text-ink" : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {t ? labels.tipos[t] : labels.todas}
                <sup className="ml-0.5 font-mono text-[10px] font-medium text-ink-subtle">{t ? counts[t] : items.length}</sup>
              </button>
            );
          })}
        </div>
        <label className="flex min-h-12 w-full items-center gap-2.5 text-ink-subtle focus-within:shadow-[inset_0_-2px_0_var(--color-primary)] sm:w-auto sm:min-w-[300px]">
          <Search size={18} strokeWidth={1.75} aria-hidden="true" />
          <span className="sr-only">{labels.busca}</span>
          <input
            type="search"
            value={query}
            disabled={!interactive}
            placeholder={labels.buscaPlaceholder}
            onChange={(e) => {
              setQuery(e.target.value);
              update({ q: e.target.value });
            }}
            className="min-w-0 flex-1 bg-transparent text-ui font-medium text-ink outline-none placeholder:text-ink-subtle"
          />
        </label>
      </div>

      <p aria-live="polite" className="data mt-3.5 mb-6 text-ink-subtle">
        {n === 1 ? labels.resultadoUm : labels.resultado.replace("{n}", String(n))}
      </p>

      {n === 0 ? (
        <div className="grid justify-items-start gap-4 border-t border-hairline py-16">
          <p className="font-display text-xl font-semibold">{labels.vazio.replace("{q}", deferred)}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              update({ tipo: null, q: "" });
            }}
            className="link-cta"
          >
            {labels.limpar}
          </button>
        </div>
      ) : (
        <ul className="m-0 grid list-none grid-cols-1 gap-x-4 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
          {visible.map((it, i) => {
            const wide = featured && i === 0;
            return (
              <li key={it.slug} className={`@container ${wide ? "lg:col-span-2" : ""}`}>
                <Link href={it.href} className="group grid h-full content-start gap-3 no-underline">
                  <div className={`relative overflow-hidden bg-stone ${wide ? "aspect-4/3 lg:aspect-auto lg:h-full lg:min-h-[320px]" : "aspect-4/3"}`}>
                    {it.capa ? (
                      <Image
                        src={it.capa.src}
                        alt={it.alt}
                        fill
                        sizes={wide ? "(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                        className="object-cover img-zoom"
                      />
                    ) : (
                      <div className="grid h-full place-content-center gap-2 p-6 text-center">
                        <span className="font-display text-card font-semibold">{it.titulo.split(":")[0]}</span>
                        <span className="eyebrow text-ink-subtle">{labels.semFoto}</span>
                      </div>
                    )}
                    {it.status === "em-andamento" && (
                      <span className="eyebrow absolute top-3 left-3 bg-paper px-2.5 py-1.5 text-ink">{labels.emAndamento}</span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-t border-hairline pt-3">
                    {/* o card largo (2 colunas) ganha título maior pela largura do próprio card */}
                    <h2 className="text-card transition-colors group-hover:text-primary @2xl:text-title">{it.titulo}</h2>
                    <span className="eyebrow shrink-0 text-ink-subtle">{labels.tipos[it.tipo]}</span>
                  </div>
                  <p className="-mt-1 text-sm leading-snug text-ink-muted">{it.cliente}</p>
                  <p className="data -mt-2 text-ink-subtle">{[it.local, it.ano].filter(Boolean).join(" · ")}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
