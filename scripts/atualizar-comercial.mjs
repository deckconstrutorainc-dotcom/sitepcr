// Atualização única (27/10/2026): linguagem comercial B2B a partir da avaliação recebida pelo cliente.
// Proposta de valor, "Por que contratar a PCR", mini-cases, antes e depois e CTA "Solicitar visita técnica".
// Só afirmações verificáveis nos documentos: nada de "prazo garantido", "sem aditivos" ou "sem surpresas".
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const t = {
  pt: {
    home: {
      heroTitle: "Engenharia civil da fundação à entrega.",
      heroSub: "Construção, reforma e recuperação estrutural com orçamento por item, medição em boletim e responsável técnico em todas as etapas.",
      heroCta: "Solicitar visita técnica",
      statement:
        "Com sede na Serra e acesso rápido a todo o Espírito Santo, a PCR executa construção, reforma e recuperação de edificações em conformidade com as normas técnicas. São {obras} obras entregues, cada etapa medida em boletim, documentada e conferida com o orçamento aprovado pelo cliente.",
      porque: {
        title: "Por que contratar a PCR",
        itens: [
          { t: "Orçamento por item e medição em boletim", p: "Cada contrato tem planilha por item. O pagamento acompanha o boletim de medição, com o quantitativo efetivamente executado, e mudanças de escopo são formalizadas em aditivo." },
          { t: "Responsável técnico em todas as etapas", p: "Engenheiro civil responsável do orçamento à entrega, com Anotação de Responsabilidade Técnica registrada no CREA-ES." },
          { t: "Controle técnico da execução", p: "Escopo definido a partir de laudo de inspeção quando necessário, ensaios de aderência em fachadas e registro fotográfico de cada etapa." },
          { t: "Experiência em ambientes hospitalares", p: "Reformas e ampliações em quatro hospitais da Grande Vitória, incluindo setor de imagem com paredes baritadas e ampliação em estrutura metálica." }
        ]
      },
      antesDepois: {
        title: "Antes e depois",
        antes: "Antes",
        depois: "Depois",
        itens: [
          { slug: "ed-lion-dor-fachada", nome: "Ed. Lion D'Or, Santa Helena, Vitória", antes: "lion-antes", depois: "lion-depois", antesRotulo: "Início da obra", depoisRotulo: "Obra concluída", antesAlt: "Fachada frontal do Ed. Lion D'Or no início da obra, com tela de proteção", depoisAlt: "Fachada frontal do Ed. Lion D'Or concluída, com a pintura nova" },
          { slug: "ed-solar-do-atlantico", nome: "Ed. Solar do Atlântico, Jardim da Penha, Vitória", antes: "solar-antes", depois: "solar-depois", antesRotulo: "Antes", depoisRotulo: "Obra finalizada", antesAlt: "Quina da fachada do Ed. Solar do Atlântico com placas de granito se soltando, antes da obra", depoisAlt: "Mesma quina da fachada do Ed. Solar do Atlântico com o novo revestimento em porcelanato" }
        ]
      }
    },
    falar: "Solicitar visita técnica",
    caseLabels: { titulo: "O desafio e a solução", desafio: "Desafio", solucao: "Solução", resultado: "Resultado" }
  },
  en: {
    home: {
      heroTitle: "Civil engineering from foundations to handover.",
      heroSub: "Construction, renovation and structural repair with itemised budgets, measured progress reports and an engineer of record at every stage.",
      heroCta: "Request a site visit",
      statement:
        "Based in Serra, with quick access to the whole of Espírito Santo, PCR delivers construction, renovation and building repair in line with technical standards: {obras} projects so far, every stage measured in progress reports, documented and checked against the budget approved by the client.",
      porque: {
        title: "Why choose PCR",
        itens: [
          { t: "Itemised budgets and measured progress", p: "Every contract has an itemised bill of quantities. Payment follows the progress report, based on the quantities actually executed, and scope changes are formalised through change orders." },
          { t: "An engineer of record at every stage", p: "A civil engineer is responsible from estimate to handover, with a technical responsibility record (ART) filed with CREA-ES." },
          { t: "Technical control of the works", p: "Scope based on a building inspection report where needed, bond tests on facades and photographic records of every stage." },
          { t: "Experience in hospital settings", p: "Renovations and extensions in four hospitals in the Greater Vitória area, including an imaging department with barium plaster walls and a steel-frame extension." }
        ]
      },
      antesDepois: {
        title: "Before and after",
        antes: "Before",
        depois: "After",
        itens: [
          { slug: "ed-lion-dor-fachada", nome: "Lion D'Or Building, Santa Helena, Vitória", antes: "lion-antes", depois: "lion-depois", antesRotulo: "Start of works", depoisRotulo: "Completed", antesAlt: "Front facade of the Lion D'Or building at the start of works, with safety netting", depoisAlt: "Front facade of the Lion D'Or building after completion, freshly painted" },
          { slug: "ed-solar-do-atlantico", nome: "Solar do Atlântico Building, Jardim da Penha, Vitória", antes: "solar-antes", depois: "solar-depois", antesRotulo: "Before", depoisRotulo: "Completed", antesAlt: "Corner of the Solar do Atlântico facade with granite panels coming loose, before the works", depoisAlt: "The same corner of the Solar do Atlântico facade with the new porcelain cladding" }
        ]
      }
    },
    falar: "Request a site visit",
    caseLabels: { titulo: "Challenge and solution", desafio: "Challenge", solucao: "Solution", resultado: "Result" }
  }
};

for (const lang of ["pt", "en"]) {
  const f = path.join(ROOT, `src/i18n/${lang}.json`);
  const d = JSON.parse(await readFile(f, "utf8"));
  const x = t[lang];
  Object.assign(d.home, x.home);
  d.common.falar = x.falar;
  d.obras.caso = x.caseLabels;
  if (!x.home.statement.includes(d.home.statementEm.replace("{obras}", "{obras}"))) throw new Error(`${lang}: destaque fora da frase`);
  await writeFile(f, JSON.stringify(d, null, 2) + "\n");
  console.log(lang, "ok");
}
