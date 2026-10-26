"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { publicPath, switchLocalePath, type Locale } from "@/i18n/config";

type NavItem = { href: string; label: string; hint: string };

type Props = {
  locale: Locale;
  logo: ReactNode;
  logoMenu: ReactNode;
  items: NavItem[];
  shortcuts: { href: string; label: string }[];
  labels: { menu: string; close: string; language: string; switchTo: string; switchToShort: string; currentShort: string; siteName: string };
  contact: ReactNode;
};

export function SiteHeader({ locale, logo, logoMenu, items, shortcuts, labels, contact }: Props) {
  const pathname = usePathname();
  const atual = publicPath(pathname, locale); // usePathname devolve o caminho interno (/pt/...) em páginas estáticas
  // Estados guardam o caminho em que valem: ao navegar, voltam ao padrão sem setState em efeito.
  const [media, setMedia] = useState<{ path: string; over: boolean } | null>(null);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const overMedia = media?.path === pathname && media.over;
  const open = openPath === pathname;
  const setOpen = (v: boolean) => setOpenPath(v ? pathname : null);
  const menuRef = useRef<HTMLDivElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const other: Locale = locale === "pt" ? "en" : "pt";

  // Transparente enquanto a mídia de topo ([data-hero]) estiver sob o cabeçalho.
  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setMedia({ path: pathname, over: e.isIntersecting }), {
      rootMargin: "-80px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const trigger = openBtn.current;
    document.body.style.overflow = "hidden";
    // o resto da página fica inerte enquanto o menu modal está aberto
    const fundo = [...document.querySelectorAll<HTMLElement>("main, footer, header")];
    fundo.forEach((el) => el.setAttribute("inert", ""));
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPath(null);
      if (e.key !== "Tab" || !menuRef.current) return;
      const f = menuRef.current.querySelectorAll<HTMLElement>("a,button");
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      fundo.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const solid = !overMedia;
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 pt-safe transition-colors duration-300 ${
          solid ? "bg-canvas text-ink shadow-[0_1px_0_var(--color-hairline)]" : "on-dark bg-transparent text-white"
        }`}
      >
        <div className="wrap flex h-[76px] items-center justify-between gap-4">
          {logo}
          <nav aria-label={labels.siteName} className="flex items-center gap-7">
            {shortcuts.map((s) => (
              <Link key={s.href} href={s.href} className="hidden min-h-11 items-center text-ui font-bold no-underline lg:inline-flex">
                {s.label}
              </Link>
            ))}
            <Link
              href={switchLocalePath(pathname, other)}
              hrefLang={other === "pt" ? "pt-BR" : "en"}
              lang={other === "pt" ? "pt-BR" : "en"}
              className="hidden min-h-11 items-center font-mono text-[13px] no-underline opacity-85 hover:opacity-100 sm:inline-flex"
            >
              <span aria-hidden="true">{labels.currentShort} · </span>
              <span className="ml-1 underline-offset-4 hover:underline">{labels.switchToShort}</span>
              <span className="sr-only"> ({labels.switchTo})</span>
            </Link>
            <button
              ref={openBtn}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
              className="inline-flex min-h-11 min-w-11 items-center gap-2.5 text-ui font-bold"
            >
              {labels.menu}
              <Menu aria-hidden="true" size={22} strokeWidth={1.75} />
            </button>
          </nav>
        </div>
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
        hidden={!open}
        className="on-dark fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-night text-white"
      >
        <div className="wrap grid min-h-full grid-rows-[auto_1fr] pt-safe pb-[calc(env(safe-area-inset-bottom,0px)+32px)]">
          <div className="flex h-[76px] items-center justify-between">
            {logoMenu}
            <button
              ref={closeBtn}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 min-w-11 items-center gap-2.5 text-ui font-bold"
            >
              {labels.close}
              <X aria-hidden="true" size={22} strokeWidth={1.75} />
            </button>
          </div>
          <div className="grid content-center gap-10 py-6 lg:grid-cols-[8fr_4fr] lg:items-center lg:gap-16">
            <ol className="m-0 list-none p-0">
              {items.map((it, i) => (
                <li key={it.href} className={`border-t border-night-hairline ${i === items.length - 1 ? "border-b" : ""}`}>
                  <Link
                    href={it.href}
                    aria-current={atual === it.href || atual.startsWith(it.href + "/") ? "page" : undefined}
                    className="menu-link flex items-center justify-between gap-4 py-4 font-display text-section font-semibold no-underline transition-colors hover:text-primary-on-dark aria-[current=page]:text-primary-on-dark"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {it.label}
                    <span className="font-mono text-[13px] font-normal tracking-normal text-night-muted">{it.hint}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="grid content-start gap-4 text-ui text-night-muted">
              {contact}
              <Link
                href={switchLocalePath(pathname, other)}
                hrefLang={other === "pt" ? "pt-BR" : "en"}
                lang={other === "pt" ? "pt-BR" : "en"}
                className="link-cta text-white"
              >
                {labels.switchTo}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
