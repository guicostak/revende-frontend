'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/common/constants';
import { useAuth } from '@/context/AuthContext';

/**
 * Protege páginas que exigem sessão: redireciona para o login quando não há
 * usuário. Retorna o estado de auth para a página decidir o que renderizar
 * enquanto `checking` for true.
 */
export function useRequireAuth() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace(ROUTES.login);
  }, [loading, user, router]);

  return { user, checking: loading || !user };
}
