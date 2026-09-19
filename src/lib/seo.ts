import type { Metadata } from "next";
import { negocio } from "@/content/negocio";
import { ROTULOS_DIA, type Horario } from "@/content/schema";
import type { ResumoAvaliacoes } from "./avaliacoes";

const TITULO = `${negocio.nome} — Progressiva e Cabeleireiro`;

/** Metadata base da página: título, descrição, canônica e preview social (FR-021). */
export function montarMetadata(): Metadata {
  return {
    metadataBase: new URL(negocio.urlCanonica),
    title: {
      default: TITULO,
      template: `%s | ${negocio.nome}`,
    },
    description: negocio.descricaoCurta,
    applicationName: negocio.nome,
    keywords: [
      "progressiva",
      "progressiva com acabamento natural",
      "cabeleireiro",
      "escova progressiva",
      "cronograma capilar",
      negocio.areaAtendimento,
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: negocio.urlCanonica,
      siteName: negocio.nome,
      title: TITULO,
      description: negocio.descricaoCurta,
    },
    twitter: {
      card: "summary_large_image",
      title: TITULO,
      description: negocio.descricaoCurta,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: {
      telephone: true,
      email: true,
      address: false,
    },
  };
}

/** Converte os horários para o formato de especificação do schema.org. */
function montarHorarioEstruturado(horarios: readonly Horario[]) {
  const mapaDias: Record<string, string> = {
    segunda: "Monday",
    terca: "Tuesday",
    quarta: "Wednesday",
    quinta: "Thursday",
    sexta: "Friday",
    sabado: "Saturday",
    domingo: "Sunday",
  };

  return horarios
    .filter((horario) => !horario.fechado && horario.abre && horario.fecha)
    .map((horario) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: mapaDias[horario.diaSemana],
      opens: horario.abre,
      closes: horario.fecha,
    }));
}

/**
 * Dados estruturados de negócio local do segmento de beleza (FR-022).
 *
 * O `aggregateRating` só é incluído quando existe avaliação real aprovada:
 * publicar nota agregada sem avaliação seria dado estruturado falso e sujeito
 * a penalização pelos mecanismos de busca.
 */
export function montarJsonLd(avaliacoes: ResumoAvaliacoes | null): string {
  const dados: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: negocio.nome,
    description: negocio.descricaoCurta,
    url: negocio.urlCanonica,
    telephone: negocio.telefone ?? `+${negocio.whatsapp}`,
    email: negocio.email,
    areaServed: negocio.areaAtendimento,
    priceRange: "$$",
    image: `${negocio.urlCanonica}/opengraph-image`,
    openingHoursSpecification: montarHorarioEstruturado(negocio.horarios),
    sameAs: negocio.redesSociais.map((rede) => rede.url),
  };

  if (negocio.endereco) {
    dados.address = {
      "@type": "PostalAddress",
      streetAddress: negocio.endereco.logradouro,
      addressLocality: negocio.endereco.cidade,
      addressRegion: negocio.endereco.estado,
      postalCode: negocio.endereco.cep,
      addressCountry: "BR",
    };
  }

  if (avaliacoes) {
    dados.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avaliacoes.media.toFixed(1),
      reviewCount: avaliacoes.total,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return JSON.stringify(dados);
}

/** Texto legível dos horários, agrupando dias consecutivos com a mesma faixa. */
export function formatarHorarios(horarios: readonly Horario[]): string[] {
  if (horarios.every((horario) => horario.fechado)) return ["A combinar"];

  return horarios.map((horario) => {
    const dia = ROTULOS_DIA[horario.diaSemana];
    if (horario.fechado) return `${dia}: fechado`;
    return `${dia}: ${horario.abre} às ${horario.fecha}`;
  });
}
