import { describe, expect, it } from "vitest";
import {
  esquemaDepoimento,
  esquemaHorario,
  esquemaImagem,
  esquemaServico,
  validar,
  validarColecao,
  validarReferenciasDeTrabalhos,
  type Servico,
  type Trabalho,
} from "@/content/schema";

const imagemValida = {
  src: "/imagens/trabalhos/exemplo-antes.webp",
  alt: "Cabelo ondulado antes da progressiva",
  largura: 800,
  altura: 1000,
};

describe("esquemaImagem", () => {
  it("aceita imagem com texto alternativo descritivo", () => {
    expect(() => validar("imagem", esquemaImagem, imagemValida)).not.toThrow();
  });

  it("reprova imagem com alt vazio (FR-018)", () => {
    expect(() => validar("imagem", esquemaImagem, { ...imagemValida, alt: "" })).toThrow(
      /texto alternativo/i,
    );
  });

  it("reprova imagem com alt apenas de espaços", () => {
    expect(() => validar("imagem", esquemaImagem, { ...imagemValida, alt: "   " })).toThrow();
  });

  it("reprova dimensão não positiva", () => {
    expect(() => validar("imagem", esquemaImagem, { ...imagemValida, largura: 0 })).toThrow();
  });
});

describe("esquemaDepoimento", () => {
  const base = {
    id: "ana-souza",
    nomeExibicao: "Ana Souza",
    nota: 5,
    texto: "Resultado impecável, meu cabelo ficou leve e natural.",
    data: "2026-02-10",
    aprovado: true,
  };

  it("aceita depoimento válido", () => {
    expect(() => validar("depoimento", esquemaDepoimento, base)).not.toThrow();
  });

  it.each([0, 6, -1, 10])("reprova nota fora do intervalo de 1 a 5: %i", (nota) => {
    expect(() => validar("depoimento", esquemaDepoimento, { ...base, nota })).toThrow(/nota/i);
  });

  it("reprova nota fracionária", () => {
    expect(() => validar("depoimento", esquemaDepoimento, { ...base, nota: 4.5 })).toThrow(
      /inteiro/i,
    );
  });

  it("reprova data em formato inválido", () => {
    expect(() => validar("depoimento", esquemaDepoimento, { ...base, data: "10/02/2026" })).toThrow(
      /AAAA-MM-DD/,
    );
  });
});

describe("esquemaServico", () => {
  const base = {
    id: "progressiva-sem-formol",
    nome: "Progressiva sem formol",
    descricao: "Alinhamento capilar com redutores livres de formol.",
    destaque: false,
  };

  it("aceita serviço com apenas duração", () => {
    expect(() =>
      validar("servico", esquemaServico, { ...base, duracaoEstimada: "2 a 3 horas" }),
    ).not.toThrow();
  });

  it("aceita serviço com apenas faixa de investimento", () => {
    expect(() =>
      validar("servico", esquemaServico, { ...base, faixaInvestimento: "A partir de R$ 250" }),
    ).not.toThrow();
  });

  it("reprova serviço sem duração e sem faixa de investimento (FR-004)", () => {
    expect(() => validar("servico", esquemaServico, base)).toThrow(/FR-004/);
  });

  it("reprova identificador fora do formato slug", () => {
    expect(() =>
      validar("servico", esquemaServico, {
        ...base,
        id: "Progressiva Sem Formol",
        duracaoEstimada: "2 horas",
      }),
    ).toThrow(/slug/i);
  });
});

describe("esquemaHorario", () => {
  it("aceita dia fechado sem horas", () => {
    expect(() =>
      validar("horario", esquemaHorario, { diaSemana: "domingo", fechado: true }),
    ).not.toThrow();
  });

  it("reprova abertura posterior ao fechamento", () => {
    expect(() =>
      validar("horario", esquemaHorario, {
        diaSemana: "terca",
        abre: "19:00",
        fecha: "09:00",
        fechado: false,
      }),
    ).toThrow(/anterior ao fechamento/);
  });

  it("reprova dia aberto sem horas informadas", () => {
    expect(() =>
      validar("horario", esquemaHorario, { diaSemana: "quarta", fechado: false }),
    ).toThrow();
  });
});

describe("validarColecao", () => {
  const servico = {
    id: "corte",
    nome: "Corte",
    descricao: "Corte personalizado conforme o formato do rosto.",
    duracaoEstimada: "1 hora",
    destaque: false,
  };

  it("reprova identificador duplicado na coleção", () => {
    expect(() => validarColecao("servicos", esquemaServico, [servico, { ...servico }])).toThrow(
      /duplicado/i,
    );
  });

  it("aceita identificadores distintos", () => {
    expect(() =>
      validarColecao("servicos", esquemaServico, [servico, { ...servico, id: "coloracao" }]),
    ).not.toThrow();
  });
});

describe("validarReferenciasDeTrabalhos", () => {
  const servicos = [
    {
      id: "progressiva-sem-formol",
      nome: "Progressiva sem formol",
      descricao: "Alinhamento capilar.",
      duracaoEstimada: "3 horas",
      destaque: false,
    },
  ] as Servico[];

  const trabalhoBase = {
    id: "trabalho-1",
    antes: imagemValida,
    depois: { ...imagemValida, alt: "Cabelo alinhado depois da progressiva" },
    legenda: "Progressiva em cabelo ondulado",
    publicadoEm: "2026-02-10",
  };

  it("aceita referência a serviço existente", () => {
    const trabalhos = [
      { ...trabalhoBase, servicoId: "progressiva-sem-formol" },
    ] as unknown as Trabalho[];
    expect(() => validarReferenciasDeTrabalhos(trabalhos, servicos)).not.toThrow();
  });

  it("reprova referência a serviço inexistente", () => {
    const trabalhos = [{ ...trabalhoBase, servicoId: "servico-fantasma" }] as unknown as Trabalho[];
    expect(() => validarReferenciasDeTrabalhos(trabalhos, servicos)).toThrow(/não existe/);
  });

  it("aceita trabalho sem serviço associado", () => {
    const trabalhos = [trabalhoBase] as unknown as Trabalho[];
    expect(() => validarReferenciasDeTrabalhos(trabalhos, servicos)).not.toThrow();
  });
});
