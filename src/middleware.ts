import { NextResponse, type NextRequest } from "next/server";

/**
 * Cabeçalhos de segurança exigidos pela constituição v2.0.0.
 *
 * A CSP não usa `unsafe-inline` nem `unsafe-eval` em `script-src`: o nonce
 * gerado por requisição autoriza apenas os scripts inline que o próprio Next
 * injeta (D-007). Como não há recurso de terceiro nesta entrega, a política
 * permanece restrita a 'self'.
 */
function montarCsp(nonce: string): string {
  const desenvolvimento = process.env.NODE_ENV === "development";

  const diretrizes = [
    "default-src 'self'",
    // 'strict-dynamic' permite que os scripts autorizados pelo nonce carreguem
    // seus próprios chunks sem afrouxar a política para o resto da página.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${desenvolvimento ? " 'unsafe-eval'" : ""}`,
    // O Next injeta estilo inline para otimização de imagem e fontes; o nonce
    // cobre esses casos sem liberar 'unsafe-inline' de forma ampla.
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://vitals.vercel-insights.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ];

  return diretrizes.join("; ");
}

export function middleware(request: NextRequest) {
  const nonce = crypto.randomUUID().replaceAll("-", "");

  // O nonce viaja no cabeçalho da requisição para que o layout possa lê-lo.
  const cabecalhosRequisicao = new Headers(request.headers);
  cabecalhosRequisicao.set("x-nonce", nonce);

  const resposta = NextResponse.next({
    request: { headers: cabecalhosRequisicao },
  });

  resposta.headers.set("Content-Security-Policy", montarCsp(nonce));
  resposta.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  resposta.headers.set("X-Content-Type-Options", "nosniff");
  resposta.headers.set("X-Frame-Options", "DENY");
  resposta.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  resposta.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  );
  resposta.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  resposta.headers.set("X-DNS-Prefetch-Control", "off");

  return resposta;
}

export const config = {
  // Aplica somente a documentos: ativos estáticos continuam servidos pelo CDN
  // sem passar pelo middleware, preservando o LCP (D-007).
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|imagens/).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
