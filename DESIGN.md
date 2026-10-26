---
version: alpha
name: PCR — Obra em Primeiro Plano
description: Linguagem visual editorial do site da PCR Engenharia e Incorporação. Fotografia e vídeo reais de obra em grande formato, sans geométrica firme (Sora) nos títulos, Manrope no texto, IBM Plex Mono no dado técnico, base mineral (calcário e concreto), composição compacta e o azul institucional como único acento.
colors:
  primary: "#005E9C"
  primary-hover: "#004B7F"
  primary-pressed: "#003A63"
  primary-on-dark: "#7CB6E6"
  on-primary: "#FFFFFF"
  ink: "#151A20"
  ink-muted: "#4D545B"
  ink-subtle: "#5E6369"
  canvas: "#F6F4EF"
  stone: "#E8E4DB"
  paper: "#FFFFFF"
  hairline: "#D6D1C6"
  hairline-strong: "#807B71"
  brand-gray: "#9D9D9D"
  night: "#0F1923"
  night-muted: "#A9B3BD"
  night-hairline: "#5A6672"
  error: "#B42318"
  success: "#1F7A3D"
typography:
  display-hero:
    fontFamily: Sora
    fontSize: 80px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.035em
  display-statement:
    fontFamily: Sora
    fontSize: 34px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 44px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Sora
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.015em
  number-xl:
    fontFamily: Sora
    fontSize: 64px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.04em
    fontFeature: "'tnum' 1"
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.6
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.6
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.55
  label-md:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.3
  eyebrow:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.08em
  data:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'tnum' 1"
  caption:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
  full: 9999px
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "5": 24px
  "6": 32px
  "7": 48px
  "8": 64px
  "9": 96px
  "10": 120px
  gutter-mobile: 16px
  gutter-desktop: 32px
  container: 1320px
  measure: 620px
components:
  header:
    textColor: "{colors.ink}"
    height: 80px
  header-on-media:
    textColor: "{colors.paper}"
    height: 80px
  menu-overlay:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper}"
    typography: "{typography.headline-lg}"
  link-cta:
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    padding: 12px 0
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    padding: 18px 28px
    height: 56px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-outline-light:
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: 56px
  project-feature:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.headline-md}"
  filter-tab:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label-md}"
    height: 44px
  filter-tab-active:
    textColor: "{colors.ink}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 16px 0
    height: 56px
  stats:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    typography: "{typography.number-xl}"
  cover-cta:
    backgroundColor: "{colors.night}"
    textColor: "{colors.paper}"
    typography: "{typography.headline-lg}"
  footer:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-muted}"
    padding: 96px
  whatsapp-fab:
    backgroundColor: "{colors.success}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    size: 56px
---

# PCR — Obra em Primeiro Plano

> **Versão 2** (26/10/2026). Esta versão substitui a "Prancha Técnica" (v1) a pedido do cliente, que indicou [tengilemalamala.com](https://tengilemalamala.com/) como referência principal de sofisticação. Ficam o logotipo, o azul institucional, a rastreabilidade dos números e as regras de acessibilidade. Mudam a composição, a hierarquia, a tipografia e a forma de apresentar as imagens.

## Overview

**Quem é:** PCR Engenharia e Incorporação Ltda, de Serra/ES, ativa desde 27/04/2018 e integrante do grupo da Deck Construtora e Incorporadora. Trabalha com recuperação de fachadas, reformas e ampliações hospitalares, estrutura metálica, laudos e incorporação própria.

**Para quem é o site:** síndicos e conselhos de condomínio, gestores de hospitais e empresas, compradores públicos e compradores de imóvel. Querem confiar antes de ligar. Para eles, confiança vem de ver obra real, saber onde e quando foi feita e quem assina.

### O que a referência ensina (análise de tengilemalamala.com)

O HTML e o CSS publicados mostram:

- **Uma serifa de alto contraste** (PP Fragment Glare) para todos os títulos e uma sans discreta (Inter) para texto e interface. Tracking negativo leve (−0,01 a −0,02em).
- **Títulos de seção são frases**, não rótulos: "Along one of the most wildlife-rich stretches of the Sand River…". O título é a tese da seção, em corpo grande.
- **Base mineral quente** (#FBF8F6, #F5EEE9, #E3E1D4), texto quase preto e um único acento de cor (oliva). Nada de gradientes.
- **Sequência de seções que varia de forma:** vídeo em tela cheia, declaração com linha divisória, par de imagens, propriedades (cartão com foto grande e pouco texto), citação com carrossel, história, nuvem de imagens desencontradas, faixa de fotos em movimento, CTA sobre foto em tela cheia, newsletter e rodapé.
- **Navegação discreta**: só "Enquire" e "Menu", com o menu abrindo em sobreposição de tela inteira.
- **Movimento:** curvas de saída longas (`cubic-bezier(.19,1,.22,1)` em transformações de 0,4s; `cubic-bezier(.25,.46,.45,.94)` em opacidade de 0,6s).

### Como isso vira PCR

| Referência | Na PCR |
|---|---|
| Natureza selvagem, vídeo de safári | **Obra real vista de drone**: vídeo da ampliação do Hospital São Luiz (fachada de vidro e estrutura metálica nova), litoral de Jacaraípe com o Condomínio Luamar |
| Base de areia e cal | **Calcário e concreto claro** (`canvas` #F6F4EF, `stone` #E8E4DB): os materiais de uma obra, não "papel creme" |
| Acento oliva | **Azul PCR** #005E9C, o único acento |
| Lodges e camps em cartões | **Obras em destaque** numa grade compacta (uma obra grande e duas menores empilhadas); o índice completo fica no Portfólio |
| Comunidade e conservação | **"No canteiro"**: fotos de processo (armadura exposta, jaú, montagem de aço). É o que a PCR faz de verdade e explica por que a obra dura |
| Serifa de alto contraste | **Sora**, sans geométrica e firme, com as proporções largas das letras do logo "PCR". A sofisticação vem da escala e do peso, não da serifa (decisão do cliente, v2.1) |

**Tom:** sólido, técnico, calmo. A sofisticação vem da escala da fotografia, do alinhamento rigoroso e da contenção tipográfica, nunca de adjetivos.

> **Revisão 2.1 (26/10/2026).** O cliente aprovou a ideia geral da v2, mas não gostou da serifa nem da composição espalhada. Mudanças: (1) a Newsreader saiu e entraram **Sora** (títulos e números) e **Manrope** (texto); (2) o layout ficou **mais compacto**, com seções a 96px no desktop e 64px no mobile, container de 1320px, sem deslocamentos verticais, destaques numa grade fechada e o "Sobre" fundido à abertura.

### Por que Next.js (App Router)

1. Escolha do cliente. Com **geração estática** (`generateStaticParams` por obra e por idioma), o HTML sai pré-renderizado, com Core Web Vitals no nível de um site estático.
2. `next/image` (AVIF/WebP, `srcset`, `sizes`, dimensões fixas) e `next/font` (fontes self-hosted, sem CLS) resolvem a fotografia em grande formato sem penalizar o LCP. A i18n por segmento `[locale]` atende PT na raiz e EN em `/en/`.
3. Só viram Client Components as ilhas com interação: vídeo do topo (play/pause), menu, filtro, formulário, contagem animada e revelação ao rolar. Todo o resto é Server Component.

## Colors

| Token | Hex | Papel |
|---|---|---|
| `primary` | #005E9C | Azul PCR: botão principal, link ativo, foco, sublinhado de filtro e marcadores de nota. **Nunca** como fundo de seção. |
| `primary-hover` / `pressed` | #004B7F / #003A63 | Estados do botão. |
| `primary-on-dark` | #7CB6E6 | Links e marcadores sobre `night`. |
| `ink` | #151A20 | Títulos e texto principal (preto-azulado, não preto puro). |
| `ink-muted` | #4D545B | Parágrafos de apoio. |
| `ink-subtle` | #5E6369 | Legendas, metadados, notas de base. |
| `canvas` | #F6F4EF | **Calcário**, o fundo padrão do site. |
| `stone` | #E8E4DB | **Concreto claro**: seções de contraste (números, serviços). |
| `paper` | #FFFFFF | Campos de formulário e texto sobre foto/`night`. |
| `hairline` / `hairline-strong` | #D6D1C6 / #807B71 | Divisórias; a forte serve a bordas de campo e controle. |
| `brand-gray` | #9D9D9D | Só no logotipo. |
| `night` / `night-muted` / `night-hairline` | #0F1923 / #A9B3BD / #5A6672 | Menu, CTA final, rodapé e véu sobre foto. |
| `error` / `success` | #B42318 / #1F7A3D | Validação; o `success` também pinta o botão do WhatsApp. |

### Contrastes verificados (WCAG 2.2)

| Texto | `canvas` | `stone` | `paper` |
|---|---|---|---|
| `ink` | 15,91 | 13,79 | 17,49 |
| `ink-muted` | 6,99 | 6,05 | 7,68 |
| `ink-subtle` | 5,51 | 4,78 | 6,06 |
| `primary` | 6,20 | 5,37 | 6,82 |
| `primary-hover` | 8,26 | 7,16 | 9,08 |
| `hairline-strong` (não texto, mín. 3:1) | 3,83 | 3,32 | 4,21 |
| `brand-gray` | 2,47 ✗ | 2,14 ✗ | 2,71 ✗ (só no logo) |

Sobre `night`: branco 17,74 · `night-muted` 8,34 · `primary-on-dark` 8,19 · `night-hairline` 3,02 (não texto). Branco sobre `primary`: 6,82.

**Texto sobre foto ou vídeo** sempre tem um véu de `night` (gradiente de 0 a 75% vindo de baixo, onde fica o texto). Assim o branco fica acima de 7:1 em qualquer quadro.

## Typography

Três famílias, todas sem serifa:

- **Sora** (títulos, declarações, números, nomes de obra): geométrica, de proporções largas e firme, ecoando as letras pesadas do logotipo "PCR". Peso 600 em títulos e 500 em declarações, com tracking negativo (−0,02 a −0,04em). Caixa baixa (sentence case).
- **Manrope** (texto, botões, navegação): grotesca semicondensada e muito legível em corpo pequeno. Peso 500 no texto (o 400 fica fino demais sobre `canvas`) e 700 em botões e links de ação. Parágrafos de no máximo 620px.
- **IBM Plex Mono** (eyebrows, legendas, ficha técnica, notas): a "voz de documento". Caixa alta só em eyebrows curtos, com tracking de 0.08em.

Servidas por `next/font/google` (self-hosted, `display: swap`, subset `latin`, que já cobre os acentos de PT e EN, e `adjustFontFallback`). Sora e Manrope entram como fontes **variáveis** (um arquivo cada para todos os pesos); a Plex Mono não é pré-carregada, para não competir com o LCP (ver `RELATORIO-AUDITORIA.md`). Fallbacks: Sora → `"Segoe UI", Arial, sans-serif`; Manrope → `system-ui, "Segoe UI", Roboto, sans-serif`; Plex Mono → `ui-monospace, Consolas, monospace`.

| Token | Desktop | Mobile (360) | Uso |
|---|---|---|---|
| `display-hero` | 80/1, 600 | 40/1.05 | Título do topo (2 linhas no máximo) |
| `headline-lg` | 44/1.08, 600 | 30/1.12 | Título de página e de CTA final |
| `display-statement` | 34/1.25, 500 | 24/1.3 | Declaração de abertura, com 1 a 2 frases |
| `headline-md` | 28/1.15, 600 | 22/1.2 | Nome da obra em destaque, títulos de bloco |
| `headline-sm` | 20/1.25, 600 | 18/1.3 | Serviços, cards do portfólio |
| `number-xl` | 64/1, 600 | 44/1 | Números |
| `body-lg` | 18/1.6, 500 | 17/1.6 | Lide |
| `body-md` | 16/1.6, 500 | 16/1.6 | Parágrafo |
| `body-sm` | 14/1.55, 500 | 14/1.55 | Texto auxiliar |
| `label-md` | 15, 700 | 15 | Links de ação, menu, filtros, botões |
| `eyebrow` | 12 mono, caixa alta, 0.08em | 12 | "OBRAS EM DESTAQUE" |
| `data` / `caption` | 13 / 12 mono | idem | Ficha técnica, legendas, notas |

Tamanhos fluidos com `clamp()`. `text-wrap: balance` nos títulos e `pretty` nos parágrafos.

## Layout

- **Grid:** 12 colunas, container de 1320px, gutter de 32px no desktop; 4 colunas com margem de 16px no mobile.
- **Breakpoints:** 640 · 768 · 1024 · 1280 · 1440. Testes em 360, 768, 1024 e 1440.
- **Ritmo compacto:** 96px entre seções no desktop e 64px no mobile. Título de seção a 32–40px do conteúdo. **Nada de deslocamentos verticais** nem colunas vazias: todo bloco alinha pelo topo com o vizinho.
- **Cabeçalho de seção padrão:** eyebrow + título à esquerda (colunas 1–7) e link de ação alinhado à direita, na mesma linha. Isso organiza a leitura e evita blocos soltos.
- **A composição muda a cada seção**, mas sempre dentro do grid:

| # | Seção da Home | Forma |
|---|---|---|
| 1 | Topo | Vídeo em tela cheia (`100svh`, máx. 900px). Título de 2 linhas embaixo à esquerda; legenda da obra e "Ver obras" numa linha de base com divisória. Botão de pausar. |
| 2 | Abertura e sobre | Duas colunas: à esquerda (1–7) a declaração em `display-statement`; à direita (9–12) três dados em lista com divisórias: atuação, clientes, grupo Deck e responsável técnico. |
| 3 | Obras em destaque | Grade fechada: obra principal grande (colunas 1–8, 4:3) e duas obras empilhadas (9–12, 3:2 cada), com a mesma altura total. Nome, local · ano sobre a imagem, no rodapé dela, com véu. |
| 4 | Números | Faixa `stone` com 4 colunas iguais separadas por linhas verticais e as notas de base logo abaixo. |
| 5 | Serviços | Duas colunas: lista de 6 frentes (1–7) com nome, descrição de uma linha e seta; imagem 4:3 (8–12) que troca conforme o item ativo. No mobile, lista simples. |
| 6 | No canteiro | Faixa horizontal de fotos de processo, todas na **mesma altura**, com rolagem livre e botões ← →. |
| 7 | CTA final | Foto larga (21:9, ~70vh) com véu `night`, título "Conte qual é a obra." e botão. |
| 8 | Rodapé | `night`, logo branco, telefones em destaque, 4 colunas e linha legal. |

- **Portfólio:** grade de 3 colunas (2 no tablet, 1 no mobile) com proporção **uniforme** 4:3 e linhas alinhadas. A variedade vem do primeiro item, que ocupa 2 colunas. O filtro fica em abas de texto, com a busca na mesma linha.
- **Página da obra:** foto de capa em tela cheia, título e uma frase de escopo; galeria assimétrica; **ficha técnica e quantitativos num segundo nível** (`<details>` "Ficha técnica" aberto por padrão no desktop e fechado no mobile); "Obras semelhantes" em 3 itens.

## Elevation & Depth

Plano, sem sombras. A profundidade vem da troca de camada (`canvas` → `stone` → `night`), da escala da fotografia e de linhas de 1px. A única exceção é o botão do WhatsApp (`0 8px 24px rgb(15 25 35 / .22)`).

## Shapes

- Tudo reto (`rounded.none`): imagens, botões, campos e blocos. Imagem nunca tem borda nem moldura.
- `rounded.full` só no botão do WhatsApp e no indicador de pausa do vídeo.
- Os cantos em "L" do logotipo **ficam no logotipo**. Na v1 eles se repetiam pelo site; aqui são retirados para preservar o silêncio da composição.

## Components

### Cabeçalho
- Altura de 80px, transparente sobre mídia (texto branco) e `canvas` sobre conteúdo.
- Esquerda: logotipo. Direita: "Obras" e "Fale conosco" como links de texto, seletor PT/EN em mono e o botão **"Menu"** (palavra + ícone de duas linhas), com no mínimo 44×44.
- Esconde ao rolar para baixo e reaparece ao rolar para cima (`transform`, .5s, curva de saída longa). Com `prefers-reduced-motion`, fica fixo.

### Menu (sobreposição)
- Tela cheia `night`. Coluna esquerda com links em `headline-lg` (Sobre, Serviços, Obras, Números, Contato), cada um com a contagem ou um dado em mono à direita (ex.: "Obras · 37").
- Coluna direita (desktop) com contato, endereço e uma foto retrato da obra mais recente.
- Abre com fade de 0,4s e links subindo em sequência de 40ms. `role="dialog"`, `aria-modal`, foco preso, Esc fecha e o foco volta ao botão.

### Links de ação e botões
- **Link de ação** (`link-cta`): é o padrão do site. Texto `label-md` + seta "→" e sublinhado de 1px que cresce da esquerda (0,4s). No hover, a seta desloca 6px.
- **`button-primary`**: retângulo azul de 56px, usado só no envio do formulário e no CTA final.
- **`button-outline-light`**: borda de 1px branca sobre foto, com fundo branco a 10% no hover.
- Foco: outline de 2px `primary` com offset de 4px (branco sobre `night` e mídia).

### Obra em destaque (Home)
- Grade fechada: obra principal à esquerda (colunas 1–8) e duas à direita (9–12), empilhadas e com a mesma altura total. Gap de 16px (24px no desktop).
- Cada obra é **um link só**. Sobre a imagem, embaixo, um véu `night` traz o eyebrow do tipo, o nome (`headline-md` na principal e `headline-sm` nas menores, em branco) e `Bairro, Cidade · Ano` em `data`. A seta → aparece no canto ao passar o mouse.
- Revelação ao entrar na tela (escala 1,06 → 1, 1,2s); hover com escala 1,03.
- **Sem valor em R$**, sem lista de quantitativos (eles ficam na página da obra).

### Portfólio
- **Abas de filtro:** Todas · Residencial · Comercial · Industrial · Institucional · Laudos e Perícias · Estruturas. Contagem sobrescrita em mono (ex.: "Institucional ¹⁸"). A aba ativa fica em `ink` com sublinhado `primary` de 2px. `role="group"` + `aria-pressed`, e o estado vai para a URL (`?tipo=`).
- **Busca:** campo com sublinhado (`hairline-strong`) e ícone de lupa. Um `aria-live` anuncia o número de resultados.
- **Item:** imagem sem borda; no hover, escala 1,03 em 0,8s. Abaixo, nome em `headline-sm`, cidade · ano em `data` e tipo em `eyebrow`. Obra em andamento recebe o selo `eyebrow` "EM ANDAMENTO".
- **Obra sem foto:** retângulo `stone` com o nome da obra em `headline-sm` centralizado e "SEM REGISTRO FOTOGRÁFICO" em mono. Elegante, sem foto genérica.

### Ficha técnica (página da obra)
- `<details>` com `summary` "Ficha técnica" e ícone +/−.
- Tabela em duas colunas: rótulo em `eyebrow` (`ink-subtle`) e valor em `body-md`, com linha `hairline` entre os itens. Campos: Cliente · Local · Período · Área de intervenção · Escopo.
- Os quantitativos vêm em tabela mono (Serviço · Un. · Quantidade, alinhada à direita), seguidos da fonte em `caption` (ex.: "Fonte: 10º boletim de medição, 16/02/2024").

### Números
- Fundo `canvas`, 4 colunas no desktop e 2 no mobile, com linha vertical `hairline` entre elas.
- Número em `number-xl` com a unidade em `headline-sm` (`ink-muted`), rótulo em `body-sm` e marcador de nota ¹²³⁴ em `primary`. As notas de base aparecem abaixo em `caption`.
- Contagem animada de 1,6s ao entrar na tela, uma vez. O valor final está no HTML. Com `prefers-reduced-motion`, aparece já final.

### Formulário
- Campos **sublinhados**, sem caixa: fundo `paper`, linha inferior `hairline-strong`, label `eyebrow` acima e texto `body-md`. No foco, a linha vira 2px `primary`, mais o outline.
- Erro: linha de 2px `error`, mensagem `body-sm` `error` com ícone, `aria-invalid` e `aria-describedby`.
- Campos: Nome · E-mail · Telefone · Tipo de serviço · Mensagem. Honeypot oculto. Web3Forms ou Formspree.
- Estados: "Enviando…", sucesso ("Mensagem enviada. Retornamos em breve.") e erro com telefone alternativo.

### Vídeo do topo
- `<video muted playsinline loop preload="none" poster>`. O **pôster é o LCP** (AVIF/WebP, `priority`), e o vídeo só carrega depois do `load`.
- Não carrega com `prefers-reduced-motion`, `Save-Data` ou conexão 2G/3G (`navigator.connection`); nesses casos fica a foto.
- **Botão de pausar/reproduzir** visível (exigência do WCAG 2.2.2 para movimento automático acima de 5s), canto inferior direito, 44×44, com `aria-label` que alterna.
- Arquivos: trecho de 12 s de `DJI_0809.MP4`, H.264 em duas passadas, sem áudio, `faststart`, sem filtro de nitidez. **Full HD** (1920×1080, 5 Mbps, ~7 MB) quando a área do vídeo passa de ~1400 px físicos; **720p** (2,5 Mbps, ~3,7 MB) no celular. A primeira versão (720p a CRF 30, 2,1 MB) ficou borrada em tela cheia no desktop e foi substituída.

### WhatsApp
Círculo de 56px no canto inferior direito, verde `success`, ícone branco e `aria-label` "Conversar no WhatsApp". Só aparece quando houver número configurado e se afasta do botão de pausa do vídeo no topo.

### Rodapé
- Fundo `night`. Linha superior com o logotipo branco grande e, à direita, um bloco de contato em `headline-md` (telefones).
- 4 colunas: Navegação · Contato e endereço · Empresa (razão social, CNPJ, responsável técnico e CREA, "Integrante do grupo Deck Construtora e Incorporadora") · Idioma.
- Linha legal em `caption`: © 2026 · Política de privacidade.

## Fotografia e vídeo

- **Fontes:** só material da PCR (pastas de fotos e vídeos de drone). Os originais ficam intactos; o build gera as derivadas.
- **Correção de cor:** os vídeos e fotos de drone saem com pouco contraste. Aplicar um ajuste leve e uniforme a todas as derivadas (contraste +12%, saturação +18%, gama 0,97, nitidez leve). **Sem** filtros estilizados, duotone ou "look" de cinema.
- **Formatos:** topo 16:9 no desktop e 4:5 no mobile (recorte com ponto focal); destaques em 4:3 ou 3:2; retratos em 4:5; capa de obra 21:9 no desktop.
- **Escolha de capa:** priorizar drone com contexto urbano (São Luiz, Jacaraípe) e fachada pronta. Fotos de patologia e de "antes" vão para "No canteiro" ou para a galeria, nunca para capa.
- **`alt`:** o que se vê, onde e em que fase. Exemplo: "Hospital São Luiz, em Vila Velha, visto de drone durante a ampliação, com a nova estrutura metálica ao lado da fachada de vidro."
- **Pessoas:** operários sem rosto identificável nas capas e nunca nomeados.

## Motion

| Efeito | Duração | Curva | Uso |
|---|---|---|---|
| Revelação de texto | 0,6s, translateY 24px → 0 e opacidade | `cubic-bezier(.25,.46,.45,.94)` | Blocos ao entrar na tela, uma vez |
| Revelação de imagem | 1,2s, escala 1,06 → 1 | `cubic-bezier(.19,1,.22,1)` | Destaques e capa de obra |
| Hover de imagem | 0,8s, escala 1,03 | `cubic-bezier(.19,1,.22,1)` | Portfólio e destaques |
| Sublinhado de link | 0,4s | `cubic-bezier(.19,1,.22,1)` | Links de ação |
| Cabeçalho | 0,5s | `cubic-bezier(.19,1,.22,1)` | Esconder e mostrar |

- **Nunca** animar texto acima da dobra no carregamento (protege o LCP); o título do topo aparece estático.
- Elementos começam visíveis no HTML (sem JS, tudo aparece); a classe de revelação só é aplicada depois que o JS confirma o suporte.
- `prefers-reduced-motion: reduce` desliga vídeo, revelações, escala e contagem; só as transições de cor permanecem.

## Voz e texto

Frases curtas e afirmativas; números com base; nenhum adjetivo vazio ("excelência", "qualidade", "soluções").

**Três opções de título para o topo** (no máximo 2 linhas):

1. **"Fachadas, hospitais e estruturas."**
   *Abaixo:* "Engenharia civil no Espírito Santo desde 2018."
2. **"Obras que se medem em boletim."**
   *Abaixo:* "Recuperação de fachadas, reformas hospitalares e estrutura metálica em Serra, Vitória e Vila Velha."
3. **"Construir. Recuperar. Entregar."**
   *Abaixo:* "Engenharia civil e incorporação no Espírito Santo, desde 2018."

*Recomendação: a opção 1, combinada com uma declaração logo abaixo que traz a ideia do boletim:* "Desde 2018, recuperamos fachadas, ampliamos hospitais e montamos estruturas metálicas no Espírito Santo. São 37 obras entregues, cada etapa medida, registrada e assinada por engenheiro."

## Iconografia

Lucide (`lucide-react`, importação individual, traço 1.5) só para funções: menu, fechar, seta, lupa, play/pause, mais/menos, WhatsApp e alerta. Nenhum ícone decorativo e nenhum ícone nos serviços.

## Do's and Don'ts

**Do**
- Deixar a fotografia ocupar espaço: no mínimo uma imagem de largura total ou 2/3 da largura por tela rolada.
- Variar a composição entre as seções (veja a tabela em Layout).
- Escrever títulos de seção como frases que afirmam algo verificável.
- Manter o azul raro: ação, foco, filtro ativo, marcadores de nota.
- Deixar o detalhe técnico no segundo nível (ficha técnica, quantitativos, fontes).
- Garantir no mínimo 4,5:1 no texto e 3:1 em bordas de controle; véu sobre toda imagem que tenha texto.

**Don't**
- Grades de cartões iguais na Home; cartões com borda, sombra ou cantos arredondados.
- Carrossel automático, vídeo com som, vídeo sem botão de pausa.
- Valor em R$ por obra, depoimentos, prêmios, missão/visão/valores, números sem base.
- Banco de imagens, ilustração de capacete, engrenagens, gradientes coloridos, laranja "de construtora".
- `brand-gray` fora do logotipo; itálico decorativo em títulos; caixa alta em títulos longos.
