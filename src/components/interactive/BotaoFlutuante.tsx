"use client";

import * as React from "react";
import { IconeWhatsApp } from "@/components/ui/icones";

interface PropriedadesBotaoFlutuante {
  linkWhatsApp: string;
}

/**
 * Garante um ponto de contato a no máximo uma rolagem de distância (FR-009).
 *
 * É um dos dois únicos Client Components da página (D-002). Aparece só depois
 * que o hero sai da tela, para não competir com o CTA principal na primeira
 * dobra. A entrada é uma transição de opacidade e deslocamento, desativada
 * quando a visitante pede redução de movimento (FR-019).
 */
export function BotaoFlutuante({ linkWhatsApp }: PropriedadesBotaoFlutuante) {
  const [visivel, definirVisivel] = React.useState(false);

  React.useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observador = new IntersectionObserver(
      ([entrada]) => definirVisivel(!entrada?.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" },
    );

    observador.observe(hero);
    return () => observador.disconnect();
  }, []);

  return (
    <a
      href={linkWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      data-agendamento="botao-flutuante"
      data-canal="whatsapp"
      aria-hidden={!visivel}
      tabIndex={visivel ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex min-h-toque items-center gap-2 rounded-total bg-whatsapp px-5 py-3 font-semibold text-text shadow-alta transition-all duration-300 hover:bg-whatsapp-hover focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none lg:bottom-8 lg:right-8 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <IconeWhatsApp className="h-5 w-5" />
      <span className="hidden sm:inline">Agendar pelo WhatsApp</span>
      <span className="sm:hidden">Agendar</span>
    </a>
  );
}
