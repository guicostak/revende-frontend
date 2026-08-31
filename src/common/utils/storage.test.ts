import { beforeEach, describe, expect, it, vi } from 'vitest';
import { storage } from './storage';

beforeEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe('storage', () => {
  it('grava e lê string', () => {
    storage.set('chave', 'valor');
    expect(storage.get('chave')).toBe('valor');
  });

  it('devolve null para chave inexistente', () => {
    expect(storage.get('nao-existe')).toBeNull();
  });

  it('remove a chave', () => {
    storage.set('chave', 'valor');
    storage.remove('chave');
    expect(storage.get('chave')).toBeNull();
  });

  it('faz round-trip de JSON', () => {
    storage.setJson('user', { id: 1, name: 'Marina' });
    expect(storage.getJson('user')).toEqual({ id: 1, name: 'Marina' });
  });

  it('descarta JSON corrompido em vez de estourar', () => {
    window.localStorage.setItem('user', '{quebrado');

    expect(storage.getJson('user')).toBeNull();
    // A chave inválida some, senão o erro se repetiria a cada leitura.
    expect(storage.get('user')).toBeNull();
  });

  it('não estoura quando o storage está bloqueado', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('quota cheia');
    });

    // Modo privado e quota cheia não podem derrubar a aplicação.
    expect(() => storage.set('chave', 'valor')).not.toThrow();
  });
});
