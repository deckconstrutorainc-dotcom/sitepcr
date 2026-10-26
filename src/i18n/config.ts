export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

// Rotas internas usam os nomes em português; em inglês o proxy traduz o primeiro segmento.
export const routes = {
  home: { pt: "", en: "" },
  sobre: { pt: "sobre", en: "about" },
  servicos: { pt: "servicos", en: "services" },
  obras: { pt: "obras", en: "projects" },
  numeros: { pt: "numeros", en: "numbers" },
  contato: { pt: "contato", en: "contact" },
  privacidade: { pt: "privacidade", en: "privacy" },
} as const;
export type RouteKey = keyof typeof routes;

/** Caminho público de uma rota: PT na raiz, EN sob /en. */
export function href(locale: Locale, key: RouteKey, ...rest: string[]): string {
  const segs = [locale === "en" ? "en" : "", routes[key][locale], ...rest].filter(Boolean);
  return "/" + segs.join("/");
}

/** Mapa usado pelo proxy: segmento EN -> pasta interna PT. */
export const enToInternal: Record<string, string> = Object.fromEntries(
  Object.values(routes)
    .filter((r) => r.en)
    .map((r) => [r.en, r.pt]),
);

/**
 * Converte qualquer caminho (público ou interno reescrito pelo proxy, como "/pt/obras" ou "/en/obras")
 * para o caminho público do idioma pedido. Em páginas estáticas o usePathname() devolve o caminho interno.
 */
export function switchLocalePath(pathname: string, to: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "pt" || parts[0] === "en") parts.shift();
  const first = parts[0];
  if (first) {
    const entry = Object.values(routes).find((r) => r.pt === first || r.en === first);
    if (entry) parts[0] = entry[to];
  }
  return "/" + [to === "en" ? "en" : "", ...parts].filter(Boolean).join("/");
}

/** Caminho público do idioma atual (para comparar com hrefs, ex.: aria-current). */
export const publicPath = (pathname: string, locale: Locale) => switchLocalePath(pathname, locale);
