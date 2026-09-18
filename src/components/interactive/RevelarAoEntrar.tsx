"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface PropriedadesRevelarAoEntrar {
  children: ReactNode;
  className?: string;
}

/**
 * T060: revela blocos ao entrarem na viewport usando apenas `opacity` e
 * `transform`, com desligamento automático quando `prefers-reduced-motion`
 * estiver ativo.
 */
export function RevelarAoEntrar({ children, className }: PropriedadesRevelarAoEntrar) {
  const referencia = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elemento = referencia.current;
    if (!elemento) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elemento.dataset.visivel = "true";
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada) return;
        if (entrada.isIntersecting) {
          elemento.dataset.visivel = "true";
          observador.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={referencia} data-visivel="false" className={["revelar", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
