import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { href } from "@/i18n/config";
import { getDict } from "@/i18n/dictionary";
import { site } from "@/lib/site";
import { media } from "@/lib/media";
import { pageMetadata, breadcrumbJsonLd, jsonLd } from "@/lib/seo";
import { PageIntro } from "@/components/PageIntro";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, d } = await getDict();
  return pageMetadata({ locale, route: "sobre", title: d.meta.sobre.title, description: d.meta.sobre.description });
}

export default async function SobrePage() {
  const { locale, d } = await getDict();
  const s = d.sobre;
  const dados = [
    [locale === "pt" ? "Razão social" : "Legal name", site.razaoSocial],
    ["CNPJ", site.cnpj],
    [locale === "pt" ? "Abertura" : "Incorporated", locale === "pt" ? "27/04/2018" : "27 April 2018"],
    [locale === "pt" ? "Sede" : "Head office", `${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade} - ${site.endereco.uf}`],
  ];
  return (
    <>
      <PageIntro title={s.title} lead={s.lead} crumbs={[{ label: d.nav.home, href: href(locale, "home") }, { label: d.nav.sobre }]} />

      <section className="wrap section" aria-label={s.title}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="grid content-start gap-5 text-lead text-ink-muted lg:col-span-6">
            {s.historia.map((p, i) => (
              <p key={i} data-reveal>
                {p}
              </p>
            ))}
            <Link href={href(locale, "obras")} className="link-cta justify-self-start text-ink">
              {d.common.verObras}
              <ArrowRight data-arrow size={18} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
          <figure data-reveal-img className="m-0 overflow-hidden lg:col-span-5 lg:col-start-8">
            <Image src={media.saoluiz} alt={locale === "pt" ? "Hospital São Luiz, em Vila Velha, com a ampliação em estrutura metálica ao lado da fachada de vidro" : "Hospital São Luiz in Vila Velha, with the steel-frame extension beside the glass facade"} placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-4/3 w-full object-cover" />
            <figcaption className="data mt-2.5 text-ink-subtle">Hospital São Luiz, Vila Velha, 2021</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-stone section" aria-label={`${s.rtTitle}, ${s.atuacaoTitle}, ${s.grupoTitle}`}>
        <div className="wrap grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          <div data-reveal className="grid content-start gap-3 rule-strong pt-5">
            <h2 className="text-title">{s.rtTitle}</h2>
            <p className="font-semibold">{site.responsavelTecnico.nome}</p>
            <p className="data text-ink-muted">{site.responsavelTecnico.crea}</p>
          </div>
          <div data-reveal className="grid content-start gap-3 rule-strong pt-5">
            <h2 className="text-title">{s.atuacaoTitle}</h2>
            <p className="text-ink-muted">{s.atuacao}</p>
          </div>
          <div data-reveal className="grid content-start gap-3 rule-strong pt-5">
            <h2 className="text-title">{s.grupoTitle}</h2>
            <p className="text-ink-muted">{s.grupoText}</p>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="dados-t">
        <h2 id="dados-t" className="mb-6 text-heading">
          {s.dadosTitle}
        </h2>
        <dl className="m-0 grid rule-strong md:grid-cols-2">
          {dados.map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-hairline py-3.5 pr-6">
              <dt className="label">{k}</dt>
              <dd className="m-0 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: d.nav.home, path: href(locale, "home") }, { name: d.nav.sobre, path: href(locale, "sobre") }]))}
      />
    </>
  );
}
