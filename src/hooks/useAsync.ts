'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { toErrorMessage } from '@/services';

interface UseAsyncOptions<T> {
  /** Dispara a busca ao montar. Padrão: true. */
  immediate?: boolean;
  initialData?: T;
}

interface UseAsyncResult<T> {
  data: T | undefined;
  loading: boolean;
  error: string | null;
  /** Reexecuta a busca (usado em refresh após mutações). */
  reload: () => Promise<void>;
  /** Atualiza os dados localmente, sem ir à API (updates otimistas). */
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
}

/**
 * Encapsula o trio `data / loading / error` de uma chamada assíncrona.
 *
 * O `fetcher` precisa ser estável — envolva em `useCallback` no hook que chama,
 * senão a busca dispara em todo render.
 */
export function useAsync<T>(
  fetcher: () => Promise<T>,
  { immediate = true, initialData }: UseAsyncOptions<T> = {},
): UseAsyncResult<T> {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (mountedRef.current) setData(result);
    } catch (err) {
      if (mountedRef.current) setError(toErrorMessage(err, 'Não foi possível carregar os dados'));
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (immediate) void reload();
  }, [immediate, reload]);

  return { data, loading, error, reload, setData };
}
