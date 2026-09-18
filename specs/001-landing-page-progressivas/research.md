# Research: Landing Page de Progressivas e Cabeleireiro

**Fase**: 0 — Outline & Research
**Data**: 2026-09-18
**Plano**: [plan.md](./plan.md)

Todos os pontos de indefinição desta feature foram resolvidos na sessão de clarificação de
2026-09-18 e registrados no `spec.md`. Não restam marcadores NEEDS CLARIFICATION. Este documento
consolida as decisões técnicas remanescentes, que são escolhas de implementação dentro dos
limites já fixados pela constituição v2.0.0.

---

## D-001: Estratégia de renderização

**Decisão**: geração estática completa (SSG) de uma única rota, sem revalidação por tempo nesta
entrega.

**Rationale**: todo o conteúdo é versionado no repositório e só muda por commit. Gerar
estaticamente entrega HTML pronto do CDN, que é o caminho mais curto possível para o LCP exigido
pelo Princípio III, e elimina qualquer superfície de execução por requisição. Como cada alteração
de conteúdo já dispara um novo deploy, revalidação incremental não agregaria nada.

**Alternativas consideradas**:

- *ISR com revalidação por tempo*: útil apenas se o conteúdo viesse de fonte externa; aqui
  adicionaria complexidade sem benefício.
- *Renderização dinâmica por requisição*: proibida pela constituição sem justificativa, e não há
  justificativa — não existe conteúdo personalizado por visitante.

---

## D-002: Fronteira entre Server e Client Components

**Decisão**: `page.tsx`, o cabeçalho fixo e todas as seções são Server Components. Apenas dois
componentes recebem `"use client"`: o comparador antes/depois e o botão flutuante de WhatsApp
que reage à rolagem.

**Rationale**: o orçamento de 180 KB do Princípio VIII é o requisito mais restritivo do projeto.
Isolar a interatividade em dois componentes pequenos mantém a quase totalidade da árvore fora do
bundle do cliente. Conteúdo, textos e imagens não precisam de JavaScript no navegador. Com a
decisão de usar cabeçalho fixo com âncoras em vez de menu sobreposto (FR-009a), a navegação
passou a ser HTML puro, eliminando um Client Component previsto inicialmente.

**Alternativas consideradas**:

- *Página inteira como Client Component*: simplificaria o desenvolvimento, mas enviaria todo o
  conteúdo como JavaScript, violando o orçamento de bundle.
- *Zero JavaScript (HTML puro)*: o comparador antes/depois perderia qualidade de interação; o
  custo dos dois componentes é pequeno e justificado.

---

## D-003: Comparador antes e depois

**Decisão**: controle deslizante com `input[type=range]` nativo sobreposto às duas imagens, com
a imagem "depois" recortada por `clip-path` em função do valor. Rótulos textuais "Antes" e
"Depois" sempre visíveis.

**Rationale**: o `input[type=range]` nativo já é focável, operável por teclado (setas, Home,
End), anunciado por leitores de tela e tem suporte a toque — atendendo FR-005 e FR-020 sem
código de acessibilidade customizado. `clip-path` anima em composição, respeitando a regra do
Princípio VIII de usar apenas propriedades compostas.

**Alternativas consideradas**:

- *Biblioteca de comparação pronta*: adicionaria dependência e KB para um componente de ~40
  linhas; a constituição exige justificar cada adição.
- *Controle customizado com eventos de ponteiro*: exigiria reimplementar navegação por teclado e
  semântica ARIA, aumentando o risco de falha de acessibilidade.
- *Duas imagens lado a lado*: mais simples, porém perde o impacto visual que é justamente o que
  converte na jornada P2.

---

## D-004: Ausência de WebGL nesta entrega

**Decisão**: não utilizar three.js nem qualquer cena 3D. A sensação de profundidade e
sofisticação é obtida por CSS: gradientes suaves, sombras em camadas, `backdrop-filter`,
paralaxe leve por `transform` e transições de entrada por `IntersectionObserver` com
`prefers-reduced-motion` respeitado.

**Rationale**: o Princípio VIII permite 3D, mas impõe orçamento de 1,5 MB e exige fallback
estático e degradação adaptativa. Para uma landing page cujo LCP determina a receita, o retorno
de uma cena 3D é especulativo e o risco ao Princípio III é concreto. CSS entrega o efeito visual
desejado a custo praticamente zero de JavaScript.

**Alternativas consideradas**:

- *Cena 3D no hero*: rejeitada por colocar peso e risco de desempenho exatamente no elemento que
  define o LCP.
- *Animações com Framer Motion*: a biblioteca é homologada, mas nesta entrega as transições
  necessárias são simples o bastante para CSS e a Web Animations API; adiar a dependência
  preserva o orçamento. Pode ser reavaliada se surgir orquestração complexa.

---

## D-005: Tokens de design e paleta

**Decisão**: tokens declarados em `@theme` dentro de `globals.css`, nomeados por função
semântica (por exemplo `--color-superficie`, `--color-destaque`, `--color-texto-forte`) e não
por aparência. A regra `no-arbitrary-value` do plugin de lint do Tailwind é habilitada como erro.

**Rationale**: o Princípio IV exige fonte única de verdade e proíbe valores literais nos
componentes. Nomear por função permite ajustar a paleta sem renomear classes. O lint transforma
a regra constitucional em verificação automática, conforme FR-016.

**Paleta base** (a ser validada quanto a contraste AA na implementação):

| Token | Uso | Referência |
|---|---|---|
| `--color-fundo` | Fundo geral | Branco quente |
| `--color-superficie` | Cartões e blocos | Bege claro |
| `--color-superficie-alt` | Alternância de seções | Nude |
| `--color-acento` | Detalhes e realces | Rosa claro |
| `--color-destaque` | CTA e elementos premium | Dourado |
| `--color-texto-forte` | Títulos | Marrom escuro |
| `--color-texto` | Corpo de texto | Cinza quente escuro |

**Alternativas consideradas**:

- *Nomes por aparência (`--color-rosa`)*: quebram quando a paleta muda.
- *Contraste apenas verificado manualmente*: rejeitado; o contraste do dourado sobre fundos
  claros é o ponto de risco e será verificado com ferramenta automatizada, podendo exigir um tom
  mais escuro para texto.

---

## D-006: Construção dos links de WhatsApp

**Decisão**: função única `montarLinkWhatsApp({ servico, origem })` em `lib/whatsapp.ts`, que
produz `https://wa.me/<numero>?text=<mensagem codificada>` com mensagem em português,
mencionando o serviço quando houver, e acrescenta o parâmetro de origem ao texto para permitir
atribuição.

**Rationale**: FR-010 e FR-011 exigem mensagem pré-preenchida contextual e identificação de
origem. Centralizar em uma função evita divergência entre os múltiplos CTAs. O domínio `wa.me`
resolve automaticamente entre aplicativo instalado e WhatsApp Web, atendendo aos cenários 3 e 4
da jornada P1 sem detecção de dispositivo.

**Alternativas consideradas**:

- *`api.whatsapp.com/send`*: equivalente, porém mais verboso e com comportamento menos previsível
  em navegadores embutidos.
- *UTM na URL do `wa.me`*: parâmetros desconhecidos não são repassados de forma confiável; a
  origem é embutida no próprio texto da mensagem, o que sobrevive ao encaminhamento.

---

## D-007: Cabeçalhos de segurança e CSP

**Decisão**: aplicar os cabeçalhos exigidos pela constituição via `middleware.ts`, com CSP sem
`unsafe-inline` e sem `unsafe-eval`. Para os estilos e scripts inline que o Next injeta, usar
nonce por requisição propagado pelo middleware.

**Rationale**: a constituição exige a tabela completa de cabeçalhos e proíbe explicitamente
`unsafe-*` em `script-src`. O middleware é o único ponto da plataforma capaz de gerar nonce por
requisição. Como não há recursos de terceiros nesta entrega, a política pode permanecer
restritiva a `'self'`.

**Ponto de atenção**: o uso de nonce torna a resposta dinâmica. A mitigação é aplicar o nonce
apenas ao documento HTML, mantendo os ativos estáticos servidos pelo CDN. Se a medição mostrar
impacto relevante no LCP, a alternativa homologada é CSP por hash gerada no build, mantendo a
proibição de `unsafe-*`.

**Alternativas consideradas**:

- *CSP com `unsafe-inline`*: proibida pela constituição.
- *Cabeçalhos em `next.config.ts`*: suficiente para valores estáticos, mas incapaz de gerar
  nonce; o middleware é necessário.

---

## D-008: Imagens da galeria

**Decisão**: imagens versionadas em `public/imagens/`, servidas por `next/image` com `sizes`
declarado, AVIF e WebP automáticos, `placeholder="blur"` e dimensões explícitas. Apenas a imagem
do hero recebe `priority`; todas as demais são preguiçosas.

**Rationale**: FR-018, a meta de CLS ≤ 0,1 e o Princípio X (imagens derivadas responsivas, nunca
a original em alta resolução na listagem) são atendidos nativamente pelo otimizador do
framework. Marcar apenas o hero como prioritário concentra a banda no elemento do LCP.

**Alternativas consideradas**:

- *Imagens estáticas sem otimizador*: exigiria gerar derivadas manualmente e declarar `srcset` à
  mão, com risco de erro.
- *Marcar várias imagens como prioritárias*: competiria por banda e degradaria o LCP.

---

## D-009: Validação do conteúdo em tempo de build

**Decisão**: esquemas Zod em `content/schema.ts` validando todos os módulos de conteúdo, com a
validação executada na importação. Um teste unitário dedicado cobre a validação, e um script de
verificação detecta valores provisórios pendentes.

**Rationale**: FR-028 exige falha de build quando um registro estiver incompleto — por exemplo,
imagem sem texto alternativo ou nota fora da faixa de 1 a 5. Validar na importação faz o próprio
`next build` falhar. FR-030 exige bloquear a publicação enquanto houver dados provisórios; um
script que procura o marcador acordado atende a isso e roda no pipeline.

**Alternativas consideradas**:

- *Confiar apenas nos tipos do TypeScript*: tipos não verificam faixa numérica nem string não
  vazia, e não impedem `alt` em branco.
- *Validação em tempo de execução no cliente*: inútil em conteúdo estático e custaria KB.

---

## D-010: Estratégia de testes

**Decisão**: Vitest para o esquema de conteúdo e para `lib/whatsapp.ts`; Playwright com
`@axe-core/playwright` para as jornadas P1 e P2, verificação de acessibilidade, navegação por
teclado e checagem nas três larguras de referência; Lighthouse CI no perfil mobile como portão
de publicação.

**Rationale**: o valor desta feature está em comportamento observável — o CTA abre o WhatsApp
corretamente, a página funciona no celular, o teclado alcança tudo. Testes unitários se
justificam apenas onde há lógica pura. Essa distribuição cobre os critérios SC-001 a SC-007 com
o mínimo de código de teste.

**Alternativas consideradas**:

- *Testes de snapshot de componentes*: alto custo de manutenção e baixo valor em uma página cujo
  conteúdo muda com frequência.
- *Somente verificação manual*: não atende aos portões automatizados exigidos pela constituição.

---

## D-011: Navegação por cabeçalho fixo com âncoras

**Decisão**: cabeçalho fixo contendo identidade visual e botão de agendamento sempre visíveis. Em
larguras maiores, exibe também links âncora para as seções. Sem menu sanduíche e sem painel
sobreposto. As seções-alvo recebem `tabindex="-1"` e `scroll-margin-top` correspondente à altura
do cabeçalho.

**Rationale**: em uma página de rota única, rolar é o gesto natural no celular; um menu
sobreposto exigiria estado, `aria-expanded`, foco preso e fechamento por `Escape`, concentrando
risco de acessibilidade sem ganho de conversão. Manter o botão de agendamento no cabeçalho
satisfaz FR-009 diretamente, e `tabindex="-1"` no alvo garante que o foco do teclado acompanhe o
salto da âncora, atendendo FR-020.

**Alternativas consideradas**:

- *Menu sanduíche completo*: maior superfície de falha de acessibilidade e mais JavaScript.
- *Nenhum cabeçalho*: exigiria rolagem longa para reencontrar o CTA, tensionando FR-009.

---

## D-012: Medição de audiência sem cookies

**Decisão**: usar medição agregada sem cookies da própria plataforma de hospedagem (Vercel
Analytics e Speed Insights), registrando visualizações, Core Web Vitals reais e eventos
anônimos de clique nos botões de agendamento, identificando a seção de origem. Sem banner de
consentimento.

**Rationale**: sem cookies, sem armazenamento no dispositivo e sem identificador persistente,
não há tratamento de dado pessoal e, portanto, não há gatilho de consentimento na LGPD — o que
mantém FR-023 satisfeito por ausência. Um banner de cookies acrescentaria atrito exatamente na
primeira tela, prejudicando a jornada P1. A medição de eventos de clique é o que torna SC-010
verificável.

**Alternativas consideradas**:

- *Google Analytics*: exigiria banner, gestão de consentimento e bloqueio prévio de script,
  além de peso adicional e dependência de terceiro na CSP.
- *Nenhuma medição*: deixaria o Princípio I sem verificação — não haveria como saber se a página
  converte nem qual seção gera contato.
