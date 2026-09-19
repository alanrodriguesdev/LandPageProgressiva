import { RevelarAoEntrar } from "@/components/interactive/RevelarAoEntrar";
import { Avaliacao } from "@/components/ui/Avaliacao";
import { Cartao } from "@/components/ui/Cartao";
import { Secao } from "@/components/ui/Secao";
import { Titulo } from "@/components/ui/Titulo";
import type { Depoimento } from "@/content/schema";
import type { ResumoAvaliacoes } from "@/lib/avaliacoes";

interface PropriedadesDepoimentos {
  depoimentos: readonly Depoimento[];
  resumo: ResumoAvaliacoes | null;
}

const FORMATO_DATA = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });

/**
 * Exibe apenas depoimentos aprovados, com média de uma casa decimal e
 * contagem total (FR-006). Sem avaliação aprovada, a seção some (FR-026).
 */
export function Depoimentos({ depoimentos, resumo }: PropriedadesDepoimentos) {
  const aprovados = depoimentos.filter((depoimento) => depoimento.aprovado);
  if (!resumo || aprovados.length === 0) return null;

  return (
    <Secao id="depoimentos" rotuladaPor="titulo-depoimentos" fundo="fundo">
      <RevelarAoEntrar className="flex flex-col gap-10">
        <Titulo
          id="titulo-depoimentos"
          descricao="Avaliações publicadas com autorização das clientes, sem filtro de nota."
        >
          O que dizem as clientes
        </Titulo>

        <p
          className="mx-auto flex flex-wrap items-center justify-center gap-3 rounded-total bg-surface px-6 py-3 text-center shadow-baixa"
          data-teste="resumo-avaliacoes"
        >
          <Avaliacao nota={Math.round(resumo.media)} />
          <span className="text-titulo-p font-semibold text-text">
            {resumo.mediaFormatada}
          </span>
          <span className="text-micro text-muted">
            de 5, com base em {resumo.total} {resumo.total === 1 ? "avaliação" : "avaliações"}
          </span>
        </p>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aprovados.map((depoimento) => (
            <li key={depoimento.id}>
              <Cartao>
                <Avaliacao nota={depoimento.nota} />
                <blockquote className="mt-3 flex-1 text-micro text-text">
                  <p>&ldquo;{depoimento.texto}&rdquo;</p>
                </blockquote>
                <footer className="mt-4 border-t border-slate-200 pt-3">
                  <p className="font-semibold text-text">{depoimento.nomeExibicao}</p>
                  <p className="text-nano text-muted">
                    <time dateTime={depoimento.data}>
                      {FORMATO_DATA.format(new Date(`${depoimento.data}T12:00:00`))}
                    </time>
                  </p>
                </footer>
              </Cartao>
            </li>
          ))}
        </ul>
      </RevelarAoEntrar>
    </Secao>
  );
}
