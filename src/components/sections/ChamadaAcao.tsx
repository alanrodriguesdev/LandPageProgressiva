import { Botao } from "@/components/ui/Botao";
import { Secao } from "@/components/ui/Secao";
import { Titulo } from "@/components/ui/Titulo";
import { IconeWhatsApp } from "@/components/ui/icones";

interface PropriedadesChamadaAcao {
  linkWhatsApp: string;
}

/** Bloco de conversão em alto contraste, antes da seção de contato. */
export function ChamadaAcao({ linkWhatsApp }: PropriedadesChamadaAcao) {
  return (
    <Secao id="agendar" rotuladaPor="titulo-chamada" fundo="contraste">
      <div className="flex flex-col items-center gap-7">
        <Titulo
          id="titulo-chamada"
          claro
          sobretitulo="Vamos começar"
          descricao="Me conte o que você quer para o seu cabelo. Avalio o seu caso e indico a técnica certa — mesmo que não seja a mais cara."
        >
          Seu horário pode ser esta semana
        </Titulo>

        <Botao
          href={linkWhatsApp}
          externo
          tamanho="grande"
          className="bg-accent bg-none text-white hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary"
          data-agendamento="chamada-acao"
          data-canal="whatsapp"
        >
          <IconeWhatsApp className="h-5 w-5" />
          Agendar pelo WhatsApp
        </Botao>

        <p className="text-micro text-white">
          Resposta normalmente em até algumas horas no horário de atendimento.
        </p>
      </div>
    </Secao>
  );
}
