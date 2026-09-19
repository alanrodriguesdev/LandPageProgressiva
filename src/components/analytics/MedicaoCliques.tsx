"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Registra os acionamentos dos botões de agendamento (FR-023a, SC-010).
 *
 * Usa delegação de eventos em um único ouvinte no documento, em vez de
 * transformar cada CTA em Client Component. Assim os botões permanecem
 * Server Components e o custo de JavaScript fica limitado a este arquivo,
 * preservando o orçamento de bundle do Princípio III.
 *
 * Só é enviado o identificador da seção de origem — nenhum atributo da
 * visitante é coletado (FR-013).
 */
export function MedicaoCliques() {
  useEffect(() => {
    function aoClicar(evento: MouseEvent) {
      const alvo = evento.target;
      if (!(alvo instanceof Element)) return;

      const gatilho = alvo.closest<HTMLElement>("[data-agendamento]");
      if (!gatilho) return;

      track("agendamento_clicado", {
        origem: gatilho.dataset.agendamento ?? "desconhecida",
        canal: gatilho.dataset.canal ?? "whatsapp",
      });
    }

    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, []);

  return null;
}
