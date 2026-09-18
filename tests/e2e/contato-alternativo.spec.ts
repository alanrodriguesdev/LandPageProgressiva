import { expect, test } from "@playwright/test";

test("telefone e e-mail estão presentes como links acionáveis", async ({ page }) => {
  await page.goto("/");

  const secao = page.locator("#contato");
  await expect(secao).toBeVisible();

  const linkTelefone = secao.locator('a[href^="tel:"]');
  const linkEmail = secao.locator('a[href^="mailto:"]');

  await expect(linkTelefone).toHaveCount(1);
  await expect(linkEmail).toHaveCount(1);
  await expect(linkTelefone).toBeVisible();
  await expect(linkEmail).toBeVisible();
});
