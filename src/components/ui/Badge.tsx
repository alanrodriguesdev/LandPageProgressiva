import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PropriedadesBadge {
  tom?: "acento" | "destaque" | "neutro";
  className?: string;
  children: ReactNode;
}

const TONS = {
  acento: "border border-slate-200 bg-bg text-text",
  destaque: "bg-accent text-white",
  neutro: "border border-slate-200 bg-surface text-muted",
} as const;

/** Etiqueta curta para duração, faixa de investimento ou destaque. */
export function Badge({ tom = "neutro", className, children }: PropriedadesBadge) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-total px-3 py-1 text-nano font-semibold",
        TONS[tom],
        className,
      )}
    >
      {children}
    </span>
  );
}
