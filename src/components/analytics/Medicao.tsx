"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Medição agregada, sem cookies e sem identificação individual (FR-023, D-012).
 * Por não haver tratamento de dado pessoal, não existe banner de consentimento.
 */
export function Medicao() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
