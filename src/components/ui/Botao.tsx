import Link from "next/link";
import type * as React from "react";
import { cn } from "@/lib/utils";

type Variante = "primario" | "secundario" | "contorno" | "sutil";
type Tamanho = "medio" | "grande";

const VARIANTES: Record<Variante, string> = {
  primario:
    "bg-whatsapp text-text shadow-media hover:bg-whatsapp-hover active:bg-whatsapp-hover focus-visible:ring-2 focus-visible:ring-primary",
  secundario:
    "bg-primary text-white shadow-baixa hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary",
  contorno:
    "border border-slate-200 bg-transparent text-primary hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary",
  sutil: "border border-slate-200 bg-surface text-text hover:bg-bg focus-visible:ring-2 focus-visible:ring-primary",
};

const TAMANHOS: Record<Tamanho, string> = {
  // min-h garante a área de toque de 44px exigida por FR-015.
  medio: "min-h-toque px-5 py-3 text-micro",
  grande: "min-h-toque px-7 py-4 text-base",
};

interface PropriedadesBotao extends Omit<React.ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
  variante?: Variante;
  tamanho?: Tamanho;
  externo?: boolean;
  children: React.ReactNode;
}

/**
 * Botão de ação renderizado como âncora — toda ação desta página é uma
 * navegação (WhatsApp, telefone, e-mail, seção), nunca um envio de dados.
 */
export function Botao({
  href,
  variante = "primario",
  tamanho = "medio",
  externo = false,
  className,
  children,
  ...resto
}: PropriedadesBotao) {
  const estilo = cn(
    "inline-flex items-center justify-center gap-2 rounded-total font-semibold uppercase tracking-botao",
    "transition-colors duration-200",
    "motion-reduce:transition-none",
    VARIANTES[variante],
    TAMANHOS[tamanho],
    className,
  );

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={estilo} {...resto}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={estilo} {...resto}>
      {children}
    </Link>
  );
}
