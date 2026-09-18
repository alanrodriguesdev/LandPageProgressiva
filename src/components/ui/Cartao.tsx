import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PropriedadesCartao {
  /** Eleva o cartão com sombra e borda dourada; usado em itens de destaque. */
  destacado?: boolean;
  className?: string;
  children: ReactNode;
}

/** Superfície elevada. A profundidade vem de sombra em camadas, não de WebGL (D-004). */
export function Cartao({ destacado = false, className, children }: PropriedadesCartao) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-cartao border border-slate-200 bg-surface p-6 shadow-baixa backdrop-blur-sm",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-media",
        "motion-reduce:transition-none",
        destacado && "border-slate-200 shadow-media",
        className,
      )}
    >
      {children}
    </article>
  );
}
