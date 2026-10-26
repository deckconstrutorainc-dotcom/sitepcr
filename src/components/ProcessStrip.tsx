"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Item = { key: string; image: StaticImageData; caption: string; alt: string };

// Faixa de fotos de processo: rolagem livre com snap, sem autoplay. Botões para quem usa mouse.
export function ProcessStrip({ items, header, labels }: { items: Item[]; header: ReactNode; labels: { prev: string; next: string; region: string } }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <>
      <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        {header}
        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label={labels.prev} className="grid size-11 place-items-center border border-hairline-strong transition-colors hover:border-ink">
            <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label={labels.next} className="grid size-11 place-items-center border border-hairline-strong transition-colors hover:border-ink">
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-label={labels.region}
        className="strip-track flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2.5 [scrollbar-color:var(--color-hairline-strong)_transparent] [scrollbar-width:thin] lg:gap-6"
      >
        {items.map((it) => {
          const portrait = it.image.height > it.image.width;
          return (
            <figure key={it.key} className="m-0 flex-none snap-start">
              <Image
                src={it.image}
                alt={it.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 380px, 70vw"
                className={`h-[clamp(240px,30vw,380px)] w-auto max-w-none object-cover ${portrait ? "aspect-3/4" : "aspect-4/3"}`}
              />
              <figcaption className="data mt-2.5 text-ink-subtle">{it.caption}</figcaption>
            </figure>
          );
        })}
      </div>
    </>
  );
}
