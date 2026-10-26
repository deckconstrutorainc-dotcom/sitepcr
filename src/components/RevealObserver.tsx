"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Revelação sutil ao rolar. Sem JS tudo aparece; só o que está abaixo da dobra recebe o estado "pre".
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal],[data-reveal-img]"));
    const attr = (el: HTMLElement) => (el.hasAttribute("data-reveal") ? "data-reveal" : "data-reveal-img");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.setAttribute(attr(el), "in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.setAttribute(attr(el), "pre");
        io.observe(el);
      }
    }
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
