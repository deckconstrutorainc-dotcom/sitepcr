import type { Metadata } from "next";
import { href } from "@/i18n/config";
import { getDict, intlLocale } from "@/i18n/dictionary";
import { getObras, tipos } from "@/lib/obras";
import { indicadores } from "@/lib/numeros";
import { tempoAtual } from "@/lib/tempo";
import { pageMetadata, breadcrumbJsonLd, jsonLd } from "@/lib/seo";
import { PageIntro } from "@/components/PageIntro";
import { StatsBand } from "@/components/StatsBand";
import { BarChart } from "@/components/BarChart";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, d } = await getDict();
  return pageMetadata({ locale, route: "numeros", title: d.meta.numeros.title, description: d.meta.numeros.description });
}

export default async function NumerosPage() {
  const { locale, d } = await getDict();
  const { anos } = await tempoAtual();
  const ind = indicadores(locale, d.numeros, anos);
  const concluidas = getObras(locale).filter((o) => o.status === "concluida");
  const unidade = locale === "pt" ? "obras" : "projects";

  const porAno = new Map<string, number>();
  let semAno = 0;
  for (const o of concluidas) {
    if (o.ano) porAno.set(o.ano, (porAno.get(o.ano) ?? 0) + 1);
    else semAno++;
  }
  const anosRows = [...porAno.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([label, value]) => ({ label, value }));
  const tipoRows = tipos
    .map((t) => ({ label: d.common.tipos[t], value: concluidas.filter((o) => o.tipo === t).length }))
    .filter((r) => r.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <>
      <PageIntro
        title={d.numeros.pageTitle}
        lead={d.numeros.pageLead}
        crumbs={[{ label: d.nav.home, href: href(locale, "home") }, { label: d.nav.numeros }]}
      />
      <section className="wrap section" aria-label={d.numeros.pageTitle}>
        <StatsBand items={[ind.obrasConcluidas, ind.m2, ind.aco, ind.clientes, ind.anos, ind.municipios, ind.executado]} intl={intlLocale(locale)} />
      </section>
      <section className="bg-stone section" aria-label={`${d.numeros.chartAno}, ${d.numeros.chartTipo}`}>
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-x-16">
          <BarChart
            title={d.numeros.chartAno}
            rows={anosRows}
            unitLabel={unidade}
            note={semAno ? `${semAno} ${unidade} ${d.numeros.semAno}.` : undefined}
          />
          <BarChart title={d.numeros.chartTipo} rows={tipoRows} unitLabel={unidade} />
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: d.nav.home, path: href(locale, "home") }, { name: d.nav.numeros, path: href(locale, "numeros") }]))}
      />
    </>
  );
}
