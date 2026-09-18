import { esquemaServico, validarColecao, type Servico } from "./schema";

/**
 * Cada serviço informa ao menos duração estimada ou faixa de investimento,
 * conforme FR-004 — a validação reprova o build se ambos faltarem.
 */
export const servicos: Servico[] = validarColecao("servicos", esquemaServico, [
  {
    id: "progressiva-sem-formol",
    nome: "Progressiva",
    descricao:
      "Alinhamento capilar com acabamento natural, brilho e movimento suave no fio.",
    duracaoEstimada: "3 a 4 horas",
    faixaInvestimento: "A partir de R$ 320",
    destaque: true,
  },
  {
    id: "botox-capilar",
    nome: "Botox capilar",
    descricao:
      "Reposição de massa e nutrição profunda para fios porosos, com redução imediata do frizz.",
    duracaoEstimada: "1h30 a 2 horas",
    faixaInvestimento: "A partir de R$ 180",
    destaque: false,
  },
  {
    id: "cronograma-capilar",
    nome: "Cronograma capilar",
    descricao:
      "Plano de hidratação, nutrição e reconstrução para recuperar cabelos danificados por química.",
    duracaoEstimada: "1h30 por sessão",
    faixaInvestimento: "A partir de R$ 140",
    destaque: false,
  },
  {
    id: "coloracao",
    nome: "Coloração e retoque de raiz",
    descricao:
      "Cobertura de brancos e mudança de tom com avaliação prévia de compatibilidade química.",
    duracaoEstimada: "2 a 3 horas",
    faixaInvestimento: "A partir de R$ 220",
    destaque: false,
  },
  {
    id: "corte-modelagem",
    nome: "Corte e modelagem",
    descricao: "Corte desenhado para o formato do rosto e para a textura natural do seu cabelo.",
    duracaoEstimada: "1 hora",
    faixaInvestimento: "A partir de R$ 120",
    destaque: false,
  },
  {
    id: "escova-finalizacao",
    nome: "Escova e finalização",
    descricao: "Acabamento profissional para eventos, com proteção térmica e fixação duradoura.",
    duracaoEstimada: "45 minutos",
    faixaInvestimento: "A partir de R$ 80",
    destaque: false,
  },
]);
