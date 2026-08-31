import { cache } from 'react';
import { listingService, toErrorMessage } from '@/services';
import type { ListingDto } from '@/types';

export interface HomePageData {
  listings: ListingDto[];
  error: string | null;
}

/**
 * Carrega os anúncios da home no servidor.
 *
 * `cache()` do React deduplica a chamada dentro de um mesmo request — a página e
 * a `generateMetadata` podem pedir os dados sem bater duas vezes na API.
 *
 * A falha vira estado (`error`), não exceção: API fora do ar deve renderizar a
 * home com um aviso, não uma tela de erro.
 */
export const loadHomePage = cache(async (): Promise<HomePageData> => {
  try {
    const listings = await listingService.list();
    // Anúncio vendido ou cancelado não pode aparecer como comprável — nem na
    // vitrine, nem no JSON-LD. Filtro defensivo: não dependemos da API fazê-lo.
    return { listings: listings.filter((listing) => listing.status === 'ATIVO'), error: null };
  } catch (err) {
    return { listings: [], error: toErrorMessage(err, 'Não foi possível carregar os anúncios') };
  }
});

/** Filtro de busca aplicado no servidor, para o HTML já sair filtrado. */
export function filterListings(listings: ListingDto[], query: string): ListingDto[] {
  const term = query.trim().toLowerCase();
  if (!term) return listings;

  return listings.filter((listing) =>
    [listing.event.name, listing.event.city, listing.event.category ?? '']
      .join(' ')
      .toLowerCase()
      .includes(term),
  );
}
