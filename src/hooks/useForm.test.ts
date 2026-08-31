import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useForm } from './useForm';

const INITIAL = { email: '', password: '' };

/** Evento de change mínimo, como o que um `<input name>` entrega. */
const changeEvent = (name: string, value: string) =>
  ({ target: { name, value } }) as React.ChangeEvent<HTMLInputElement>;

describe('useForm', () => {
  it('começa com os valores iniciais', () => {
    const { result } = renderHook(() => useForm(INITIAL));
    expect(result.current.values).toEqual(INITIAL);
  });

  it('atualiza o campo pelo `name` do input', () => {
    const { result } = renderHook(() => useForm(INITIAL));

    act(() => result.current.handleChange(changeEvent('email', 'voce@email.com')));

    expect(result.current.values.email).toBe('voce@email.com');
    // O outro campo não pode ser afetado.
    expect(result.current.values.password).toBe('');
  });

  it('atualiza um campo por `setField`', () => {
    const { result } = renderHook(() => useForm(INITIAL));

    act(() => result.current.setField('password', 'segredo'));

    expect(result.current.values.password).toBe('segredo');
  });

  it('volta aos valores iniciais no reset', () => {
    const { result } = renderHook(() => useForm(INITIAL));

    act(() => result.current.setField('email', 'a@b.com'));
    act(() => result.current.reset());

    expect(result.current.values).toEqual(INITIAL);
  });

  it('mantém `handleChange` estável entre renders', () => {
    const { result, rerender } = renderHook(() => useForm(INITIAL));
    const primeiro = result.current.handleChange;

    act(() => result.current.setField('email', 'a@b.com'));
    rerender();

    // Handler instável faz o input remontar e perder o foco a cada tecla.
    expect(result.current.handleChange).toBe(primeiro);
  });
});
