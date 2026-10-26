import type { StaticImageData } from "next/image";
import aco from "@/assets/media/aco.jpg";
import aco2 from "@/assets/media/aco2.jpg";
import costa from "@/assets/media/costa.jpg";
import galpaoTerraplenagem from "@/assets/media/galpao-terraplenagem.jpg";
import heroPoster from "@/assets/media/hero-poster.jpg";
import luamarAcabamento from "@/assets/media/luamar-acabamento.jpg";
import nahumAntes from "@/assets/media/nahum-antes.jpg";
import nahumJau from "@/assets/media/nahum-jau.jpg";
import saoluiz from "@/assets/media/saoluiz2.jpg";
import solarArmadura from "@/assets/media/solar-armadura.jpg";
import solarTela from "@/assets/media/solar-tela.jpg";

// Quadros extraídos dos vídeos de drone (aco, aco2, saoluiz, costa, heroPoster) e fotos de processo.
export const media: Record<string, StaticImageData> = {
  aco,
  aco2,
  costa,
  heroPoster,
  saoluiz,
  // recortada do site antigo da PCR (captura enviada pelo cliente)
  "galpao-terraplenagem": galpaoTerraplenagem,
  "luamar-acabamento": luamarAcabamento,
  "nahum-antes": nahumAntes,
  "nahum-jau": nahumJau,
  "solar-armadura": solarArmadura,
  "solar-tela": solarTela,
};

export const heroVideo = "/media/hero.mp4";
