import { defineConfig, devices } from "@playwright/test";

const PORTA = 3100;
const URL_BASE = `http://127.0.0.1:${PORTA}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: URL_BASE,
    trace: "on-first-retry",
    locale: "pt-BR",
  },
  projects: [
    {
      name: "celular-360",
      use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 640 } },
    },
    {
      name: "tablet-768",
      use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } },
    },
    {
      name: "desktop-1440",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: `npm run build && npm run start -- --port ${PORTA}`,
    url: URL_BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
