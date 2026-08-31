'use client';

import { cn } from '@/common/utils';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  /** Descreve o grupo para leitor de tela — ex.: "Origem do evento". */
  label: string;
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/**
 * Alternador entre duas ou três opções mutuamente exclusivas, quando todas
 * cabem na tela e valem ser vistas ao mesmo tempo (um `<select>` esconderia).
 *
 * `aria-pressed` em vez de `role="tab"`: não há painel de conteúdo associado,
 * é um grupo de botões de estado.
 */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('flex gap-1 rounded-full bg-surface-muted p-1 text-sm', className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={cn(
              'min-h-11 flex-1 rounded-full px-4 font-semibold transition-colors',
              active ? 'bg-surface text-brand-700 shadow-soft' : 'text-muted hover:text-ink',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
