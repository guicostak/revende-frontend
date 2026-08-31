import type { EventDto } from './event';

export const TICKET_TYPES = ['INTEIRA', 'MEIA', 'VIP', 'BACKSTAGE'] as const;
export type TicketType = (typeof TICKET_TYPES)[number];

export const LISTING_STATUSES = ['ATIVO', 'VENDIDO', 'CANCELADO'] as const;
export type ListingStatus = (typeof LISTING_STATUSES)[number];

export interface ListingDto {
  id: number;
  event: EventDto;
  sellerId: number;
  sellerName: string;
  ticketType: TicketType;
  originalPrice: number;
  price: number;
  quantity: number;
  description?: string;
  status: ListingStatus;
}

export interface CreateListingPayload {
  eventId: number;
  ticketType: TicketType;
  originalPrice: number;
  price: number;
  quantity: number;
  description?: string;
}
