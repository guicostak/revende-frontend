import type { ListingStatus, TicketType } from '@/types';

/** Rótulos exibidos ao usuário para cada tipo de ingresso. */
export const TICKET_TYPE_LABELS: Record<TicketType, string> = {
  INTEIRA: 'Inteira',
  MEIA: 'Meia-entrada',
  VIP: 'VIP',
  BACKSTAGE: 'Backstage',
};

/** Rótulos e cor (tom do Badge) de cada status de anúncio. */
export const LISTING_STATUS_LABELS: Record<ListingStatus, string> = {
  ATIVO: 'Ativo',
  VENDIDO: 'Vendido',
  CANCELADO: 'Cancelado',
};

export const LISTING_STATUS_TONES = {
  ATIVO: 'success',
  VENDIDO: 'neutral',
  CANCELADO: 'danger',
} as const;
