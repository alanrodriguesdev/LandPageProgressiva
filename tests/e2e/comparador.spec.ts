import { expect, test } from "@playwright/test";

test("comparador antes/depois funciona por teclado e por ponteiro", async ({ page }) => {
  await page.goto("/");

  const controle = page.locator('#antes-depois input[type="range"]').first();
  await expect(controle).toBeVisible();

  await controle.focus();
  await page.keyboard.press("ArrowRight");
  await expect(controle).toHaveValue(/5[1-9]|[6-9]\d|100/);

  const caixa = await controle.boundingBox();
  expect(caixa).not.toBeNull();
  if (!caixa) return;

  await controle.click({ position: { x: caixa.width * 0.85, y: caixa.height / 2 } });

  const valor = Number(await controle.inputValue());
  expect(valor).toBeGreaterThan(50);
});
