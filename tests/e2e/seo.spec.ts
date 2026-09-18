import { expect, test } from "@playwright/test";

test("metadata, canônica e JSON-LD estão presentes", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Studio Bella Liss/);

  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Progressiva/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /studiobellaliss/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Studio Bella Liss/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  const scripts = page.locator('script[type="application/ld+json"]');
  await expect(scripts.first()).toBeAttached();

  const conteudos = await scripts.allTextContents();
  expect(conteudos.some((jsonLd) => jsonLd.includes('"@type":"HairSalon"'))).toBeTruthy();
});
