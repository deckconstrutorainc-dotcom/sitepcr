import type { Metadata, Viewport } from "next";
import { Sora, Manrope, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { lang } from "next/root-params";
import "@/styles/globals.css";
import { href, locales, type RouteKey } from "@/i18n/config";
import { getDict, fmt } from "@/i18n/dictionary";
import { site, telHref } from "@/lib/site";
import { organizationJsonLd, jsonLd } from "@/lib/seo";
import { obrasConcluidasTotal } from "@/lib/numeros";
import { Logo } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealObserver } from "@/components/RevealObserver";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Sora e Manrope variáveis: um arquivo cada para todos os pesos. "latin" já cobre os acentos de PT e EN.
// Plex Mono só aparece em rótulos pequenos: carrega sem preload para não competir com o LCP.
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap", preload: false });

export function generateStaticParams() {
  return locales.map((l) => ({ lang: l }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { d } = await getDict();
  return {
    metadataBase: new URL(site.url),
    title: { default: d.meta.home.title, template: `%s | PCR Engenharia` },
    description: d.meta.home.description,
    applicationName: d.meta.siteName,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = { themeColor: "#f6f4ef", viewportFit: "cover" };

const menuKeys: RouteKey[] = ["sobre", "servicos", "obras", "numeros", "contato"];

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, d } = await getDict();
  const htmlLang = (await lang()) === "en" ? "en" : "pt-BR";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const home = href(locale, "home");
  const hints = d.nav.menuHints;

  return (
    <html lang={htmlLang} className={`${sora.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="fixed top-[-80px] left-4 z-60 bg-paper px-4 py-3 text-ui font-bold text-ink focus:top-[calc(env(safe-area-inset-top,0px)+12px)]"
        >
          {d.nav.skip}
        </a>
        <SiteHeader
          locale={locale}
          logo={<Logo href={home} label={d.nav.homeAria} />}
          logoMenu={<Logo href={home} label={d.nav.homeAria} />}
          items={menuKeys.map((k) => ({
            href: href(locale, k),
            label: d.nav[k as keyof typeof d.nav] as string,
            hint: fmt(hints[k as keyof typeof hints], { n: obrasConcluidasTotal, tel: site.telefones[0] }),
          }))}
          shortcuts={[
            { href: href(locale, "obras"), label: d.nav.obras },
            { href: href(locale, "contato"), label: d.nav.contato },
          ]}
          labels={{
            menu: d.nav.menu,
            close: d.nav.close,
            language: d.nav.language,
            switchTo: d.nav.switchTo,
            switchToShort: d.nav.switchToShort,
            currentShort: d.nav.currentShort,
            siteName: d.meta.siteName,
          }}
          contact={
            <>
              <span className="eyebrow text-night-muted">{d.nav.contato}</span>
              <p className="font-display text-phone font-semibold text-white">
                {site.telefones.map((t) => (
                  <a key={t} href={telHref(t)} className="block no-underline hover:underline">
                    {t}
                  </a>
                ))}
              </p>
              <p>
                {site.endereco.rua}, {site.endereco.bairro}
                <br />
                {site.endereco.cidade} - {site.endereco.uf}, CEP {site.endereco.cep}
              </p>
            </>
          }
        />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppButton label={d.contato.whatsapp} message={d.contato.whatsappMsg} />
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationJsonLd(locale))} />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
