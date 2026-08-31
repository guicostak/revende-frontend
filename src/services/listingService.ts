import { API_ENDPOINTS } from '@/config';
import type { CreateListingPayload, ListingDto } from '@/types';
import { httpClient } from './httpClient';

export const listingService = {
  list: (eventId?: number) =>
    httpClient.get<ListingDto[]>(API_ENDPOINTS.listings.list, { query: { eventId } }),

  getById: (id: number) => httpClient.get<ListingDto>(API_ENDPOINTS.listings.byId(id)),

  listMine: () => httpClient.get<ListingDto[]>(API_ENDPOINTS.listings.mine),

  create: (payload: CreateListingPayload) =>
    httpClient.post<ListingDto>(API_ENDPOINTS.listings.list, payload),

  markSold: (id: number) =>
    httpClient.patch<ListingDto>(API_ENDPOINTS.listings.markSold(id)),

  cancel: (id: number) => httpClient.delete<void>(API_ENDPOINTS.listings.byId(id)),
};
