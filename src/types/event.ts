export interface EventDto {
  id: number;
  name: string;
  description?: string;
  /** ISO 8601. */
  date: string;
  venue: string;
  city: string;
  category?: string;
  imageUrl?: string;
}

export type CreateEventPayload = Omit<EventDto, 'id'>;

/**
 * Type alias (e não interface) de propósito: só assim o objeto é aceito como
 * query string no httpClient, que espera um Record indexável.
 */
export type EventFilters = {
  city?: string;
  name?: string;
};
