import Image from "next/image";
import { Botao } from "@/components/ui/Botao";
import { IconeCheck, IconeEstrela, IconeWhatsApp } from "@/components/ui/icones";
import type { Imagem } from "@/content/schema";

interface PropriedadesHero {
  descricaoCurta: string;
  areaAtendimento: string;
  imagem: Imagem;
  linkWhatsApp: string;
  avaliacoes: { mediaFormatada: string; total: number } | null;
}

const PROMESSAS = ["Com e sem formol", "Diagnóstico incluso", "Movimento natural"];

/**
 * Primeira tela (FR-008, SC-001): proposta de valor e botão de agendamento
 * visíveis sem rolagem em 360px. Por isso o conteúdo textual é enxuto e a
 * imagem só aparece ao lado a partir de `lg`, em vez de empurrar o CTA para
 * baixo no celular.
 *
 * A imagem recebe `priority` por ser o elemento do LCP (D-008); nenhuma
 * outra imagem da página é prioritária.
 */
export function Hero({
  descricaoCurta,
  areaAtendimento,
  imagem,
  linkWhatsApp,
  avaliacoes,
}: PropriedadesHero) {
  return (
    <section
      id="hero"
      tabIndex={-1}
      aria-labelledby="titulo-hero"
      className="relative overflow-hidden bg-surface pb-14 pt-cabecalho"
    >
      {/* Profundidade por CSS, sem WebGL (D-004) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-total bg-secondary opacity-10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-total bg-primary opacity-10 blur-3xl"
      />

      <div className="grade-hero relative mx-auto w-full max-w-6xl items-center gap-12 px-5 pt-10 sm:px-8 lg:pt-16">
        <div className="flex flex-col gap-5">
          <p className="inline-flex w-fit items-center gap-2 rounded-total bg-bg px-4 py-1.5 text-nano font-semibold uppercase tracking-widest text-primary shadow-baixa">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-total bg-accent" />
            {areaAtendimento}
          </p>

          <h1 id="titulo-hero" className="text-titulo-gg">
            Progressiva com acabamento natural{" "}
            <span className="text-primary">e brilho sofisticado</span>
          </h1>

          <p className="max-w-xl text-corpo-grande text-text">{descricaoCurta}</p>

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {PROMESSAS.map((promessa) => (
              <li key={promessa} className="flex items-center gap-2 text-micro font-medium">
                <IconeCheck className="h-4 w-4 shrink-0 text-primary" />
                {promessa}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <Botao
              href={linkWhatsApp}
              externo
              tamanho="grande"
              data-agendamento="hero"
              data-canal="whatsapp"
            >
              <IconeWhatsApp className="h-5 w-5" />
              Agendar pelo WhatsApp
            </Botao>

            <Botao href="#antes-depois" variante="contorno" tamanho="grande">
              Ver resultados
            </Botao>
          </div>

          {avaliacoes ? (
            <p className="flex items-center gap-2 pt-1 text-micro text-muted">
              <span aria-hidden="true" className="flex text-accent">
                {Array.from({ length: 5 }, (_, indice) => (
                  <IconeEstrela key={indice} className="h-4 w-4" />
                ))}
              </span>
              <span>
                <strong className="text-text">{avaliacoes.mediaFormatada}</strong> de 5 em{" "}
                {avaliacoes.total} avaliações de clientes
              </span>
            </p>
          ) : null}
        </div>

        <div className="relative hidden lg:block">
          <div className="overflow-hidden rounded-bloco bg-gradient-to-r from-primary to-secondary p-3 shadow-alta">
            <Image
              src={imagem.src}
              alt={imagem.alt}
              width={imagem.largura}
              height={imagem.altura}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-auto w-full rounded-imagem object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
