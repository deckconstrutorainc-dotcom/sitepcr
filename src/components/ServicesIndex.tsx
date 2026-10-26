"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Item = { id: string; title: string; short: string; caption: string; image: StaticImageData; href: string };

// Lista de frentes à esquerda; no desktop a foto ao lado troca com o item ativo (hover ou foco).
export function ServicesIndex({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];
  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-x-8">
      <ul className="m-0 list-none rule-strong p-0 lg:col-span-7">
        {items.map((it, i) => (
          <li key={it.id} className="border-b border-hairline">
            <Link
              href={it.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              data-active={i === active || undefined}
              className="group grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 py-[18px] no-underline"
            >
              <span className="row-span-2 self-start pt-1 font-mono text-xs text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-title transition-colors duration-300 group-hover:text-primary group-focus-visible:text-primary group-data-[active]:text-primary">
                {it.title}
              </h3>
              <p className="col-start-2 text-[14.5px] text-ink-muted">{it.short}</p>
              <ArrowRight
                aria-hidden="true"
                size={18}
                strokeWidth={1.75}
                className="col-start-3 row-span-2 row-start-1 transition-transform duration-400 ease-expo group-hover:translate-x-1.5 group-hover:text-primary group-data-[active]:translate-x-1.5 group-data-[active]:text-primary"
              />
            </Link>
          </li>
        ))}
      </ul>
      <figure className="sticky top-24 m-0 hidden lg:col-span-5 lg:block lg:pl-6" aria-hidden="true">
        <div className="relative aspect-4/3 overflow-hidden bg-stone">
          {items.map((it, i) => (
            <Image
              key={it.id}
              src={it.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 34vw, 0px"
              placeholder="blur"
              className={`object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        <figcaption className="data mt-2.5 text-ink-subtle">{current.caption}</figcaption>
      </figure>
    </div>
  );
}
