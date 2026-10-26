import Image from "next/image";
import Link from "next/link";
import simbolo from "../../public/brand/pcr-simbolo.png";

// Símbolo recortado do logo original + nome em Sora. Provisório até o arquivo vetorial da marca.
export function Logo({ href, label, size = "md", className = "" }: { href: string; label: string; size?: "md" | "lg"; className?: string }) {
  const lg = size === "lg";
  return (
    // nome acessível = texto visível + complemento oculto ("página inicial"), para quem usa comando de voz
    <Link href={href} className={`inline-flex items-center gap-2.5 no-underline ${className}`}>
      <Image src={simbolo} alt="" width={lg ? 52 : 34} height={lg ? 52 : 34} className="shrink-0" />
      <span className="leading-none">
        <span className={`block font-display font-bold tracking-[-0.02em] ${lg ? "text-[40px]" : "text-[26px]"}`}>PCR</span>
        <span className={`mt-1 block font-mono font-medium tracking-[0.28em] opacity-80 ${lg ? "text-[10px]" : "text-[8.5px]"}`}>
          {" "}
          ENGENHARIA E INCORPORAÇÃO
        </span>
        <span className="sr-only">, {label.split(",").slice(1).join(",").trim()}</span>
      </span>
    </Link>
  );
}
