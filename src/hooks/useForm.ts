'use client';

import { useCallback, useState } from 'react';

/**
 * Estado de formulário simples e tipado.
 *
 * Cobre o caso comum de "objeto de campos + handler de change". Formulários com
 * validação complexa devem migrar para react-hook-form + zod.
 */
export function useForm<T extends Record<string, string>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const setField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  /** Handler pronto para `onChange` de inputs que tenham `name`. */
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const reset = useCallback(() => setValues(initialValues), [initialValues]);

  return { values, setValues, setField, handleChange, reset };
}
