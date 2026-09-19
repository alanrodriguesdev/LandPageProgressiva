#!/usr/bin/env node
/**
 * Bloqueia a publicação enquanto houver valores provisórios no conteúdo (FR-030).
 *
 * Roda no pipeline antes do deploy. Se encontrar o marcador em qualquer
 * arquivo de `src/content/`, encerra com código 1 e lista arquivo e linha.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const MARCADOR = "[PENDENTE]";
const RAIZ = process.cwd();
const DIRETORIO_CONTEUDO = join(RAIZ, "src", "content");

/** @param {string} diretorio @returns {string[]} */
function listarArquivos(diretorio) {
  const encontrados = [];
  for (const entrada of readdirSync(diretorio)) {
    const caminho = join(diretorio, entrada);
    if (statSync(caminho).isDirectory()) {
      encontrados.push(...listarArquivos(caminho));
    } else if (caminho.endsWith(".ts") || caminho.endsWith(".tsx")) {
      encontrados.push(caminho);
    }
  }
  return encontrados;
}

const pendencias = [];

for (const arquivo of listarArquivos(DIRETORIO_CONTEUDO)) {
  // O próprio schema.ts declara a constante do marcador; ignorá-lo evita
  // um falso positivo permanente.
  if (arquivo.endsWith("schema.ts")) continue;

  const linhas = readFileSync(arquivo, "utf8").split(/\r?\n/);
  linhas.forEach((linha, indice) => {
    const texto = linha.trim();

    // O objetivo é bloquear dados ainda provisórios, não documentação,
    // comentários de ajuda ou o import da constante em si.
    if (texto.startsWith("//") || texto.startsWith("/*") || texto.startsWith("*") || texto.startsWith("import ")) {
      return;
    }

    if (texto.includes("MARCADOR_PENDENTE") || texto.includes(MARCADOR)) {
      pendencias.push({
        arquivo: relative(RAIZ, arquivo),
        linha: indice + 1,
        trecho: texto,
      });
    }
  });
}

if (pendencias.length === 0) {
  console.log("✓ Nenhum valor provisório encontrado. O conteúdo está pronto para publicação.");
  process.exit(0);
}

console.error(
  `\n✗ Publicação bloqueada: ${pendencias.length} valor(es) provisório(s) pendente(s) (FR-030).\n`,
);
for (const pendencia of pendencias) {
  console.error(`  ${pendencia.arquivo}:${pendencia.linha}`);
  console.error(`    ${pendencia.trecho}\n`);
}
console.error(
  "Substitua os dados provisórios pelos dados reais do negócio em src/content/ antes de publicar.\n",
);
process.exit(1);
