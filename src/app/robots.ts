import type { MetadataRoute } from 'next';
import { ROUTES } from '@/common/constants';
import { absoluteUrl } from '@/common/utils';

/**
 * Rotas de sessão ficam fora do índice: sem login elas não têm conteúdo útil, e
 * indexá-las gasta crawl budget em página vazia.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [ROUTES.createListing, ROUTES.myListings],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
