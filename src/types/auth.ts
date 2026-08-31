export interface AuthResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
}

/** Usuário autenticado guardado no client (sem o token). */
export interface AuthUser {
  userId: number;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}
