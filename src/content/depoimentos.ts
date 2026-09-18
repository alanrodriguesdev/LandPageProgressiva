import { esquemaDepoimento, validarColecao, type Depoimento } from "./schema";

/**
 * Somente depoimentos com `aprovado: true` são renderizados e entram no
 * cálculo da média (FR-006). A média nunca é filtrada para parecer melhor.
 */
export const depoimentos: Depoimento[] = validarColecao("depoimentos", esquemaDepoimento, [
  {
    id: "ana-souza",
    nomeExibicao: "Ana Souza",
    nota: 5,
    texto:
      "Já tinha feito progressiva em outros lugares e sempre saía com o cabelo pesado. Aqui ficou liso, mas com movimento. E o melhor: sem aquele cheiro forte.",
    data: "2026-01-28",
    aprovado: true,
  },
  {
    id: "carla-mendes",
    nomeExibicao: "Carla Mendes",
    nota: 5,
    texto:
      "Fizeram teste de mecha antes porque eu tinha coloração. Explicaram tudo com calma e o resultado durou cinco meses.",
    data: "2026-02-09",
    aprovado: true,
  },
  {
    id: "juliana-reis",
    nomeExibicao: "Juliana Reis",
    nota: 5,
    texto:
      "Meu cabelo estava quebrando muito. O cronograma capilar salvou os fios e hoje consigo prender sem medo.",
    data: "2026-02-15",
    aprovado: true,
  },
  {
    id: "patricia-lima",
    nomeExibicao: "Patrícia Lima",
    nota: 4,
    texto:
      "Atendimento excelente e resultado muito bom. Só achei que demorou um pouco mais do que eu esperava, mas valeu a pena.",
    data: "2026-02-20",
    aprovado: true,
  },
  {
    id: "renata-alves",
    nomeExibicao: "Renata Alves",
    nota: 5,
    texto:
      "Horário reservado só para mim, sem correria. Saí de lá com o cabelo do jeito que eu queria e com orientação de como manter em casa.",
    data: "2026-03-02",
    aprovado: true,
  },
  {
    id: "beatriz-costa",
    nomeExibicao: "Beatriz Costa",
    nota: 5,
    texto:
      "Indicaram o botox em vez da progressiva porque era o que meu cabelo precisava. Gostei da honestidade de não empurrar o serviço mais caro.",
    data: "2026-03-11",
    aprovado: true,
  },
]);
