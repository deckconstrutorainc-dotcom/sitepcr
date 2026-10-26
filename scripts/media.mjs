// Imagens das seções fixas (faixa "No canteiro", serviços) e símbolo do logo, a partir dos originais da PCR.
// Uso: PCR_SOURCE="C:/caminho/para/a/pasta/PCR" node scripts/media.mjs

import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = process.env.PCR_SOURCE;
if (!SOURCE) {
  console.error("Defina PCR_SOURCE com o caminho da pasta PCR.");
  process.exit(1);
}

const fotos = {
  "solar-armadura": "ED. Solar do Atlântico/Fotos ED Solar do Atlantico (103).jpeg",
  "solar-tela": "ED. Solar do Atlântico/Fotos ED Solar do Atlantico (110).jpeg",
  "nahum-jau": "FOTOS DRONE OBRAS PCR/NAHUN PRADO/DJI_0348.JPG",
  "nahum-antes": "FOTOS DRONE OBRAS PCR/NAHUN PRADO/DJI_0354.JPG",
  "luamar-acabamento": "FOTOS DRONE OBRAS PCR/CASAS GERMINADAS/DJI_0371.JPG",
};

await mkdir(path.join(ROOT, "public/media"), { recursive: true });
for (const [nome, rel] of Object.entries(fotos)) {
  const info = await sharp(path.join(SOURCE, rel))
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .linear(1.12, -(128 * 0.12))
    .modulate({ saturation: 1.18 })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(ROOT, "public/media", `${nome}.jpg`));
  console.log(nome, info.width, "x", info.height);
}

// Símbolo do logo: o quadrado azul com engrenagem, lupa e régua, recortado do JPG enviado pelo cliente.
// Provisório até o arquivo vetorial (ver PENDENCIAS.md).
await mkdir(path.join(ROOT, "public/brand"), { recursive: true });
const logo = path.join(SOURCE, "00000158-PHOTO-2025-11-14-10-52-13.jpg");
const mark = await sharp(logo).extract({ left: 171, top: 152, width: 86, height: 84 }).toBuffer();
await sharp(mark).resize(256, 256, { kernel: "lanczos3" }).png().toFile(path.join(ROOT, "public/brand/pcr-simbolo.png"));
await sharp(mark).resize(180, 180).png().toFile(path.join(ROOT, "src/app/apple-icon.png"));
await sharp(mark).resize(64, 64).png().toFile(path.join(ROOT, "src/app/icon.png"));
console.log("símbolo do logo recortado");
