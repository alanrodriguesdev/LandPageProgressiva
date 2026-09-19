import { ImageResponse } from "next/og";
import { negocio } from "@/content/negocio";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento construída a partir dos tokens visuais da marca (FR-021). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at top right, rgba(138,109,35,0.16), transparent 35%), linear-gradient(135deg, #f7f6f3 0%, #ffffff 52%, #f7f6f3 100%)",
          color: "#141414",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            borderRadius: "999px",
            padding: "12px 20px",
            background: "#ffffff",
            fontSize: "28px",
            fontWeight: 600,
          }}
        >
          <div style={{ width: "12px", height: "12px", borderRadius: "999px", background: "#8a6d23" }} />
          {negocio.nome}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "850px" }}>
          <div style={{ fontSize: "74px", lineHeight: 1.05, fontWeight: 700 }}>
            Progressiva com brilho e movimento natural
          </div>
          <div style={{ fontSize: "32px", lineHeight: 1.35, color: "#6b6b6b" }}>{negocio.descricaoCurta}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "28px", color: "#6b6b6b" }}>{negocio.areaAtendimento}</div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              padding: "16px 26px",
              background: "#8a6d23",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            Agende pelo WhatsApp
          </div>
        </div>
      </div>
    ),
    size,
  );
}
