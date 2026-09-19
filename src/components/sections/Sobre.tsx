import Image from "next/image";
import { RevelarAoEntrar } from "@/components/interactive/RevelarAoEntrar";
import { Badge } from "@/components/ui/Badge";
import { Secao } from "@/components/ui/Secao";
import { Titulo } from "@/components/ui/Titulo";
import type { Perfil } from "@/content/schema";

interface PropriedadesSobre {
  perfil: Perfil | null;
}

export function Sobre({ perfil }: PropriedadesSobre) {
  if (!perfil) return null;

  return (
    <Secao id="sobre" rotuladaPor="titulo-sobre" fundo="superficie">
      <RevelarAoEntrar className="grade-sobre items-center gap-10">
        <div className="overflow-hidden rounded-bloco shadow-alta">
          <Image
            src={perfil.foto.src}
            alt={perfil.foto.alt}
            width={perfil.foto.largura}
            height={perfil.foto.altura}
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <Titulo id="titulo-sobre" centralizado={false}>
            {perfil.nome}
          </Titulo>

          <div className="flex flex-col gap-3 text-corpo-grande text-text">
            {perfil.biografia.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>

          {perfil.especializacoes.length > 0 ? (
            <ul className="flex flex-wrap gap-2 pt-1">
              {perfil.especializacoes.map((especializacao) => (
                <li key={especializacao}>
                  <Badge tom="acento">{especializacao}</Badge>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </RevelarAoEntrar>
    </Secao>
  );
}
