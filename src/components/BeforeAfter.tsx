import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/media";

export type ParAntesDepois = {
  slug: string;
  nome: string;
  antes: string;
  depois: string;
  antesRotulo: string;
  depoisRotulo: string;
  antesAlt: string;
  depoisAlt: string;
};

// Antes e depois lado a lado. As fotos do portfólio não têm o mesmo enquadramento exato,
// então um controle deslizante sobreposto ficaria desalinhado; o par lado a lado é fiel às fotos.
export function BeforeAfter({ par, href, compact = false }: { par: ParAntesDepois; href?: string; compact?: boolean }) {
  const lados = [
    { img: par.antes, rotulo: par.antesRotulo, alt: par.antesAlt },
    { img: par.depois, rotulo: par.depoisRotulo, alt: par.depoisAlt },
  ];
  return (
    <figure className="m-0 grid gap-3">
      <div className="grid grid-cols-2 gap-2 lg:gap-3">
        {lados.map((l, i) => (
          <div key={l.img} className="grid gap-2">
            <div className="relative aspect-4/5 overflow-hidden bg-stone">
              <Image src={media[l.img]} alt={l.alt} fill placeholder="blur" sizes={compact ? "(min-width: 1024px) 22vw, 50vw" : "(min-width: 1024px) 33vw, 50vw"} className="object-cover" />
            </div>
            <span className={`eyebrow ${i === 0 ? "text-ink-subtle" : "text-primary"}`}>{l.rotulo}</span>
          </div>
        ))}
      </div>
      <figcaption className="text-ui text-ink-muted">
        {href ? (
          <Link href={href} className="font-bold text-ink underline-offset-4 hover:underline">
            {par.nome}
          </Link>
        ) : (
          par.nome
        )}
      </figcaption>
    </figure>
  );
}
