import { env } from './env';

/** URL base da API (backend Revende). */
export const BASE_API_URL = env.apiUrl;

/** Chaves usadas no localStorage. Centralizadas para evitar strings soltas. */
export const STORAGE_KEYS = {
  token: 'revende_token',
  user: 'revende_user',
} as const;

/**
 * Endpoints da API em um único lugar. Páginas e componentes nunca montam URL
 * na mão — usam os services em `src/services`.
 */
export const API_ENDPOINTS = {
  auth: {
    register: '/api/auth/register',
    login: '/api/auth/login',
  },
  events: {
    list: '/api/events',
    byId: (id: number) => `/api/events/${id}`,
  },
  listings: {
    list: '/api/listings',
    byId: (id: number) => `/api/listings/${id}`,
    mine: '/api/listings/me',
    markSold: (id: number) => `/api/listings/${id}/sold`,
  },
} as const;
