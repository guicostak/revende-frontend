import { API_ENDPOINTS } from '@/config';
import type { CreateEventPayload, EventDto, EventFilters } from '@/types';
import { httpClient } from './httpClient';

export const eventService = {
  list: (filters?: EventFilters) =>
    httpClient.get<EventDto[]>(API_ENDPOINTS.events.list, { query: filters }),

  getById: (id: number) => httpClient.get<EventDto>(API_ENDPOINTS.events.byId(id)),

  create: (payload: CreateEventPayload) =>
    httpClient.post<EventDto>(API_ENDPOINTS.events.list, payload),
};
