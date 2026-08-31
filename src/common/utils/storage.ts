/**
 * Acesso seguro ao localStorage.
 *
 * Componentes de página são renderizados no servidor antes de hidratar, então
 * `window` pode não existir. Toda leitura/escrita passa por aqui.
 */

export const storage = {
  get(key: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  getJson<T>(key: string): T | null {
    const raw = storage.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      storage.remove(key);
      return null;
    }
  },

  set(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* quota cheia ou storage bloqueado — ignorar */
    }
  },

  setJson(key: string, value: unknown): void {
    storage.set(key, JSON.stringify(value));
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignorar */
    }
  },
};
