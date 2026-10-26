import Image from "next/image";
import aguiaBranca from "../../public/clientes/aguia-branca.png";
import fibrasa from "../../public/clientes/fibrasa.png";
import vascoCoutinho from "../../public/clientes/ceet-vasco-coutinho.png";
import kuruma from "../../public/clientes/toyota-kuruma.png";

// Logos do site antigo da PCR (enviados pelo cliente). Só logo: o nome vai no alt, sem legenda.
// Os arquivos vieram de uma captura de tela; trocar pelos originais em vetor quando houver.
const clientes = [
  { nome: "Grupo Águia Branca", src: aguiaBranca, altura: "h-11" },
  { nome: "Fibrasa", src: fibrasa, altura: "h-20" },
  { nome: "Centro Estadual de Educação Técnica Vasco Coutinho", src: vascoCoutinho, altura: "h-20" },
  { nome: "Toyota Kurumá", src: kuruma, altura: "h-16" },
];

export function ClientLogos({ title }: { title: string }) {
  return (
    <section className="wrap pb-16 lg:pb-24" aria-labelledby="clientes-t">
      <div className="grid justify-items-center gap-10 rule-strong pt-12">
        {/* título centralizado em caixa alta com traço curto, a pedido do cliente */}
        <div className="grid justify-items-center gap-4">
          <h2 id="clientes-t" className="text-section font-bold uppercase">
            {title}
          </h2>
          <span aria-hidden="true" className="block h-1 w-16 bg-primary" />
        </div>
        <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-14 gap-y-8 p-0">
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
