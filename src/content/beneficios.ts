import { esquemaBeneficio, validarColecao, type Beneficio } from "./schema";

/** Diferenciais do atendimento exibidos logo abaixo do hero. */
export const beneficios: Beneficio[] = validarColecao("beneficios", esquemaBeneficio, [
  {
    id: "sem-formol",
    titulo: "Fórmulas sob medida",
    descricao:
      "Tratamentos adaptados ao seu tipo de cabelo, com cuidado profissional e acabamento natural.",
    icone: "folha",
  },
  {
    id: "diagnostico",
    titulo: "Diagnóstico antes de tudo",
    descricao:
      "Cada atendimento começa com teste de mecha e análise do fio para escolher a técnica certa.",
    icone: "lupa",
  },
  {
    id: "resultado-natural",
    titulo: "Movimento natural",
    descricao:
      "Alinhamento com brilho e balanço, sem aquele efeito chapado que denuncia a química.",
    icone: "brilho",
  },
  {
    id: "duracao",
    titulo: "Durabilidade real",
    descricao: "Resultado que acompanha você por meses, com orientação de manutenção em casa.",
    icone: "relogio",
  },
  {
    id: "produtos",
    titulo: "Produtos profissionais",
    descricao: "Marcas homologadas e rastreáveis, aplicadas na dosagem correta para o seu fio.",
    icone: "frasco",
  },
  {
    id: "acolhimento",
    titulo: "Atendimento sem pressa",
    descricao: "Uma cliente por vez, em horário reservado, com tempo para explicar cada etapa.",
    icone: "coracao",
  },
]);
