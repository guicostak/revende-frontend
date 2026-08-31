import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAsync } from './useAsync';

describe('useAsync', () => {
  it('começa carregando e entrega os dados', async () => {
    const fetcher = vi.fn().mockResolvedValue(['a', 'b']);

    const { result } = renderHook(() => useAsync(fetcher));

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(['a', 'b']);
    expect(result.current.error).toBeNull();
  });

  it('expõe a mensagem do erro em vez de propagar a exceção', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('API fora do ar'));

    const { result } = renderHook(() => useAsync(fetcher, { initialData: [] }));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('API fora do ar');
    expect(result.current.data).toEqual([]);
  });

  it('não busca ao montar quando `immediate` é false', async () => {
    const fetcher = vi.fn().mockResolvedValue('x');

    const { result } = renderHook(() => useAsync(fetcher, { immediate: false }));

    expect(result.current.loading).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();

    await result.current.reload();
    await waitFor(() => expect(result.current.data).toBe('x'));
  });

  it('limpa o erro anterior ao recarregar com sucesso', async () => {
    const fetcher = vi
      .fn()
      .mockRejectedValueOnce(new Error('falhou'))
      .mockResolvedValueOnce('ok');

    const { result } = renderHook(() => useAsync(fetcher));

    await waitFor(() => expect(result.current.error).toBe('falhou'));
    await result.current.reload();
    await waitFor(() => expect(result.current.error).toBeNull());
    expect(result.current.data).toBe('ok');
  });

  it('dispara uma única busca quando o fetcher é estável', async () => {
    const fetcher = vi.fn().mockResolvedValue('x');
    const { rerender, result } = renderHook(() => useAsync(fetcher));

    await waitFor(() => expect(result.current.loading).toBe(false));
    rerender();
    rerender();

    // Fetcher instável (sem useCallback) faria isto crescer a cada render.
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
