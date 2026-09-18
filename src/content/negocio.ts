import { esquemaNegocio, validar, type Negocio } from "./schema";

export const negocio: Negocio = validar("negocio", esquemaNegocio, {
  nome: "Alan Sabião",
  descricaoCurta: "Progressiva com acabamento natural, cronograma capilar e coloração com resultado sofisticado.",

  // Somente dígitos, com DDI + DDD.
  whatsapp: "5541984863181",
  email: "alansabiao@gmail.com",

  areaAtendimento: "Atendimento a domicílio em Curitiba e região metropolitana.",

  endereco: {
    logradouro: "A combinar",
    cidade: "Colombo",
    estado: "PR",
    cep: "83407-758",
  },

  horarios: [
    { diaSemana: "segunda", fechado: true },
    { diaSemana: "terca", fechado: true },
    { diaSemana: "quarta", fechado: true },
    { diaSemana: "quinta", fechado: true },
    { diaSemana: "sexta", fechado: true },
    { diaSemana: "sabado", fechado: true },
    { diaSemana: "domingo", fechado: true },
  ],

  redesSociais: [
    {
      plataforma: "instagram",
      url: "https://instagram.com/alansabiao",
      identificador: "@alansabiao",
    },
    {
      plataforma: "tiktok",
      url: "https://tiktok.com/@alansabiao",
      identificador: "@alansabiao",
    },
  ],

  urlCanonica: "https://alansabiao.com.br",
});
