import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Empacota em `.next/standalone` um servidor Node com só as dependências que
   * a aplicação de fato usa. É o que permite a imagem Docker sem `node_modules`
   * inteiro — de ~400 MB para dezenas.
   *
   * Necessário porque `/` e `/evento/[id]` são rotas dinâmicas: renderizam no
   * servidor a cada request. Export estático não serviria.
   */
  output: 'standalone',

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
