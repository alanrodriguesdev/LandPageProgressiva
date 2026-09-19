import { RevelarAoEntrar } from "@/components/interactive/RevelarAoEntrar";
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
          descricao="O que você encontra em cada atendimento, independentemente do serviço escolhido."
        >
          Cuidado antes do resultado
        </Titulo>

        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {beneficios.map((beneficio) => {
            const Icone = obterIcone(beneficio.icone);
            return (
              <li key={beneficio.id} className="flex gap-4">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icone className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-titulo-p">{beneficio.titulo}</h3>
                  <p className="mt-1.5 text-micro text-muted">{beneficio.descricao}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </RevelarAoEntrar>
    </Secao>
  );
}
