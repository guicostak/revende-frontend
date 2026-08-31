import type { MetadataRoute } from 'next';
import { ROUTES } from '@/common/constants';
import { absoluteUrl } from '@/common/utils';
import { eventService } from '@/services';

/** Sitemap gerado a cada request — o catálogo de eventos muda o tempo todo. */
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl(ROUTES.home), changeFrequency: 'hourly', priority: 1 },
    { url: absoluteUrl(ROUTES.login), changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl(ROUTES.register), changeFrequency: 'yearly', priority: 0.3 },
  ];

  try {
    const events = await eventService.list();
    return [
      ...staticRoutes,
      ...events.map((event) => ({
        url: absoluteUrl(ROUTES.event(event.id)),
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      })),
    ];
  } catch {
    // API fora do ar não pode derrubar o sitemap — devolve o que é estático.
    return staticRoutes;
  }
}
