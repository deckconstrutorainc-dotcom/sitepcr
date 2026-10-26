// Atualização única (26/10/2026): incorpora as informações do site antigo da PCR (pcr.pdf enviado pelo cliente):
// frente "Construção civil", nomes "Reformas e adequações" e "Perícia e assistência técnica", texto institucional,
// rótulo "Solicitar contato técnico" e a faixa de clientes.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const t = {
  pt: {
    construcao: {
      id: "construcao",
      img: "galpao-terraplenagem",
      title: "Construção civil",
      short: "Edificações residenciais, comerciais, industriais e institucionais.",
      body: "Construção de edificações do canteiro à entrega, com planejamento, equipe própria e engenheiro responsável. Entre elas, as casas geminadas do Condomínio Luamar e a praça de alimentação no Aeroporto de Vitória.",
      caption: "Movimento de terra em obra de galpão",
    },
    reformas: "Reformas e adequações",
    laudos: {
      title: "Perícia e assistência técnica",
      short: "Perícias, laudos, pareceres técnicos e assistência técnica com ART.",
      body: "Perícias, laudos de inspeção e pareceres técnicos para condomínios e empresas, além de assistência técnica, sempre emitidos com ART por engenheiro civil.",
    },
    institucional:
      "A PCR desenvolve soluções em engenharia civil com planejamento, organização e compromisso técnico. Trabalha com equipes qualificadas e processos bem definidos para garantir segurança, eficiência e durabilidade em cada projeto executado.",
    falar: "Solicitar contato técnico",
    servicosHint: "7 frentes",
    servicosLead: "Sete frentes de trabalho, sempre com responsável técnico, ART e medição por item.",
    clientesTitle: "Empresas e instituições que já contrataram a PCR.",
  },
  en: {
    construcao: {
      id: "construcao",
      img: "galpao-terraplenagem",
      title: "Construction",
      short: "Residential, commercial, industrial and institutional buildings.",
      body: "Building from groundworks to handover, with planning, in-house crews and an engineer in charge. Projects include the Luamar semi-detached houses and the food court at Vitória Airport.",
      caption: "Earthworks inside a warehouse project",
    },
    reformas: "Renovations and upgrades",
    laudos: {
      title: "Technical surveys and expert support",
      short: "Surveys, reports, technical opinions and expert support, with a technical responsibility record.",
      body: "Technical surveys, inspection reports and opinions for condominiums and companies, plus expert technical support, always issued with a technical responsibility record (ART) by a civil engineer.",
    },
    institucional:
      "PCR delivers civil engineering solutions built on planning, organisation and technical commitment, with qualified crews and well-defined processes that ensure safety, efficiency and durability on every project.",
    falar: "Request a technical contact",
    servicosHint: "7 services",
    servicosLead: "Seven lines of work, always with an engineer of record, a technical responsibility record and itemised progress reports.",
    clientesTitle: "Companies and institutions that have hired PCR.",
  },
};

for (const lang of ["pt", "en"]) {
  const f = path.join(ROOT, `src/i18n/${lang}.json`);
  const d = JSON.parse(await readFile(f, "utf8"));
  const x = t[lang];
  if (!d.services.some((s) => s.id === "construcao")) d.services.unshift(x.construcao);
  const ref = d.services.find((s) => s.id === "reformas");
  ref.title = x.reformas;
  const lau = d.services.find((s) => s.id === "laudos");
  Object.assign(lau, x.laudos);
  if (!d.sobre.historia.includes(x.institucional)) d.sobre.historia.splice(1, 0, x.institucional);
  d.common.falar = x.falar;
  d.nav.menuHints.servicos = x.servicosHint;
  d.servicos.lead = x.servicosLead;
  d.home.clientesTitle = x.clientesTitle;
  await writeFile(f, JSON.stringify(d, null, 2) + "\n");
  console.log(lang, "serviços:", d.services.map((s) => s.title).join(" | "));
}
