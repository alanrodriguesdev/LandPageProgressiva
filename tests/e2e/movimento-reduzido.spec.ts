import { expect, test } from "@playwright/test";

test("nenhuma informação se perde com prefers-reduced-motion ativo", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("#hero")).toContainText(/Progressiva sem formol/i);
  await expect(page.getByRole("link", { name: /agendar pelo whatsapp/i }).first()).toBeVisible();
  await expect(page.locator("#servicos")).toBeVisible();
  await expect(page.locator("#contato")).toBeVisible();
});
