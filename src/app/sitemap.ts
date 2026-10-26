import type { MetadataRoute } from "next";
import { href, routes, type RouteKey } from "@/i18n/config";
import { site } from "@/lib/site";
import { slugs } from "@/lib/obras";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (key: RouteKey, rest: string[] = [], priority = 0.7): MetadataRoute.Sitemap[number] => ({
    url: site.url + href("pt", key, ...rest),
    priority,
    alternates: {
      languages: {
        "pt-BR": site.url + href("pt", key, ...rest),
        en: site.url + href("en", key, ...rest),
      },
    },
  });
  const paginas = (Object.keys(routes) as RouteKey[]).map((k) => entry(k, [], k === "home" ? 1 : k === "obras" ? 0.9 : 0.7));
  const obras = slugs().map((s) => entry("obras", [s], 0.6));
  return [...paginas, ...obras];
}
