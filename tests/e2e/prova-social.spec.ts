import { expect, test } from "@playwright/test";

test("serviços exibem duração ou preço e a prova social mostra média e total", async ({ page }) => {
  await page.goto("/");

  const cards = page.locator("#servicos li article");
  await expect(cards).toHaveCount(6);

  for (const card of await cards.all()) {
    const texto = (await card.textContent()) ?? "";
    expect(/hora|R\$/i.test(texto)).toBeTruthy();
  }

  const resumo = page.locator('[data-teste="resumo-avaliacoes"]');
  await expect(resumo).toBeVisible();
  await expect(resumo).toContainText(/4,8|4,9|5,0/);
  await expect(resumo).toContainText(/6 avaliações/i);
});
