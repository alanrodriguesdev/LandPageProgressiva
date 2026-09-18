import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { Medicao } from "@/components/analytics/Medicao";
import { MedicaoCliques } from "@/components/analytics/MedicaoCliques";
import { depoimentos } from "@/content/depoimentos";
import { resumirAvaliacoes } from "@/lib/avaliacoes";
import { montarJsonLd, montarMetadata } from "@/lib/seo";
import "./globals.css";

const fonteTitulo = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--fonte-titulo",
});

const fonteCorpo = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--fonte-corpo",
});

export const metadata: Metadata = montarMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export default async function LayoutRaiz({ children }: { children: ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const jsonLd = montarJsonLd(resumirAvaliacoes(depoimentos));

  return (
    <html lang="pt-BR" className={`${fonteTitulo.variable} ${fonteCorpo.variable}`}>
      <body className="bg-bg text-text">
        {/* Atalho para pular direto ao conteúdo principal (FR-020) */}
        <a href="#conteudo" className="pular-conteudo">
          Pular para o conteúdo principal
        </a>

        {children}

        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        <Medicao />
        <MedicaoCliques />
      </body>
    </html>
  );
}
