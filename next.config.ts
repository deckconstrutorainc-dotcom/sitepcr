import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // layout raiz em app/[lang]: a 404 de URLs sem rota precisa do próprio <html lang>
    globalNotFound: true,
    // CSS do Tailwind (atômico, pequeno) vai no <head>: elimina a requisição que bloqueia a primeira pintura
    inlineCss: true,
  },
  images: {
    // obrigatório no Next 16: só estas qualidades podem ser pedidas ao otimizador
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
