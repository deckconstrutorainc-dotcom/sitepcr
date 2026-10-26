import Link from "next/link";
import type { ReactNode } from "react";

// Abertura das páginas internas: compensa o cabeçalho fixo, breadcrumb e título de página.
export function PageIntro({
  title,
  lead,
  crumbs,
  children,
}: {
  title: string;
  lead?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <div className="wrap pt-[calc(env(safe-area-inset-top,0px)+76px+48px)] lg:pt-[calc(env(safe-area-inset-top,0px)+76px+72px)]">
      {crumbs && (
        <nav aria-label="Breadcrumb" className="data mb-5 text-ink-subtle">
          <ol className="m-0 flex list-none flex-wrap gap-x-2 p-0">
            {crumbs.map((c, i) => (
              <li key={i} className="flex gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? (
                  <Link href={c.href} className="text-ink-muted underline-offset-4 hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="grid gap-4 rule-strong-b pb-8">
        <h1 className="max-w-[22ch] text-page">{title}</h1>
        {lead && <div className="max-w-[62ch] text-lead text-ink-muted">{lead}</div>}
      </div>
      {children}
    </div>
  );
}
