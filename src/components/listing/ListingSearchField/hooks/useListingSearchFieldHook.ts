'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/common/constants';

/**
 * A busca vive na URL (`?q=`), não em estado local: o resultado fica
 * compartilhável, o botão voltar funciona e o servidor consegue renderizar a
 * lista já filtrada.
 */
export function useListingSearchFieldHook() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get('q') ?? '';

  const [value, setValue] = useState(queryFromUrl);

  // Mantém o campo em sincronia quando a navegação vem de fora (voltar, link).
  useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const term = value.trim();
      router.push(term ? `${ROUTES.home}?q=${encodeURIComponent(term)}` : ROUTES.home);
    },
    [value, router],
  );

  return { value, setValue, handleSubmit };
}
