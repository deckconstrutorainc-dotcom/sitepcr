import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { href } from "@/i18n/config";
import { getDict } from "@/i18n/dictionary";
import { media } from "@/lib/media";
import { site } from "@/lib/site";
import { pageMetadata, breadcrumbJsonLd, jsonLd } from "@/lib/seo";
import { PageIntro } from "@/components/PageIntro";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, d } = await getDict();
  return pageMetadata({ locale, route: "servicos", title: d.meta.servicos.title, description: d.meta.servicos.description });
}

export default async function ServicosPage() {
  const { locale, d } = await getDict();
  return (
    <>
      <PageIntro
        title={d.servicos.title}
        lead={d.servicos.lead}
        crumbs={[{ label: d.nav.home, href: href(locale, "home") }, { label: d.nav.servicos }]}
      />
      <div className="wrap pb-16 lg:pb-24">
        {d.services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-t`}
            className="grid scroll-mt-28 gap-6 border-b border-hairline py-10 md:grid-cols-12 md:gap-x-8 lg:py-12"
          >
            <span className="data text-ink-subtle md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <div data-reveal className="grid content-start gap-3 md:col-span-6">
              <h2 id={`${s.id}-t`} className="text-feature">
                {s.title}
              </h2>
              <p className="max-w-[56ch] text-lead text-ink-muted">{s.body}</p>
            </div>
            <figure data-reveal-img className="m-0 overflow-hidden md:col-span-5">
              <Image src={media[s.img]} alt={s.caption} placeholder="blur" sizes="(min-width: 768px) 38vw, 100vw" className="aspect-3/2 w-full object-cover" />
            </figure>
          </section>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-12">
          <p className="font-display text-feature font-semibold">{d.home.coverTitle}</p>
          <Link href={href(locale, "contato")} className="btn-primary no-underline">
            {d.common.falar}
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: d.services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name: s.title, description: s.body, provider: { "@id": `${site.url}/#organizacao` }, areaServed: "Espírito Santo, Brasil" },
          })),
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: d.nav.home, path: href(locale, "home") }, { name: d.nav.servicos, path: href(locale, "servicos") }]))}
      />
    </>
  );
}
