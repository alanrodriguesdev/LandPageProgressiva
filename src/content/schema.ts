import { z } from "zod";

/**
 * Esquemas de conteúdo (contracts/content-schema.md).
 *
 * A validação roda na importação dos módulos de `src/content/`, de modo que
 * qualquer registro inválido faz o `next build` falhar (FR-028), em vez de
 * produzir uma página quebrada em produção.
 */

/** Marcador obrigatório em todo valor ainda provisório (FR-030). */
export const MARCADOR_PENDENTE = "[PENDENTE]";

const naoVazio = (rotulo: string) =>
  z.string().trim().min(1, `${rotulo} não pode ficar vazio.`);

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O identificador deve ser um slug em minúsculas.");

const dataIso = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "A data deve estar no formato AAAA-MM-DD.")
  .refine((valor) => !Number.isNaN(Date.parse(valor)), "Data inexistente no calendário.");

const hora = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "A hora deve estar no formato HH:mm.");

const urlAbsoluta = z.string().url("Informe uma URL absoluta.");

export const esquemaImagem = z.object({
  src: naoVazio("O caminho da imagem").startsWith("/", "O caminho deve começar com '/'."),
  // FR-018: texto alternativo descritivo é obrigatório em imagem informativa.
  alt: naoVazio("O texto alternativo da imagem"),
  largura: z.number().int().positive(),
  altura: z.number().int().positive(),
});

export const DIAS_SEMANA = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo",
] as const;

export const ROTULOS_DIA: Record<(typeof DIAS_SEMANA)[number], string> = {
  segunda: "Segunda-feira",
  terca: "Terça-feira",
  quarta: "Quarta-feira",
  quinta: "Quinta-feira",
  sexta: "Sexta-feira",
  sabado: "Sábado",
  domingo: "Domingo",
};

export const esquemaHorario = z
  .object({
    diaSemana: z.enum(DIAS_SEMANA),
    abre: hora.optional(),
    fecha: hora.optional(),
    fechado: z.boolean().default(false),
  })
  .superRefine((valor, ctx) => {
    if (valor.fechado) return;
    if (!valor.abre || !valor.fecha) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Horário de ${valor.diaSemana}: informe 'abre' e 'fecha' ou marque 'fechado'.`,
      });
      return;
    }
    if (valor.abre >= valor.fecha) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Horário de ${valor.diaSemana}: a abertura deve ser anterior ao fechamento.`,
      });
    }
  });

export const PLATAFORMAS = ["instagram", "facebook", "tiktok", "youtube"] as const;

export const ROTULOS_PLATAFORMA: Record<(typeof PLATAFORMAS)[number], string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
};

export const esquemaRedeSocial = z.object({
  plataforma: z.enum(PLATAFORMAS),
  url: urlAbsoluta,
  identificador: naoVazio("O identificador do perfil"),
});

export const esquemaNegocio = z.object({
  nome: naoVazio("O nome do negócio"),
  descricaoCurta: naoVazio("A descrição curta").max(
    160,
    "A descrição curta deve ter no máximo 160 caracteres (usada na meta description).",
  ),
  // Somente dígitos, com código do país.
  whatsapp: z.string().regex(/^\d{12,15}$/, "O WhatsApp deve conter apenas dígitos com DDI e DDD."),
  telefone: z
    .string()
    .regex(/^\+\d{10,15}$/, "O telefone deve estar no formato E.164, como +5511999999999.")
    .optional(),
  email: z.string().email("Informe um e-mail válido."),
  areaAtendimento: naoVazio("A área de atendimento"),
  endereco: z
    .object({
      logradouro: naoVazio("O logradouro"),
      cidade: naoVazio("A cidade"),
      estado: z.string().length(2, "Use a sigla do estado com 2 letras."),
      cep: z.string().regex(/^\d{5}-?\d{3}$/, "Informe um CEP válido."),
    })
    .optional(),
  horarios: z.array(esquemaHorario).min(1, "Informe ao menos um horário de atendimento."),
  redesSociais: z.array(esquemaRedeSocial).default([]),
  urlCanonica: urlAbsoluta,
});

export const esquemaServico = z
  .object({
    id: slug,
    nome: naoVazio("O nome do serviço"),
    descricao: naoVazio("A descrição do serviço").max(
      240,
      "A descrição do serviço deve ter no máximo 240 caracteres.",
    ),
    duracaoEstimada: z.string().trim().min(1).optional(),
    faixaInvestimento: z.string().trim().min(1).optional(),
    imagem: esquemaImagem.optional(),
    destaque: z.boolean().default(false),
  })
  .refine(
    (valor) => Boolean(valor.duracaoEstimada ?? valor.faixaInvestimento),
    // FR-004: a visitante precisa de ao menos um indicador de esforço ou preço.
    {
      message:
        "Cada serviço deve informar ao menos duração estimada ou faixa de investimento (FR-004).",
      path: ["duracaoEstimada"],
    },
  );

export const esquemaBeneficio = z.object({
  id: slug,
  titulo: naoVazio("O título do benefício"),
  descricao: naoVazio("A descrição do benefício").max(
    180,
    "A descrição do benefício deve ter no máximo 180 caracteres.",
  ),
  icone: naoVazio("O nome do ícone"),
});

export const esquemaTrabalho = z.object({
  id: slug,
  antes: esquemaImagem,
  depois: esquemaImagem,
  legenda: naoVazio("A legenda do trabalho"),
  servicoId: slug.optional(),
  publicadoEm: dataIso,
});

export const esquemaDepoimento = z.object({
  id: slug,
  nomeExibicao: naoVazio("O nome de exibição").max(
    60,
    "O nome de exibição deve ter no máximo 60 caracteres.",
  ),
  nota: z
    .number()
    .int("A nota deve ser um número inteiro.")
    .min(1, "A nota mínima é 1.")
    .max(5, "A nota máxima é 5."),
  texto: naoVazio("O texto do depoimento").max(
    1000,
    "O depoimento deve ter no máximo 1000 caracteres.",
  ),
  data: dataIso,
  aprovado: z.boolean(),
});

export const esquemaPerfil = z.object({
  nome: naoVazio("O nome da profissional"),
  foto: esquemaImagem,
  biografia: z.array(naoVazio("O parágrafo de biografia")).min(1, "Informe ao menos um parágrafo."),
  especializacoes: z.array(naoVazio("A especialização")).default([]),
});

export type Imagem = z.infer<typeof esquemaImagem>;
export type Horario = z.infer<typeof esquemaHorario>;
export type RedeSocial = z.infer<typeof esquemaRedeSocial>;
export type Negocio = z.infer<typeof esquemaNegocio>;
export type Servico = z.infer<typeof esquemaServico>;
export type Beneficio = z.infer<typeof esquemaBeneficio>;
export type Trabalho = z.infer<typeof esquemaTrabalho>;
export type Depoimento = z.infer<typeof esquemaDepoimento>;
export type Perfil = z.infer<typeof esquemaPerfil>;
export type DiaSemana = (typeof DIAS_SEMANA)[number];
export type Plataforma = (typeof PLATAFORMAS)[number];

/**
 * Formata o erro do Zod com a entidade e o campo, para que a falha de build
 * aponte exatamente o registro a corrigir.
 */
function falhar(entidade: string, erro: z.ZodError): never {
  const detalhes = erro.issues
    .map((problema) => {
      const caminho = problema.path.length > 0 ? problema.path.join(".") : "(raiz)";
      return `  • ${caminho}: ${problema.message}`;
    })
    .join("\n");

  throw new Error(
    `Conteúdo inválido em "${entidade}". Corrija o arquivo em src/content/ antes de publicar.\n${detalhes}`,
  );
}

/** Valida um registro único e falha o build quando inválido. */
export function validar<S extends z.ZodTypeAny>(
  entidade: string,
  esquema: S,
  valor: unknown,
): z.infer<S> {
  const resultado = esquema.safeParse(valor);
  if (!resultado.success) falhar(entidade, resultado.error);
  return resultado.data;
}

/** Valida uma coleção e garante que os identificadores sejam únicos. */
export function validarColecao<S extends z.ZodTypeAny>(
  entidade: string,
  esquema: S,
  valores: readonly unknown[],
): z.infer<S>[] {
  const itens = valores.map((valor, indice) =>
    validar(`${entidade}[${indice}]`, esquema, valor),
  ) as (z.infer<S> & { id?: string })[];

  const vistos = new Set<string>();
  for (const item of itens) {
    if (typeof item.id !== "string") continue;
    if (vistos.has(item.id)) {
      throw new Error(
        `Conteúdo inválido em "${entidade}": o identificador "${item.id}" está duplicado. Cada item precisa de um id único.`,
      );
    }
    vistos.add(item.id);
  }

  return itens;
}

/**
 * Integridade referencial entre trabalhos e serviços. Um `servicoId` órfão
 * indica conteúdo desatualizado e reprova o build.
 */
export function validarReferenciasDeTrabalhos(
  trabalhos: readonly Trabalho[],
  servicos: readonly Servico[],
): void {
  const idsConhecidos = new Set(servicos.map((servico) => servico.id));

  for (const trabalho of trabalhos) {
    if (trabalho.servicoId && !idsConhecidos.has(trabalho.servicoId)) {
      throw new Error(
        `Conteúdo inválido em "trabalhos": o trabalho "${trabalho.id}" referencia o serviço "${trabalho.servicoId}", que não existe em src/content/servicos.ts.`,
      );
    }
  }
}
