import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { href } from "@/i18n/config";
import { getDict } from "@/i18n/dictionary";

export default async function NotFound() {
  const { locale, d } = await getDict();
  return (
    <div className="wrap grid min-h-[70svh] content-center gap-5 pt-header pb-16">
      <h1 className="text-page">{d.notFound.title}</h1>
      <p className="max-w-[52ch] text-lead text-ink-muted">{d.notFound.text}</p>
      <div className="flex flex-wrap gap-x-8">
        <Link href={href(locale, "obras")} className="link-cta">
          {d.common.verObras}
          <ArrowRight data-arrow size={18} strokeWidth={1.75} aria-hidden="true" />
        </Link>
        <Link href={href(locale, "home")} className="link-cta">
          {d.notFound.home}
          <ArrowRight data-arrow size={18} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
