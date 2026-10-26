import Image from "next/image";
import aguiaBranca from "../../public/clientes/aguia-branca.png";
import fibrasa from "../../public/clientes/fibrasa.png";
import vascoCoutinho from "../../public/clientes/ceet-vasco-coutinho.png";
import kuruma from "../../public/clientes/toyota-kuruma.png";

// Logos do site antigo da PCR (enviados pelo cliente). Só logo: o nome vai no alt, sem legenda.
// Os arquivos vieram de uma captura de tela; trocar pelos originais em vetor quando houver.
const clientes = [
  { nome: "Grupo Águia Branca", src: aguiaBranca, altura: "h-9" },
  { nome: "Fibrasa", src: fibrasa, altura: "h-16" },
  { nome: "Centro Estadual de Educação Técnica Vasco Coutinho", src: vascoCoutinho, altura: "h-16" },
  { nome: "Toyota Kurumá", src: kuruma, altura: "h-14" },
];

export function ClientLogos({ title }: { title: string }) {
  return (
    <section className="wrap pb-16 lg:pb-24" aria-labelledby="clientes-t">
      <div className="grid gap-8 rule-strong pt-8 lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <h2 id="clientes-t" className="text-title lg:col-span-4">
          {title}
        </h2>
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-12 gap-y-8 p-0 lg:col-span-8 lg:justify-end">
          {clientes.map((c) => (
            <li key={c.nome}>
              {/* multiply funde o fundo branco dos arquivos ao fundo calcário da página */}
              <Image src={c.src} alt={c.nome} className={`${c.altura} w-auto mix-blend-multiply`} sizes="160px" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
