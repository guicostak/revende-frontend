'use client';

import Link from 'next/link';
import { cn } from '@/common/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Hover invertido: herdado do botão do projeto antigo.
  primary:
    'bg-brand-500 text-on-brand border border-brand-500 hover:bg-surface hover:text-brand-500',
  secondary:
    'bg-surface text-brand-500 border border-brand-500 hover:bg-brand-500 hover:text-on-brand',
  ghost: 'bg-transparent text-muted border border-transparent hover:bg-surface-muted',
  danger: 'bg-danger text-on-brand border border-danger hover:bg-surface hover:text-danger',
  success: 'bg-success text-on-brand border border-success hover:bg-surface hover:text-success',
};

/**
 * Altura mínima de alvo de toque: 44px (`h-11`).
 *
 * `sm` fica abaixo disso de propósito e só pode ser usado em contexto denso de
 * desktop, ao lado de outro conteúdo clicável — nunca como a ação principal de
 * uma tela no celular. Ver `docs/design/acessibilidade.md`.
 */
const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
};

// `whitespace-nowrap`: rótulo de botão nunca quebra em duas linhas — o alvo
// deforma e a altura fixa do tamanho passa a mentir.
const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Bordas totalmente arredondadas em vez do raio padrão de 10px. */
  pill?: boolean;
}

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = BaseProps &
  Omit<React.ComponentProps<typeof Link>, 'className'> & {
    href: React.ComponentProps<typeof Link>['href'];
    className?: string;
  };

function buttonClasses(
  { variant = 'primary', size = 'md', fullWidth, pill }: BaseProps,
  extra?: string,
) {
  return cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    pill ? 'rounded-full' : 'rounded-brand',
    fullWidth && 'w-full',
    extra,
  );
}

export function Button({
  variant,
  size,
  fullWidth,
  pill,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, pill }, className)}
      {...props}
    />
  );
}

/** Mesmo visual do Button, mas navega — evita `onClick={() => router.push()}`. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  pill,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, fullWidth, pill }, className)} {...props} />
  );
}
