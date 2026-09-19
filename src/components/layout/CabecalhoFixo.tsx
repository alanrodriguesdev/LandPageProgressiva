import { Botao } from "@/components/ui/Botao";
import { IconeWhatsApp } from "@/components/ui/icones";

interface PropriedadesCabecalho {
  nomeNegocio: string;
  linkWhatsApp: string;
  /** Apenas as seções efetivamente renderizadas entram na navegação. */
  secoes: ReadonlyArray<{ id: string; rotulo: string }>;
}

/**
 * Cabeçalho fixo com identidade e CTA sempre visíveis (FR-009, FR-009a).
 *
 * É um Server Component: a navegação é HTML puro com âncoras, sem menu
 * sobreposto, sem estado e sem JavaScript (D-011). Em telas pequenas os
 * links de seção são ocultados para preservar o espaço do botão de
 * agendamento, que é o que converte.
 */
export function CabecalhoFixo({ nomeNegocio, linkWhatsApp, secoes }: PropriedadesCabecalho) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-cabecalho w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#hero"
          className="flex shrink-0 items-center gap-2 font-titulo text-titulo-p font-semibold text-text"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-total bg-accent" />
          {nomeNegocio}
        </a>

        <nav aria-label="Seções da página" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {secoes.map((secao) => (
              <li key={secao.id}>
                <a
                  href={`#${secao.id}`}
                  className="text-nano font-semibold uppercase tracking-nav text-text transition-colors hover:text-primary"
                >
                  {secao.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Botao
          href={linkWhatsApp}
          externo
          variante="primario"
          tamanho="medio"
          data-agendamento="cabecalho"
          data-canal="whatsapp"
          className="shrink-0"
        >
          <IconeWhatsApp className="h-5 w-5" />
          <span className="hidden sm:inline">Agendar</span>
          <span className="sm:hidden">Agendar</span>
        </Botao>
      </div>
    </header>
  );
}
