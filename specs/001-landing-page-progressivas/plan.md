# Implementation Plan: Landing Page de Progressivas e Cabeleireiro

**Branch**: `001-landing-page-progressivas` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-landing-page-progressivas/spec.md`

## Summary

Landing page pública, estática e mobile-first para divulgação de serviços de progressiva e
cabeleireiro, cujo objetivo único é converter visitantes em conversas de agendamento no
WhatsApp. A página entrega nove seções (hero, benefícios, serviços, antes e depois, sobre,
depoimentos, CTA, contato e rodapé) alimentadas por conteúdo tipado versionado no repositório.

A abordagem técnica é um aplicativo Next.js com App Router gerado estaticamente, escrito em
TypeScript estrito, estilizado com Tailwind CSS v4 cujos tokens de design residem em `@theme`.
Não há banco de dados, autenticação, formulário ou coleta de dados pessoais nesta entrega. Toda
interatividade é isolada em poucos Client Components pequenos; o restante são Server Components
renderizados em tempo de build. Os cabeçalhos de segurança são aplicados por middleware e a
publicação ocorre na Vercel.

## Technical Context

**Language/Version**: TypeScript 5.9 em modo `strict`, Node.js 22 LTS

**Primary Dependencies**: Next.js 15 (App Router), React 19, Tailwind CSS v4, Zod (validação do
conteúdo em tempo de build), `next/font` e `next/image` nativos, medição agregada sem cookies
(Vercel Analytics e Speed Insights)

**Storage**: N/A — conteúdo tipado versionado no repositório (`src/content/*.ts`); imagens
otimizadas em tempo de build a partir de `public/`

**Testing**: Vitest para validação de esquema de conteúdo e utilitários puros; Playwright para
testes de acessibilidade e das jornadas P1 e P2; `eslint` com regra que bloqueia valores
arbitrários do Tailwind; auditoria Lighthouse CI no perfil mobile

**Target Platform**: Navegadores modernos (2 últimas versões) em mobile e desktop; hospedagem
Vercel com saída estática e revalidação incremental

**Project Type**: Aplicação web de página única e rota única, estaticamente gerada

**Performance Goals**: LCP ≤ 2,5s e CLS ≤ 0,1 em 4G simulado; INP ≤ 200ms; Lighthouse mobile
≥ 90 em performance e ≥ 95 em acessibilidade, SEO e boas práticas

**Constraints**: Bundle inicial de JavaScript ≤ 180 KB comprimido; sem coleta de dados pessoais;
sem banco de dados; sem `unsafe-inline`/`unsafe-eval` na CSP; todo conteúdo em português do
Brasil; funcional sem WebGL

**Scale/Scope**: Uma rota pública, nove seções, cerca de 20 componentes reutilizáveis, tráfego
estimado de centenas a poucos milhares de visitas por mês, majoritariamente mobile

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Avaliado contra a constituição **v2.0.0**.

| Princípio | Portão | Status |
|---|---|---|
| I. Conversão acima de tudo | CTA de WhatsApp na primeira tela; contato em ate 2 cliques; nenhuma feature fora da divulgação | Pass |
| II. Responsivo e mobile-first | Layout a partir de 320px; validação em 360/768/1440px; alvos de toque de 44px | Pass |
| III. Performance | Geração estática, `next/image`, `next/font`, sem bibliotecas pesadas; orçamento de bundle verificado | Pass |
| IV. Tokens e acessibilidade | Tokens em `@theme` como fonte única; lint bloqueia valores arbitrários; contraste AA verificado | Pass |
| V. Compartilhável | Metadata API do Next para OG/Twitter; JSON-LD `HairSalon`; UTM nos links de saída | Pass |
| VI. Simplicidade e conteúdo como dado | Conteúdo em módulos tipados separados da UI; sem estado global; sem abstração prematura | Pass |
| VII. Segurança e privacidade | Zero coleta de dados pessoais; cabeçalhos por middleware; sem segredos no cliente | Pass |
| VIII. Movimento e 3D com orçamento | Sem WebGL nesta entrega; profundidade por CSS; animações apenas `transform`/`opacity`; respeita `prefers-reduced-motion` | Pass |
| IX. Integrações e identidade | Sem API de rede social e sem login nesta entrega; links de saída estáticos; nenhum token no cliente | Pass (não aplicável) |
| X. Conteúdo gerado pelo usuário | Sem upload e sem comentários nesta entrega; conteúdo curado no repositório; galeria respeita orçamento de imagem | Pass (não aplicável) |

**Resultado**: nenhum desvio. A seção Complexity Tracking permanece vazia.

**Observações de conformidade**:

- O Princípio VIII permite 3D, mas não obriga. A decisão de não usar WebGL nesta entrega é a
  opção mais conservadora frente aos orçamentos e está registrada em `research.md`.
- A subseção "Formulário de contato" do capítulo de segurança é condicional e não se aplica,
  pois não há formulário (decisão Q4 da sessão de clarificação).
- A constituição v2.0.0 exige a remoção dos projetos .NET remanescentes; isso é tratado como
  tarefa explícita da fase de preparação.
- A navegação usa cabeçalho fixo com links âncora, sem menu sobreposto (FR-009a), o que elimina
  a necessidade de foco preso e reduz o número de Client Components de três para dois.
- A medição de audiência é agregada e sem cookies (FR-023), portanto não há banner de
  consentimento nem script de terceiros bloqueando a renderização.

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-page-progressivas/
├── plan.md              # Este arquivo
├── research.md          # Saída da Fase 0
├── data-model.md        # Saída da Fase 1
├── quickstart.md        # Saída da Fase 1
├── contracts/
│   └── content-schema.md  # Contrato do conteúdo versionado
├── checklists/
│   └── requirements.md
└── tasks.md             # Saída da Fase 2 (/speckit.tasks — não criado aqui)
```

### Source Code (repository root)

Os projetos `LandPagePrograssiva.AppHost`, `LandPagePrograssiva.Server`, `frontend` e o arquivo
de solução são removidos conforme a emenda constitucional v2.0.0. A raiz passa a hospedar
diretamente a aplicação Next.js.

```text
src/
├── app/
│   ├── layout.tsx              # Tipografia, metadata base, JSON-LD, skip link
│   ├── page.tsx                # Composição das nove seções (Server Component)
│   ├── globals.css             # Import do Tailwind + @theme com os design tokens
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx     # Imagem de compartilhamento 1200x630
├── components/
│   ├── sections/               # Hero, Beneficios, Servicos, AntesDepois, Sobre,
│   │                           # Depoimentos, ChamadaAcao, Contato, Rodape
│   ├── layout/                 # CabecalhoFixo (âncoras + CTA), SkipLink
│   ├── ui/                     # Botao, Secao, Titulo, Cartao, Avaliacao, Badge
│   └── interactive/            # ComparadorAntesDepois, BotaoFlutuante
│                               # (únicos Client Components)
├── content/
│   ├── negocio.ts              # Dados de contato e atendimento (fonte única)
│   ├── servicos.ts
│   ├── beneficios.ts
│   ├── trabalhos.ts
│   ├── depoimentos.ts
│   ├── perfil.ts
│   └── schema.ts               # Esquemas Zod + validação em tempo de build
├── lib/
│   ├── whatsapp.ts             # Construção de link com mensagem e origem
│   ├── seo.ts                  # Metadata e JSON-LD
│   └── utils.ts
└── middleware.ts               # Cabeçalhos de segurança

public/
├── imagens/
│   ├── trabalhos/              # Pares antes/depois
│   ├── servicos/
│   └── perfil/
└── favicon.ico

tests/
├── unit/                       # Validação de conteúdo, link de WhatsApp
└── e2e/                        # Jornadas P1/P2, acessibilidade, teclado
```

**Structure Decision**: aplicação única na raiz do repositório, sem monorepo e sem separação
frontend/backend, porque não há serviço de backend independente — a camada de servidor se
resume ao middleware de cabeçalhos. A separação estrutural que importa é entre `content/`
(dados), `components/` (apresentação) e `lib/` (regras puras), atendendo diretamente ao
Princípio VI e ao requisito FR-003.

## Complexity Tracking

> Nenhuma violação da constituição foi identificada. Seção intencionalmente vazia.
