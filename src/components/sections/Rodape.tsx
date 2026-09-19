import Link from "next/link";
import { obterIconeRede } from "@/components/ui/icones";
import { ROTULOS_PLATAFORMA, type Negocio } from "@/content/schema";
import { formatarHorarios } from "@/lib/seo";
import { comOrigem, montarLinkEmail } from "@/lib/whatsapp";

interface PropriedadesRodape {
  negocio: Negocio;
}

/** Rodapé com contato, horários, redes e aviso de privacidade (FR-007). */
export function Rodape({ negocio }: PropriedadesRodape) {
  const horarios = formatarHorarios(negocio.horarios);
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-surface text-muted">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="font-titulo text-titulo-m text-text">{negocio.nome}</p>
            <p className="text-micro">{negocio.descricaoCurta}</p>
            <p className="text-micro">{negocio.areaAtendimento}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-micro font-semibold uppercase tracking-expandido text-primary">
              Contato
            </h2>
            <ul className="flex flex-col gap-2 text-micro">
              <li>
                <a href={montarLinkEmail()} className="break-all transition-colors hover:text-primary">
                  {negocio.email}
                </a>
              </li>
              {negocio.endereco ? (
                <li>
                  <address className="not-italic">
                    {negocio.endereco.logradouro}, {negocio.endereco.cidade} —{" "}
                    {negocio.endereco.estado}
                  </address>
                </li>
              ) : null}
            </ul>

            {negocio.redesSociais.length > 0 ? (
              <ul className="mt-2 flex items-center gap-3">
                {negocio.redesSociais.map((rede) => {
                  const Icone = obterIconeRede(rede.plataforma);
                  return (
                    <li key={rede.plataforma}>
                      <a
                        href={comOrigem(rede.url, "rodape")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-toque w-toque items-center justify-center rounded-total bg-bg text-primary transition-colors hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <Icone className="h-5 w-5" />
                        <span className="texto-oculto">
                          {ROTULOS_PLATAFORMA[rede.plataforma]}: {rede.identificador}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-micro font-semibold uppercase tracking-expandido text-primary">
              Horário de atendimento
            </h2>
            <ul className="flex flex-col gap-1 text-micro">
              {horarios.map((linha) => (
                <li key={linha}>{linha}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-nano sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {negocio.nome}. Todos os direitos reservados.
          </p>
          <Link href="/privacidade" className="underline transition-colors hover:text-primary">
            Aviso de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
