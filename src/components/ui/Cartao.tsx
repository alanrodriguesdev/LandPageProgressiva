import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PropriedadesCartao {
  /** Eleva o cartão com fundo e sombra mais fortes; usado em itens de destaque. */
  destacado?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Superfície elevada. A profundidade vem só de sombra em camadas (D-004) —
 * nunca soma borda a uma sombra larga, que é o "cartão fantasma".
 */
export function Cartao({ destacado = false, className, children }: PropriedadesCartao) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-cartao p-6",
        "transition-all duration-300 hover:-translate-y-0.5",
        "motion-reduce:transition-none",
        destacado ? "bg-bg shadow-alta hover:shadow-alta" : "bg-surface shadow-baixa hover:shadow-media",
        className,
      )}
    >
      {children}
    </article>
  );
}
