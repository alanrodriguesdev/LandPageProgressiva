import { negocio } from "@/content/negocio";

export interface OpcoesLinkWhatsApp {
  /** Nome do serviço de interesse, quando o CTA parte de um serviço específico. */
  servico?: string;
  /** Identificador do ponto de partida, ex.: "hero", "servico-progressiva". */
  origem: string;
}

/**
 * Monta o link de conversa do WhatsApp com mensagem pré-preenchida (FR-010).
 *
 * A origem é embutida no próprio texto da mensagem, e não como parâmetro de
 * URL, porque parâmetros desconhecidos não são repassados de forma confiável
 * pelo wa.me e se perderiam no encaminhamento (D-006, FR-011).
 *
 * Nenhum dado da visitante entra na mensagem (FR-013).
 */
export function montarLinkWhatsApp({ servico, origem }: OpcoesLinkWhatsApp): string {
  const saudacao = `Olá! Vim pelo site do ${negocio.nome}`;

  const interesse = servico
    ? ` e gostaria de agendar o serviço de ${servico}.`
    : " e gostaria de agendar um horário.";

  const mensagem = `${saudacao}${interesse}\n\n(origem: ${origem})`;

  return `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Link `tel:` a partir do telefone em E.164, com recuo para o WhatsApp. */
export function montarLinkTelefone(): string {
  return `tel:${negocio.telefone ?? `+${negocio.whatsapp}`}`;
}

/** Link `mailto:` com assunto pronto, mantendo o padrão dos demais CTAs. */
export function montarLinkEmail(): string {
  const assunto = encodeURIComponent(`Agendamento — ${negocio.nome}`);
  return `mailto:${negocio.email}?subject=${assunto}`;
}

/** Formata o número para leitura humana: +55 (11) 99999-9999. */
export function formatarTelefoneExibicao(digitos: string): string {
  const limpo = digitos.replace(/\D/g, "");
  const padrao = /^(\d{2})(\d{2})(\d{4,5})(\d{4})$/.exec(limpo);
  if (!padrao) return digitos;
  const [, ddi, ddd, inicio, fim] = padrao;
  return `+${ddi} (${ddd}) ${inicio}-${fim}`;
}

/** Acrescenta identificação de origem aos links de redes sociais (FR-011). */
export function comOrigem(url: string, origem: string): string {
  try {
    const endereco = new URL(url);
    endereco.searchParams.set("utm_source", "site");
    endereco.searchParams.set("utm_medium", "landing");
    endereco.searchParams.set("utm_campaign", origem);
    return endereco.toString();
  } catch {
    return url;
  }
}
