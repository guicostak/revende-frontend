import { BASE_API_URL, STORAGE_KEYS } from '@/config';
import { storage } from '@/common/utils/storage';

/** Erro de API com o status HTTP preservado, para o chamador decidir o que fazer. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  /** Corpo em objeto — serializado como JSON automaticamente. */
  body?: unknown;
  /** Query string em objeto — valores nulos/vazios são descartados. */
  query?: Record<string, string | number | undefined | null>;
  /** Envia o Bearer token quando houver sessão. Padrão: true. */
  auth?: boolean;
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const url = `${BASE_API_URL}${path}`;
  if (!query) return url;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '') continue;
    params.set(key, String(value));
  }

  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

async function extractErrorMessage(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { message?: string; error?: string };
    return body.message ?? body.error ?? `Erro ${res.status}`;
  } catch {
    return `Erro ${res.status}`;
  }
}

/**
 * Único ponto de saída HTTP da aplicação.
 *
 * Responsabilidades: montar URL, injetar o token, serializar/desserializar JSON
 * e normalizar erros em `ApiError`. Nenhum componente deve chamar `fetch`
 * diretamente — sempre via um service em `src/services`.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, query, auth = true, headers, ...init } = options;
  const token = auth ? storage.get(STORAGE_KEYS.token) : null;

  const res = await fetch(buildUrl(path, query), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new ApiError(await extractErrorMessage(res), res.status);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const httpClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};

/** Mensagem amigável a partir de um erro desconhecido vindo de um catch. */
export function toErrorMessage(error: unknown, fallback = 'Algo deu errado'): string {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
