import { cacheLife } from "next/cache";
import { anosDeAtuacao } from "./site";

// Valores que dependem da data: calculados no prerender e revalidados diariamente.
export async function tempoAtual(): Promise<{ ano: number; anos: number }> {
  "use cache";
  cacheLife("days");
  const hoje = new Date();
  return { ano: hoje.getFullYear(), anos: anosDeAtuacao(hoje) };
}
