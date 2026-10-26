# Site PCR Engenharia e Incorporação

Site institucional bilíngue (PT na raiz, EN em `/en`) feito com Next.js 16 (App Router, Cache Components), Tailwind CSS v4 e TypeScript. Todas as páginas são geradas de forma estática; só o filtro do portfólio, o formulário, o menu, o vídeo e a contagem dos números usam JavaScript no navegador.

A linguagem visual está em [`DESIGN.md`](DESIGN.md), os pontos em aberto em [`PENDENCIAS.md`](PENDENCIAS.md) e a auditoria final em [`RELATORIO-AUDITORIA.md`](RELATORIO-AUDITORIA.md). Os três também ficam na pasta `15_SITE` do Drive.

## Rodar localmente

Requer Node.js 20.9 ou mais novo.

```bash
npm install
cp .env.example .env.local   # preencha o que tiver
npm run dev                  # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm start
npm run lint
npm run typecheck
```

## Variáveis de ambiente

| Variável | Para quê | Sem ela |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domínio final, usado em canonical, sitemap, Open Graph e JSON-LD | usa `http://localhost:3000` |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Chave do [Web3Forms](https://web3forms.com) para o formulário de contato | o formulário mostra o telefone como alternativa |
| `NEXT_PUBLIC_WHATSAPP` | Número com DDI e DDD, só dígitos (`5527999990000`) | o botão flutuante não aparece |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (`G-XXXX`) | nenhum script de medição é carregado |
| `PCR_SOURCE` | Pasta original da PCR, usada só pelos scripts de imagem | os scripts não rodam |

## Deploy na Vercel

1. Suba este repositório para o GitHub.
2. Na Vercel, **Add New > Project**, importe o repositório. O framework é detectado sozinho.
3. Em **Settings > Environment Variables**, cadastre as variáveis acima.
4. Em **Settings > Domains**, adicione o domínio e ajuste o DNS conforme a Vercel indicar.

Na Netlify o processo é o mesmo (o adaptador oficial de Next.js é instalado automaticamente).

## Estrutura

```
src/
  app/[lang]/         páginas (pastas em português; o proxy traduz as URLs em inglês)
  app/sitemap.ts      sitemap com hreflang
  app/robots.ts
  proxy.ts            PT na raiz, EN em /en, /pt/... redireciona
  i18n/pt.json, en.json   todos os textos de interface
  content/obras-texto.json  títulos, resumos e escopos das obras públicas (PT e EN), por slug
  content/quantitativos-en.json  tradução dos itens de quantitativos
  data/obras.json     dados PÚBLICOS das obras (gerado; não editar à mão)
  data/numeros.json   indicadores PÚBLICOS: valor + quantas obras compõem cada um (gerado)
  data/fotos.json     gerado pelo script de fotos
  lib/obras.ts        camada de dados das páginas
privado/              FORA DO GIT: extração completa dos contratos, curadoria e pendências
public/obras/<slug>/  fotos otimizadas (geradas)
scripts/publicar-dados.mjs  gera src/data e src/content/obras-texto.json a partir de privado/
scripts/fotos.mjs     gera as fotos das obras a partir da pasta original
scripts/media.mjs     gera as imagens das seções fixas e o símbolo do logo
```

### Por que existe a pasta `privado/`

O repositório no GitHub é público. A extração dos contratos traz valores em R$ por obra, caminhos de documentos e nomes de pessoas físicas, que não podem ser publicados. Ela fica em `privado/` (no `.gitignore`, com cópia na pasta `15_SITE` do Drive), e `scripts/publicar-dados.mjs` gera a partir dela só o que o site exibe. O build e o deploy funcionam apenas com os arquivos públicos.

## Trocar textos

- Interface, títulos de seção, serviços e política de privacidade: `src/i18n/pt.json` e `src/i18n/en.json`. As duas versões precisam ter as mesmas chaves.
- Textos de uma obra: `privado/obras-texto-completo.json` (pelo `id` interno) e depois `node scripts/publicar-dados.mjs`.
- Telefone, e-mail, endereço e responsável técnico: `src/lib/site.ts`.

Regras de texto do projeto: não usar travessão (—), não citar valores em R$ por obra e não citar nomes de pessoas físicas.

## Adicionar uma obra

1. Acrescente a obra em `privado/obras.json` (mesmo formato da extração da Fase 0). Campos mínimos: `id`, `slug`, `nome`, `cliente_site`, `tipo`, `cidade`, `inicio`, `fim`, `status` (`concluida` ou `em-andamento`), `fotos` (caminhos relativos à pasta `PCR`).
2. Escreva título, resumo, escopo, local e texto alternativo em PT e EN em `privado/obras-texto-completo.json`.
3. Se quiser escolher a capa, inclua o caminho da foto em `capas` de `privado/curadoria.json`.
4. Se a obra entra nos indicadores, atualize `privado/numeros.json`.
5. Gere os dados públicos e as fotos: `node scripts/publicar-dados.mjs` e `npm run fotos -- --only <slug>`.
6. `npm run build` e confira a página em `/obras/<slug>`.

Obras com status `desconhecido` (só contrato ou proposta, sem medição ou recebimento) não aparecem no site.

## Imagens

Os originais nunca são alterados. Os scripts leem a pasta `PCR_SOURCE`, aplicam a mesma correção leve de contraste e saturação e gravam versões de até 2000 px. O `next/image` gera AVIF/WebP e `srcset` na hora do deploy.

O vídeo do topo (`public/media/hero.mp4`) é um trecho de 12 s do arquivo `DJI_0809.MP4` (Hospital São Luiz), em 720p, sem áudio, com cerca de 2 MB.
