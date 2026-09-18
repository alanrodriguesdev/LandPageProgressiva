import { describe, expect, it } from "vitest";
import { negocio } from "@/content/negocio";
import {
  comOrigem,
  formatarTelefoneExibicao,
  montarLinkEmail,
  montarLinkTelefone,
  montarLinkWhatsApp,
} from "@/lib/whatsapp";

describe("montarLinkWhatsApp", () => {
  it("usa o domínio wa.me com o número do negócio", () => {
    const link = montarLinkWhatsApp({ origem: "hero" });
    expect(link.startsWith(`https://wa.me/${negocio.whatsapp}?text=`)).toBe(true);
  });

  it("codifica o texto para URL", () => {
    const link = montarLinkWhatsApp({ origem: "hero" });
    expect(link).not.toContain(" ");
    expect(link).toContain("%20");
  });

  it("menciona o serviço quando informado (FR-010)", () => {
    const link = montarLinkWhatsApp({ servico: "Progressiva sem formol", origem: "servicos" });
    const texto = decodeURIComponent(new URL(link).searchParams.get("text") ?? "");
    expect(texto).toContain("Progressiva sem formol");
  });

  it("usa mensagem genérica quando não há serviço", () => {
    const link = montarLinkWhatsApp({ origem: "hero" });
    const texto = decodeURIComponent(new URL(link).searchParams.get("text") ?? "");
    expect(texto).toContain("agendar um horário");
  });

  it("embute a origem no texto da mensagem (FR-011)", () => {
    const link = montarLinkWhatsApp({ origem: "botao-flutuante" });
    const texto = decodeURIComponent(new URL(link).searchParams.get("text") ?? "");
    expect(texto).toContain("(origem: botao-flutuante)");
  });

  it("produz mensagem em português do Brasil (FR-002)", () => {
    const link = montarLinkWhatsApp({ origem: "hero" });
    const texto = decodeURIComponent(new URL(link).searchParams.get("text") ?? "");
    expect(texto).toContain("Olá!");
    expect(texto).toContain(negocio.nome);
  });

  it("gera links distintos para origens distintas, permitindo atribuição", () => {
    const hero = montarLinkWhatsApp({ origem: "hero" });
    const rodape = montarLinkWhatsApp({ origem: "rodape" });
    expect(hero).not.toBe(rodape);
  });
});

describe("links alternativos de contato (FR-012)", () => {
  it("monta link de telefone acionável", () => {
    expect(montarLinkTelefone().startsWith("tel:+")).toBe(true);
  });

  it("monta link de e-mail com assunto", () => {
    const link = montarLinkEmail();
    expect(link.startsWith(`mailto:${negocio.email}`)).toBe(true);
    expect(link).toContain("subject=");
  });
});

describe("formatarTelefoneExibicao", () => {
  it("formata número com 9 dígitos", () => {
    expect(formatarTelefoneExibicao("5511999999999")).toBe("+55 (11) 99999-9999");
  });

  it("formata número com 8 dígitos", () => {
    expect(formatarTelefoneExibicao("551133334444")).toBe("+55 (11) 3333-4444");
  });

  it("devolve a entrada quando o formato não é reconhecido", () => {
    expect(formatarTelefoneExibicao("123")).toBe("123");
  });
});

describe("comOrigem", () => {
  it("acrescenta parâmetros de atribuição ao link de rede social (FR-011)", () => {
    const url = new URL(comOrigem("https://instagram.com/studio", "rodape"));
    expect(url.searchParams.get("utm_source")).toBe("site");
    expect(url.searchParams.get("utm_campaign")).toBe("rodape");
  });

  it("devolve a entrada quando a URL é inválida", () => {
    expect(comOrigem("nao-e-url", "rodape")).toBe("nao-e-url");
  });
});
