import Link from "next/link";
import { Secao } from "@/components/ui/Secao";
import { Titulo } from "@/components/ui/Titulo";
import { negocio } from "@/content/negocio";
import { montarLinkEmail, montarLinkWhatsApp } from "@/lib/whatsapp";

/**
 * Aviso de privacidade obrigatório mesmo sem coleta: ele documenta a ausência
 * de tratamento de dados pessoais pela aplicação e o canal para remoção de
 * imagens, conforme a constituição e as assumptions do spec.
 */
export default function PaginaPrivacidade() {
  return (
    <main id="conteudo">
      <Secao id="privacidade" rotuladaPor="titulo-privacidade" fundo="fundo">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <Link href="/" className="text-micro font-semibold text-primary underline">
            Voltar para a página inicial
          </Link>

          <Titulo
            id="titulo-privacidade"
            centralizado={false}
            descricao="Resumo objetivo de como esta landing page trata conteúdo e contato."
          >
            Aviso de privacidade
          </Titulo>

          <div className="flex flex-col gap-6 text-base text-text">
            <section className="flex flex-col gap-2">
              <h2 className="text-titulo-p">1. O que esta página coleta</h2>
              <p>
                Esta aplicação não coleta, transmite nem armazena dados pessoais de visitantes.
                Não existe formulário, cadastro, login nem área autenticada nesta entrega.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-titulo-p">2. Como o contato acontece</h2>
              <p>
                O contato ocorre exclusivamente por links diretos para canais externos da
                profissional: WhatsApp e e-mail. Ao clicar nesses links, você passa a interagir
                com a plataforma externa escolhida, sujeita às políticas dela.
              </p>
              <ul className="list-disc pl-6 text-micro text-muted">
                <li>
                  WhatsApp: <a className="underline" href={montarLinkWhatsApp({ origem: "privacidade" })}>abrir conversa</a>
                </li>
                <li>
                  E-mail: <a className="underline" href={montarLinkEmail()}>{negocio.email}</a>
                </li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-titulo-p">3. Medição de audiência</h2>
              <p>
                A página utiliza medição agregada, sem cookies, sem armazenamento no dispositivo e
                sem identificação individual da visitante. Os relatórios servem apenas para saber
                quantas visitas houve, como está o desempenho e de quais seções partiram os
                cliques nos botões de agendamento.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-titulo-p">4. Uso de imagens</h2>
              <p>
                As fotos de trabalhos e os depoimentos publicados são conteúdo curado pela
                profissional e versionado no próprio repositório. Presume-se que exista autorização
                para uso de imagem e publicação dos relatos exibidos.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="text-titulo-p">5. Solicitação de remoção</h2>
              <p>
                Se você deseja pedir remoção de imagem, relato ou informação exibida, utilize um
                dos canais abaixo e identifique o conteúdo a ser removido.
              </p>
              <ul className="list-disc pl-6 text-micro text-muted">
                <li>E-mail: {negocio.email}</li>
              </ul>
            </section>
          </div>
        </div>
      </Secao>
    </main>
  );
}
