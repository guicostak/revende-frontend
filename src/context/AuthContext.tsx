'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '@/config';
import { storage } from '@/common/utils/storage';
import type { AuthResponse, AuthUser } from '@/types';

interface AuthContextValue {
  user: AuthUser | null;
  /** True enquanto a sessão é lida do storage (primeiro render). */
  loading: boolean;
  isAuthenticated: boolean;
  setSession: (auth: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // O storage só existe no browser, então a sessão é restaurada após hidratar.
  useEffect(() => {
    setUser(storage.getJson<AuthUser>(STORAGE_KEYS.user));
    setLoading(false);
  }, []);

  const setSession = useCallback((auth: AuthResponse) => {
    const { token, ...authUser } = auth;
    storage.set(STORAGE_KEYS.token, token);
    storage.setJson(STORAGE_KEYS.user, authUser);
    setUser(authUser);
  }, []);

  const logout = useCallback(() => {
    storage.remove(STORAGE_KEYS.token);
    storage.remove(STORAGE_KEYS.user);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, isAuthenticated: Boolean(user), setSession, logout }),
    [user, loading, setSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
