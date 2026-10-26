"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Connection = { saveData?: boolean; effectiveType?: string };

// O pôster (next/image, no servidor) é o LCP. O vídeo só começa a baixar depois do load da página,
// e nunca com movimento reduzido, economia de dados ou conexão lenta.
export function HeroVideo({ src, label, pauseLabel, playLabel }: { src: { hd: string; sd: string }; label: string; pauseLabel: string; playLabel: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: Connection }).connection;
    const lento = conn?.saveData || /(^|-)2g|3g/.test(conn?.effectiveType ?? "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || lento) return;
    const start = () => {
      const v = ref.current;
      if (!v) return;
      // Full HD quando a área do vídeo passa de ~1400 px físicos (desktop, notebook, tablet retina)
      const largura = v.clientWidth * window.devicePixelRatio;
      v.src = largura > 1400 ? src.hd : src.sd;
      v.play()
        .then(() => setReady(true))
        .catch(() => setReady(false));
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [src]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <>
      <video
        ref={ref}
        muted
        playsInline
        loop
        preload="none"
        aria-label={label}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      />
      {ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? playLabel : pauseLabel}
          className="absolute top-[calc(env(safe-area-inset-top,0px)+92px)] right-[max(16px,env(safe-area-inset-right,0px))] z-10 grid size-11 place-items-center rounded-full border border-white/70 bg-night/30 text-white transition-colors hover:bg-white/10 lg:right-8"
        >
          {paused ? <Play size={16} fill="currentColor" aria-hidden="true" /> : <Pause size={16} fill="currentColor" aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
