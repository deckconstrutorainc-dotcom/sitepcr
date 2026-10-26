import type { Metadata } from "next";
import { href } from "@/i18n/config";
import { getDict, fmt } from "@/i18n/dictionary";
import { getObras } from "@/lib/obras";
import { obrasConcluidasTotal } from "@/lib/numeros";
import { pageMetadata, breadcrumbJsonLd, jsonLd } from "@/lib/seo";
import { PageIntro } from "@/components/PageIntro";
import { Portfolio } from "@/components/Portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, d } = await getDict();
  return pageMetadata({ locale, route: "obras", title: d.meta.obras.title, description: d.meta.obras.description });
}

export default async function ObrasPage() {
  const { locale, d } = await getDict();
  const obras = getObras(locale);
  return (
    <>
      <PageIntro
        title={d.obras.title}
        lead={fmt(d.obras.lead, { n: obrasConcluidasTotal })}
        crumbs={[{ label: d.nav.home, href: href(locale, "home") }, { label: d.nav.obras }]}
      />
      <section className="wrap pt-8 pb-16 lg:pb-24" aria-label={d.obras.title}>
        <Portfolio
          items={obras.map((o) => ({
            slug: o.slug,
            href: href(locale, "obras", o.slug),
            titulo: o.titulo,
            tipo: o.tipo,
            local: o.local,
            ano: o.ano,
            cliente: o.cliente,
            status: o.status,
            capa: o.fotos[0] ?? null,
            alt: o.alt,
          }))}
          labels={{
            filtro: d.obras.filtroLabel,
            todas: d.obras.todas,
            busca: d.obras.buscaLabel,
            buscaPlaceholder: d.obras.buscaPlaceholder,
            resultado: d.obras.resultado,
            resultadoUm: d.obras.resultadoUm,
            vazio: d.obras.vazio,
            limpar: d.obras.limpar,
            semFoto: d.common.semFoto,
            emAndamento: d.common.emAndamento,
            tipos: d.common.tipos,
          }}
        />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: d.nav.home, path: href(locale, "home") },
            { name: d.nav.obras, path: href(locale, "obras") },
          ]),
        )}
      />
    </>
  );
}
