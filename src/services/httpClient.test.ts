import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { STORAGE_KEYS } from '@/config';
import { ApiError, httpClient, toErrorMessage } from './httpClient';

/** Resposta mínima com a forma que o `request` consome. */
const jsonResponse = (body: unknown, status = 200) =>
  ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }) as Response;

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock);
  fetchMock.mockReset();
  window.localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

/** Último `fetch` executado: [url, init]. */
const lastCall = () => fetchMock.mock.calls.at(-1) as [string, RequestInit];

describe('montagem da URL', () => {
  it('prefixa o path com a URL base da API', async () => {
    fetchMock.mockResolvedValue(jsonResponse([]));

    await httpClient.get('/api/listings');

    expect(lastCall()[0]).toBe('http://localhost:8080/api/listings');
  });

  it('descarta parâmetros vazios, nulos e indefinidos da query', async () => {
    fetchMock.mockResolvedValue(jsonResponse([]));

    await httpClient.get('/api/listings', {
      query: { eventId: 7, city: '', name: undefined, category: null },
    });

    // `?eventId=7&city=` traria resultado errado do backend.
    expect(lastCall()[0]).toBe('http://localhost:8080/api/listings?eventId=7');
  });

  it('omite a query string quando nada sobra', async () => {
    fetchMock.mockResolvedValue(jsonResponse([]));

    await httpClient.get('/api/listings', { query: { eventId: undefined } });

    expect(lastCall()[0]).toBe('http://localhost:8080/api/listings');
  });
});

describe('autenticação', () => {
  it('injeta o Bearer token quando há sessão', async () => {
    window.localStorage.setItem(STORAGE_KEYS.token, 'abc123');
    fetchMock.mockResolvedValue(jsonResponse({}));

    await httpClient.get('/api/listings/me');

    expect(lastCall()[1].headers).toMatchObject({ Authorization: 'Bearer abc123' });
  });

  it('não envia Authorization sem sessão', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}));

    await httpClient.get('/api/listings');

    expect(lastCall()[1].headers).not.toHaveProperty('Authorization');
  });

  it('respeita `auth: false` mesmo havendo token guardado', async () => {
    window.localStorage.setItem(STORAGE_KEYS.token, 'abc123');
    fetchMock.mockResolvedValue(jsonResponse({}));

    // Login e cadastro não podem mandar o token antigo.
    await httpClient.post('/api/auth/login', { email: 'a@b.com' }, { auth: false });

    expect(lastCall()[1].headers).not.toHaveProperty('Authorization');
  });
});

describe('corpo e verbos', () => {
  it('serializa o corpo como JSON', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ id: 1 }));

    await httpClient.post('/api/listings', { price: 180 });

    const [, init] = lastCall();
    expect(init.method).toBe('POST');
    expect(init.body).toBe('{"price":180}');
    expect(init.headers).toMatchObject({ 'Content-Type': 'application/json' });
  });

  it('não envia corpo quando não há payload', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}));

    await httpClient.patch('/api/listings/1/sold');

    expect(lastCall()[1].body).toBeUndefined();
  });
});

describe('erros', () => {
  it('lança ApiError preservando o status', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'Token expirado' }, 401));

    await expect(httpClient.get('/api/listings/me')).rejects.toMatchObject({
      name: 'ApiError',
      status: 401,
      message: 'Token expirado',
    });
  });

  it('aceita `error` além de `message` no corpo', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ error: 'Dados inválidos' }, 400));

    await expect(httpClient.post('/api/listings', {})).rejects.toThrow('Dados inválidos');
  });

  it('usa o status como mensagem quando o corpo não é JSON', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error('não é JSON');
      },
    } as unknown as Response);

    await expect(httpClient.get('/api/listings')).rejects.toThrow('Erro 500');
  });
});

describe('respostas sem conteúdo', () => {
  it('devolve undefined em 204, sem tentar ler JSON', async () => {
    const json = vi.fn();
    fetchMock.mockResolvedValue({ ok: true, status: 204, json } as unknown as Response);

    await expect(httpClient.delete('/api/listings/1')).resolves.toBeUndefined();
    expect(json).not.toHaveBeenCalled();
  });
});

describe('toErrorMessage', () => {
  it('usa a mensagem do Error', () => {
    expect(toErrorMessage(new Error('boom'), 'padrão')).toBe('boom');
  });

  it('usa o fallback para erro sem mensagem ou de tipo desconhecido', () => {
    expect(toErrorMessage(new Error(''), 'padrão')).toBe('padrão');
    expect(toErrorMessage('string solta', 'padrão')).toBe('padrão');
    expect(toErrorMessage(undefined, 'padrão')).toBe('padrão');
  });

  it('preserva o status ao normalizar um ApiError', () => {
    const erro = new ApiError('Não autorizado', 401);
    expect(toErrorMessage(erro)).toBe('Não autorizado');
    expect(erro.status).toBe(401);
  });
});
