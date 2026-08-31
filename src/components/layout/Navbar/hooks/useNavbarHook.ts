'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/common/constants';
import { useAuth } from '@/context/AuthContext';

/** Estado e ações da Navbar — mantém o componente só com marcação. */
export function useNavbarHook() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    router.push(ROUTES.home);
  }, [logout, router]);

  return { user, isAuthenticated, handleLogout };
}
