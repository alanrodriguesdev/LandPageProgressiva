import { expect, test } from "@playwright/test";

test("skip link funciona e a ordem inicial de foco é lógica", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /pular para o conteúdo principal/i });
  await expect(skip).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.locator("#conteudo")).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: /agendar pelo whatsapp/i }).first()).toBeFocused();
});
