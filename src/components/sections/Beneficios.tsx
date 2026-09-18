import { RevelarAoEntrar } from "@/components/interactive/RevelarAoEntrar";
import { Cartao } from "@/components/ui/Cartao";
import { Secao } from "@/components/ui/Secao";
import { Titulo } from "@/components/ui/Titulo";
import { obterIcone } from "@/components/ui/icones";
import type { Beneficio } from "@/content/schema";

interface PropriedadesBeneficios {
  beneficios: readonly Beneficio[];
}

export function Beneficios({ beneficios }: PropriedadesBeneficios) {
  // FR-026: seção sem conteúdo é omitida por completo.
  if (beneficios.length === 0) return null;

  return (
    <Secao id="beneficios" rotuladaPor="titulo-beneficios" fundo="fundo">
      <RevelarAoEntrar className="flex flex-col gap-10">
        <Titulo
          id="titulo-beneficios"
          sobretitulo="Por que aqui"
          descricao="O que você encontra em cada atendimento, independentemente do serviço escolhido."
        >
          Cuidado antes do resultado
        </Titulo>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((beneficio) => {
            const Icone = obterIcone(beneficio.icone);
            return (
              <li key={beneficio.id}>
                <Cartao>
                  <span className="flex h-12 w-12 items-center justify-center rounded-total bg-bg text-primary shadow-baixa">
                    <Icone className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-titulo-p">{beneficio.titulo}</h3>
                  <p className="mt-2 text-micro text-muted">{beneficio.descricao}</p>
                </Cartao>
              </li>
            );
          })}
        </ul>
      </RevelarAoEntrar>
    </Secao>
  );
}
