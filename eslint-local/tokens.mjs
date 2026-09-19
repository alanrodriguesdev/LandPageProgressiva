/**
 * Regra local que materializa o Princípio IV da constituição e o FR-016:
 * os tokens de design declarados em `@theme` são a única fonte de verdade.
 * Valores arbitrários do Tailwind (ex.: `text-[#d4af37]`, `p-[13px]`) introduzem
 * valores literais nos componentes e por isso são erro.
 */
const ARBITRARIO = /(?:^|:|\s)[a-z-]+-\[[^\]]+\]/;

const regraSemValorArbitrario = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Proíbe valores arbitrários do Tailwind; use os tokens declarados em @theme.",
    },
    schema: [],
    messages: {
      arbitrario:
        "Valor arbitrário do Tailwind não permitido em '{{valor}}'. Declare um token em @theme (globals.css) e use a classe derivada.",
    },
  },
  create(context) {
    function verificar(node, valor) {
      if (typeof valor !== "string") return;
      if (!ARBITRARIO.test(valor)) return;
      context.report({ node, messageId: "arbitrario", data: { valor } });
    }

    function ehAtributoDeClasse(node) {
      const pai = node.parent;
      if (!pai) return false;
      if (pai.type === "JSXAttribute" && pai.name?.name === "className") return true;
      if (
        pai.type === "JSXExpressionContainer" &&
        pai.parent?.type === "JSXAttribute" &&
        pai.parent.name?.name === "className"
      ) {
        return true;
      }
      return false;
    }

    return {
      Literal(node) {
        if (ehAtributoDeClasse(node)) verificar(node, node.value);
      },
      TemplateElement(node) {
        verificar(node, node.value.raw);
      },
    };
  },
};

const plugin = {
  rules: {
    "sem-valor-arbitrario": regraSemValorArbitrario,
  },
};

export default plugin;
