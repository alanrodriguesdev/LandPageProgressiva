import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PropriedadesTitulo {
  id?: string;
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
