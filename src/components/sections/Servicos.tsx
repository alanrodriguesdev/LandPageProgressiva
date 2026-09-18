import { RevelarAoEntrar } from "@/components/interactive/RevelarAoEntrar";
import { Badge } from "@/components/ui/Badge";
import { Botao } from "@/components/ui/Botao";
import { Cartao } from "@/components/ui/Cartao";
import { Secao } from "@/components/ui/Secao";
import { Titulo } from "@/components/ui/Titulo";
import { IconeRelogio, IconeSeta } from "@/components/ui/icones";
import type { Servico } from "@/content/schema";
import { montarLinkWhatsApp } from "@/lib/whatsapp";

interface PropriedadesServicos {
  servicos: readonly Servico[];
}

export function Servicos({ servicos }: PropriedadesServicos) {
  if (servicos.length === 0) return null;

  return (
    <Secao id="servicos" rotuladaPor="titulo-servicos" fundo="superficie">
      <RevelarAoEntrar className="flex flex-col gap-10">
        <Titulo
          id="titulo-servicos"
          sobretitulo="Serviços"
          descricao="Valores de referência. O orçamento final depende do comprimento, da densidade e do histórico químico do seu cabelo."
        >
          O que eu faço
        </Titulo>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((servico) => (
            <li key={servico.id}>
              <Cartao destacado={servico.destaque} className={servico.destaque ? "border-slate-200 bg-surface" : ""}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-titulo-p">{servico.nome}</h3>
                  {servico.destaque ? <Badge tom="destaque">Mais procurado</Badge> : null}
                </div>

                <p className="mt-2 flex-1 text-micro text-muted">{servico.descricao}</p>

                {/* FR-004: ao menos um indicador de duração ou investimento */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {servico.duracaoEstimada ? (
                    <Badge tom="neutro">
                      <IconeRelogio className="h-3.5 w-3.5" />
                      {servico.duracaoEstimada}
                    </Badge>
                  ) : null}
                  {servico.faixaInvestimento ? (
                    <Badge tom="acento">{servico.faixaInvestimento}</Badge>
                  ) : null}
                </div>

                <Botao
                  href={montarLinkWhatsApp({ servico: servico.nome, origem: `servico-${servico.id}` })}
                  externo
                  variante="sutil"
                  className="mt-5 w-full"
                  data-agendamento={`servico-${servico.id}`}
                  data-canal="whatsapp"
                >
                  Agendar {servico.nome}
                  <IconeSeta className="h-4 w-4" />
                </Botao>
              </Cartao>
            </li>
          ))}
        </ul>
      </RevelarAoEntrar>
    </Secao>
  );
}
