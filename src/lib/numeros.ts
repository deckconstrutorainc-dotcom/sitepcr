import "server-only";
import numeros from "@/data/numeros.json";
import type { Locale } from "@/i18n/config";
import { fmt, formatNumber, type Dict } from "@/i18n/dictionary";

// Cada indicador vem de data/numeros.json (público: valor + nº de obras). A lista de obras de cada
// indicador e o arquivo-fonte de cada número ficam em privado/numeros.json e privado/obras.json.
export type Indicador = {
  id: string;
  valor: number;
  texto: string; // valor formatado para o idioma
  unidade?: string;
  rotulo: string;
  nota: string;
  decimais: number;
};

type NumerosDict = Dict["numeros"];

function ind(
  locale: Locale,
  d: NumerosDict,
  id: keyof NumerosDict["notas"],
  valor: number,
  opts: { unidade?: string; decimais?: number; base?: number } = {},
): Indicador {
  const decimais = opts.decimais ?? 0;
  return {
    id,
    valor,
    texto: formatNumber(locale, valor, decimais),
    unidade: opts.unidade,
    rotulo: d[id as keyof NumerosDict] as string,
    nota: fmt(d.notas[id], { n: opts.base ?? 0 }),
    decimais,
  };
}

export function indicadores(locale: Locale, d: NumerosDict, anos: number) {
  const n = numeros;
  const executadoMi = n.valor_total_executado_brl.valor / 1_000_000;
  return {
    obrasConcluidas: ind(locale, d, "obrasConcluidas", n.obras_concluidas.valor),
    m2: ind(locale, d, "m2", Math.round(n.m2_reformados.valor), { unidade: "m²", base: n.m2_reformados.obras }),
    aco: ind(locale, d, "aco", Math.round(n.estrutura_metalica_t.valor * 10) / 10, {
      unidade: "t",
      decimais: 1,
      base: n.estrutura_metalica_t.obras,
    }),
    clientes: ind(locale, d, "clientes", n.clientes_atendidos.valor),
    anos: ind(locale, d, "anos", anos),
    municipios: ind(locale, d, "municipios", n.municipios_atendidos.valor),
    executado: {
      ...ind(locale, d, "executado", Math.floor(executadoMi * 10) / 10, {
        unidade: locale === "pt" ? "mi" : "M",
        decimais: 1,
        base: n.valor_total_executado_brl.obras,
      }),
      prefixo: "R$",
    },
  };
}

export const obrasConcluidasTotal = numeros.obras_concluidas.valor;
