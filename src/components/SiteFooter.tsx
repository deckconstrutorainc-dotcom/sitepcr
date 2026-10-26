import Link from "next/link";
import { getDict, fmt } from "@/i18n/dictionary";
import { href, type RouteKey } from "@/i18n/config";
import { site, telHref } from "@/lib/site";
import { tempoAtual } from "@/lib/tempo";
import { Logo } from "./Logo";

const navKeys: RouteKey[] = ["sobre", "servicos", "obras", "numeros", "contato"];

export async function SiteFooter() {
  const { locale, d } = await getDict();
  const { ano } = await tempoAtual();
  const other = locale === "pt" ? "en" : "pt";
  return (
    <footer className="on-dark bg-night text-ui text-night-muted">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-night-hairline pt-16 pb-10">
          <Logo href={href(locale, "home")} label={d.nav.homeAria} size="lg" className="text-white" />
          <p className="font-display text-feature font-semibold text-white">
            {site.telefones.map((t, i) => (
              <span key={t}>
                {i > 0 && <span aria-hidden="true"> / </span>}
                <a href={telHref(t)} className="no-underline hover:underline">
                  {t}
                </a>
              </span>
            ))}
          </p>
        </div>
        <div className="grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow mb-3 font-mono text-white">{d.footer.navegacao}</h2>
            <ul className="m-0 grid list-none gap-1.5 p-0">
              {navKeys.map((k) => (
                <li key={k}>
                  <Link href={href(locale, k)} className="text-white no-underline underline-offset-4 hover:underline">
                    {d.nav[k as keyof typeof d.nav] as string}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-3 font-mono text-white">{d.footer.endereco}</h2>
            <address className="not-italic">
              {site.endereco.rua}, {site.endereco.bairro}
              <br />
              {site.endereco.cidade} - {site.endereco.uf}, CEP {site.endereco.cep}
            </address>
            <p className="mt-3">
              <a href={`mailto:${site.email}`} className="text-white no-underline underline-offset-4 hover:underline">
                {site.email}
              </a>
            </p>
          </div>
          <div>
            <h2 className="eyebrow mb-3 font-mono text-white">{d.footer.empresa}</h2>
            <p>
              {site.razaoSocial}
              <br />
              CNPJ {site.cnpj}
              <br />
              {d.footer.rt}: {site.responsavelTecnico.nome}, {site.responsavelTecnico.crea}
              <br />
              {fmt(d.footer.grupo, { grupo: site.grupo })}
            </p>
          </div>
          <div>
            <h2 className="eyebrow mb-3 font-mono text-white">{d.footer.idioma}</h2>
            <ul className="m-0 grid list-none gap-1.5 p-0">
              <li className="text-white">{locale === "pt" ? "Português" : "English"}</li>
              <li>
                <Link href={href(other, "home")} hrefLang={other === "pt" ? "pt-BR" : "en"} lang={other === "pt" ? "pt-BR" : "en"} className="text-white no-underline underline-offset-4 hover:underline">
                  {d.nav.switchTo}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-night-hairline pt-5 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] font-mono text-xs">
          <span>{fmt(d.footer.direitos, { ano })}</span>
          <Link href={href(locale, "privacidade")} className="text-night-muted underline-offset-4 hover:underline">
            {d.footer.privacidade}
          </Link>
        </div>
      </div>
    </footer>
  );
}
