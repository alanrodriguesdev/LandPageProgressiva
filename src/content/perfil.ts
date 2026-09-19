import { esquemaPerfil, validar, type Perfil } from "./schema";

/** Apresentação da profissional. ⚠️ Contém dados provisórios (FR-030). */
export const perfil: Perfil = validar("perfil", esquemaPerfil, {
  nome: "Alan Sabião",
  foto: {
    src: "/imagens/perfil/profissional.svg",
    alt: "Retrato da cabeleireira responsável pelo atendimento no salão",
    largura: 720,
    altura: 900,
  },
  biografia: [
    "Trabalho com alisamento e recuperação capilar há mais de dez anos, e aprendi cedo que fio saudável vale mais do que fio liso a qualquer custo.",
    "Por isso cada atendimento começa com diagnóstico: teste de mecha, análise de porosidade e conversa honesta sobre o que a sua química atual permite.",
    "Atendo uma cliente por vez, em horário reservado, para que você saia daqui sabendo exatamente o que foi feito no seu cabelo e como mantê-lo em casa.",
  ],
  especializacoes: [
    "Alisamento com acabamento natural",
    "Reconstrução e cronograma capilar",
    "Colorimetria aplicada",
    "Cortes em cabelos com química",
  ],
});
