import { expect, test } from "@playwright/test";

test("hero exibe proposta de valor e CTA de agendamento sem rolagem em 360px", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "celular-360", "Esse cenário é específico do viewport de 360px.");

  await page.goto("/");

  const hero = page.locator("#hero");
  await expect(hero.getByRole("heading", { level: 1 })).toContainText("Progressiva sem formol");

  const cta = hero.getByRole("link", { name: /agendar pelo whatsapp/i });
  await expect(cta).toBeVisible();

  const caixa = await cta.boundingBox();
  expect(caixa).not.toBeNull();
  expect((caixa?.y ?? 9999) + (caixa?.height ?? 0)).toBeLessThanOrEqual(640);

  const href = await cta.getAttribute("href");
  expect(href).toContain("https://wa.me/");

  const url = new URL(href!);
  const texto = decodeURIComponent(url.searchParams.get("text") ?? "");
  expect(texto).toContain("Olá!");
  expect(texto).toContain("(origem: hero)");
});
