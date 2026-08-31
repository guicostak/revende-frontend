import { API_ENDPOINTS } from '@/config';
import type { AuthResponse, LoginPayload, RegisterPayload } from '@/types';
import { httpClient } from './httpClient';

export const authService = {
  login: (payload: LoginPayload) =>
    httpClient.post<AuthResponse>(API_ENDPOINTS.auth.login, payload, { auth: false }),

  register: (payload: RegisterPayload) =>
    httpClient.post<AuthResponse>(API_ENDPOINTS.auth.register, payload, { auth: false }),
};
