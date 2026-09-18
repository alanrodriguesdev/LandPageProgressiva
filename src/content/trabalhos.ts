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
      src: "/imagens/trabalhos/trabalho-1-antes.svg",
      alt: "Cabelo castanho ondulado com frizz acentuado antes da progressiva",
      largura: 800,
      altura: 1000,
    },
    depois: {
      src: "/imagens/trabalhos/trabalho-1-depois.svg",
      alt: "O mesmo cabelo castanho alinhado e com brilho após a progressiva",
      largura: 800,
      altura: 1000,
    },
    legenda: "Progressiva em cabelo ondulado com frizz",
    servicoId: "progressiva-sem-formol",
    publicadoEm: "2026-01-22",
  },
  {
    id: "volume-controlado",
    antes: {
      src: "/imagens/trabalhos/trabalho-2-antes.svg",
      alt: "Cabelo loiro volumoso e ressecado nas pontas antes do tratamento",
      largura: 800,
      altura: 1000,
    },
    depois: {
      src: "/imagens/trabalhos/trabalho-2-depois.svg",
      alt: "O mesmo cabelo loiro com volume controlado e pontas hidratadas após o botox capilar",
      largura: 800,
      altura: 1000,
    },
    legenda: "Botox capilar para controle de volume em cabelo loiro",
    servicoId: "botox-capilar",
    publicadoEm: "2026-02-05",
  },
  {
    id: "recuperacao-quimica",
    antes: {
      src: "/imagens/trabalhos/trabalho-3-antes.svg",
      alt: "Cabelo danificado por química, com pontas quebradiças e aspecto opaco",
      largura: 800,
      altura: 1000,
    },
    depois: {
      src: "/imagens/trabalhos/trabalho-3-depois.svg",
      alt: "O mesmo cabelo recuperado, com fios selados e brilho uniforme após o cronograma capilar",
      largura: 800,
      altura: 1000,
    },
    legenda: "Cronograma capilar de recuperação após química mal sucedida",
    servicoId: "cronograma-capilar",
    publicadoEm: "2026-02-18",
  },
]);

// Integridade referencial: um servicoId órfão reprova o build.
validarReferenciasDeTrabalhos(trabalhos, servicos);
