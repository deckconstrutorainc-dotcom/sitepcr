import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import pt from "./pt.json";
import en from "./en.json";

export type Dict = typeof pt;
const dicts: Record<Locale, Dict> = { pt, en };

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getDict(): Promise<{ locale: Locale; d: Dict }> {
  const locale = await getLocale();
  return { locale, d: dicts[locale] };
}

/** Substitui {chave} no texto. */
export function fmt(text: string, vars: Record<string, string | number> = {}): string {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? String(vars[k]) : `{${k}}`));
}

export const intlLocale = (locale: Locale) => (locale === "pt" ? "pt-BR" : "en-US");

export function formatNumber(locale: Locale, value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
