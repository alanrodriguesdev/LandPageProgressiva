import { BotaoFlutuante } from "@/components/interactive/BotaoFlutuante";
import { CabecalhoFixo } from "@/components/layout/CabecalhoFixo";
import { AntesDepois } from "@/components/sections/AntesDepois";
import { Beneficios } from "@/components/sections/Beneficios";
import { ChamadaAcao } from "@/components/sections/ChamadaAcao";
import { Contato } from "@/components/sections/Contato";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Hero } from "@/components/sections/Hero";
import { Rodape } from "@/components/sections/Rodape";
import { Servicos } from "@/components/sections/Servicos";
import { Sobre } from "@/components/sections/Sobre";
import { beneficios } from "@/content/beneficios";
import { depoimentos } from "@/content/depoimentos";
import { negocio } from "@/content/negocio";
import { perfil } from "@/content/perfil";
import { servicos } from "@/content/servicos";
import { trabalhos } from "@/content/trabalhos";
import { resumirAvaliacoes } from "@/lib/avaliacoes";
import { montarLinkWhatsApp } from "@/lib/whatsapp";

const IMAGEM_HERO = {
  src: "/imagens/hero.jpg",
  alt: "Cliente com cabelo alinhado, liso e brilhante após o atendimento no salão",
  largura: 900,
  altura: 1100,
} as const;

/**
 * Único ponto de composição da página (contrato de conteúdo): os componentes
 * recebem tudo por propriedades e nunca importam módulos de `src/content/`.
 * É o que permite alterar textos e preços sem abrir um componente sequer.
 */
export default function Pagina() {
  const avaliacoes = resumirAvaliacoes(depoimentos);
  const linkPrincipal = montarLinkWhatsApp({ origem: "hero" });

  // A navegação lista apenas as seções que de fato serão renderizadas (FR-026).
  const secoes = [
    beneficios.length > 0 && { id: "beneficios", rotulo: "Diferenciais" },
    servicos.length > 0 && { id: "servicos", rotulo: "Serviços" },
    trabalhos.length > 0 && { id: "antes-depois", rotulo: "Resultados" },
    { id: "sobre", rotulo: "Sobre" },
    avaliacoes && { id: "depoimentos", rotulo: "Depoimentos" },
    { id: "contato", rotulo: "Contato" },
  ].filter((secao): secao is { id: string; rotulo: string } => Boolean(secao));

  return (
    <>
      <CabecalhoFixo
        nomeNegocio={negocio.nome}
        linkWhatsApp={montarLinkWhatsApp({ origem: "cabecalho" })}
        secoes={secoes}
      />

      <main id="conteudo" tabIndex={-1}>
        <Hero
          descricaoCurta={negocio.descricaoCurta}
          areaAtendimento={negocio.areaAtendimento}
          imagem={IMAGEM_HERO}
          linkWhatsApp={linkPrincipal}
          avaliacoes={avaliacoes}
        />

        <Beneficios beneficios={beneficios} />
        <Servicos servicos={servicos} />
        <AntesDepois trabalhos={trabalhos} />
        <Sobre perfil={perfil} />
        <Depoimentos depoimentos={depoimentos} resumo={avaliacoes} />
        <ChamadaAcao linkWhatsApp={montarLinkWhatsApp({ origem: "chamada-acao" })} />
        <Contato negocio={negocio} linkWhatsApp={montarLinkWhatsApp({ origem: "contato" })} />
      </main>

      <Rodape negocio={negocio} />
      <BotaoFlutuante linkWhatsApp={montarLinkWhatsApp({ origem: "botao-flutuante" })} />
    </>
  );
}
