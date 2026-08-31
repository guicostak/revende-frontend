'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/common/constants';
import { useAuth } from '@/context/AuthContext';
import { useForm } from '@/hooks';
import { authService, toErrorMessage } from '@/services';

const INITIAL_VALUES = { email: '', password: '' };

/** Regras e submit do formulário de login. */
export function useLoginHook() {
  const router = useRouter();
  const { setSession } = useAuth();
  const { values, handleChange } = useForm(INITIAL_VALUES);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setError(null);
      setSubmitting(true);
      try {
        setSession(await authService.login(values));
        router.push(ROUTES.home);
      } catch (err) {
        setError(toErrorMessage(err, 'Não foi possível entrar'));
      } finally {
        setSubmitting(false);
      }
    },
    [values, setSession, router],
  );

  return { values, handleChange, handleSubmit, error, submitting };
}
