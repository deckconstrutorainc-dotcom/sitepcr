import type { ReactNode } from "react";

// Cabeçalho de seção padrão (DESIGN.md v2.1): título à esquerda, ação alinhada à direita na mesma linha.
export function SectionHead({ id, title, eyebrow, action, as: Tag = "h2" }: { id?: string; title: string; eyebrow?: string; action?: ReactNode; as?: "h1" | "h2" }) {
  return (
    <div data-reveal className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="grid max-w-[760px] gap-3">
        {eyebrow && <span className="eyebrow text-ink-subtle">{eyebrow}</span>}
        <Tag id={id} className="text-section">
          {title}
        </Tag>
      </div>
      {action}
    </div>
  );
}
