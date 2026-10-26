"use client";

import { useEffect, useRef } from "react";

// Conta de 0 até o valor quando entra na tela, uma vez. O valor final já está no HTML (SSR).
export function CountUp({ value, decimals = 0, locale, children }: { value: number; decimals?: number; locale: string; children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // já visível: não anima
    const nf = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / 1600);
          const ease = k >= 1 ? 1 : 1 - Math.pow(2, -10 * k);
          el.textContent = nf.format(value * ease);
          if (k < 1) raf = requestAnimationFrame(step);
          else el.textContent = children;
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    el.textContent = nf.format(0);
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = children;
    };
  }, [value, decimals, locale, children]);
  return (
    <span ref={ref} aria-hidden="true">
      {children}
    </span>
  );
}
