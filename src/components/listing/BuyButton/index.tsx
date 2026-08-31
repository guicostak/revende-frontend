'use client';

import { Button } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import type { ListingDto } from '@/types';

/**
 * Ilha client dentro da página do evento (server): só a checagem de "este
 * anúncio é meu?" precisa da sessão, que só existe no browser.
 */
export function BuyButton({ listing }: { listing: ListingDto }) {
  const { user } = useAuth();
  const isOwnListing = user?.userId === listing.sellerId;

  return (
    <Button size="lg" disabled={isOwnListing}>
      {isOwnListing ? 'Seu anúncio' : 'Comprar'}
    </Button>
  );
}
