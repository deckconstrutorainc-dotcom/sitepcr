// Gera os dados PÚBLICOS do site a partir da extração completa (pasta privado/, fora do Git).
// O repositório é público: aqui saem valores em R$ por obra, fontes documentais, caminhos de contratos,
// pendências e qualquer identificador com nome de pessoa física. Fica só o que o site exibe.
//
// Uso: node scripts/publicar-dados.mjs   (rodar sempre que privado/obras.json ou privado/numeros.json mudar)

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const ler = async (p) => JSON.parse(await readFile(path.join(ROOT, p), "utf8"));
const gravar = (p, data) => writeFile(path.join(ROOT, p), JSON.stringify(data, null, 2) + "\n");

const obras = await ler("privado/obras.json");
const numeros = await ler("privado/numeros.json");
const textos = await ler("privado/obras-texto-completo.json");

// Quantitativo só entra se a fonte comprova execução (medição, contrato) e nunca orçamento/proposta.
function base(fonte = "", item = "") {
  if (/or[çc]ad|or[çc]amento|proposta/i.test(`${fonte} ${item}`)) return null;
  if (/medi[çc][aã]o|boletim|\bBM\b|BMS/i.test(fonte)) return "medicao";
  if (/contrato/i.test(fonte)) return "contrato";
  return "documento";
}

const visiveis = obras.filter((o) => !o.excluir_do_site && o.status !== "desconhecido");
const publicas = visiveis.map((o) => ({
  slug: o.slug,
  nome: o.nome,
  cliente: o.cliente_site,
  tipo: o.tipo,
  cidade: o.cidade ?? null,
  bairro: o.bairro ?? null,
  inicio: o.inicio ?? null,
  fim: o.fim ?? null,
  status: o.status,
  area_m2: o.area_categoria === "excluir" ? null : (o.area_m2 ?? null),
  destaque: Boolean(o.destaque),
  quantitativos:
    o.status === "concluida"
      ? (o.quantitativos ?? []).flatMap((q) => {
          const b = base(q.fonte, q.item);
          return b && q.quantidade != null ? [{ item: q.item, unidade: q.unidade, quantidade: q.quantidade, base: b }] : [];
        })
      : [],
}));

// Textos das obras passam a ser indexados pelo slug público (os ids internos podem conter nomes).
const idParaSlug = new Map(obras.map((o) => [o.id, o.slug]));
const textosPublicos = {};
for (const [id, t] of Object.entries(textos)) {
  const slug = idParaSlug.get(id) ?? id;
  if (visiveis.some((o) => o.slug === slug)) textosPublicos[slug] = t;
}

// Indicadores: só o valor e quantas obras compõem cada um (a lista de obras fica no privado/).
const n = numeros;
const numerosPublicos = {
  fundacao: n.fundacao,
  obras_concluidas: { valor: n.obras_concluidas.valor },
  m2_reformados: { valor: n.m2_reformados.valor, obras: n.m2_reformados.base.length },
  estrutura_metalica_t: { valor: n.estrutura_metalica_t.valor, obras: n.estrutura_metalica_t.base.length },
  clientes_atendidos: { valor: n.clientes_atendidos.valor },
  municipios_atendidos: { valor: n.municipios_atendidos.valor },
  valor_total_executado_brl: { valor: n.valor_total_executado_brl.valor, obras: n.valor_total_executado_brl.base.length },
};

await gravar("src/data/obras.json", publicas);
await gravar("src/data/numeros.json", numerosPublicos);
await gravar("src/content/obras-texto.json", textosPublicos);
console.log(`${publicas.length} obras públicas · ${Object.keys(textosPublicos).length} textos · numeros.json sem listas de obras`);
