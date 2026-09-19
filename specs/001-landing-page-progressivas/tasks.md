---
description: "Lista de tarefas para implementação da landing page de progressivas"
---

# Tasks: Landing Page de Progressivas e Cabeleireiro

**Input**: Documentos de design em `/specs/001-landing-page-progressivas/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: incluídos. A constituição v2.0.0 exige portões automatizados de acessibilidade,
desempenho e validação de conteúdo, e os critérios SC-001 a SC-010 só são verificáveis por
teste. Portanto as tarefas de teste não são opcionais nesta feature.

**Organization**: tarefas agrupadas por história de usuário, permitindo implementar e validar
cada uma de forma independente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode rodar em paralelo (arquivos distintos, sem dependência)
- **[Story]**: história a que a tarefa pertence (US1, US2, US3)

## Path Conventions

Aplicação única na raiz do repositório: `src/`, `public/`, `tests/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: remover a stack anterior e inicializar o projeto conforme a constituição v2.0.0.

- [ ] T001 Remover os projetos da stack anterior: excluir `LandPagePrograssiva.AppHost/`, `LandPagePrograssiva.Server/`, `frontend/`, `LandPagePrograssiva.slnx` e o diretório `.vs/`
- [ ] T002 Inicializar o projeto Next.js 15 com TypeScript estrito e App Router na raiz, gerando `package.json`, `tsconfig.json` e `next.config.ts`
- [ ] T003 Instalar as dependências de produção: `react`, `react-dom`, `next`, `zod`, `@vercel/analytics`, `@vercel/speed-insights`
- [ ] T004 [P] Instalar e configurar Tailwind CSS v4 com `@tailwindcss/postcss`, criando `src/app/globals.css` com a diretiva de importação
- [ ] T005 [P] Configurar ESLint com `eslint-config-next` e a regra que proíbe valores arbitrários do Tailwind, em `eslint.config.mjs`
- [ ] T006 [P] Configurar Vitest em `vitest.config.ts` com ambiente Node e caminho `tests/unit`
- [ ] T007 [P] Configurar Playwright em `playwright.config.ts` com os três viewports de referência (360px, 768px, 1440px) e instalar `@axe-core/playwright`
- [ ] T008 [P] Criar `.gitignore` cobrindo `node_modules`, `.next`, `.vercel`, `.env*` e artefatos de teste
- [ ] T009 Declarar os scripts em `package.json`: `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:e2e`, `check:pendencias`

**Checkpoint**: `npm run dev` inicia sem erros e a stack anterior não existe mais.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: tokens, contrato de conteúdo, segurança e utilitários que todas as histórias usam.

**⚠️ CRITICAL**: nenhuma história pode começar antes desta fase terminar.

- [ ] T010 Definir os design tokens em `@theme` dentro de `src/app/globals.css`, com nomes semânticos (`--color-fundo`, `--color-superficie`, `--color-superficie-alt`, `--color-acento`, `--color-destaque`, `--color-texto-forte`, `--color-texto`), escala tipográfica com `clamp()`, espaçamentos e raios
- [ ] T011 Verificar o contraste WCAG AA de todas as combinações de texto e fundo dos tokens, ajustando o tom do dourado para uso em texto se necessário, e registrar a tabela de contraste em `src/app/globals.css` como comentário
- [ ] T012 [P] Definir os esquemas Zod de todas as entidades em `src/content/schema.ts` conforme `data-model.md` e `contracts/content-schema.md`, incluindo `Imagem`, `Horario`, `RedeSocial`, `Negocio`, `Servico`, `Beneficio`, `Trabalho`, `Depoimento` e `Perfil`
- [ ] T013 Implementar em `src/content/schema.ts` as validações agregadas: unicidade de `id` por coleção, integridade referencial de `Trabalho.servicoId`, regra do `Servico` com ao menos duração ou faixa de investimento, e horário com abertura anterior ao fechamento
- [ ] T014 [P] Criar `src/content/negocio.ts` com os dados do negócio usando o marcador de valor provisório acordado
- [ ] T015 [P] Criar `src/lib/whatsapp.ts` com `montarLinkWhatsApp({ servico, origem })` conforme o contrato, produzindo mensagem em português e embutindo a origem no texto
- [ ] T016 [P] Criar `src/lib/seo.ts` com a construção da metadata base e do JSON-LD `HairSalon`, incluindo `AggregateRating` apenas quando houver avaliações aprovadas
- [ ] T017 Implementar `src/middleware.ts` aplicando os cabeçalhos exigidos pela constituição, com CSP por nonce sem `unsafe-inline` e sem `unsafe-eval`
- [ ] T018 [P] Criar os componentes base de interface em `src/components/ui/`: `Botao`, `Secao`, `Titulo`, `Cartao` e `Badge`, todos consumindo apenas tokens
- [ ] T019 Implementar `src/app/layout.tsx` com idioma `pt-BR`, tipografia via `next/font`, metadata base, JSON-LD, link de pular para o conteúdo e montagem dos componentes de medição
- [ ] T020 [P] Criar `scripts/check-pendencias.mjs` que falha quando encontrar o marcador de valor provisório, atendendo FR-030
- [ ] T021 [P] Escrever testes unitários do esquema de conteúdo em `tests/unit/schema.test.ts`, cobrindo alt vazio, nota fora de 1 a 5, id duplicado, referência inválida e serviço sem duração e sem preço
- [ ] T022 [P] Escrever testes unitários de `montarLinkWhatsApp` em `tests/unit/whatsapp.test.ts`, verificando codificação, menção ao serviço e presença da origem

**Checkpoint**: tokens ativos, conteúdo validado no build, cabeçalhos aplicados, utilitários testados.

---

## Phase 3: User Story 1 - Descobrir o serviço e agendar pelo WhatsApp (Priority: P1) 🎯 MVP

**Goal**: a visitante entende o serviço na primeira tela e inicia a conversa de agendamento.

**Independent Test**: abrir a página em viewport de 360px, identificar o serviço sem rolar e
acionar o botão de agendamento, confirmando a abertura do WhatsApp com mensagem pré-preenchida.

### Tests for User Story 1

- [X] T023 [P] [US1] Escrever teste de jornada em `tests/e2e/agendamento.spec.ts`: hero visível sem rolagem em 360px, CTA presente e link de WhatsApp com mensagem e origem corretas
- [X] T024 [P] [US1] Escrever teste em `tests/e2e/contato-alternativo.spec.ts` verificando que telefone e e-mail estão presentes como links acionáveis

### Implementation for User Story 1

- [X] T025 [US1] Criar `src/components/layout/CabecalhoFixo.tsx` como Server Component, com identidade visual, botão de agendamento sempre visível e links âncora exibidos apenas em larguras maiores
- [X] T026 [US1] Criar `src/components/sections/Hero.tsx` com proposta de valor, imagem prioritária e CTA de agendamento, garantindo conteúdo completo acima da dobra em 360px
- [X] T027 [P] [US1] Criar `src/components/sections/ChamadaAcao.tsx` com bloco de conversão destacado
- [X] T028 [P] [US1] Criar `src/components/sections/Contato.tsx` com WhatsApp, telefone, e-mail, área de atendimento e horários
- [X] T029 [P] [US1] Criar `src/components/sections/Rodape.tsx` com contato, horários, redes sociais e link para o aviso de privacidade
- [X] T030 [US1] Criar `src/components/interactive/BotaoFlutuante.tsx` como Client Component, exibido após a rolagem do hero, respeitando `prefers-reduced-motion`
- [X] T031 [US1] Compor `src/app/page.tsx` com cabeçalho, hero, chamada para ação, contato e rodapé, passando o conteúdo por propriedades
- [X] T032 [US1] Adicionar a imagem do hero em `public/imagens/` e configurar `priority`, `sizes` e dimensões explícitas
- [X] T033 [US1] Instrumentar os eventos anônimos de clique nos botões de agendamento, identificando a seção de origem, conforme FR-023a

**Checkpoint**: MVP funcional — a página já converte. Validar SC-001 e publicar se desejado.

---

## Phase 4: User Story 2 - Avaliar a qualidade do trabalho (Priority: P2)

**Goal**: entregar a prova social que convence a visitante indecisa.

**Independent Test**: percorrer a página e verificar benefícios, serviços, comparador
antes/depois, perfil e depoimentos com média e contagem corretas.

### Tests for User Story 2

- [X] T034 [P] [US2] Escrever teste em `tests/e2e/prova-social.spec.ts` verificando serviços com duração ou preço, média com uma casa decimal e contagem total de avaliações
- [X] T035 [P] [US2] Escrever teste em `tests/e2e/comparador.spec.ts` verificando operação do comparador por teclado e por ponteiro
- [X] T036 [P] [US2] Escrever teste em `tests/e2e/secoes-vazias.spec.ts` verificando que coleções vazias omitem a seção e não publicam avaliação agregada

### Implementation for User Story 2

- [X] T037 [P] [US2] Criar `src/content/beneficios.ts` com os diferenciais do atendimento
- [X] T038 [P] [US2] Criar `src/content/servicos.ts` com nome, descrição e duração ou faixa de investimento
- [X] T039 [P] [US2] Criar `src/content/trabalhos.ts` e adicionar os pares de imagens em `public/imagens/trabalhos/`
- [X] T040 [P] [US2] Criar `src/content/depoimentos.ts` e `src/content/perfil.ts`
- [X] T041 [P] [US2] Criar o conjunto interno de ícones em `src/components/ui/icones.tsx`, sem dependência externa
- [X] T042 [P] [US2] Criar `src/components/ui/Avaliacao.tsx` exibindo estrelas de forma acessível, com valor textual equivalente
- [X] T043 [US2] Implementar as derivações em `src/lib/avaliacoes.ts`: média com uma casa decimal, contagem total e distribuição por nota, considerando apenas aprovados
- [X] T044 [P] [US2] Criar `src/components/sections/Beneficios.tsx`
- [X] T045 [P] [US2] Criar `src/components/sections/Servicos.tsx`, com CTA por serviço passando o nome do serviço à função de WhatsApp
- [X] T046 [US2] Criar `src/components/interactive/ComparadorAntesDepois.tsx` como Client Component, usando `input[type=range]` nativo e `clip-path`, conforme D-003
- [X] T047 [US2] Criar `src/components/sections/AntesDepois.tsx` consumindo o comparador
- [X] T048 [P] [US2] Criar `src/components/sections/Sobre.tsx` com foto e biografia da profissional
- [X] T049 [P] [US2] Criar `src/components/sections/Depoimentos.tsx` com média, contagem e lista
- [X] T050 [US2] Inserir as cinco novas seções em `src/app/page.tsx` na ordem definida por FR-001, aplicando `tabindex="-1"` e `scroll-margin-top` nos alvos de âncora
- [X] T051 [US2] Incluir `AggregateRating` no JSON-LD apenas quando houver avaliações aprovadas, conforme FR-022

**Checkpoint**: página completa com prova social. Validar SC-003 e SC-005.

---

## Phase 5: User Story 3 - Compartilhar e ser encontrada (Priority: P3)

**Goal**: preview correto ao compartilhar e presença em mecanismos de busca.

**Independent Test**: validar o preview do link e confirmar metadata, sitemap e dados
estruturados.

### Tests for User Story 3

- [X] T052 [P] [US3] Escrever teste em `tests/e2e/seo.spec.ts` verificando título único, meta description, tags Open Graph e Twitter, URL canônica e JSON-LD válido

### Implementation for User Story 3

- [X] T053 [P] [US3] Criar `src/app/opengraph-image.tsx` gerando a imagem de compartilhamento 1200x630 a partir dos tokens
- [X] T054 [P] [US3] Criar `src/app/sitemap.ts` e `src/app/robots.ts`
- [X] T055 [US3] Completar a metadata em `src/app/layout.tsx` com título, descrição, canônica, Open Graph, Twitter Card e idioma
- [X] T056 [P] [US3] Acrescentar identificação de origem aos links de redes sociais, conforme FR-011

**Checkpoint**: compartilhamento e indexação verificados. Validar SC-006.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T057 [P] Escrever teste de acessibilidade em `tests/e2e/acessibilidade.spec.ts` usando axe nos três viewports, sem violações de nível A e AA
- [X] T058 [P] Escrever teste de navegação por teclado em `tests/e2e/teclado.spec.ts`, cobrindo o link de pular conteúdo, a ordem de foco e o foco visível
- [X] T059 [P] Escrever teste em `tests/e2e/movimento-reduzido.spec.ts` confirmando que nenhuma informação se perde com `prefers-reduced-motion` ativo
- [X] T060 Implementar as transições de entrada por `IntersectionObserver` usando apenas `transform` e `opacity`, com desativação por `prefers-reduced-motion`
- [X] T061 Medir o bundle inicial e confirmar o limite de 180 KB comprimido, registrando o resultado
- [ ] T062 Executar auditoria Lighthouse em perfil mobile e confirmar Performance ≥ 90 e Acessibilidade, SEO e Boas Práticas ≥ 95
- [X] T063 Validar os cabeçalhos de segurança na build de produção local, confirmando ausência de `unsafe-inline` e `unsafe-eval`
- [X] T064 [P] Criar `README.md` com visão geral, comandos e instruções de edição de conteúdo
- [X] T065 [P] Criar `SECURITY.md` com o canal de divulgação responsável de vulnerabilidades, conforme a constituição
- [X] T066 [P] Criar a página de aviso de privacidade em `src/app/privacidade/page.tsx`, descrevendo a ausência de coleta, o uso de imagens e o canal de remoção
- [ ] T067 Executar `npm audit --audit-level=high` e resolver achados de severidade alta ou crítica
- [ ] T068 Publicar na Vercel, configurar o domínio e atualizar `urlCanonica` em `src/content/negocio.ts`

---

## Dependencies & Execution Order

### Ordem das fases

1. **Setup (T001-T009)** — sem dependências
2. **Foundational (T010-T022)** — depende do Setup; bloqueia todas as histórias
3. **US1 (T023-T033)** — depende da Foundational; entrega o MVP
4. **US2 (T034-T051)** — depende da Foundational; independente de US1
5. **US3 (T052-T056)** — depende da Foundational; independente de US1 e US2
6. **Polish (T057-T068)** — depende das histórias implementadas

### Dependências internas relevantes

- T011 depende de T010 (tokens antes do contraste)
- T013 depende de T012 (esquemas antes das validações agregadas)
- T019 depende de T010, T016 e T018
- T031 depende de T025 a T030
- T043 depende de T040 (depoimentos antes das derivações)
- T047 depende de T046
- T050 depende de T044, T045, T047, T048 e T049
- T051 depende de T043
- T061 e T062 dependem de todas as seções implementadas

### Oportunidades de paralelismo

- Setup: T004 a T008 em paralelo
- Foundational: T012, T014, T015, T016, T018, T020, T021 e T022 em paralelo
- US2: todos os módulos de conteúdo (T037 a T040) em paralelo; seções simples (T044, T045, T048, T049) em paralelo
- Polish: T057, T058, T059, T064, T065 e T066 em paralelo
- Após a Foundational, US1, US2 e US3 podem ser desenvolvidas por pessoas diferentes

---

## Parallel Example: User Story 2

```text
# Módulos de conteúdo, todos em arquivos distintos:
T037 Criar src/content/beneficios.ts
T038 Criar src/content/servicos.ts
T039 Criar src/content/trabalhos.ts
T040 Criar src/content/depoimentos.ts e src/content/perfil.ts

# Seções sem interatividade, após o conteúdo existir:
T044 Criar src/components/sections/Beneficios.tsx
T045 Criar src/components/sections/Servicos.tsx
T048 Criar src/components/sections/Sobre.tsx
T049 Criar src/components/sections/Depoimentos.tsx
```

---

## Implementation Strategy

### MVP primeiro (somente US1)

1. Concluir Setup (T001-T009)
2. Concluir Foundational (T010-T022) — bloqueia tudo
3. Concluir US1 (T023-T033)
4. **PARAR e VALIDAR**: testar a jornada de agendamento isoladamente
5. A página já converte e pode ser publicada

### Entrega incremental

1. Setup + Foundational → base pronta
2. US1 → validar → publicar (MVP que gera receita)
3. US2 → validar → publicar (prova social)
4. US3 → validar → publicar (alcance)
5. Polish → portões de qualidade e publicação definitiva

---

## Notes

- Tarefas marcadas com [P] atuam em arquivos distintos e não têm dependência entre si
- Os testes de cada história devem falhar antes da implementação correspondente
- Todo texto visível deve estar em português do Brasil
- Nenhum componente pode importar módulos de `src/content/` diretamente; a composição ocorre em `src/app/page.tsx`
- Valores literais de cor, espaçamento ou tipografia são proibidos; usar somente tokens
- Fazer commit ao final de cada tarefa ou grupo lógico
- T068 só pode ser executada após `npm run check:pendencias` passar sem apontamentos
