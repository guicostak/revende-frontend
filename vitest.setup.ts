import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cada teste começa com o DOM limpo — resíduo de render anterior já causou
// "found multiple elements" em suíte que crescia.
afterEach(cleanup);

/**
 * localStorage em memória.
 *
 * O jsdom deste ambiente não expõe `window.localStorage`, e `common/utils/storage.ts`
 * depende dele. Sem esta ponte, todo teste que toque em sessão falharia por
 * infraestrutura, não por defeito no código.
 */
if (typeof window !== 'undefined' && !window.localStorage) {
  const store = new Map<string, string>();

  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, String(value)),
      removeItem: (key: string) => void store.delete(key),
      clear: () => store.clear(),
      key: (index: number) => [...store.keys()][index] ?? null,
      get length() {
        return store.size;
      },
    } satisfies Storage,
  });
}
