import { Botao } from "@/components/ui/Botao";
import { Cartao } from "@/components/ui/Cartao";
import { Secao } from "@/components/ui/Secao";
import { Titulo } from "@/components/ui/Titulo";
import { IconeEmail, IconeLocal, IconeRelogio, IconeWhatsApp } from "@/components/ui/icones";
import type { Negocio } from "@/content/schema";
import { formatarHorarios } from "@/lib/seo";
import { formatarTelefoneExibicao, montarLinkEmail } from "@/lib/whatsapp";

interface PropriedadesContato {
  negocio: Negocio;
  linkWhatsApp: string;
}

/**
 * Canais de contato: WhatsApp e e-mail, que são os canais disponíveis.
 */
export function Contato({ negocio, linkWhatsApp }: PropriedadesContato) {
  const horarios = formatarHorarios(negocio.horarios);

  return (
    <Secao id="contato" rotuladaPor="titulo-contato" fundo="fundo">
      <div className="flex flex-col gap-10">
        <Titulo
          id="titulo-contato"
          sobretitulo="Contato"
          descricao="Escolha o canal que for mais confortável para você."
        >
          Onde me encontrar
        </Titulo>

        <div className="grid gap-5 md:grid-cols-2">
          <Cartao className="border-slate-200">
            <IconeWhatsApp className="h-7 w-7 text-whatsapp" />
            <h3 className="mt-3 text-titulo-p">WhatsApp</h3>
            <p className="mt-2 flex-1 text-micro text-muted">
              O caminho mais rápido: já abro a conversa com a sua mensagem pronta.
            </p>
            <Botao
              href={linkWhatsApp}
              externo
              className="mt-5 w-full"
              data-agendamento="contato"
              data-canal="whatsapp"
            >
              {formatarTelefoneExibicao(negocio.whatsapp)}
            </Botao>
          </Cartao>

          <Cartao>
            <IconeEmail className="h-7 w-7 text-primary" />
            <h3 className="mt-3 text-titulo-p">E-mail</h3>
            <p className="mt-2 flex-1 text-micro text-muted">
              Para orçamentos detalhados, parcerias ou dúvidas mais longas.
            </p>
            <Botao
              href={montarLinkEmail()}
              variante="sutil"
              className="mt-5 w-full break-all"
              data-agendamento="contato"
              data-canal="email"
            >
              {negocio.email}
            </Botao>
          </Cartao>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Cartao>
            <h3 className="flex items-center gap-2 text-titulo-p">
              <IconeLocal className="h-6 w-6 text-primary" />
              Onde atendo
            </h3>
            <p className="mt-3 text-text">{negocio.areaAtendimento}</p>
            {negocio.endereco ? (
              <address className="mt-2 not-italic text-micro text-muted">
                {negocio.endereco.logradouro}
                <br />
                {negocio.endereco.cidade} — {negocio.endereco.estado}, CEP {negocio.endereco.cep}
              </address>
            ) : null}
          </Cartao>

          <Cartao>
            <h3 className="flex items-center gap-2 text-titulo-p">
              <IconeRelogio className="h-6 w-6 text-primary" />
              Horário de atendimento
            </h3>
            <ul className="mt-3 flex flex-col gap-1 text-micro text-text">
              {horarios.map((linha) => (
                <li key={linha}>{linha}</li>
              ))}
            </ul>
          </Cartao>
        </div>
      </div>
    </Secao>
  );
}
