"use client";

import Image from "next/image";
import * as React from "react";
import type { Trabalho } from "@/content/schema";

interface PropriedadesComparador {
  trabalho: Trabalho;
}

/**
 * Comparador antes/depois (FR-005, D-003).
 *
 * O controle é um `input[type=range]` nativo: já é focável, operável por
 * setas, Home e End, anunciado por leitores de tela e funciona por toque —
 * tudo isso sem uma linha de código de acessibilidade customizado, que é
 * exatamente onde controles caseiros costumam falhar.
 *
 * O recorte usa `clip-path`, que anima em composição e não dispara layout,
 * respeitando a regra de usar apenas propriedades compostas.
 */
export function ComparadorAntesDepois({ trabalho }: PropriedadesComparador) {
  const [posicao, definirPosicao] = React.useState(50);
  const idControle = React.useId();

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-cartao shadow-media">
        <div className="relative aspect-4/5 w-full">
          <Image
            src={trabalho.antes.src}
            alt={trabalho.antes.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />

          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${posicao}%)` }}
          >
            <Image
              src={trabalho.depois.src}
              alt={trabalho.depois.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Linha divisória — puramente visual */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-bg shadow-media"
            style={{ left: `${posicao}%` }}
          />

          {/* Rótulos sempre visíveis, para que a comparação se explique sozinha */}
          <span className="pointer-events-none absolute left-3 top-3 rounded-total bg-text/75 px-3 py-1 text-nano font-semibold text-white">
            Antes
          </span>
          <span className="pointer-events-none absolute right-3 top-3 rounded-total bg-primary/90 px-3 py-1 text-nano font-semibold text-white">
            Depois
          </span>
        </div>
      </div>

      <label htmlFor={idControle} className="texto-oculto">
        {`Comparar antes e depois: ${trabalho.legenda}. Use as setas para revelar o resultado.`}
      </label>
      <input
        id={idControle}
        type="range"
        min={0}
        max={100}
        step={1}
        value={posicao}
        aria-valuetext={`${posicao}% do resultado depois visível`}
        onChange={(evento) => definirPosicao(Number(evento.target.value))}
        className="h-toque w-full cursor-ew-resize accent-primary"
      />

      <figcaption className="text-micro text-muted">{trabalho.legenda}</figcaption>
    </figure>
  );
}
