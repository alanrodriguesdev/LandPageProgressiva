import { servicos } from "./servicos";
import {
  esquemaTrabalho,
  validarColecao,
  validarReferenciasDeTrabalhos,
  type Trabalho,
} from "./schema";

/**
 * Pares antes/depois da galeria.
 *
 * Substitua pelas fotos reais em `public/imagens/trabalhos/`. Enquanto a
 * lista estiver vazia, a seção inteira é omitida da página (FR-026), em vez
 * de exibir uma área quebrada.
 */
export const trabalhos: Trabalho[] = validarColecao("trabalhos", esquemaTrabalho, [
  {
    id: "ondulado-para-alinhado",
    antes: {
      src: "/imagens/trabalhos/trabalho-1-antes.jpg",
      alt: "Cabelo com mechas e ondulado, textura ressecada e volume irregular antes da progressiva",
      largura: 900,
      altura: 1200,
    },
    depois: {
      src: "/imagens/trabalhos/trabalho-1-depois.jpg",
      alt: "O mesmo cabelo alinhado, liso e com brilho uniforme após a progressiva",
      largura: 900,
      altura: 1200,
    },
    legenda: "Progressiva em cabelo ondulado com frizz",
    servicoId: "progressiva-sem-formol",
    publicadoEm: "2026-01-22",
  },
  {
    id: "volume-controlado",
    antes: {
      src: "/imagens/trabalhos/trabalho-2-antes.jpg",
      alt: "Cabelo escuro extremamente volumoso e cheio de frizz antes do tratamento",
      largura: 900,
      altura: 1200,
    },
    depois: {
      src: "/imagens/trabalhos/trabalho-2-depois.jpg",
      alt: "O mesmo cabelo alinhado, liso e com brilho uniforme após o botox capilar",
      largura: 900,
      altura: 1200,
    },
    legenda: "Botox capilar para controle de frizz e volume",
    servicoId: "botox-capilar",
    publicadoEm: "2026-02-05",
  },
]);

// Integridade referencial: um servicoId órfão reprova o build.
validarReferenciasDeTrabalhos(trabalhos, servicos);
