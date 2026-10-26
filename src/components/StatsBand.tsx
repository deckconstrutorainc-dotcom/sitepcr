import type { Indicador } from "@/lib/numeros";
import { CountUp } from "./CountUp";

// Números com marcador de nota e a base de cada um logo abaixo (DESIGN.md: Números).
export function StatsBand({ items, intl }: { items: (Indicador & { prefixo?: string })[]; intl: string }) {
  return (
    <>
      {/* divisórias: cada item tem borda à esquerda e em cima, deslocada 1px e cortada pelo overflow,
          assim só aparecem as linhas internas, para qualquer quantidade de itens */}
      <dl className="m-0 grid grid-cols-2 overflow-hidden rule-strong lg:grid-cols-4">
        {items.map((it, i) => (
          <div
            key={it.id}
            className="-mt-px -ml-px grid content-start gap-2.5 border-t border-l border-hairline-strong pt-6 pr-4 pb-6 pl-5"
          >
            <dt className="order-2 text-sm leading-[1.45] text-ink-muted">
              {it.rotulo}{" "}
              <sup className="font-mono text-[11px] text-primary">
                <a href={`#nota-${it.id}`} className="no-underline">
                  {i + 1}
                </a>
              </sup>
            </dt>
            <dd className="order-1 m-0 font-display text-stat font-semibold tabular-nums">
              <span className="sr-only">
                {it.prefixo ? it.prefixo + " " : ""}
                {it.texto} {it.unidade}
              </span>
              {it.prefixo && (
                <span aria-hidden="true" className="mr-1.5 text-[0.34em] tracking-[-0.01em] text-ink-muted">
                  {it.prefixo}
                </span>
              )}
              <CountUp value={it.valor} decimals={it.decimais} locale={intl}>
                {it.texto}
              </CountUp>
              {it.unidade && (
                <span aria-hidden="true" className="ml-1.5 text-[0.34em] tracking-[-0.01em] text-ink-muted">
                  {it.unidade}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <ol className="m-0 mt-7 grid list-none gap-1 p-0 font-mono text-xs leading-[1.6] text-ink-subtle lg:grid-cols-2 lg:gap-x-8">
        {items.map((it, i) => (
          <li key={it.id} id={`nota-${it.id}`} className="scroll-mt-28">
            <b className="mr-2 font-medium text-primary">{i + 1}</b>
            {it.nota}
          </li>
        ))}
      </ol>
    </>
  );
}
