import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Lista fechada de origens. `hostname: "**"` aceitaria qualquer host, o que
    // transforma o otimizador de imagem do Next em proxy aberto.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.sympla.com.br" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "https", hostname: "**.amazonaws.com" },
    ],
  },
};

export default nextConfig;
