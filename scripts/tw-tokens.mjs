// Migração única (Fase 3): troca combinações repetidas de valores arbitrários pelos tokens do @theme.
// Mantido no repositório como registro do mapeamento. Uso: node scripts/tw-tokens.mjs
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const map = [
  ["text-[22px] leading-[1.35] font-semibold tracking-[-0.02em]", "text-phone font-semibold"],
  ["text-[clamp(34px,4vw,52px)] leading-none tracking-[-0.035em]", "text-page"],
  ["text-[clamp(30px,3.4vw,44px)] leading-[1.08] tracking-[-0.035em]", "text-page"],
  ["text-lg font-semibold tracking-[-0.015em]", "text-card font-semibold"],
  ["text-2xl tracking-[-0.02em]", "text-heading"],
  ["text-lg leading-[1.25] tracking-[-0.015em]", "text-card"],
  ["text-[clamp(40px,6.2vw,80px)] leading-none tracking-[-0.035em]", "text-hero"],
  ["text-[clamp(16px,1.3vw,18px)] leading-normal", "text-lede"],
  ["text-[clamp(22px,2.4vw,34px)] leading-[1.3] font-medium tracking-[-0.02em]", "text-statement font-medium"],
  ["text-[clamp(28px,3.2vw,44px)] leading-[1.08] tracking-[-0.03em]", "text-section"],
  ["text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.035em]", "text-page"],
  ["text-[clamp(22px,2.2vw,28px)] leading-[1.15]", "text-feature"],
  ["text-xl tracking-[-0.015em]", "text-title"],
  ["text-[clamp(24px,2.4vw,32px)] leading-[1.15] tracking-[-0.025em]", "text-feature"],
  ["text-[clamp(22px,2.4vw,30px)] font-semibold tracking-[-0.025em]", "text-feature font-semibold"],
  ["text-xl font-semibold tracking-[-0.015em]", "text-title font-semibold"],
  ["text-[clamp(34px,4vw,52px)] leading-[1.02] tracking-[-0.035em]", "text-page"],
  ["text-lg leading-tight font-semibold tracking-[-0.015em]", "text-card font-semibold"],
  ["text-xl leading-[1.25] tracking-[-0.015em]", "text-title"],
  ["text-[clamp(20px,2.2vw,28px)] leading-[1.3] font-semibold tracking-[-0.02em]", "text-feature font-semibold"],
  ["text-[clamp(28px,4vw,44px)] leading-[1.1] font-semibold tracking-[-0.03em]", "text-section font-semibold"],
  ["text-[clamp(32px,4.6vw,64px)] leading-none font-semibold tracking-[-0.04em]", "text-stat font-semibold"],
  ["eyebrow text-[11.5px] text-ink-subtle", "label"],
  ["border-t-[1.5px] border-ink", "rule-strong"],
  ["object-cover transition-transform duration-800 ease-expo group-hover:scale-[1.03]", "object-cover img-zoom"],
];

const root = path.resolve(import.meta.dirname, "../src");
const files = (await readdir(root, { recursive: true })).filter((f) => f.endsWith(".tsx")).map((f) => path.join(root, f));
const total = new Map();
for (const f of files) {
  const before = await readFile(f, "utf8");
  let s = before;
  for (const [a, b] of map) {
    const n = s.split(a).length - 1;
    if (n) {
      total.set(a, (total.get(a) ?? 0) + n);
      s = s.split(a).join(b);
    }
  }
  if (s !== before) await writeFile(f, s);
}
for (const [a] of map) console.log(String(total.get(a) ?? 0).padStart(3), a);
