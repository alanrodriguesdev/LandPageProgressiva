import type { Depoimento } from "@/content/schema";

export interface ResumoAvaliacoes {
  media: number;
  /** Média já formatada com uma casa decimal, como exigido por FR-006. */
  mediaFormatada: string;
  total: number;
  distribuicao: Record<1 | 2 | 3 | 4 | 5, number>;
}

/** Somente depoimentos aprovados são exibidos ou contabilizados (Princípio X). */
export function filtrarAprovados(depoimentos: readonly Depoimento[]): Depoimento[] {
  return depoimentos.filter((depoimento) => depoimento.aprovado);
}

/**
 * Calcula média, total e distribuição sobre os depoimentos aprovados.
 *
 * A média é aritmética simples, sem ponderação nem filtro seletivo: inflar a
 * nota removendo avaliações baixas seria publicidade enganosa e violaria a
 * integridade exigida pelo FR-006.
 *
 * Retorna `null` quando não há avaliação aprovada, para que a seção e o
 * AggregateRating sejam omitidos (FR-022, FR-026).
 */
export function resumirAvaliacoes(depoimentos: readonly Depoimento[]): ResumoAvaliacoes | null {
  const aprovados = filtrarAprovados(depoimentos);
  if (aprovados.length === 0) return null;

  const soma = aprovados.reduce((acumulado, item) => acumulado + item.nota, 0);
  const media = soma / aprovados.length;

  const distribuicao: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const item of aprovados) {
    distribuicao[item.nota as 1 | 2 | 3 | 4 | 5] += 1;
  }

  return {
    media,
    mediaFormatada: media.toFixed(1).replace(".", ","),
    total: aprovados.length,
    distribuicao,
  };
}
