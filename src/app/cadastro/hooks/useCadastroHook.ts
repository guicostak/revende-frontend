'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/common/constants';
import { useAuth } from '@/context/AuthContext';
import { useForm } from '@/hooks';
import { authService, toErrorMessage } from '@/services';

const INITIAL_VALUES = { name: '', email: '', password: '', phone: '' };
const MIN_PASSWORD_LENGTH = 6;

/** Regras e submit do formulário de cadastro. */
export function useCadastroHook() {
  const router = useRouter();
  const { setSession } = useAuth();
  const { values, handleChange } = useForm(INITIAL_VALUES);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setError(null);

      if (values.password.length < MIN_PASSWORD_LENGTH) {
        setError(`A senha precisa ter ao menos ${MIN_PASSWORD_LENGTH} caracteres`);
        return;
      }

      setSubmitting(true);
      try {
        setSession(
          await authService.register({
            name: values.name,
            email: values.email,
            password: values.password,
            phone: values.phone || undefined,
          }),
        );
        router.push(ROUTES.home);
      } catch (err) {
        setError(toErrorMessage(err, 'Não foi possível criar a conta'));
      } finally {
        setSubmitting(false);
      }
    },
    [values, setSession, router],
  );

  return { values, handleChange, handleSubmit, error, submitting, minPasswordLength: MIN_PASSWORD_LENGTH };
}
