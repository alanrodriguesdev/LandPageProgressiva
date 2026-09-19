import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("a página não apresenta violações A/AA detectáveis pelo axe", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const resultado = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(resultado.violations).toEqual([]);
});
