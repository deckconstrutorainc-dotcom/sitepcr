import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { href } from "@/i18n/config";
import { getDict, fmt, intlLocale } from "@/i18n/dictionary";
import { site } from "@/lib/site";
import { media, heroVideo } from "@/lib/media";
import { getObra, destaquesHome, type Obra } from "@/lib/obras";
import { indicadores, obrasConcluidasTotal } from "@/lib/numeros";
import { tempoAtual } from "@/lib/tempo";
import { pageMetadata } from "@/lib/seo";
import { HeroVideo } from "@/components/HeroVideo";
import { SectionHead } from "@/components/SectionHead";
import { StatsBand } from "@/components/StatsBand";
import { ServicesIndex } from "@/components/ServicesIndex";
import { ProcessStrip } from "@/components/ProcessStrip";
import { ClientLogos } from "@/components/ClientLogos";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, d } = await getDict();
  return pageMetadata({ locale, route: "home", title: d.meta.home.title, description: d.meta.home.description, absoluteTitle: true });
}

export default async function Home() {
  const { locale, d } = await getDict();
  const { anos } = await tempoAtual();
  const ind = indicadores(locale, d.numeros, anos);
  const intl = intlLocale(locale);
  const destaques = destaquesHome.map((slug) => getObra(locale, slug)).filter((o): o is Obra => Boolean(o));

  const statement = fmt(d.home.statement, { obras: obrasConcluidasTotal });
  const em = fmt(d.home.statementEm, { obras: obrasConcluidasTotal });
  const [antes, depois] = statement.split(em);

  return (
    <>
      {/* 1. Topo com vídeo de drone */}
      <section data-hero className="on-dark relative h-[100svh] max-h-[900px] min-h-[560px] overflow-hidden bg-night text-white">
        {/* sem preload: o LCP da Home é o título; o pôster entra logo depois sem disputar banda com as fontes */}
        <Image src={media.heroPoster} alt="" fill loading="eager" sizes="100vw" placeholder="blur" className="object-cover" />
        <HeroVideo src={heroVideo} label={d.home.videoLabel} pauseLabel={d.home.pause} playLabel={d.home.play} />
        <div aria-hidden="true" className="absolute inset-0 scrim-hero" />
        <div className="absolute inset-x-0 bottom-0 z-2 pb-[calc(env(safe-area-inset-bottom,0px)+28px)]">
          <div className="wrap">
            <h1 className="max-w-[24ch] text-hero">{d.home.heroTitle}</h1>
            <p className="mt-4 text-lede text-on-media">{d.home.heroSub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/35 pt-3.5">
              <span className="data text-on-media-muted">{d.home.heroCaption}</span>
              <Link href={href(locale, "obras")} className="link-cta">
                {d.common.verObras}
                <ArrowRight data-arrow size={18} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Abertura e sobre */}
      <section className="section" aria-labelledby="intro-t">
        <div className="wrap grid items-start gap-10 lg:grid-cols-12 lg:gap-x-8">
          <div data-reveal className="grid gap-5 lg:col-span-7">
            <h2 id="intro-t" className="sr-only">
              {d.meta.siteName}
            </h2>
            <p className="font-display text-statement font-medium">
              {antes}
              <em className="text-primary not-italic">{em}</em>
              {depois}
            </p>
            <Link href={href(locale, "sobre")} className="link-cta justify-self-start">
              {d.home.conheca}
              <ArrowRight data-arrow size={18} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
          <dl data-reveal className="m-0 grid rule-strong lg:col-span-4 lg:col-start-9">
            {[
              [d.home.facts.atuacao, d.home.facts.atuacaoValor],
              [d.home.facts.clientes, d.home.facts.clientesValor],
              [d.home.facts.rt, `${site.responsavelTecnico.nome}, ${site.responsavelTecnico.crea}`],
              [d.home.facts.grupo, site.grupo],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-hairline py-3.5">
                <dt className="label">{k}</dt>
                <dd className="m-0 font-semibold leading-[1.4]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2b. Clientes (logos do site antigo) */}
      <ClientLogos title={d.home.clientesTitle} />

      {/* 3. Obras em destaque: grade fechada, uma grande e duas empilhadas */}
      <section className="section pt-0!" aria-labelledby="dest-t">
        <div className="wrap">
          <SectionHead
            id="dest-t"
            title={d.home.featuredTitle}
            action={
              <Link href={href(locale, "obras")} className="link-cta">
                {fmt(d.common.verTodas, { n: obrasConcluidasTotal })}
                <ArrowRight data-arrow size={18} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            }
          />
          <div className="grid gap-4 lg:h-[min(72vh,680px)] lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
            {destaques.map((o, i) => (
              <FeaturedCard key={o.slug} obra={o} main={i === 0} href={href(locale, "obras", o.slug)} tipo={d.common.tipos[o.tipo]} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Números */}
      <section className="section bg-stone" aria-labelledby="num-t">
        <div className="wrap">
          <SectionHead id="num-t" title={d.home.numbersTitle} />
          <StatsBand items={[ind.obrasConcluidas, ind.m2, ind.aco, ind.clientes]} intl={intl} />
        </div>
      </section>

      {/* 5. Serviços */}
      <section className="section" aria-labelledby="serv-t">
        <div className="wrap">
          <SectionHead
            id="serv-t"
            title={d.home.servicesTitle}
            action={
              <Link href={href(locale, "servicos")} className="link-cta">
                {d.home.servicesAll}
                <ArrowRight data-arrow size={18} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            }
          />
          <ServicesIndex
            items={d.services.map((s) => ({
              id: s.id,
              title: s.title,
              short: s.short,
              caption: s.caption,
              image: media[s.img],
              href: `${href(locale, "servicos")}#${s.id}`,
            }))}
          />
        </div>
      </section>

      {/* 6. No canteiro */}
      <section className="section pt-0!" aria-labelledby="cant-t">
        <ProcessStrip
          header={
            <h2 id="cant-t" data-reveal className="max-w-[760px] text-section">
              {d.home.stripTitle}
            </h2>
          }
          labels={{ prev: d.common.anterior, next: d.common.proximo, region: d.home.stripLabel }}
          items={d.strip.map((s) => ({ key: s.img, image: media[s.img], caption: s.caption, alt: s.alt }))}
        />
      </section>

      {/* 7. Chamada final sobre foto */}
      <section className="on-dark relative flex min-h-[min(70vh,640px)] items-end bg-night text-white" aria-labelledby="cta-t">
        <Image src={media.costa} alt={d.home.coverAlt} fill sizes="100vw" placeholder="blur" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 scrim-left" />
        <div className="wrap relative z-2 py-16">
          <div data-reveal className="grid max-w-[560px] gap-4">
            <h2 id="cta-t" className="text-page">
              {d.home.coverTitle}
            </h2>
            <p className="text-lead text-on-media">{d.home.coverText}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href={href(locale, "contato")} className="btn-primary no-underline">
                {d.common.falar}
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </Link>
              <span className="data text-on-media-muted">{site.telefones[0]}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedCard({ obra, main, href, tipo }: { obra: Obra; main: boolean; href: string; tipo: string }) {
  const capa = obra.fotos[0];
  return (
    <Link
      href={href}
      data-reveal-img
      className={`group @container relative block overflow-hidden bg-night text-white no-underline ${
        main ? "min-h-[380px] lg:col-span-8 lg:row-span-2" : "min-h-[260px] lg:col-span-4"
      }`}
    >
      {capa && (
        <Image
          src={capa.src}
          alt={obra.alt}
          fill
          sizes={main ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover img-zoom"
        />
      )}
      <span aria-hidden="true" className="scrim-bottom absolute inset-0" />
      <span
        aria-hidden="true"
        className="absolute top-5 right-5 z-2 grid size-11 -translate-y-1.5 place-items-center border border-white/70 opacity-0 transition-[opacity,transform] duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        <ArrowRight size={18} strokeWidth={1.75} />
      </span>
      {/* container query: o texto acompanha a largura do card, não a da tela */}
      <span className="absolute inset-x-0 bottom-0 z-2 grid gap-1.5 p-5 @2xl:px-7 @2xl:py-6">
        <span className="eyebrow text-night-muted">{tipo}</span>
        <h3 className="text-title @2xl:text-feature">{obra.titulo}</h3>
        <span className="data text-on-media-muted">
          {[obra.local, obra.periodo].filter(Boolean).join(" · ")}
        </span>
      </span>
    </Link>
  );
}
