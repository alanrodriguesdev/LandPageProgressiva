import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Fundo = "fundo" | "superficie" | "superficie-alt" | "contraste";

const FUNDOS: Record<Fundo, string> = {
  fundo: "bg-bg",
  superficie: "bg-surface",
  "superficie-alt": "bg-surface",
  contraste: "bg-text text-white",
};

interface PropriedadesSecao {
  id: string;
  /** Rotula a região para leitores de tela; normalmente o id do título. */
  rotuladaPor?: string;
  fundo?: Fundo;
  className?: string;
  children: ReactNode;
}

/**
 * Invólucro padrão de seção. Recebe `tabIndex={-1}` para que o salto por
 * âncora mova o foco do teclado junto com a rolagem (FR-020, D-011).
 */
export function Secao({
  id,
  rotuladaPor,
  fundo = "fundo",
  className,
  children,
}: PropriedadesSecao) {
  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={rotuladaPor}
      className={cn("py-secao", FUNDOS[fundo], className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
