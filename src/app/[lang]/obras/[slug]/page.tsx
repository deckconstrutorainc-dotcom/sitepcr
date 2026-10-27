import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Plus } from "lucide-react";
import { href } from "@/i18n/config";
import { getDict, fmt, formatNumber } from "@/i18n/dictionary";
import { getObra, semelhantes, slugs } from "@/lib/obras";
import { pageMetadata, breadcrumbJsonLd, jsonLd, seoTitle, seoDescription } from "@/lib/seo";
import { site } from "@/lib/site";
import { Gallery } from "@/components/Gallery";
import { BeforeAfter } from "@/components/BeforeAfter";
import casos from "@/content/cases.json";

export function generateStaticParams() {
  return slugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/obras/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale, d } = await getDict();
  const obra = getObra(locale, slug);
  if (!obra) return {};
  const capa = obra.fotos[0];
  const onde = obra.local ? (locale === "pt" ? ` em ${obra.local}` : ` in ${obra.local}`) : "";
  const complemento =
    locale === "pt"
      ? `${d.common.tipos[obra.tipo]}${onde}, ES. Obra da PCR Engenharia${obra.ano ? `, ${obra.ano}` : ""}.`
      : `${d.common.tipos[obra.tipo]} project${onde}, Espírito Santo, by PCR Engenharia${obra.ano ? ` (${obra.ano})` : ""}.`;
  return pageMetadata({
    locale,
    route: "obras",
    rest: [slug],
    title: seoTitle(obra.titulo),
    description: seoDescription(obra.resumo || obra.escopo, complemento),
    image: capa ? { url: capa.src, width: capa.width, height: capa.height, alt: obra.alt } : undefined,
  });
}

export default async function ObraPage({ params }: PageProps<"/[lang]/obras/[slug]">) {
  const { slug } = await params;
  const { locale, d } = await getDict();
  const obra = getObra(locale, slug);
  if (!obra) notFound();

  const capa = obra.fotos[0];
  const relacionadas = semelhantes(locale, obra);
  const ficha = [
    [d.obras.cliente, obra.cliente],
    [d.obras.local, obra.local],
    [d.obras.periodo, obra.periodo],
    [d.obras.area, obra.area ? `${formatNumber(locale, obra.area, obra.area % 1 ? 2 : 0)} m²` : null],
    [d.obras.status, d.obras[`status_${obra.status}` as "status_concluida"]],
  ].filter((r): r is [string, string] => Boolean(r[1]));
  const temMedicao = obra.quantitativos.some((q) => q.base === "medicao");
  const caso = (casos as unknown as Record<string, Record<"pt" | "en", Record<"desafio" | "solucao" | "resultado", string>>>)[obra.slug]?.[locale];
  const antesDepois = d.home.antesDepois.itens.find((p) => p.slug === obra.slug);

  return (
    <article>
      {capa ? (
        <div data-hero className="relative h-[min(78svh,760px)] min-h-[380px] overflow-hidden bg-night">
          <Image src={capa.src} alt={obra.alt} fill preload sizes="100vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 scrim-top" />
        </div>
      ) : (
        <div className="pt-header" />
      )}

      <div className="wrap">
        <div className="grid gap-5 pt-10 lg:pt-14">
          <div className="grid gap-3">
            <nav aria-label="Breadcrumb" className="data text-ink-subtle">
              <Link href={href(locale, "obras")} className="text-ink-muted underline-offset-4 hover:underline">
                {d.nav.obras}
              </Link>
              <span aria-hidden="true"> / </span>
              <Link href={`${href(locale, "obras")}?tipo=${obra.tipo}`} className="text-ink-muted underline-offset-4 hover:underline">
                {d.common.tipos[obra.tipo]}
              </Link>
            </nav>
            <h1 className="max-w-[24ch] text-page">{obra.titulo}</h1>
          </div>
          {obra.escopo && <p className="max-w-[62ch] text-lead text-ink-muted">{obra.escopo}</p>}
        </div>

        <dl className="m-0 mt-8 grid grid-cols-2 rule-strong lg:grid-cols-5">
          {ficha.map(([k, v]) => (
            <div key={k} className="grid content-start gap-1 border-b border-hairline py-3.5 pr-4">
              <dt className="label">{k}</dt>
              <dd className="m-0 font-semibold leading-[1.35]">{v}</dd>
            </div>
          ))}
        </dl>

        {caso && (
          <section className="grid gap-8 pt-12 lg:grid-cols-3 lg:gap-x-8" aria-labelledby="caso-t">
            <h2 id="caso-t" className="text-heading lg:col-span-3">
              {d.obras.caso.titulo}
            </h2>
            {(["desafio", "solucao", "resultado"] as const).map((k) => (
              <div key={k} data-reveal className="grid content-start gap-3 rule-strong pt-5">
                <h3 className={`eyebrow ${k === "resultado" ? "text-primary" : "text-ink-subtle"}`}>{d.obras.caso[k]}</h3>
                <p className="text-ink-muted">{caso[k]}</p>
              </div>
            ))}
          </section>
        )}

        {antesDepois && (
          <section className="pt-12" aria-labelledby="ad-t">
            <h2 id="ad-t" className="mb-6 text-heading">
              {d.home.antesDepois.title}
            </h2>
            <div className="max-w-[880px]">
              <BeforeAfter par={antesDepois} />
            </div>
          </section>
        )}

        {obra.quantitativos.length > 0 && (
          <details className="group border-b border-hairline">
            <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between font-display text-card font-semibold [&::-webkit-details-marker]:hidden">
              {d.obras.quantitativos}
              <Plus size={18} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <div className="overflow-x-auto pb-7">
              <table className="w-full min-w-[460px] border-collapse font-mono text-[13px] leading-normal tabular-nums">
                <thead>
                  <tr>
                    <th className="eyebrow rule-strong-b py-2.5 pr-3 text-left text-[11px] text-ink-subtle">{d.obras.servico}</th>
                    <th className="eyebrow rule-strong-b py-2.5 pr-3 text-left text-[11px] text-ink-subtle">{d.obras.unidade}</th>
                    <th className="eyebrow rule-strong-b py-2.5 text-right text-[11px] text-ink-subtle">{d.obras.quantidade}</th>
                  </tr>
                </thead>
                <tbody>
                  {obra.quantitativos.map((q, i) => (
                    <tr key={i}>
                      <td className="border-b border-hairline py-2.5 pr-3">{q.item}</td>
                      <td className="border-b border-hairline py-2.5 pr-3">{q.unidade}</td>
                      <td className="border-b border-hairline py-2.5 text-right font-medium">
                        {formatNumber(locale, q.quantidade, q.quantidade % 1 ? 2 : 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="data mt-2.5 text-ink-subtle">
                {fmt(d.obras.fonte, { fonte: temMedicao ? (locale === "pt" ? "boletins de medição da obra" : "the project's progress reports") : d.obras.fonteGenerica })}
              </p>
            </div>
          </details>
        )}

        {obra.fotos.length > 1 && (
          <section className="pt-14" aria-labelledby="galeria-t">
            <h2 id="galeria-t" className="mb-6 text-heading">
              {d.obras.galeria}
            </h2>
            <Gallery
              fotos={obra.fotos.slice(1)}
              alt={obra.alt}
              labels={{ fotoDe: d.obras.fotoDe, fechar: d.obras.fecharFoto, anterior: d.obras.fotoAnterior, proxima: d.obras.fotoProxima }}
            />
          </section>
        )}

        {relacionadas.length > 0 && (
          <section className="py-16 lg:py-24" aria-labelledby="rel-t">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 id="rel-t" className="text-heading">
                {d.obras.semelhantes}
              </h2>
              <Link href={`${href(locale, "obras")}?tipo=${obra.tipo}`} className="link-cta">
                {d.common.tipos[obra.tipo]}
                <ArrowRight data-arrow size={18} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
            <ul className="m-0 grid list-none gap-x-6 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {relacionadas.map((r) => (
                <li key={r.slug}>
                  <Link href={href(locale, "obras", r.slug)} className="group grid gap-3 no-underline">
                    <div className="relative aspect-4/3 overflow-hidden bg-stone">
                      {r.fotos[0] ? (
                        <Image src={r.fotos[0].src} alt={r.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover img-zoom" />
                      ) : (
                        <div className="grid h-full place-content-center p-6 text-center">
                          <span className="eyebrow text-ink-subtle">{d.common.semFoto}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="border-t border-hairline pt-3 text-card group-hover:text-primary">{r.titulo}</h3>
                    <p className="data -mt-1.5 text-ink-subtle">{[r.local, r.ano].filter(Boolean).join(" · ")}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {relacionadas.length === 0 && <div className="pb-16 lg:pb-24" />}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: d.nav.home, path: href(locale, "home") },
            { name: d.nav.obras, path: href(locale, "obras") },
            { name: obra.titulo, path: href(locale, "obras", obra.slug) },
          ]),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: obra.titulo,
          description: obra.escopo || obra.resumo,
          locationCreated: obra.local ? { "@type": "Place", name: `${obra.local}, ES, Brasil` } : undefined,
          dateCreated: obra.ano ?? undefined,
          image: obra.fotos.slice(0, 3).map((f) => site.url + f.src),
          creator: { "@id": `${site.url}/#organizacao` },
        })}
      />
    </article>
  );
}
