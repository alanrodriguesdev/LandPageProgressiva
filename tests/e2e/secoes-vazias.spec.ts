import { expect, test } from "@playwright/test";

test("com o conteúdo atual, seções condicionais existem e o JSON-LD publica AggregateRating", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#beneficios")).toBeVisible();
  await expect(page.locator("#servicos")).toBeVisible();
  await expect(page.locator("#antes-depois")).toBeVisible();
  await expect(page.locator("#depoimentos")).toBeVisible();

  const conteudos = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(conteudos.some((jsonLd) => jsonLd.includes("AggregateRating"))).toBeTruthy();
});
