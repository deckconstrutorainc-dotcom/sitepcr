// 404 para URLs que não casam com nenhuma rota. O layout raiz vive em app/[lang], então esta página
// precisa trazer o próprio <html>, estilos e fontes (Next.js: global-not-found).
import type { Metadata } from "next";
import Link from "next/link";
import { Sora, Manrope, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import pt from "@/i18n/pt.json";
import en from "@/i18n/en.json";
import { Logo } from "@/components/Logo";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-plex-mono", display: "swap", preload: false });

export const metadata: Metadata = { title: `${pt.meta.notFound} | PCR Engenharia` };

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body>
        <header className="wrap flex h-[76px] items-center pt-safe">
          <Logo href="/" label={pt.nav.homeAria} />
        </header>
        <main className="wrap grid min-h-[70svh] content-center gap-5 pb-16">
          <h1 className="text-page">{pt.notFound.title}</h1>
          <p className="max-w-[52ch] text-lead text-ink-muted">{pt.notFound.text}</p>
          <div className="flex flex-wrap gap-x-8">
            <Link href="/obras" className="link-cta">
              {pt.common.verObras}
            </Link>
            <Link href="/" className="link-cta">
              {pt.notFound.home}
            </Link>
          </div>
          <p lang="en" className="mt-6 border-t border-hairline pt-6 text-ink-muted">
            {en.notFound.title}{" "}
            <Link href="/en" className="font-bold text-ink underline underline-offset-4">
              {en.notFound.home}
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
