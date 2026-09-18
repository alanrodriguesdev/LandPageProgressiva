# Data Model: Landing Page de Progressivas e Cabeleireiro

**Fase**: 1 — Design & Contracts
**Data**: 2026-09-18
**Plano**: [plan.md](./plan.md)

## Natureza do modelo

Não há banco de dados nesta entrega (decisão Q3 da sessão de clarificação). O "modelo de dados"
é um conjunto de módulos TypeScript versionados em `src/content/`, validados por Zod na
importação, de modo que qualquer registro inválido falhe o `next build` conforme FR-028.

Todas as entidades são somente leitura. Não há criação, atualização ou exclusão em tempo de
execução, e nenhuma delas contém dados pessoais de visitantes (FR-013).

---

## Entidade: Negocio

Fonte única de verdade para todos os dados de contato e atendimento (FR-029).

| Campo | Tipo | Regras |
|---|---|---|
| `nome` | `string` | Não vazio |
| `descricaoCurta` | `string` | Não vazio, ate 160 caracteres (usado na meta description) |
| `whatsapp` | `string` | Somente dígitos, com código do país (ex.: `5511999999999`) |
| `telefone` | `string` | Opcional, formato E.164 |
| `email` | `string` | Formato de e-mail válido |
| `areaAtendimento` | `string` | Cidade, bairro ou descrição da área |
| `enderecoCompleto` | `objeto` | Opcional; logradouro, cidade, estado, CEP |
| `horarios` | `Horario[]` | Pelo menos um registro |
| `redesSociais` | `RedeSocial[]` | Pode ser vazio |
| `urlCanonica` | `string` | URL absoluta do site publicado |

**Horario**: `diaSemana` (enum de segunda a domingo), `abre` (`HH:mm`), `fecha` (`HH:mm`),
`fechado` (booleano). Quando `fechado` é verdadeiro, `abre` e `fecha` são ignorados.

**RedeSocial**: `plataforma` (enum: instagram, facebook, tiktok, youtube), `url` (absoluta),
`identificador` (ex.: `@salao`).

**Validações**: `abre` deve ser anterior a `fecha` quando não estiver fechado. Todos os campos
com valor provisório devem conter o marcador acordado, detectado pelo script de verificação
(FR-030).

---

## Entidade: Servico

| Campo | Tipo | Regras |
|---|---|---|
| `id` | `string` | Único no conjunto, formato slug |
| `nome` | `string` | Não vazio |
| `descricao` | `string` | Não vazio, ate 240 caracteres |
| `duracaoEstimada` | `string` | Opcional (ex.: "2 a 3 horas") |
| `faixaInvestimento` | `string` | Opcional (ex.: "A partir de R$ 250") |
| `imagem` | `Imagem` | Opcional |
| `destaque` | `boolean` | Padrão falso |

**Regra de negócio (FR-004)**: ao menos um entre `duracaoEstimada` e `faixaInvestimento` deve
estar presente. A validação rejeita o registro quando ambos estiverem ausentes.

---

## Entidade: Beneficio

| Campo | Tipo | Regras |
|---|---|---|
| `id` | `string` | Único, slug |
| `titulo` | `string` | Não vazio |
| `descricao` | `string` | Não vazio, ate 180 caracteres |
| `icone` | `string` | Nome do ícone dentro do conjunto interno |

Ícones são componentes internos, não uma dependência externa, preservando o orçamento de bundle.

---

## Entidade: Trabalho (antes e depois)

| Campo | Tipo | Regras |
|---|---|---|
| `id` | `string` | Único, slug |
| `antes` | `Imagem` | Obrigatório |
| `depois` | `Imagem` | Obrigatório |
| `legenda` | `string` | Não vazio |
| `servicoId` | `string` | Opcional; deve referenciar um `Servico.id` existente |
| `publicadoEm` | `string` | Data ISO `YYYY-MM-DD` |

**Imagem**: `src` (caminho sob `public/`), `alt` (string não vazia — FR-018), `largura`
(inteiro positivo), `altura` (inteiro positivo).

**Validações**: `alt` vazio reprova o build. `servicoId` inexistente reprova o build
(integridade referencial verificada no esquema agregado).

---

## Entidade: Depoimento

| Campo | Tipo | Regras |
|---|---|---|
| `id` | `string` | Único, slug |
| `nomeExibicao` | `string` | Não vazio, ate 60 caracteres |
| `nota` | `number` | Inteiro entre 1 e 5 |
| `texto` | `string` | Não vazio, ate 1000 caracteres |
| `data` | `string` | Data ISO `YYYY-MM-DD` |
| `aprovado` | `boolean` | Somente `true` é renderizado |

**Regras de integridade (FR-006 e Princípio X)**: a média exibida é calculada sobre todos os
depoimentos com `aprovado === true`, sem ponderação, filtro ou arredondamento seletivo, e
apresentada com uma casa decimal junto da contagem total. Depoimentos não aprovados nunca são
incluídos no cálculo nem no JSON-LD.

---

## Entidade: Perfil

| Campo | Tipo | Regras |
|---|---|---|
| `nome` | `string` | Não vazio |
| `foto` | `Imagem` | Obrigatório |
| `biografia` | `string[]` | Pelo menos um parágrafo |
| `especializacoes` | `string[]` | Pode ser vazio |

---

## Derivações calculadas

Valores computados na renderização, nunca armazenados:

| Derivação | Origem | Regra |
|---|---|---|
| `mediaAvaliacoes` | `Depoimento[]` aprovados | Média aritmética, uma casa decimal |
| `totalAvaliacoes` | `Depoimento[]` aprovados | Contagem simples |
| `distribuicaoNotas` | `Depoimento[]` aprovados | Contagem por nota de 1 a 5 |
| `linkWhatsApp` | `Negocio.whatsapp` + contexto | Ver `lib/whatsapp.ts` |
| `jsonLd` | `Negocio` + derivações | `HairSalon`; `AggregateRating` incluído apenas quando `totalAvaliacoes > 0` (FR-022) |

---

## Regras de seção vazia (FR-026)

Cada seção verifica seu próprio conjunto antes de renderizar:

| Seção | Condição de omissão |
|---|---|
| Serviços | Lista vazia |
| Antes e depois | Nenhum trabalho cadastrado |
| Depoimentos | Nenhum depoimento aprovado |
| Sobre | Perfil ausente |
| Benefícios | Lista vazia |

Hero, chamada para ação, contato e rodapé nunca são omitidos, pois dependem apenas de `Negocio`,
que é obrigatório.
