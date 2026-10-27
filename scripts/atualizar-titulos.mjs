// Atualização única (27/10/2026): títulos mais amplos e institucionais, a pedido do cliente
// ("Fachadas, hospitais e estruturas" e os títulos-slogan das seções soavam estreitos e pouco profissionais).
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const novos = {
  pt: {
    "home.heroTitle": "Construção, reforma e recuperação de edificações.",
    "home.heroSub": "Engenharia civil em todo o Espírito Santo desde 2018.",
    "home.statement":
      "Desde 2018, a PCR executa obras de construção, reforma e recuperação de edificações residenciais, comerciais, industriais e institucionais em todo o Espírito Santo. São {obras} obras entregues, cada etapa medida e assinada por engenheiro.",
    "home.featuredTitle": "Obras em destaque",
    "home.numbersTitle": "Nossa trajetória em números",
    "home.servicesTitle": "Áreas de atuação",
    "home.stripTitle": "Obras em execução",
    "home.coverTitle": "Solicite uma visita técnica",
    "contato.title": "Solicite uma visita técnica",
    "sobre.title": "Engenharia civil com responsabilidade técnica desde 2018",
  },
  en: {
    "home.heroTitle": "Construction, renovation and building repair.",
    "home.heroSub": "Civil engineering across Espírito Santo, Brazil, since 2018.",
    "home.statement":
      "Since 2018, PCR has delivered construction, renovation and repair of residential, commercial, industrial and institutional buildings across Espírito Santo. {obras} delivered, every stage measured and signed off by an engineer.",
    "home.featuredTitle": "Featured projects",
    "home.numbersTitle": "Our track record in numbers",
    "home.servicesTitle": "What we do",
    "home.stripTitle": "Work in progress",
    "home.coverTitle": "Request a site visit",
    "contato.title": "Request a site visit",
    "sobre.title": "Civil engineering with technical accountability since 2018",
  },
};

for (const lang of ["pt", "en"]) {
  const f = path.join(ROOT, `src/i18n/${lang}.json`);
  const d = JSON.parse(await readFile(f, "utf8"));
  for (const [chave, valor] of Object.entries(novos[lang])) {
    const [a, b] = chave.split(".");
    d[a][b] = valor;
  }
  await writeFile(f, JSON.stringify(d, null, 2) + "\n");
  console.log(lang, "ok");
}
