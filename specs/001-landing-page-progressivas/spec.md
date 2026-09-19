# Feature Specification: Landing Page de Progressivas e Cabeleireiro

**Feature Branch**: `001-landing-page-progressivas`

**Created**: 2026-09-18

**Status**: Draft

**Input**: User description: "Implemente a landing page definida na especificação usando Next.js, React, TypeScript e Tailwind CSS. Crie uma aplicação moderna, responsiva e otimizada para divulgação de serviços de progressiva e cabeleireiro. Siga a especificação gerada anteriormente, garantindo: componentes reutilizáveis; layout mobile-first; textos em português do Brasil; botões de agendamento via WhatsApp; SEO básico; design elegante com tons nude, rosa claro, bege, branco e dourado; seções de hero, benefícios, serviços, antes e depois, sobre, depoimentos, CTA, contato e footer. O resultado final deve estar pronto para rodar localmente e ser publicado na Vercel."

## Clarifications

### Session 2026-09-18

- Q: Qual plataforma de execução e hospedagem adotar, dado o conflito entre o pedido
  (Next.js/Vercel) e a constituição vigente (ASP.NET Core + Aspire + React/Vite)? → A: Adotar
  Next.js publicado na Vercel e aposentar os projetos .NET existentes; a constituição será
  emendada em versão MAJOR para substituir a stack.
- Q: Como reconciliar o pedido de Tailwind CSS com a exigência constitucional de tokens
  centralizados em variáveis CSS? → A: Adotar Tailwind CSS v4 declarando os tokens de design em
  `@theme`, de modo que as variáveis CSS sejam a única fonte de verdade; valores literais de cor,
  espaçamento ou tipografia em classes utilitárias arbitrárias são proibidos e verificados por
  lint.
- Q: De onde vem o conteúdo da galeria e dos depoimentos nesta entrega? → A: Conteúdo curado e
  versionado no próprio repositório, em arquivos tipados com imagens otimizadas em tempo de
  build. Sem banco de dados, sem CMS externo e sem área administrativa nesta entrega.
- Q: A página terá formulário de contato com processamento de dados pessoais? → A: Não. O
  contato ocorre exclusivamente por links diretos de WhatsApp, telefone e e-mail; nenhum dado
  pessoal é coletado, transmitido ou armazenado pela aplicação.
- Q: Quais são os dados reais de contato e atendimento a publicar? → A: Ainda indisponíveis. A
  implementação seguirá com valores provisórios centralizados em um único arquivo de
  configuração, claramente identificados como pendentes, para substituição em um só lugar antes
  da publicação em produção.
- Q: Como a visitante navega entre as seções da página? → A: Cabeçalho fixo enxuto com links
  âncora e botão de agendamento sempre visível. Em telas pequenas exibe apenas identidade visual
  e botão de agendamento; em telas maiores exibe também os links de seção. Não há menu sanduíche
  nem painel sobreposto.
- Q: Haverá medição de audiência e será necessário banner de consentimento? → A: Sim à medição,
  não ao banner. Será usada medição agregada sem cookies e sem identificação individual de
  visitantes, o que dispensa consentimento por ausência de tratamento de dado pessoal.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Descobrir o serviço e agendar pelo WhatsApp (Priority: P1)

Uma visitante recebe o link da página por Instagram ou WhatsApp e abre no celular. Em poucos
segundos ela entende qual serviço é oferecido, vê uma prova visual do resultado e toca em um
botão que abre a conversa de WhatsApp já com uma mensagem pronta de agendamento.

**Why this priority**: é a única jornada que gera receita. Sem ela, todo o resto da página é
decoração. Entregue sozinha, já constitui um MVP comercializável.

**Independent Test**: abrir a página em um celular, sem rolar, identificar o serviço e tocar no
botão principal, confirmando que o aplicativo de WhatsApp abre com a mensagem pré-preenchida.

**Acceptance Scenarios**:

1. **Given** a visitante abre a página em um celular de 360px de largura, **When** a página
   termina de carregar, **Then** o nome do serviço, a proposta de valor e um botão de
   agendamento estão visíveis sem rolagem.
2. **Given** a visitante está em qualquer seção da página, **When** ela procura por uma forma de
   contato, **Then** existe um botão de agendamento acessível em no máximo uma rolagem de tela.
3. **Given** a visitante toca no botão de agendamento, **When** o dispositivo possui WhatsApp
   instalado, **Then** a conversa abre com uma mensagem inicial em português já escrita.
4. **Given** a visitante toca no botão de agendamento em um computador sem WhatsApp instalado,
   **When** o link é acionado, **Then** a versão web do WhatsApp é aberta em nova aba.

---

### User Story 2 - Avaliar a qualidade do trabalho antes de decidir (Priority: P2)

A visitante ainda em dúvida percorre a página buscando evidências: fotos reais de antes e
depois, a descrição dos serviços oferecidos, quem é a profissional e o que outras clientes
dizem. Só então decide entrar em contato.

**Why this priority**: prova social e portfólio são o que converte a visitante indecisa. É a
segunda maior alavanca de conversão, mas a página já funciona sem ela.

**Independent Test**: percorrer a página do topo ao rodapé e verificar que benefícios, serviços,
galeria antes/depois, apresentação da profissional e depoimentos estão presentes, legíveis e
navegáveis por toque e por teclado.

**Acceptance Scenarios**:

1. **Given** a visitante rola até a seção de serviços, **When** a seção é exibida, **Then** cada
   serviço apresenta nome, descrição curta e indicação de duração ou faixa de investimento.
2. **Given** a visitante rola até a galeria antes e depois, **When** ela interage com um item,
   **Then** é possível comparar as duas imagens do mesmo trabalho de forma clara.
3. **Given** a visitante rola até os depoimentos, **When** a seção é exibida, **Then** cada
   depoimento apresenta autoria e avaliação, e a média geral é exibida junto da quantidade total.
4. **Given** a visitante chega ao final da página, **When** o rodapé é exibido, **Then** contato,
   endereço, horário de atendimento e links de redes sociais estão disponíveis.

---

### User Story 3 - Compartilhar e ser encontrada (Priority: P3)

A profissional cola o link da página em uma publicação de rede social ou em uma conversa. O
preview exibe uma imagem atraente, o nome do serviço e uma chamada. Além disso, pessoas que
buscam pelo serviço na região encontram a página em mecanismos de busca.

**Why this priority**: amplia o alcance, mas depende das jornadas anteriores já existirem para
ter o que divulgar.

**Independent Test**: colar a URL em um validador de preview de link e em uma conversa real,
confirmando que título, descrição e imagem aparecem corretamente.

**Acceptance Scenarios**:

1. **Given** o link é compartilhado em uma rede social, **When** o preview é gerado, **Then**
   título, descrição e imagem de destaque são exibidos corretamente.
2. **Given** um mecanismo de busca rastreia a página, **When** o conteúdo é indexado, **Then**
   há título único, descrição e dados estruturados de negócio local com avaliação agregada.

---

### Edge Cases

- **Sem WhatsApp disponível**: o dispositivo não tem o aplicativo nem acesso à versão web. A
  página deve manter telefone e e-mail visíveis como links diretos acionáveis, sem depender de
  detecção de aplicativo instalado.
- **Conexão lenta ou economia de dados**: a página deve permanecer legível e com o botão de
  agendamento funcional antes de imagens pesadas e efeitos visuais terminarem de carregar.
- **Galeria vazia**: ainda não há trabalhos publicados. A seção deve ser omitida por completo em
  vez de exibir área vazia ou quebrada.
- **Sem depoimentos aprovados**: a seção de depoimentos e a média de avaliação devem ser
  omitidas, e nenhum dado estruturado de avaliação deve ser publicado.
- **Movimento reduzido**: a visitante ativou preferência de redução de movimento. Todo o
  conteúdo permanece acessível, sem animações não essenciais.
- **Imagem indisponível**: uma foto da galeria falha ao carregar. O espaço reservado deve ser
  mantido, sem deslocar o restante do layout.
- **Visitante usando apenas teclado ou leitor de tela**: todas as seções, a comparação antes e
  depois e os botões de contato devem ser operáveis e descritos.

## Requirements *(mandatory)*

### Functional Requirements

#### Estrutura e conteúdo

- **FR-001**: A página MUST apresentar, nesta ordem, as seções: hero, benefícios, serviços,
  antes e depois, sobre a profissional, depoimentos, chamada para ação, contato e rodapé.
- **FR-002**: Todo o conteúdo textual visível MUST estar em português do Brasil, incluindo
  mensagens de erro, textos alternativos e rótulos de acessibilidade.
- **FR-003**: O conteúdo editorial (serviços, benefícios, depoimentos, dados de contato,
  horários) MUST ser mantido em uma fonte de dados estruturada e separada da apresentação,
  permitindo alteração de textos sem alterar componentes visuais.
- **FR-004**: A seção de serviços MUST listar cada serviço com nome, descrição e ao menos um
  indicador de duração ou faixa de investimento.
- **FR-005**: A seção antes e depois MUST permitir comparar as duas imagens de um mesmo
  trabalho, com controle operável por toque, mouse e teclado.
- **FR-006**: A seção de depoimentos MUST exibir autoria, nota de 1 a 5, a média com uma casa
  decimal e a quantidade total de avaliações consideradas.
- **FR-007**: O rodapé MUST conter dados de contato, área de atendimento, horário de
  funcionamento, links de redes sociais e um link para o aviso de privacidade.

#### Conversão e contato

- **FR-008**: A página MUST exibir um botão de agendamento por WhatsApp visível na primeira tela
  em qualquer viewport, sem rolagem.
- **FR-009**: Um ponto de contato MUST estar acessível a partir de qualquer posição da página em
  no máximo uma rolagem de tela.
- **FR-009a**: A página MUST possuir um cabeçalho fixo contendo a identidade visual e um botão de
  agendamento sempre visível. Em larguras maiores, o cabeçalho MUST exibir também links âncora
  para as seções. A navegação MUST NOT depender de menu sobreposto ou painel expansível, e os
  links âncora MUST mover o foco do teclado para a seção correspondente.
- **FR-010**: Todo botão de agendamento MUST abrir a conversa de WhatsApp com uma mensagem
  inicial pré-preenchida em português, identificando o serviço de interesse quando acionado a
  partir de um serviço específico.
- **FR-011**: Links de saída para WhatsApp e redes sociais MUST carregar identificação de origem
  para permitir atribuição de conversão.
- **FR-012**: A página MUST oferecer ao menos uma alternativa de contato além do WhatsApp,
  disponibilizada como link direto de telefone e de e-mail.
- **FR-013**: A aplicação MUST NOT coletar, transmitir ou armazenar dados pessoais de
  visitantes. Nenhum formulário de contato MUST ser oferecido nesta entrega; o contato ocorre
  exclusivamente por links diretos para canais externos.

#### Apresentação e acessibilidade

- **FR-014**: O layout MUST ser construído a partir do viewport de 320px e funcionar
  integralmente nas larguras de referência de 360px, 768px e 1440px.
- **FR-015**: Elementos interativos MUST possuir área de toque de no mínimo 44 por 44 pixels e
  indicador de foco visível.
- **FR-016**: A identidade visual MUST usar a paleta de tons nude, rosa claro, bege, branco e
  dourado, definida em um conjunto centralizado de tokens de design que constitui a única fonte
  de verdade. Valores literais de cor, espaçamento, tipografia ou raio MUST NOT ser declarados
  diretamente nos componentes, e essa restrição MUST ser verificada automaticamente por lint.
- **FR-017**: Toda combinação de texto e fundo MUST atingir contraste mínimo WCAG AA.
- **FR-018**: Toda imagem informativa MUST possuir texto alternativo descritivo; imagens
  puramente decorativas MUST ser ocultadas de tecnologias assistivas.
- **FR-019**: Quando a preferência de redução de movimento estiver ativa, animações não
  essenciais MUST ser desativadas sem perda de conteúdo ou de função.
- **FR-020**: A página MUST ser integralmente navegável por teclado, em ordem de foco lógica,
  com um atalho para pular ao conteúdo principal.

#### Descoberta e compartilhamento

- **FR-021**: A página MUST expor título e descrição únicos, metadados de compartilhamento
  social com imagem de destaque e URL canônica.
- **FR-022**: A página MUST publicar dados estruturados de negócio local do segmento de beleza,
  incluindo avaliação agregada somente quando houver avaliações reais aprovadas.
- **FR-023**: A medição de audiência MUST ser agregada, sem cookies, sem armazenamento no
  dispositivo e sem identificação individual da visitante. Qualquer script que utilize cookies,
  identificadores persistentes ou pixels de rede social MUST NOT ser carregado sem consentimento
  explícito, e nenhum script desse tipo MUST ser adotado nesta entrega.
- **FR-023a**: A medição MUST registrar os acionamentos dos botões de agendamento de forma
  anonimizada, distinguindo a seção de origem, sem coletar qualquer atributo da visitante.

#### Publicação e operação

- **FR-024**: O projeto MUST ser executável localmente por meio de um comando documentado, sem
  exigir configuração manual além de variáveis de ambiente descritas no repositório.
- **FR-025**: Nenhum segredo, chave ou token MUST estar versionado no repositório ou acessível
  no código entregue ao navegador.
- **FR-026**: Seções sem conteúdo disponível MUST ser omitidas da renderização em vez de exibir
  área vazia.
- **FR-027**: Todo o conteúdo da galeria e dos depoimentos MUST ser curado e versionado no
  repositório, sem dependência de banco de dados, serviço de gestão de conteúdo externo ou área
  administrativa nesta entrega.
- **FR-028**: O conteúdo versionado MUST ser validado automaticamente em tempo de build quanto a
  campos obrigatórios — incluindo texto alternativo de imagens e nota entre 1 e 5 em
  depoimentos — falhando a publicação quando um registro estiver incompleto ou inválido.
- **FR-029**: Os dados do negócio — nome, número de WhatsApp, telefone, e-mail, área de
  atendimento, horários e perfis de redes sociais — MUST residir em um único arquivo de
  configuração centralizado, referenciado por todas as seções, de modo que a substituição dos
  valores provisórios ocorra em um único ponto.
- **FR-030**: Enquanto houver valores provisórios pendentes, eles MUST ser identificáveis de
  forma inequívoca no código-fonte, e a publicação em produção MUST ser bloqueada até que todos
  sejam substituídos por dados reais.

### Key Entities *(include if feature involves data)*

- **Serviço**: um procedimento oferecido. Atributos: identificador, nome, descrição curta,
  duração estimada, faixa de investimento, imagem ilustrativa, destaque (sim/não).
- **Benefício**: um diferencial do atendimento. Atributos: título, descrição curta, ícone.
- **Trabalho (antes e depois)**: registro visual de um resultado. Atributos: identificador,
  imagem antes, imagem depois, texto alternativo de cada imagem, legenda, serviço relacionado,
  data de publicação.
- **Depoimento**: avaliação publicada de uma cliente. Atributos: nome de exibição, nota de 1 a
  5, texto, data, status de publicação.
- **Perfil da profissional**: apresentação institucional. Atributos: nome, foto, biografia,
  formações ou especializações.
- **Dados de contato**: canais e localização. Atributos: número de WhatsApp, telefone
  alternativo, e-mail, endereço ou área de atendimento, horários, perfis de redes sociais.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Uma visitante que abre a página pela primeira vez em um celular consegue iniciar
  uma conversa de agendamento em até 15 segundos e no máximo dois toques.
- **SC-002**: A página exibe seu conteúdo principal em até 2,5 segundos em conexão móvel de
  referência, com deslocamento visual de layout abaixo de 0,1.
- **SC-003**: A página é totalmente utilizável, sem quebra de layout ou conteúdo cortado, nas
  três larguras de referência de 360px, 768px e 1440px.
- **SC-004**: Uma auditoria automatizada de qualidade atinge, em perfil móvel, pelo menos 90 em
  desempenho e 95 em acessibilidade, SEO e boas práticas.
- **SC-005**: 100% dos elementos interativos são alcançáveis e acionáveis somente pelo teclado,
  com foco sempre visível.
- **SC-006**: O compartilhamento do link em redes sociais e mensageiros gera preview com título,
  descrição e imagem corretos em 100% das tentativas.
- **SC-007**: Com a preferência de redução de movimento ativa, nenhuma informação ou função da
  página deixa de estar disponível.
- **SC-008**: Uma pessoa sem conhecimento técnico consegue alterar textos, preços e a lista de
  serviços editando apenas a fonte de conteúdo, sem tocar em componentes visuais.
- **SC-009**: O projeto é colocado em execução local por uma pessoa nova no repositório em até
  10 minutos seguindo apenas a documentação.
- **SC-010**: É possível identificar, a partir da medição agregada, quantas visitas resultaram em
  acionamento do botão de agendamento e a partir de qual seção, sem que nenhum dado pessoal
  tenha sido coletado.

## Assumptions

- **Escopo desta entrega**: esta especificação cobre a landing page pública de divulgação. A
  área autenticada de upload de imagens, o envio de comentários pelas clientes e o painel de
  moderação — previstos no Princípio X da constituição — ficam fora deste escopo e serão
  tratados em uma especificação própria. Nesta entrega, galeria e depoimentos são alimentados
  por conteúdo curado e versionado no repositório, conforme decidido na sessão de clarificação,
  o que dispensa banco de dados e armazenamento de objetos neste escopo.
- **Sem autenticação**: nenhuma jornada desta entrega exige login. O suporte a identidade
  federada previsto na constituição permanece uma preparação arquitetural, não uma feature.
- **Sem processamento de dados pessoais**: como não há formulário nem coleta, as exigências de
  validação de entrada, limitação de taxa e retenção de dados de contato não se aplicam a esta
  entrega. A medição de audiência é agregada e sem cookies, portanto não constitui tratamento de
  dado pessoal e dispensa banner de consentimento. O aviso de privacidade permanece obrigatório
  para descrever a ausência de coleta, o uso de imagens de clientes e o canal de solicitação de
  remoção.
- **Conteúdo fornecido**: fotos de antes e depois, textos institucionais e depoimentos reais
  serão fornecidos pela profissional. Enquanto não existirem, conteúdo de exemplo claramente
  identificado como provisório será usado e as seções vazias serão omitidas. O mesmo vale para
  os dados do negócio, conforme FR-029 e FR-030.
- **Consentimento de imagem**: presume-se que a profissional obteve autorização das clientes
  para publicar as fotos dos trabalhos; a página oferecerá canal para solicitação de remoção.
- **Público-alvo**: majoritariamente mulheres acessando por celular a partir de links
  compartilhados em redes sociais, em conexão móvel e com atenção curta.
- **Idioma único**: a página é publicada apenas em português do Brasil; internacionalização está
  fora de escopo.
- **Efeitos visuais**: profundidade e movimento serão obtidos preferencialmente por recursos
  nativos de estilo. Cenas tridimensionais só serão adotadas se couberem nos orçamentos de peso
  e desempenho definidos na constituição, sempre com alternativa estática.

## Registro de Decisões de Divergência

Todos os pontos abaixo foram resolvidos na sessão de clarificação de 2026-09-18:

- **DV-001 — RESOLVIDO (2026-09-18)**: adotada a plataforma Next.js com publicação na Vercel. Os
  projetos `LandPagePrograssiva.AppHost` e `LandPagePrograssiva.Server` serão aposentados, assim
  como o projeto `frontend` baseado em Vite. Requisitos de servidor exigidos pela constituição
  (cabeçalhos de segurança, proxy e cache de APIs de redes sociais, pipeline de upload e fluxo
  OIDC) passam a ser atendidos pelos recursos de servidor do próprio framework. A constituição
  MUST ser emendada em versão MAJOR antes de `/speckit.plan`.
- **DV-002 — RESOLVIDO (2026-09-18)**: adotado Tailwind CSS v4 com os tokens de design
  declarados em `@theme`, gerando variáveis CSS como única fonte de verdade. A constituição MUST
  ser emendada para homologar Tailwind como camada de utilitários sobre os tokens, mantendo
  intacta a proibição de valores literais espalhados pelos componentes (Princípio IV).
- **DV-003 — RESOLVIDO (2026-09-18)**: os dados reais de contato e atendimento ainda não estão
  disponíveis. A implementação prossegue com valores provisórios centralizados conforme FR-029 e
  FR-030, e a publicação em produção fica condicionada à substituição integral desses valores.
