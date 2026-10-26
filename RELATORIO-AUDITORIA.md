# Relatório de auditoria: SEO, acessibilidade e desempenho

Site PCR Engenharia e Incorporação · build de 26/10/2026 · Next.js 16.4.3 (estático, PT e EN)

## Resumo

| Item | Resultado |
|---|---|
| Lighthouse mobile, 10 páginas | Desempenho 90 a 96 · Acessibilidade **100** · Boas práticas **100** · SEO **100** |
| axe-core (WCAG 2.0, 2.1 e 2.2, níveis A e AA + boas práticas) | **0 violações** em 14 páginas, em 1440 e 360 px, com menu aberto, lightbox aberto e formulário com erros |
| Auditoria de SEO on-page (todas as 90 URLs do sitemap, PT e EN) | **0 problemas** de título, descrição, H1, hierarquia, `alt`, canonical, `hreflang`, Open Graph ou JSON-LD |
| Testes funcionais do checklist de aceite | **12 de 12** aprovados |
| Rolagem horizontal em 360, 768, 1024 e 1440 px | nenhuma |
| `npm run build`, `npm run lint`, `npm run typecheck` | sem erros e sem avisos |

**Ponto em aberto:** o LCP medido em laboratório ficou entre 2,6 s e 3,6 s, acima da meta de 2,5 s. A medição usa 4G lento simulado contra o servidor local, sem CDN. Detalhes e próximos passos na seção de desempenho.

## Como foi medido

- **Servidor:** `next build` + `next start` local (Windows, Node 24), sem CDN e sem HTTP/2.
- **Lighthouse 12.6.1:** perfil mobile padrão (Moto G Power simulado, 4G lento, CPU 4x mais lenta), com o cache do otimizador de imagens aquecido. Relatórios completos em [`docs/auditoria/lighthouse/`](docs/auditoria/lighthouse/).
- **axe-core 4.10.3:** rodado no Chrome real via Puppeteer. A página é percorrida antes da medição, como um visitante faria, para que os blocos com animação de entrada estejam no estado final.
- **Auditoria de SEO:** script próprio que lê o `sitemap.xml` e verifica cada URL no DOM renderizado.
- **Diretrizes de interface:** revisão do código contra as [Web Interface Guidelines da Vercel](https://github.com/vercel-labs/web-interface-guidelines), usando a skill `web-design-guidelines`.
- **Capturas:** Chrome via Puppeteer, com emulação real de viewport, em [`docs/auditoria/capturas/`](docs/auditoria/capturas/).

## Lighthouse (mobile)

| Página | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 92 | 100 | 100 | 100 | 3.3 s | 0 | 40 ms |
| `/sobre` | 96 | 100 | 100 | 100 | 2.7 s | 0 | 40 ms |
| `/servicos` | 92 | 100 | 100 | 100 | 3.4 s | 0 | 50 ms |
| `/obras` | 90 | 100 | 100 | 100 | 3.6 s | 0 | 50 ms |
| `/obras/ed-nahum-prado` | 94 | 100 | 100 | 100 | 3.0 s | 0 | 50 ms |
| `/numeros` | 96 | 100 | 100 | 100 | 2.6 s | 0 | 140 ms |
| `/contato` | 95 | 100 | 100 | 100 | 2.9 s | 0 | 90 ms |
| `/en` | 92 | 100 | 100 | 100 | 3.3 s | 0 | 60 ms |
| `/en/projects` | 91 | 100 | 100 | 100 | 3.6 s | 0.001 | 50 ms |
| `/en/projects/hospital-sao-luiz-ampliacao` | 91 | 100 | 100 | 100 | 3.4 s | 0 | 110 ms |

Entre execuções o desempenho varia de 3 a 5 pontos (a `/en` foi de 87 a 92). Os números acima são da rodada final.

### Desempenho: o que foi feito e o que falta

**Corrigido durante a auditoria:**

| Achado | Correção | Efeito |
|---|---|---|
| 8 arquivos de fonte pré-carregados (3 famílias, vários pesos, `latin` + `latin-ext`) disputavam banda com o conteúdo | Sora e Manrope variáveis (1 arquivo cada), só subconjunto `latin` (cobre PT e EN) e Plex Mono sem preload | Home de 86 para 90; Sobre, Números e Contato acima de 95 |
| O pôster do topo era pré-carregado, mas o LCP da Home é o título | Pôster com `loading="eager"` sem preload | Home de 90 para 92 |
| CSS em arquivo separado bloqueava a primeira pintura | `experimental.inlineCss` (Tailwind atômico: 56 KB, 12 KB comprimido) | Nahum Prado de 89 para 94 |
| 13 KB de polyfills para navegadores antigos | `browserslist` moderno no `package.json` | some o aviso de "legacy JavaScript" |
| Capa da obra em qualidade 85 | qualidade padrão 75 (AVIF/WebP) | menos bytes no LCP das páginas de obra |

**LCP acima de 2,5 s (em aberto):** na cascata real, sem throttling, todos os recursos da Home terminam em cerca de 600 ms. Os 3 s vêm do modelo de 4G lento do Lighthouse aplicado a um servidor local com tempo de resposta de ~450 ms. Na Vercel, HTML e imagens saem da CDN (resposta típica abaixo de 100 ms, HTTP/2 e Brotli), o que deve reduzir o LCP.

**Próximos passos:**
1. Medir de novo no domínio publicado com o [PageSpeed Insights](https://pagespeed.web.dev/). Lá aparecem também os dados de campo (CrUX), que são os que o Google usa.
2. Se o LCP de campo continuar acima de 2,5 s, a próxima alavanca é a fonte de títulos com `display: "optional"`. O título passa a contar com a fonte de reserva quando a Sora demora, ao custo de, em conexões lentas, o primeiro acesso mostrar a fonte do sistema.

## Acessibilidade (WCAG 2.2 AA)

**Situação final:** 0 violações no axe e 100 no Lighthouse em todas as páginas medidas.

### Achados e correções, por severidade

**Sério**
- `/sobre`: duas regiões com o mesmo nome acessível (`landmark-unique`). → Corrigido: cada região tem nome próprio.
- Páginas inexistentes (`/qualquer-coisa`): a 404 padrão do Next não tinha `lang`, `<main>` nem marcos. Acontecia porque o layout raiz fica dentro de `app/[lang]`. → Corrigido: `app/global-not-found.tsx` bilíngue, com `lang="pt-BR"`, `<main>` e links para PT e EN; continua respondendo 404.
- Menu aberto: o conteúdo atrás do menu continuava acessível ao leitor de tela e ao Tab. → Corrigido: `inert` em `main`, `header` e `footer` enquanto o menu modal está aberto, além do foco preso e do Esc que já existiam.
- Contraste durante a animação de entrada: os blocos começavam com 25% de opacidade. → Corrigido: a animação agora é só de deslocamento e o texto fica sempre com contraste total.

**Moderado**
- Logo e seletor de idioma com nome acessível diferente do texto visível (`label-content-name-mismatch`, WCAG 2.5.3). Isso atrapalha quem navega por comando de voz. → Corrigido: o nome passa a ser o texto visível mais um complemento oculto ("página inicial" e "English").
- Portfólio pulava de H1 para H3. → Corrigido: títulos dos cards em H2.
- Âncoras e foco por teclado podiam ficar escondidos sob o cabeçalho fixo. → Corrigido: `scroll-padding-top` global e `scroll-mt` nas notas de rodapé dos números.

**Menor (Web Interface Guidelines)**
- "Enviando..." e placeholders com três pontos. → Trocados pelo caractere de reticências "…".
- Campo de e-mail com corretor ortográfico ativo. → `spellCheck={false}` e `autoCapitalize="off"`.
- Número e unidade podiam quebrar em linhas diferentes ("2.176 / m²"). → Espaço não separável.
- Menu e lightbox deixavam a rolagem vazar para a página. → `overscroll-behavior: contain`.
- Toque sem `touch-action` definido. → `touch-action: manipulation` e cor de toque própria.
- Uma transição genérica no card de destaque. → Propriedades explícitas (`opacity` e `transform`).

### O que já atendia desde o início
- Link "Pular para o conteúdo", foco visível em todos os controles (`:focus-visible`, contorno de 2 px) e alvos de toque de no mínimo 44 px.
- `prefers-reduced-motion`: desliga o vídeo, as animações de entrada, a contagem dos números e o zoom das imagens.
- Vídeo do topo com botão de pausar (WCAG 2.2.2), sem áudio, com pôster como alternativa estática; não carrega com economia de dados ou conexão lenta.
- Formulário com `label` em todos os campos, erros abaixo do campo com `aria-invalid` e `aria-describedby`, foco no primeiro erro e mensagem de envio em `aria-live`.
- Filtro do portfólio com `role="group"`, `aria-pressed` e anúncio do número de resultados.
- Gráficos com tabela equivalente para leitor de tela e cor validada pelo script da skill `dataviz` (contraste ≥ 3:1).
- Contraste de todas as combinações de cor documentado no `DESIGN.md` (mínimo 4,5:1 em texto e 3:1 em bordas de controle).

### Decisões conscientes (não são falhas)
- **Title Case em botões** (sugestão das diretrizes da Vercel): não se aplica ao português. No inglês foi mantida a caixa de frase ("View projects") por coerência visual entre os idiomas.
- **Tema escuro:** o `DESIGN.md` aprovado define tema único claro. O `color-scheme: light` e o `theme-color` (#F6F4EF) estão declarados.

## SEO

- **Títulos** únicos por página e idioma, com até 60 caracteres e termos de atuação local nas páginas certas ("Construtora e engenharia civil em Serra/ES", "Serviços de engenharia civil no Espírito Santo"). Nas obras, a marca só entra no título quando cabe.
- **Descrições** únicas, entre 110 e 160 caracteres. As das obras são montadas a partir do resumo, com tipo, local e ano.
- **Canonical** e **`hreflang`** (pt-BR, en, x-default) em todas as páginas; `sitemap.xml` com as alternativas de idioma (90 URLs); `robots.txt`.
- **JSON-LD:** `Organization` + `GeneralContractor` (subtipo de `LocalBusiness`) com CNPJ (`taxID`), endereço, data de fundação, área atendida, telefones, grupo (`parentOrganization`) e responsável técnico com CREA (`hasCredential`); `BreadcrumbList` nas páginas internas; `Service` na página de serviços; `CreativeWork` em cada obra.
- **E-E-A-T:** responsável técnico e CREA na Home, no Sobre e no rodapé; obras com cliente, local, período e quantitativos de boletim de medição, com a fonte citada; números com nota de base.
- **Open Graph e Twitter Card** com imagem: a capa da obra nas páginas de obra e um quadro do vídeo de drone nas demais.

**Depende de configuração:** com `NEXT_PUBLIC_SITE_URL` vazio, canonical, sitemap e JSON-LD saem com `http://localhost:3000`. Defina o domínio antes do deploy.

## Bug encontrado nos testes funcionais

O seletor de idioma gerava `/en/pt/obras/...` e o filtro gravava `/pt/obras?tipo=...` na barra de endereço. O motivo: em páginas estáticas, `usePathname()` devolve o caminho interno reescrito pelo proxy. → Corrigido com `publicPath()` em `src/i18n/config.ts`, usado no cabeçalho e no portfólio, e coberto pelos testes abaixo.

## Checklist de aceite

| Critério | Situação |
|---|---|
| Todas as páginas em PT e EN | ✅ 7 páginas + 38 obras em cada idioma, com URLs traduzidas em EN (`/en/projects`, `/en/about`...) |
| Filtro do portfólio funcionando e compartilhável por URL | ✅ `?tipo=` e `?q=` abrem filtrados; clicar numa aba atualiza a URL; estado vazio com "Limpar filtros" |
| Formulário enviando | ⏳ Validação, honeypot e estados testados. O envio real depende da chave Web3Forms (`NEXT_PUBLIC_WEB3FORMS_KEY`); sem ela o formulário mostra o telefone como alternativa |
| WhatsApp abrindo com mensagem | ⏳ Implementado (mensagem pré-preenchida em PT e EN). Só aparece com `NEXT_PUBLIC_WHATSAPP`, e o número ainda está pendente |
| Nenhum `[PREENCHER]` fora da lista de pendências | ✅ Só o horário de atendimento aparece como `[PREENCHER]` (Contato), e ele está no `PENDENCIAS.md` |
| Lighthouse ≥ 90 nas quatro categorias | ✅ nas 10 páginas medidas (rodada final). LCP de laboratório acima de 2,5 s; ver seção de desempenho |
| Build e lint sem erros | ✅ |

## Capturas

| | 360 px | 768 px | 1024 px | 1440 px |
|---|---|---|---|---|
| Home | [ver](docs/auditoria/capturas/home-360.jpg) | [ver](docs/auditoria/capturas/home-768.jpg) | [ver](docs/auditoria/capturas/home-1024.jpg) | [ver](docs/auditoria/capturas/home-1440.jpg) |
| Obras | [ver](docs/auditoria/capturas/obras-360.jpg) | [ver](docs/auditoria/capturas/obras-768.jpg) | [ver](docs/auditoria/capturas/obras-1024.jpg) | [ver](docs/auditoria/capturas/obras-1440.jpg) |
| Obra (Nahum Prado) | [ver](docs/auditoria/capturas/obras_ed-nahum-prado-360.jpg) | | | [ver](docs/auditoria/capturas/obras_ed-nahum-prado-1440.jpg) |
| Números, Contato, Serviços, Sobre | [números](docs/auditoria/capturas/numeros-360.jpg) · [contato](docs/auditoria/capturas/contato-360.jpg) · [serviços](docs/auditoria/capturas/servicos-360.jpg) · [sobre](docs/auditoria/capturas/sobre-360.jpg) | | | |
