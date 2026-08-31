'use client';

import { useCallback, useState } from 'react';
import { useAsync, useRequireAuth } from '@/hooks';
import { listingService, toErrorMessage } from '@/services';

/** Lista os anúncios do usuário logado e expõe as ações de vender/cancelar. */
export function useMeusAnunciosHook() {
  const { checking } = useRequireAuth();

  const fetchMyListings = useCallback(() => listingService.listMine(), []);
  const { data, loading, error, reload } = useAsync(fetchMyListings, {
    immediate: !checking,
    initialData: [],
  });

  const [actionError, setActionError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);

  const runAction = useCallback(
    async (id: number, action: (id: number) => Promise<unknown>, fallbackMessage: string) => {
      setActionError(null);
      setPendingId(id);
      try {
        await action(id);
        await reload();
      } catch (err) {
        setActionError(toErrorMessage(err, fallbackMessage));
      } finally {
        setPendingId(null);
      }
    },
    [reload],
  );

  const markSold = useCallback(
    (id: number) => runAction(id, listingService.markSold, 'Não foi possível marcar como vendido'),
    [runAction],
  );

  const cancel = useCallback(
    (id: number) => runAction(id, listingService.cancel, 'Não foi possível cancelar o anúncio'),
    [runAction],
  );

  return {
    checking,
    listings: data ?? [],
    loading,
    error: error ?? actionError,
    pendingId,
    markSold,
    cancel,
  };
}
