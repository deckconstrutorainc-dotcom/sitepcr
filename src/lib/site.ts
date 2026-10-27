// Dados institucionais. Fonte: prompt do projeto e respostas do cliente (ver PENDENCIAS.md).
// Valores ainda não confirmados ficam marcados em `pendente` e aparecem no site como [PREENCHER].

export const site = {
  nome: "PCR Engenharia e Incorporação",
  razaoSocial: "PCR ENGENHARIA E INCORPORACAO LTDA",
  cnpj: "30.322.792/0001-81",
  fundacao: "2018-04-27",
  endereco: {
    rua: "Rua Seis, 73, Lotes 01 e 03, Galpão 01",
    bairro: "Jardim Bela Vista",
    cidade: "Serra",
    uf: "ES",
    cep: "29177-420",
  },
  telefones: ["(27) 3291-4003", "(27) 3291-7978"],
  email: "pcr@pcrengenharia.com",
  horario: null as string | null,
  responsavelTecnico: { nome: "Eng. Civil Bruno Feitosa Tedesco", crea: "CREA-ES 11026/D" },
  grupo: "Deck Construtora e Incorporadora",
  areaAtendida: "Espírito Santo",
  redes: { instagram: null as string | null, linkedin: null as string | null },
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || null,
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
} as const;

export const telHref = (tel: string) => "tel:+55" + tel.replace(/\D/g, "");

export function anosDeAtuacao(hoje = new Date()): number {
  const f = new Date(site.fundacao + "T00:00:00-03:00");
  let anos = hoje.getFullYear() - f.getFullYear();
  if (hoje.getMonth() < f.getMonth() || (hoje.getMonth() === f.getMonth() && hoje.getDate() < f.getDate())) anos--;
  return anos;
}
