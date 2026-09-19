# Quickstart: Landing Page de Progressivas e Cabeleireiro

**Fase**: 1 — Design & Contracts
**Data**: 2026-09-18

Meta: uma pessoa nova no repositório coloca o projeto em execução em ate 10 minutos (SC-009).

## Pré-requisitos

- Node.js 22 LTS ou superior
- npm 10 ou superior
- Git

## Executar localmente

```powershell
git clone <url-do-repositorio>
cd LandPagePrograssiva
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:3000`. Não há variáveis de ambiente
obrigatórias para o desenvolvimento local, porque não existe banco de dados, autenticação ou
integração externa nesta entrega.

## Comandos disponíveis

| Comando | Finalidade |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção; falha se houver conteúdo inválido |
| `npm run start` | Serve o build de produção localmente |
| `npm run lint` | ESLint, incluindo o bloqueio de valores arbitrários do Tailwind |
| `npm run typecheck` | Verificação de tipos sem emitir arquivos |
| `npm run test` | Testes unitários (Vitest) |
| `npm run test:e2e` | Testes de jornada e acessibilidade (Playwright) |
| `npm run check:pendencias` | Falha se ainda houver dados provisórios (FR-030) |

## Alterar o conteúdo

Todo o conteúdo editorial vive em `src/content/`. Nenhum componente precisa ser tocado.

| Para alterar | Edite |
|---|---|
| WhatsApp, telefone, e-mail, endereço, horários, redes sociais | `negocio.ts` |
| Lista de serviços, preços e durações | `servicos.ts` |
| Diferenciais exibidos na seção de benefícios | `beneficios.ts` |
| Fotos de antes e depois | `trabalhos.ts` e `public/imagens/trabalhos/` |
| Depoimentos e notas | `depoimentos.ts` |
| Biografia e foto da profissional | `perfil.ts` |

Após editar, `npm run build` valida os dados. Um erro de build indica exatamente qual entidade e
qual campo estão inválidos.

### Adicionar um trabalho à galeria

1. Coloque as duas imagens em `public/imagens/trabalhos/`.
2. Acrescente uma entrada em `trabalhos.ts` com `antes`, `depois`, `alt` descritivo de cada
   imagem, `largura`, `altura` e `legenda`.
3. Execute `npm run build`. Texto alternativo vazio reprova o build.

## Antes de publicar em produção

1. Substitua todos os valores provisórios em `negocio.ts` pelos dados reais.
2. Execute `npm run check:pendencias` — deve passar sem apontamentos.
3. Execute `npm run lint`, `npm run typecheck`, `npm run test` e `npm run test:e2e`.
4. Execute a auditoria Lighthouse em perfil mobile e confirme os limites do plano.
5. Confirme os cabeçalhos de segurança na URL publicada.

## Publicar na Vercel

1. Importe o repositório na Vercel. O framework é detectado automaticamente.
2. Não há variáveis de ambiente obrigatórias.
3. Defina o domínio de produção e atualize `urlCanonica` em `negocio.ts`.
4. Cada push na branch principal gera um novo deploy; pull requests geram previews.

## Estrutura resumida

```text
src/app/         Rota única, layout, metadata, sitemap e robots
src/components/  Componentes de seção, de interface e interativos
src/content/     Conteúdo tipado — única fonte de verdade editorial
src/lib/         Funções puras (WhatsApp, SEO, utilitários)
src/middleware.ts Cabeçalhos de segurança
public/imagens/  Imagens otimizadas em tempo de build
tests/           Testes unitários e de jornada
```
