/**
 * Leitura centralizada de variáveis de ambiente.
 *
 * Em Next.js só variáveis prefixadas com `NEXT_PUBLIC_` chegam ao browser, e
 * `process.env.X` precisa ser escrito de forma literal para o bundler
 * substituir o valor — por isso nada de acesso dinâmico aqui.
 */

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080',
  /** Origem pública do site. Usada em canonical, Open Graph, sitemap e JSON-LD. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  isProduction: process.env.NODE_ENV === 'production',
} as const;
