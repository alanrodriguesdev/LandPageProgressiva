import type { SVGProps } from "react";

/**
 * Conjunto interno de ícones (data-model.md): evita uma dependência externa
 * inteira para desenhar poucos traços, preservando o orçamento de bundle.
 *
 * Todos são decorativos e recebem `aria-hidden`; o significado vem sempre do
 * texto ao lado (FR-018).
 */
type PropriedadesIcone = SVGProps<SVGSVGElement>;

function Base({ children, ...resto }: PropriedadesIcone) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...resto}
    >
      {children}
    </svg>
  );
}

export function IconeFolha(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </Base>
  );
}

export function IconeLupa(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </Base>
  );
}

export function IconeBrilho(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      <circle cx="12" cy="12" r="3.2" />
    </Base>
  );
}

export function IconeRelogio(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 1.9" />
    </Base>
  );
}

export function IconeFrasco(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <path d="M9 2h6M10 2v6.5L5.4 17a3 3 0 0 0 2.6 4.5h8a3 3 0 0 0 2.6-4.5L14 8.5V2" />
      <path d="M7.2 15h9.6" />
    </Base>
  );
}

export function IconeCoracao(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <path d="M19.5 5.5a5 5 0 0 0-7.1 0l-.4.4-.4-.4a5 5 0 1 0-7.1 7.1l7.5 7.5 7.5-7.5a5 5 0 0 0 0-7.1Z" />
    </Base>
  );
}

export function IconeWhatsApp(props: PropriedadesIcone) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.19-1.36a9.9 9.9 0 0 0 4.85 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.8 14.06c-.24.68-1.42 1.32-1.96 1.36-.5.05-1.14.07-1.84-.12a16.6 16.6 0 0 1-1.67-.62c-2.94-1.27-4.86-4.23-5-4.43-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.78-.37h.56c.18 0 .42-.07.66.5.24.58.83 2.02.9 2.17.08.15.13.32.02.52-.1.2-.15.32-.3.5-.15.17-.32.38-.45.51-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.13.65-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.7.8 2 .95.29.15.48.22.55.34.08.13.08.73-.16 1.42Z" />
    </svg>
  );
}

export function IconeTelefone(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
    </Base>
  );
}

export function IconeEmail(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <rect x="2" y="4.5" width="20" height="15" rx="2.5" />
      <path d="m2.8 6 8.2 6a1.8 1.8 0 0 0 2 0l8.2-6" />
    </Base>
  );
}

export function IconeLocal(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <path d="M20 10.5c0 5.5-8 11.5-8 11.5s-8-6-8-11.5a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.5" r="3" />
    </Base>
  );
}

export function IconeInstagram(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function IconeFacebook(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <path d="M15.5 3H13a4 4 0 0 0-4 4v3H6.5v4H9v7h4v-7h3l.5-4H13V7.6c0-.4.3-.6.7-.6h2.3V3Z" />
    </Base>
  );
}

export function IconeTikTok(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <path d="M15 3v10.8a4.2 4.2 0 1 1-3.3-4.1" />
      <path d="M15 3c.3 2.6 2 4.2 4.6 4.4" />
    </Base>
  );
}

export function IconeYouTube(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 5 2.5-5 2.5V9.5Z" />
    </Base>
  );
}

export function IconeEstrela({ preenchida = true, ...props }: PropriedadesIcone & { preenchida?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={preenchida ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="m12 3 2.7 5.6 6.1.85-4.4 4.3 1.05 6.1L12 17l-5.45 2.85L7.6 13.75 3.2 9.45l6.1-.85L12 3Z" />
    </svg>
  );
}

export function IconeSeta(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  );
}

export function IconeCheck(props: PropriedadesIcone) {
  return (
    <Base {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Base>
  );
}

/** Resolve o nome declarado no conteúdo para o componente correspondente. */
const MAPA_ICONES = {
  folha: IconeFolha,
  lupa: IconeLupa,
  brilho: IconeBrilho,
  relogio: IconeRelogio,
  frasco: IconeFrasco,
  coracao: IconeCoracao,
  check: IconeCheck,
} as const;

export type NomeIcone = keyof typeof MAPA_ICONES;

export function obterIcone(nome: string) {
  return MAPA_ICONES[nome as NomeIcone] ?? IconeBrilho;
}

const MAPA_REDES = {
  instagram: IconeInstagram,
  facebook: IconeFacebook,
  tiktok: IconeTikTok,
  youtube: IconeYouTube,
} as const;

export function obterIconeRede(plataforma: string) {
  return MAPA_REDES[plataforma as keyof typeof MAPA_REDES] ?? IconeInstagram;
}
