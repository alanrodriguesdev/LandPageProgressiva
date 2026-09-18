import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PropriedadesTitulo {
  id?: string;
  /** Sobretítulo curto que contextualiza a seção. */
  sobretitulo?: string;
  descricao?: string;
  nivel?: 2 | 3;
  centralizado?: boolean;
  claro?: boolean;
  className?: string;
  children: ReactNode;
}

/** Cabeçalho de seção com hierarquia semântica explícita e opcionalmente clara. */
export function Titulo({
  id,
  sobretitulo,
  descricao,
  nivel = 2,
  centralizado = true,
  claro = false,
  className,
  children,
}: PropriedadesTitulo) {
  const Marcacao = nivel === 2 ? "h2" : "h3";

  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        centralizado && "items-center text-center",
        className,
      )}
    >
      {sobretitulo ? (
        <p
          className={cn(
            "inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1 text-micro font-semibold uppercase tracking-[0.18em]",
            claro ? "text-text" : "text-primary",
          )}
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          {sobretitulo}
        </p>
      ) : null}

      <Marcacao
        id={id}
        className={cn(
          nivel === 2 ? "text-titulo-g" : "text-titulo-m",
          claro && "text-white",
        )}
      >
        {children}
      </Marcacao>

      {descricao ? (
        <p
          className={cn(
            "max-w-2xl text-corpo-grande",
            claro ? "text-white" : "text-muted",
          )}
        >
          {descricao}
        </p>
      ) : null}
    </header>
  );
}
