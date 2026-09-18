import { ComparadorAntesDepois } from "@/components/interactive/ComparadorAntesDepois";
import { Secao } from "@/components/ui/Secao";
import { Titulo } from "@/components/ui/Titulo";
import type { Trabalho } from "@/content/schema";

interface PropriedadesAntesDepois {
  trabalhos: readonly Trabalho[];
}

export function AntesDepois({ trabalhos }: PropriedadesAntesDepois) {
  // FR-026: galeria vazia significa seção ausente, não área quebrada.
  if (trabalhos.length === 0) return null;

  return (
    <Secao id="antes-depois" rotuladaPor="titulo-antes-depois" fundo="fundo">
      <div className="flex flex-col gap-10">
        <Titulo
          id="titulo-antes-depois"
          sobretitulo="Resultados"
          descricao="Trabalhos reais de clientes, publicados com autorização. Arraste o controle para revelar o depois."
        >
          Antes e depois
        </Titulo>

        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {trabalhos.map((trabalho) => (
            <li key={trabalho.id}>
              <ComparadorAntesDepois trabalho={trabalho} />
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
