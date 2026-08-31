import { cache } from 'react';
import { eventService, listingService } from '@/services';
import type { EventDto, ListingDto } from '@/types';

export interface EventPageData {
  event: EventDto;
  listings: ListingDto[];
}

/**
 * Carrega evento e anúncios no servidor.
 *
 * As duas chamadas vão em paralelo — encadeadas, dobrariam a latência da página
 * que mais precisa ranquear.
 *
 * `cache()` deduplica entre `generateMetadata` e o render da página: as duas
 * chamam este loader e só uma requisição sai.
 *
 * Devolve `null` quando o evento não existe, para a página chamar `notFound()`.
 */
export const loadEventPage = cache(async (eventId: number): Promise<EventPageData | null> => {
  try {
    const [event, listings] = await Promise.all([
      eventService.getById(eventId),
      listingService.list(eventId),
    ]);
    return { event, listings };
  } catch {
    return null;
  }
});
