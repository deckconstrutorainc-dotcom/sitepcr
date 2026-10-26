// Barras horizontais de série única (cor única = magnitude). Valor rotulado na ponta,
// dica no hover/foco e tabela equivalente para leitores de tela (skill dataviz).
export function BarChart({
  title,
  rows,
  note,
  unitLabel,
}: {
  title: string;
  rows: { label: string; value: number }[];
  note?: string;
  unitLabel: string;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  const id = title.toLowerCase().replace(/\W+/g, "-");
  return (
    <figure className="m-0">
      <figcaption id={id} className="mb-5 font-display text-card font-semibold">
        {title}
      </figcaption>
      <div aria-hidden="true" className="grid gap-2">
        {rows.map((r) => (
          <div key={r.label} className="group grid grid-cols-[minmax(84px,auto)_1fr] items-center gap-3">
            <span className="data text-right text-ink-muted">{r.label}</span>
            <div className="relative flex h-7 items-center">
              {/* área de toque maior que a barra */}
              <span tabIndex={-1} className="absolute inset-y-0 left-0 right-0" />
              <span
                className="h-full min-w-[3px] rounded-r-[4px] bg-primary transition-[filter] group-hover:brightness-90"
                style={{ width: `${(r.value / max) * 100}%` }}
              />
              <span className="data ml-2 font-medium text-ink">{r.value}</span>
              <span
                role="presentation"
                className="pointer-events-none absolute -top-9 left-0 z-10 hidden bg-night px-2.5 py-1.5 font-mono text-xs whitespace-nowrap text-white group-hover:block"
              >
                {r.label}: {r.value} {unitLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
      <table className="sr-only" aria-labelledby={id}>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>
                {r.value} {unitLabel}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && <p className="data mt-4 text-ink-subtle">{note}</p>}
    </figure>
  );
}
