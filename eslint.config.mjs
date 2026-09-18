import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import tokens from "./eslint-local/tokens.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const config = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "coverage/**",
      "test-results/**",
      "playwright-report/**",
      "next-env.d.ts",
      "**/*.min.js",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: { tokens },
    rules: {
      "tokens/sem-valor-arbitrario": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];

export default config;
