import type { Metadata } from "next";
import { href } from "@/i18n/config";
import { getDict } from "@/i18n/dictionary";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/PageIntro";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, d } = await getDict();
  return pageMetadata({ locale, route: "privacidade", title: d.meta.privacidade.title, description: d.meta.privacidade.description });
}

export default async function PrivacidadePage() {
  const { locale, d } = await getDict();
  const p = d.privacidade;
  return (
    <>
      <PageIntro title={p.title} lead={p.atualizado} crumbs={[{ label: d.nav.home, href: href(locale, "home") }, { label: p.title }]} />
      <div className="wrap section">
        <div className="grid max-w-[68ch] gap-8">
          {p.secoes.map((s) => (
            <section key={s.h} className="grid gap-2">
              <h2 className="text-title">{s.h}</h2>
              <p className="text-ink-muted">{s.p}</p>
            </section>
          ))}
          <p className="text-ink-muted">
            <a href={`mailto:${site.email}`} className="font-semibold text-ink underline underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
