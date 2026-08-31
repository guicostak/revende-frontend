'use client';

import { useId } from 'react';
import { cn } from '@/common/utils';

const CONTROL_CLASSES =
  'w-full rounded-brand border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand-500 disabled:bg-surface-muted disabled:text-muted';

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

function FieldShell({ label, hint, error, htmlFor, className, children }: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error && <span className="text-xs text-muted">{hint}</span>}
      {error && (
        <span role="alert" className="text-xs font-medium text-danger">
          {error}
        </span>
      )}
    </div>
  );
}

interface TextfieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

/** Input de texto com label, hint e mensagem de erro. */
export function Textfield({
  label,
  hint,
  error,
  wrapperClassName,
  className,
  ...props
}: TextfieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={id} className={wrapperClassName}>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        className={cn(CONTROL_CLASSES, error && 'border-danger', className)}
        {...props}
      />
    </FieldShell>
  );
}

interface SelectfieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export function Selectfield({
  label,
  hint,
  error,
  wrapperClassName,
  className,
  children,
  ...props
}: SelectfieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={id} className={wrapperClassName}>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        className={cn(CONTROL_CLASSES, error && 'border-danger', className)}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}

interface TextareafieldProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export function Textareafield({
  label,
  hint,
  error,
  wrapperClassName,
  className,
  rows = 3,
  ...props
}: TextareafieldProps) {
  const id = useId();
  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={id} className={wrapperClassName}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={cn(CONTROL_CLASSES, 'resize-y', error && 'border-danger', className)}
        {...props}
      />
    </FieldShell>
  );
}
