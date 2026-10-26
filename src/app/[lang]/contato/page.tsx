import type { Metadata } from "next";
import { href } from "@/i18n/config";
import { getDict } from "@/i18n/dictionary";
import { site, telHref } from "@/lib/site";
import { pageMetadata, breadcrumbJsonLd, jsonLd } from "@/lib/seo";
import { PageIntro } from "@/components/PageIntro";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, d } = await getDict();
  return pageMetadata({ locale, route: "contato", title: d.meta.contato.title, description: d.meta.contato.description });
}

export default async function ContatoPage() {
  const { locale, d } = await getDict();
  const c = d.contato;
  return (
    <>
      <PageIntro title={c.title} lead={c.lead} crumbs={[{ label: d.nav.home, href: href(locale, "home") }, { label: d.nav.contato }]} />
      <section className="wrap section" aria-label={d.nav.contato}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <dl className="m-0 grid content-start gap-6 lg:col-span-4">
            <div className="grid gap-1.5">
              <dt className="label">{c.telefones}</dt>
              <dd className="m-0 font-display text-phone font-semibold">
                {site.telefones.map((t) => (
                  <a key={t} href={telHref(t)} className="block no-underline hover:text-primary">
                    {t}
                  </a>
                ))}
              </dd>
            </div>
            <div className="grid gap-1.5">
              <dt className="label">{c.email}</dt>
              <dd className="m-0">
                <a href={`mailto:${site.email}`} className="font-semibold underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="grid gap-1.5">
              <dt className="label">{c.endereco}</dt>
              <dd className="m-0 text-ink-muted">
                <address className="not-italic">
                  {site.endereco.rua}, {site.endereco.bairro}
                  <br />
                  {site.endereco.cidade} - {site.endereco.uf}, CEP {site.endereco.cep}
                </address>
              </dd>
            </div>
            <div className="grid gap-1.5">
              <dt className="label">{c.horario}</dt>
              <dd className="m-0 font-semibold">{site.horario ?? d.common.preencher}</dd>
            </div>
          </dl>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm
              labels={c.form}
              servicos={d.services.map((s) => s.title)}
              privacyHref={href(locale, "privacidade")}
              tel={site.telefones[0]}
              siteName={d.meta.siteName}
            />
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: d.nav.home, path: href(locale, "home") }, { name: d.nav.contato, path: href(locale, "contato") }]))}
      />
    </>
  );
}
