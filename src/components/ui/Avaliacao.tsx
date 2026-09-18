import { IconeEstrela } from "@/components/ui/icones";
import { cn } from "@/lib/utils";

interface PropriedadesAvaliacao {
  nota: number;
  className?: string;
}

/**
 * Estrelas acessíveis: o desenho é decorativo e o valor real vai em texto
 * para leitores de tela, evitando que a nota exista apenas como imagem.
 */
export function Avaliacao({ nota, className }: PropriedadesAvaliacao) {
  return (
    <div className={cn("flex items-center gap-0.5 text-accent", className)}>
      {Array.from({ length: 5 }, (_, indice) => (
        <IconeEstrela key={indice} preenchida={indice < nota} className="h-4 w-4" />
      ))}
      <span className="texto-oculto">{`Avaliação: ${nota} de 5 estrelas`}</span>
    </div>
  );
}
