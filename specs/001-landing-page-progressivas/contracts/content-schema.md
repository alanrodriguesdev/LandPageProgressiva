# Contrato: Conteúdo Versionado

**Fase**: 1 — Design & Contracts
**Data**: 2026-09-18

Esta feature não expõe API HTTP. O contrato relevante é entre os **módulos de conteúdo**
(`src/content/`) e a **camada de apresentação** (`src/components/`). Ele é a materialização do
FR-003 e do Princípio VI: quem edita conteúdo nunca precisa abrir um componente.

## Princípio do contrato

1. Componentes MUST receber dados por propriedades tipadas; MUST NOT importar módulos de
   conteúdo diretamente. A composição ocorre exclusivamente em `app/page.tsx`.
2. Módulos de conteúdo MUST NOT importar nada de `components/`.
3. Todo módulo de conteúdo MUST exportar dados já validados pelo esquema correspondente.
4. Alterar textos, preços, serviços ou depoimentos MUST exigir edição apenas em `src/content/`.

## Superfície exportada

```text
src/content/negocio.ts      → export const negocio: Negocio
src/content/servicos.ts     → export const servicos: Servico[]
src/content/beneficios.ts   → export const beneficios: Beneficio[]
src/content/trabalhos.ts    → export const trabalhos: Trabalho[]
src/content/depoimentos.ts  → export const depoimentos: Depoimento[]
src/content/perfil.ts       → export const perfil: Perfil
src/content/schema.ts       → esquemas Zod e tipos inferidos
```

## Comportamento de validação

| Situação | Resultado esperado |
|---|---|
| Campo obrigatório ausente ou vazio | Build falha com mensagem indicando entidade e campo |
| `alt` de imagem vazio | Build falha (FR-018) |
| `nota` fora do intervalo de 1 a 5 | Build falha (FR-028) |
| `servicoId` referenciando serviço inexistente | Build falha |
| Serviço sem duração e sem faixa de investimento | Build falha (FR-004) |
| `id` duplicado dentro de uma coleção | Build falha |
| Horário com abertura posterior ao fechamento | Build falha |
| Marcador de valor provisório presente | Script de verificação falha na publicação (FR-030) |
| Coleção vazia | Build passa; a seção correspondente é omitida (FR-026) |

## Contrato de `lib/whatsapp.ts`

```text
montarLinkWhatsApp(opcoes: {
  servico?: string   // nome do serviço de interesse
  origem: string     // identificador do ponto de partida (ex.: "hero", "servico-progressiva")
}): string
```

**Garantias**:

- Retorna sempre URL absoluta no domínio `wa.me` com o número do `negocio`.
- A mensagem é em português do Brasil e menciona o serviço quando informado (FR-010).
- A origem é embutida no texto da mensagem, sobrevivendo a encaminhamento (FR-011).
- O texto é codificado para URL; nenhum dado de visitante é incluído (FR-013).

## Contrato de `middleware.ts`

Aplica a toda resposta de documento os cabeçalhos exigidos pela constituição v2.0.0:
`Content-Security-Policy` (sem `unsafe-inline` e sem `unsafe-eval`),
`Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e
`X-Frame-Options`. O nonce gerado por requisição é propagado ao documento.
