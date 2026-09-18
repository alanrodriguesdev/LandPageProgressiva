<!--
SYNC IMPACT REPORT
==================
Version change: 1.3.0 → 2.0.0
Bump rationale: MAJOR — substituição incompatível da plataforma. A stack ASP.NET Core em .NET 10
com .NET Aspire e React/Vite foi removida e substituída por Next.js publicado na Vercel; a
estilização passou de CSS puro com variáveis customizadas para Tailwind CSS v4 com tokens
declarados em `@theme`. Regras que dependiam do backend .NET (persistência, armazenamento de
mídia, processamento de imagem, rate limiting, OIDC) foram redefinidas. Decisões originadas na
sessão de clarificação de 2026-09-18 (specs/001-landing-page-progressivas).

Modified principles:
- IV. Identidade Visual Consistente e Acessível → tokens agora declarados em `@theme`, com
  proibição explícita de valores arbitrários em classes utilitárias
- VII. Segurança e Privacidade por Padrão → cabeçalhos e rate limiting redefinidos para a
  plataforma de destino
- IX. Integrações e Identidade Federada → proxy/cache e OIDC redefinidos para route handlers
- X. Conteúdo Gerado pelo Usuário → pipeline de upload redefinido para storage gerenciado
- Restrições Tecnológicas → substituída integralmente

Added sections: nenhuma

Removed sections: nenhuma (seção "Formulário de contato" mantida como condicional)

Templates requiring updates:
- ✅ .specify/templates/plan-template.md (seção Constitution Check é genérica; compatível)
- ✅ .specify/templates/spec-template.md (nenhuma seção obrigatória adicionada/removida)
- ✅ .specify/templates/tasks-template.md (categorias permanecem válidas)
- ⚠ README.md (pendente — repositório ainda não possui README)
- ⚠ SECURITY.md (pendente — criar política de divulgação de vulnerabilidades)
- ⚠ Aviso de privacidade (pendente)
- ⚠ Projetos .NET existentes (LandPagePrograssiva.AppHost, LandPagePrograssiva.Server, frontend)
  MUST ser removidos do repositório durante a implementação desta mudança

Histórico:
- 1.0.0 (2026-09-18): ratificação inicial com os princípios I a VI.
- 1.1.0 (2026-09-18): Princípio VII (Segurança e Privacidade) e portões de hardening.
- 1.2.0 (2026-09-18): Princípios VIII (3D/movimento com orçamento) e IX (integrações e
  identidade federada).
- 1.3.0 (2026-09-18): Princípio X (conteúdo gerado pelo usuário).

Follow-up TODOs: nenhum
-->

# Landing Page Progressivas Constitution

## Core Principles

### I. Conversão Acima de Tudo

Toda decisão de produto, design ou código MUST ser justificada pelo seu impacto na conversão
(contato via WhatsApp, agendamento ou clique em rede social). Cada tela MUST manter pelo menos
um call-to-action visível sem rolagem adicional, e o caminho até o contato MUST ter no máximo
dois cliques. Funcionalidades que não servem à divulgação do trabalho ou à captação de clientes
MUST ser rejeitadas ou adiadas.

**Rationale**: o projeto é uma peça de marketing, não um sistema de gestão; complexidade sem
retorno comercial é desperdício direto.

### II. Responsivo e Mobile-First (NÃO NEGOCIÁVEL)

Todo componente MUST ser construído a partir do layout móvel (viewport de 320px) e expandido
progressivamente para tablet e desktop. Nenhum recurso pode depender de hover, teclado ou
largura mínima de tela para funcionar. Toda entrega MUST ser verificada em três larguras de
referência: 360px, 768px e 1440px. Elementos interativos MUST ter área de toque de no mínimo
44x44px.

**Rationale**: a maior parte do tráfego vem de links compartilhados em redes sociais e abertos
em navegadores embutidos de celular.

### III. Performance como Requisito de Negócio

A página MUST atingir LCP ≤ 2,5s e CLS ≤ 0,1 em conexão 4G simulada. Imagens MUST ser servidas
em formatos modernos (AVIF ou WebP) com `width`/`height` declarados e `loading="lazy"` fora da
primeira dobra. Bibliotecas de terceiros MUST ser adicionadas somente quando não houver
alternativa nativa viável, e cada adição MUST registrar o custo em KB no PR. Fontes MUST usar
`font-display: swap` e ser limitadas a no máximo dois arquivos.

**Rationale**: cada segundo adicional de carregamento derruba a taxa de conversão; performance
é receita.

### IV. Identidade Visual Consistente e Acessível

Todas as cores, espaçamentos, tipografias e raios MUST vir de design tokens centralizados
declarados em `@theme`, que gera as variáveis CSS correspondentes e constitui a única fonte de
verdade. Valores literais ou arbitrários espalhados pelos componentes são proibidos e MUST ser
bloqueados por lint. A paleta MUST ser quente e de alto contraste para gerar desejo visual, e
toda combinação texto/fundo MUST atingir contraste WCAG AA (4.5:1 para texto normal, 3:1 para
texto grande). Imagens MUST ter `alt` descritivo e a navegação MUST ser operável por teclado com
foco visível.

**Rationale**: consistência transmite profissionalismo do serviço e acessibilidade amplia o
público alcançado sem custo adicional.

### V. Compartilhável em Redes Sociais

Toda página publicada MUST expor metadados Open Graph e Twitter Card completos (`title`,
`description`, `image` 1200x630, `url`) e um `<title>`/`meta description` únicos. A página MUST
incluir dados estruturados JSON-LD do tipo `LocalBusiness` ou `HairSalon`. Links de saída para
WhatsApp e redes sociais MUST ser rastreáveis por parâmetros de origem.

**Rationale**: a divulgação acontece majoritariamente por compartilhamento; o preview do link é
o primeiro contato do cliente com o trabalho.

### VI. Simplicidade e Conteúdo Orientado a Dados

O conteúdo editorial (serviços, preços, depoimentos, galeria, contatos) MUST residir em
estruturas de dados tipadas e separadas da camada de apresentação, permitindo alteração sem
mexer em JSX. Nenhuma abstração, camada ou dependência MUST ser introduzida antes de existir
um segundo caso de uso real (YAGNI). Estado global MUST ser evitado enquanto estado local
resolver o problema.

**Rationale**: o conteúdo muda com frequência muito maior que o código; separá-los reduz o
custo de manutenção e o risco de regressão visual.

### VII. Segurança e Privacidade por Padrão (NÃO NEGOCIÁVEL)

A aplicação MUST ser segura na configuração padrão, sem depender de ajustes manuais pós-deploy.
Regras inegociáveis:

- **Minimização de dados**: MUST ser coletado apenas o mínimo necessário para o contato
  (nome, telefone ou e-mail e mensagem) e, no conteúdo gerado pelo usuário, apenas nome de
  exibição, nota, texto e imagem opcional. Dados sensíveis — CPF, endereço completo, data de
  nascimento, dados de pagamento ou informações de saúde — MUST NOT ser coletados nem
  armazenados. Dados de contato MUST ser retidos por no máximo 12 meses; conteúdo publicado
  segue a política de retenção do Princípio X.
- **Transporte seguro**: todo tráfego MUST usar HTTPS com HSTS habilitado
  (`max-age` ≥ 31536000, `includeSubDomains`); redirecionamento de HTTP para HTTPS MUST estar
  ativo. Cookies, quando existirem, MUST ser `Secure`, `HttpOnly` e `SameSite=Strict` ou `Lax`.
- **Entrada não confiável**: toda entrada de usuário MUST ser validada no servidor (allow-list
  de formato e tamanho máximo), independentemente da validação de cliente. Saída dinâmica
  MUST ser escapada pelo React; `dangerouslySetInnerHTML` é proibido.
- **Segredos**: chaves, tokens e strings de conexão MUST NOT ser versionados nem embutidos no
  pacote entregue ao navegador. Somente variáveis com prefixo público explícito
  (`NEXT_PUBLIC_*`) podem chegar ao cliente.
- **Superfície mínima**: endpoints MUST ser os estritamente necessários; qualquer endpoint
  mutável MUST ter rate limiting e proteção antiautomação. Detalhes de exceção, stack traces e
  cabeçalhos que revelem tecnologia MUST NOT ser expostos em produção.
- **Dependências**: nenhuma dependência com vulnerabilidade conhecida de severidade alta ou
  crítica MUST ser publicada; a correção MUST ocorrer antes do deploy.

**Rationale**: uma landing page pública é alvo constante de varredura automatizada, spam e
abuso de formulário; um vazamento de dados de clientes destrói a confiança que a própria página
existe para construir, e o custo de prevenir é muito menor que o de remediar.

### VIII. Design Moderno com Movimento e 3D com Orçamento

A experiência MUST transmitir sofisticação por meio de profundidade, movimento e microinterações,
sem jamais violar o Princípio III. Regras:

- **Progressive enhancement obrigatório**: a página MUST ser 100% funcional, legível e
  conversível sem WebGL. Cenas 3D MUST ser carregadas sob demanda (`lazy` + `IntersectionObserver`),
  nunca no caminho crítico de renderização, e MUST ter um fallback estático (imagem AVIF/WebP ou
  gradiente CSS) exibido enquanto carregam ou quando o dispositivo não suportar.
- **Orçamento de peso**: o bundle inicial (antes de qualquer interação) MUST ficar ≤ 180 KB
  comprimido. Todo o conteúdo 3D somado (runtime + modelos + texturas) MUST ficar ≤ 1,5 MB
  comprimido e carregar apenas em chunks separados. Modelos MUST usar glTF/GLB com compressão
  Draco ou Meshopt e texturas KTX2.
- **Orçamento de execução**: animações MUST manter 60 fps em desktop e ≥ 30 fps em mobile de
  referência. Animações MUST usar apenas `transform` e `opacity` (propriedades compostas);
  animar `width`, `height`, `top`, `left` ou `box-shadow` em loop é proibido. INP MUST ficar
  ≤ 200ms.
- **Degradação adaptativa**: a cena MUST reduzir qualidade ou ser desligada automaticamente
  quando houver sinal de dispositivo limitado (`prefers-reduced-motion`, `navigator.hardwareConcurrency`
  baixo, `navigator.connection.saveData`, ausência de WebGL2 ou bateria em economia). O loop de
  renderização MUST ser pausado quando a cena sair da viewport ou a aba ficar oculta.
- **Acessibilidade do movimento**: `prefers-reduced-motion: reduce` MUST desativar parallax,
  auto-rotação e transições não essenciais, preservando o conteúdo. Nenhuma informação MUST ser
  transmitida exclusivamente por movimento. Canvas MUST ser `aria-hidden` quando for decorativo.
- **Tecnologia homologada**: somente bibliotecas maduras e amplamente adotadas MUST ser usadas
  (ver Restrições Tecnológicas). Motores de jogo completos e soluções experimentais são proibidos.

**Rationale**: 3D e movimento aumentam percepção de valor do serviço, mas são a causa mais comum
de páginas pesadas; orçamentos explícitos transformam "leve" de intenção em critério verificável.

### IX. Integrações e Identidade Federada Padronizadas

Toda integração externa MUST ser isolada atrás de uma interface própria do projeto, permitindo
trocar ou desligar o provedor sem alterar a UI. Regras:

- **Camada de integração**: cada provedor (Instagram, Facebook, TikTok, YouTube, WhatsApp,
  Google Business) MUST ser implementado atrás de um contrato tipado com timeout, retry com
  backoff exponencial e fallback para conteúdo estático em caso de falha. A página MUST NOT
  quebrar nem exibir área vazia quando uma API externa estiver indisponível.
- **Chamadas sempre pelo servidor**: tokens de API de redes sociais MUST ser trocados e
  armazenados exclusivamente na camada de servidor; o frontend MUST consumir apenas route
  handlers ou server components do próprio projeto. Respostas MUST ser cacheadas no servidor
  (TTL mínimo de 10 minutos) para respeitar limites de taxa dos provedores.
- **Autenticação é opcional, mas preparada**: login MUST NOT ser exigido para qualquer ação de
  conversão. Caso login seja introduzido, MUST usar OpenID Connect com Authorization Code +
  PKCE, suportando no mínimo **Apple**, **Google**, **Microsoft** e **Facebook**, por meio de
  uma abstração de provedor que permita adicionar novos sem alterar a camada de UI.
- **Sem senhas próprias**: armazenar senhas, hashes de senha ou implementar fluxo próprio de
  credenciais é proibido. Identidade MUST ser sempre delegada ao provedor federado.
- **Tokens**: tokens de acesso e refresh MUST NOT ser gravados em `localStorage` ou
  `sessionStorage`; MUST usar cookies `HttpOnly`, `Secure`, `SameSite` com rotação de refresh.
  `state` e `nonce` MUST ser validados em todo retorno de OAuth, e `redirect_uri` MUST usar
  allow-list exata.
- **Compatibilidade Apple**: como a Apple exige paridade, se qualquer provedor social for
  oferecido, **Sign in with Apple** MUST ser oferecido em conjunto, e a opção de e-mail privado
  relay MUST ser suportada.

**Rationale**: integrações são a parte mais instável de uma landing page e a mais vazadora de
credenciais; padronizar contrato, cache e fluxo de identidade evita retrabalho quando um
provedor mudar de API e elimina a classe mais comum de vazamento de token.

### X. Conteúdo Gerado pelo Usuário: Curado, Moderado e Seguro

A galeria de trabalhos, os comentários e as avaliações são prova social e, por isso, servem ao
Princípio I — mas são também a maior superfície de ataque e de risco reputacional da aplicação.
Regras inegociáveis:

- **Upload sem fricção para a profissional**: o envio de fotos dos trabalhos MUST ser possível a
  partir do celular em no máximo três interações (selecionar, pré-visualizar, confirmar), com
  suporte a múltiplos arquivos, arrastar-e-soltar no desktop, indicador de progresso e
  retomada/retry em caso de falha de rede.
- **Upload nunca é anônimo**: publicar imagens na galeria MUST exigir autenticação de
  administrador conforme o Princípio IX. Upload público anônimo é proibido.
- **Validação de arquivo no servidor**: o tipo MUST ser verificado pelo conteúdo real (magic
  number), nunca pela extensão ou pelo `Content-Type` enviado. Somente JPEG, PNG, WebP, AVIF e
  HEIC MUST ser aceitos. Arquivos MUST ser reprocessados/reencodados no servidor, descartando o
  binário original, e metadados EXIF — especialmente geolocalização — MUST ser removidos.
- **Nunca executar o que foi enviado**: arquivos MUST ser armazenados em serviço de objetos
  dedicado, fora do diretório público do projeto, servidos por domínio/prefixo próprio, com
  `Content-Disposition` e `X-Content-Type-Options: nosniff`, e nomes gerados pelo servidor. O
  nome de arquivo do usuário MUST NOT influenciar o caminho de gravação (defesa contra path
  traversal).
- **Moderação antes da publicação**: todo comentário e avaliação MUST entrar em estado
  `pendente` e só se tornar público após aprovação. Conteúdo MUST poder ser rejeitado, ocultado
  ou removido a qualquer momento, e a remoção MUST ser refletida imediatamente no cache.
- **Integridade das avaliações**: notas MUST usar escala inteira de 1 a 5 e MUST NOT ser
  editadas, ponderadas ou filtradas para inflar a média. A média exibida MUST refletir todas as
  avaliações aprovadas, e a contagem total MUST ser exibida junto da média. Avaliações falsas
  ou incentivadas são proibidas.
- **Consentimento de imagem**: fotos de clientes MUST ser publicadas apenas com consentimento
  registrável, e MUST poder ser removidas mediante solicitação do titular, conforme a LGPD.
- **Antiabuso**: envio de comentários, avaliações e uploads MUST ter rate limiting, proteção
  antibot e limite de tamanho, herdando as regras do Princípio VII.
- **Sem custo de performance**: a galeria MUST servir imagens derivadas responsivas
  (`srcset`/`sizes`) em AVIF/WebP com dimensões declaradas e carregamento preguiçoso, sob os
  orçamentos do Princípio III e VIII. A imagem original em alta resolução MUST NOT ser servida
  diretamente na listagem.

**Rationale**: upload de arquivo é historicamente o vetor de ataque mais explorado em
aplicações web, e uma área de comentários sem moderação vira spam em dias — destruindo
exatamente a credibilidade que a prova social deveria construir.

## Restrições Tecnológicas

- **Plataforma**: Next.js (App Router) com TypeScript em modo `strict`, publicado na Vercel.
  Componentes MUST ser tipados; `any` é proibido salvo justificativa registrada no PR. Server
  Components MUST ser o padrão; `"use client"` MUST ser usado apenas onde houver interatividade
  real e sempre no componente mais profundo possível.
- **Renderização**: o conteúdo público MUST ser estático ou revalidado incrementalmente.
  Renderização dinâmica por requisição MUST ser justificada no PR.
- **Camada de servidor**: recursos que exijam servidor — cabeçalhos de segurança, proxy e cache
  de APIs de terceiros, upload e, se houver login, o fluxo OIDC — MUST ser implementados por
  middleware, route handlers e server actions do próprio framework. Um backend separado MUST NOT
  ser introduzido sem emenda a esta constituição.
- **Estilização**: Tailwind CSS v4 com os tokens de design declarados em `@theme`, que constitui
  a única fonte de verdade para cores, espaçamentos, tipografia e raios. Valores arbitrários em
  classes utilitárias (ex.: `bg-[#d4af37]`, `p-[13px]`) são proibidos e MUST ser bloqueados por
  lint. Tipografia fluida MUST usar `clamp()`; layout MUST usar Flex/Grid e container queries.
- **Bibliotecas de UI**: kits visuais completos MUST ser evitados. Componentes MUST ser próprios
  e reutilizáveis; primitivas acessíveis sem estilo (ex.: Radix) são permitidas quando reduzirem
  risco de acessibilidade.
- **Persistência (somente quando necessária)**: esta constituição MUST NOT presumir banco de
  dados. Quando uma feature exigir persistência, MUST ser adotado um banco relacional gerenciado
  com acesso por consultas parametrizadas e migrações versionadas no repositório; concatenação
  de SQL é proibida.
- **Armazenamento de mídia**: imagens curadas MUST ser versionadas no repositório e otimizadas
  em tempo de build. Arquivos enviados por usuário, quando existirem, MUST ir para armazenamento
  de objetos gerenciado, nunca para o diretório público do projeto e nunca para o banco.
- **Processamento de imagem**: a otimização MUST usar o componente de imagem nativo do framework
  e formatos AVIF/WebP. Invocar ferramentas externas de linha de comando sobre arquivos enviados
  é proibido.
- **3D e animação (stack homologada)**: `three.js` via `@react-three/fiber` + `@react-three/drei`
  para cenas 3D; `motion` (Framer Motion) ou a Web Animations API nativa para transições de UI.
  Efeitos simples de profundidade MUST preferir CSS nativo (`transform-3d`, `perspective`,
  `scroll-timeline`, `view-transition`) antes de recorrer a WebGL. Qualquer biblioteca fora
  desta lista MUST ser justificada no PR com custo em KB e alternativa avaliada.
- **Autenticação (quando aplicável)**: biblioteca OIDC madura e mantida do ecossistema do
  framework (ex.: Auth.js), com provedores Apple, Google, Microsoft e Facebook configuráveis.
  Implementações caseiras de OAuth são proibidas.
- **Sem dados sensíveis**: nenhum segredo, token ou chave MUST ser versionado; configuração
  sensível fica em variáveis de ambiente da plataforma. Somente variáveis com prefixo público
  explícito (`NEXT_PUBLIC_*`) podem chegar ao navegador.
- **Movimento**: animações MUST respeitar `prefers-reduced-motion` e não bloquear a renderização
  do conteúdo principal.
- **Dependências**: pacotes MUST vir do registro oficial do npm com versões travadas por arquivo
  de lock versionado. Dependências sem manutenção há mais de 24 meses MUST ser evitadas.
- **Recursos de terceiros**: scripts, fontes e imagens externas MUST ser evitados; fontes MUST
  ser auto-hospedadas pelo otimizador nativo do framework. Quando um recurso externo for
  inevitável, MUST usar `Subresource Integrity` e `crossorigin`, e ser declarado na CSP.

## Requisitos de Segurança e Privacidade

### Cabeçalhos de segurança (obrigatórios em produção)

Toda resposta HTML MUST incluir:

| Cabeçalho | Valor mínimo exigido |
|---|---|
| `Content-Security-Policy` | `default-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), camera=(), microphone=(), payment=()` |
| `X-Frame-Options` | `DENY` (redundância para navegadores legados) |

CSP com `unsafe-inline` ou `unsafe-eval` em `script-src` MUST NOT ser usada; se estilos inline
forem necessários, MUST ser usados nonces ou hashes gerados no build.

### Formulário de contato (quando existir)

Estas regras aplicam-se somente se a aplicação coletar dados pessoais por formulário. Uma
entrega que ofereça apenas links diretos de contato está dispensada desta subseção.

- Validação servidor: nome ≤ 80 caracteres, mensagem ≤ 1000 caracteres, e-mail/telefone
  validados por formato antes de qualquer processamento.
- Rate limiting MUST ser aplicado por IP (ex.: 5 envios por 10 minutos) na camada de servidor ou
  de borda da plataforma de hospedagem.
- Proteção antibot MUST existir (honeypot + verificação de tempo mínimo de preenchimento, ou
  CAPTCHA que não colete dados além do necessário).
- Antiforgery MUST estar habilitado para requisições mutáveis.
- CORS MUST usar allow-list explícita de origens; `AllowAnyOrigin` combinado com credenciais é
  proibido.

### Privacidade e conformidade (LGPD)

- A página MUST exibir aviso de privacidade acessível explicando quais dados são coletados,
  a finalidade, o período de retenção e o canal para exclusão.
- Consentimento explícito MUST ser obtido antes do envio de dados de contato; caixas
  pré-marcadas são proibidas.
- Analytics e pixels de rede social MUST ser carregados somente após consentimento e MUST NOT
  receber dados pessoais identificáveis.
- Logs MUST NOT registrar conteúdo de mensagens, telefones ou e-mails em texto claro.

### Resposta a incidentes

- Vulnerabilidade de severidade crítica ou alta MUST ser corrigida em até 7 dias corridos após
  a descoberta; média em até 30 dias.
- Suspeita de vazamento de dados pessoais MUST ser registrada e comunicada aos titulares
  afetados conforme a LGPD.
- Um arquivo `SECURITY.md` MUST existir no repositório descrevendo o canal de divulgação
  responsável de vulnerabilidades.

## Integrações, Identidade e Camada 3D

### Orçamentos de performance (verificáveis)

| Métrica | Limite |
|---|---|
| Bundle inicial (JS comprimido, pré-interação) | ≤ 180 KB |
| Chunk 3D total (runtime + modelos + texturas) | ≤ 1,5 MB |
| Maior textura individual | ≤ 2048x2048, formato KTX2 |
| Modelos | glTF/GLB com Draco ou Meshopt |
| Quadros por segundo | ≥ 60 desktop / ≥ 30 mobile |
| INP | ≤ 200 ms |

Exceder qualquer limite MUST bloquear o merge até correção ou justificativa registrada em
Complexity Tracking do plano.

### Regras da camada 3D e de animação

- A cena 3D MUST viver em um componente isolado, importado por `React.lazy`, envolto em
  `Suspense` com fallback visual estático e em um error boundary que degrada para 2D em caso de
  falha de contexto WebGL.
- O loop de renderização MUST usar renderização sob demanda (`frameloop="demand"`) sempre que a
  cena não exigir animação contínua, e MUST parar em `visibilitychange` ou ao sair da viewport.
- `devicePixelRatio` MUST ser limitado (máximo 2) e antialiasing desabilitado em dispositivos de
  baixo desempenho.
- Geometrias, materiais e texturas MUST ser descartados (`dispose()`) ao desmontar a cena.
- Transições de UI MUST ter duração entre 150ms e 400ms; animações mais longas MUST ser
  interrompíveis pelo usuário.
- Se WebGL for usado, a CSP MUST permanecer sem `unsafe-eval`; bibliotecas que exijam `eval`
  MUST NOT ser adotadas.

### Contrato de integração com redes sociais

- Cada provedor MUST ser exposto ao frontend por um endpoint próprio (ex.: `/api/social/feed`),
  nunca por chamada direta do navegador à API do provedor.
- Toda integração MUST definir: timeout (≤ 5s), política de retry com backoff, cache com TTL
  (≥ 10 min), e um conteúdo estático de fallback versionado no repositório.
- Embeds de terceiros (iframes de Instagram, YouTube, TikTok) MUST usar carregamento facade
  (imagem + clique para ativar), `loading="lazy"`, `sandbox` e domínios declarados na CSP.
- Nenhum SDK de rede social MUST ser carregado antes de consentimento do usuário, conforme os
  requisitos de LGPD desta constituição.
- Credenciais de API MUST ser rotacionadas em caso de suspeita de exposição e MUST ter escopo
  mínimo de leitura.

### Identidade federada (se e quando houver login)

- Provedores mínimos suportados: **Apple**, **Google**, **Microsoft** e **Facebook**.
- Fluxo obrigatório: OpenID Connect, Authorization Code com PKCE, `state` e `nonce` validados,
  `redirect_uri` em allow-list exata, validação de assinatura e de `iss`/`aud` do `id_token`.
- Sessão MUST usar cookie `HttpOnly`, `Secure`, `SameSite=Lax`, com expiração e rotação de
  refresh token. Tokens MUST NOT trafegar por URL nem ser persistidos no navegador via storage.
- Contas MUST ser vinculadas por identificador estável do provedor (`sub`), nunca por e-mail,
  dado que a Apple pode fornecer e-mail relay privado e mutável.
- Logout MUST invalidar a sessão no servidor, não apenas limpar o cookie.
- Adicionar um novo provedor MUST NOT exigir alteração na camada de UI.

## Galeria, Comentários e Avaliações

### Limites de upload (verificáveis)

| Regra | Limite |
|---|---|
| Tamanho por arquivo | ≤ 10 MB |
| Arquivos por envio | ≤ 10 |
| Dimensão máxima aceita | 8000 x 8000 px |
| Formatos aceitos | JPEG, PNG, WebP, AVIF, HEIC |
| Formatos servidos | AVIF com fallback WebP |
| Derivadas geradas | 400w, 800w, 1200w, 1600w |
| Taxa de upload | ≤ 20 arquivos / 10 min por conta |

### Pipeline obrigatório de upload

1. Validação de autenticação e autorização de administrador.
2. Validação de tamanho e contagem **antes** de ler o corpo inteiro na memória (streaming).
3. Detecção de tipo real por magic number; rejeição imediata de qualquer outro formato.
4. Reencode completo da imagem, descartando o binário original e todo o EXIF.
5. Geração das derivadas responsivas e de um placeholder de baixa resolução (para evitar CLS).
6. Gravação com nome gerado pelo servidor (GUID) em armazenamento dedicado.
7. Registro de metadados no banco: autor, data, legenda, texto alternativo e status.

Texto alternativo MUST ser obrigatório no formulário de upload, conforme o Princípio IV.
Falha em qualquer etapa MUST resultar em rejeição completa, sem persistir arquivo parcial.

### Comentários e avaliações

- Modelo mínimo: nome de exibição (≤ 60 caracteres), nota inteira de 1 a 5, comentário
  (≤ 1000 caracteres), data e status (`pendente`, `aprovado`, `rejeitado`, `removido`).
- Somente registros `aprovado` MUST ser retornados por endpoints públicos; o filtro MUST ocorrer
  no servidor, nunca no cliente.
- Texto MUST ser tratado como dado, nunca como HTML; renderização MUST usar escape do React.
  Links em comentários MUST ser desativados ou receber `rel="nofollow ugc noopener"`.
- Rate limiting MUST ser aplicado por IP (ex.: 3 envios por hora) somado a honeypot e tempo
  mínimo de preenchimento.
- A UI MUST exibir a média com uma casa decimal, a contagem total e a distribuição por nota, e
  MUST usar dados estruturados JSON-LD `AggregateRating`/`Review` — somente com avaliações
  reais e aprovadas.
- Listagens MUST ser paginadas (≤ 20 itens por página) e MUST NOT bloquear a renderização
  inicial da página.
- O titular MUST poder solicitar remoção do próprio comentário ou imagem por um canal indicado
  no aviso de privacidade; o atendimento MUST ocorrer em até 15 dias.

### Moderação

- MUST existir uma área autenticada de moderação que permita aprovar, rejeitar e remover
  conteúdo, e visualizar o item pendente antes da decisão.
- Toda ação de moderação MUST ser registrada em log de auditoria com autor, ação e data.
- Conteúdo removido MUST sair do cache público e das respostas de API imediatamente.

## Fluxo de Desenvolvimento e Portões de Qualidade

1. Toda funcionalidade começa por uma especificação (`/speckit.specify`) e um plano
   (`/speckit.plan`) antes de qualquer código.
2. O build MUST passar (`npm run build`) e a verificação de tipos MUST terminar sem erros antes
   de considerar uma tarefa concluída.
3. `npm run lint` MUST terminar sem erros; avisos novos MUST ser resolvidos ou justificados.
4. Toda alteração visual MUST ser validada nas três larguras de referência do Princípio II.
5. Antes de publicar, a página MUST ser auditada com Lighthouse: Performance ≥ 90,
   Acessibilidade ≥ 95, SEO ≥ 95, Melhores Práticas ≥ 95 em perfil mobile.
6. `npm audit --audit-level=high` MUST terminar sem achados de severidade alta ou crítica.
7. Nenhum segredo MUST ser introduzido no histórico; PRs MUST passar por varredura de segredos
   antes do merge.
8. Os cabeçalhos de segurança MUST ser verificados no ambiente publicado a cada release
   (ex.: via `curl -I` ou scanner de cabeçalhos), com evidência anexada à release.
9. Toda alteração que toque entrada de usuário, autenticação, CORS, CSP ou dependências MUST
   receber revisão explícita de segurança antes do merge.
10. O tamanho do bundle MUST ser inspecionado a cada PR que altere dependências ou a cena 3D;
    estouro dos orçamentos da seção "Integrações, Identidade e Camada 3D" bloqueia o merge.
11. Toda animação ou cena 3D MUST ser validada com `prefers-reduced-motion: reduce` ativo e em
    um dispositivo móvel de referência (ou throttling de CPU 4x no DevTools).
12. Toda integração externa MUST ser testada também no cenário de falha (provedor fora do ar,
    timeout, resposta vazia), comprovando o fallback estático.
13. Toda alteração no fluxo de upload MUST ser validada com casos maliciosos: arquivo com
    extensão falsa, polyglot, SVG com script, arquivo acima do limite e nome com path traversal.
    Todos MUST ser rejeitados.
14. Toda alteração em comentários ou avaliações MUST ser validada contra payload de XSS e MUST
    comprovar que conteúdo `pendente` não aparece em endpoint público.
15. Commits MUST ser pequenos, descritivos e escopados a uma tarefa do `tasks.md`.

## Governance

Esta constituição supersede quaisquer outras práticas informais do projeto. Toda revisão de
código MUST verificar conformidade com os princípios acima; violações MUST ser corrigidas ou
explicitamente justificadas na seção de Complexity Tracking do plano.

Emendas MUST ser propostas por alteração deste arquivo, acompanhadas de justificativa e do
impacto nos templates dependentes (`plan-template.md`, `spec-template.md`, `tasks-template.md`).

Versionamento semântico desta constituição:

- **MAJOR**: remoção ou redefinição incompatível de princípios ou governança.
- **MINOR**: adição de princípio/seção ou expansão material de diretriz.
- **PATCH**: esclarecimentos, correções de texto e refinamentos não semânticos.

**Version**: 2.0.0 | **Ratified**: 2026-09-18 | **Last Amended**: 2026-09-18
