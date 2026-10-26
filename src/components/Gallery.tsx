"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

type Foto = { src: string; width: number; height: number };
type Labels = { fotoDe: string; fechar: string; anterior: string; proxima: string };

// Galeria assimétrica com lightbox em <dialog> nativo (Esc fecha, setas navegam, foco volta ao item).
export function Gallery({ fotos, alt, labels }: { fotos: Foto[]; alt: string; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + fotos.length) % fotos.length)), [fotos.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      setIndex((i) => {
        if (i !== null) triggers.current[i]?.focus();
        return null;
      });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    d.addEventListener("close", onClose);
    d.addEventListener("keydown", onKey);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("keydown", onKey);
    };
  }, [go]);

  const label = (i: number) => labels.fotoDe.replace("{i}", String(i + 1)).replace("{n}", String(fotos.length));
  const current = index !== null ? fotos[index] : null;

  return (
    <>
      <ul className="m-0 grid list-none grid-flow-dense grid-cols-2 gap-3 p-0 md:auto-rows-[minmax(0,1fr)] md:grid-cols-3 lg:gap-4">
        {fotos.map((f, i) => (
          // destaque a cada 6 fotos: com 3 colunas, 1 grande (2x2) + 5 pequenas fecham exatamente 3 linhas
          <li key={f.src} className={i % 6 === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""}>
            <button
              ref={(el) => {
                triggers.current[i] = el;
              }}
              type="button"
              onClick={() => open(i)}
              className="group relative block aspect-4/3 w-full overflow-hidden bg-stone md:h-full"
              aria-label={`${alt}. ${label(i)}`}
            >
              <Image
                src={f.src}
                alt=""
                fill
                sizes={i % 5 === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                className="object-cover img-zoom"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={current ? label(index!) : alt}
        className="on-dark m-0 h-full max-h-none w-full max-w-none overscroll-contain bg-night/95 p-0 text-white backdrop:bg-night/80"
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        {current && (
          <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 p-[max(16px,env(safe-area-inset-top,0px))_max(16px,env(safe-area-inset-right,0px))_max(16px,env(safe-area-inset-bottom,0px))_max(16px,env(safe-area-inset-left,0px))]">
            <div className="flex items-center justify-between">
              <span className="data text-night-muted">{label(index!)}</span>
              <button type="button" onClick={close} className="inline-flex min-h-11 items-center gap-2 font-bold" autoFocus>
                {labels.fechar}
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            <div className="relative min-h-0">
              <Image src={current.src} alt={alt} fill sizes="100vw" quality={85} className="object-contain" />
            </div>
            <div className="flex justify-center gap-2">
              <button type="button" onClick={() => go(-1)} aria-label={labels.anterior} className="grid size-11 place-items-center border border-night-hairline hover:border-white">
                <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={labels.proxima} className="grid size-11 place-items-center border border-night-hairline hover:border-white">
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
