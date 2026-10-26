// Gera as derivadas web das fotos das obras a partir da pasta original da PCR.
// Os originais nunca são alterados. Saída: public/obras/<slug>/NN.jpg + src/data/fotos.json
//
// Uso: PCR_SOURCE="C:/caminho/para/a/pasta/PCR" node scripts/fotos.mjs [--max 12] [--only slug]

import { readFile, writeFile, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = process.env.PCR_SOURCE;
const args = process.argv.slice(2);
const MAX = Number(args[args.indexOf("--max") + 1]) || 12;
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;
const LONG_EDGE = 2000;

if (!SOURCE) {
  console.error("Defina PCR_SOURCE com o caminho da pasta PCR (fotos e contratos originais).");
  process.exit(1);
}

// Imagens que não são fotos de obra: documentos fotografados, renders e projetos.
const EXCLUIR = /cart[aã]o cnpj|atestado|habitis|renderiz|[\\/]3d[\\/]|projeto|or[çc]amento|nota fiscal|[\\/]nota[\\/]|boleto|recibo|[\\/]contrato[\\/]|[\\/]logo[\\/]|thumbnail/i;
const EXT = /\.(jpe?g)$/i;

const obras = JSON.parse(await readFile(path.join(ROOT, "privado/obras.json"), "utf8"));
const curadoria = JSON.parse(await readFile(path.join(ROOT, "privado/curadoria.json"), "utf8"));
const capas = curadoria.capas ?? {};
const excluidas = new Set((curadoria.excluir_fotos ?? []).map((f) => f.toLowerCase()));

function selecionar(fotos) {
  const vistos = new Set();
  const validas = fotos.filter((f) => {
    if (!EXT.test(f) || EXCLUIR.test(f) || excluidas.has(path.basename(f).toLowerCase())) return false;
    const nome = path.basename(f).toLowerCase();
    if (vistos.has(nome)) return false; // a mesma foto aparece nas pastas avulsas e em Contratos
    vistos.add(nome);
    return true;
  });
  // drone primeiro: dá a vista de conjunto que a capa e a galeria precisam
  const drone = validas.filter((f) => /dji_/i.test(f));
  const outras = validas.filter((f) => !/dji_/i.test(f));
  const ordenadas = [...drone, ...outras];
  if (ordenadas.length <= MAX) return ordenadas;
  const passo = ordenadas.length / MAX;
  return Array.from({ length: MAX }, (_, i) => ordenadas[Math.floor(i * passo)]);
}

const manifesto = {};
for (const obra of obras) {
  if (obra.excluir_do_site || !obra.fotos?.length) continue;
  if (ONLY && obra.slug !== ONLY) continue;

  let escolhidas = selecionar(obra.fotos);
  const capa = capas[obra.id];
  if (capa) escolhidas = [capa, ...escolhidas.filter((f) => path.basename(f) !== path.basename(capa))].slice(0, MAX);
  if (!escolhidas.length) continue;

  const dir = path.join(ROOT, "public/obras", obra.slug);
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });

  const itens = [];
  for (const [i, rel] of escolhidas.entries()) {
    const origem = path.isAbsolute(rel) ? rel : path.join(SOURCE, rel);
    try {
      await stat(origem);
    } catch {
      console.warn(`  ausente: ${rel}`);
      continue;
    }
    const nome = `${String(i + 1).padStart(2, "0")}.jpg`;
    const { width, height } = await sharp(origem)
      .rotate() // respeita a orientação EXIF do celular
      .resize({ width: LONG_EDGE, height: LONG_EDGE, fit: "inside", withoutEnlargement: true })
      // correção leve e uniforme (DESIGN.md: contraste +12%, saturação +18%)
      .linear(1.12, -(128 * 0.12))
      .modulate({ saturation: 1.18 })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(path.join(dir, nome));
    itens.push({ src: `/obras/${obra.slug}/${nome}`, width, height }); // sem caminho de origem: o repositório é público
  }
  manifesto[obra.slug] = itens;
  console.log(`${obra.slug}: ${itens.length} fotos`);
}

const destino = path.join(ROOT, "src/data/fotos.json");
let anterior = {};
if (ONLY) {
  try {
    anterior = JSON.parse(await readFile(destino, "utf8"));
  } catch {}
}
await writeFile(destino, JSON.stringify({ ...anterior, ...manifesto }, null, 2) + "\n");
