import { cn } from '@/common/utils';

export type AlertTone = 'error' | 'success' | 'info';

const TONE_CLASSES: Record<AlertTone, string> = {
  error: 'bg-danger/10 text-danger',
  success: 'bg-success/10 text-success',
  info: 'bg-selected text-brand-700',
};

interface AlertProps {
  tone?: AlertTone;
  className?: string;
  children: React.ReactNode;
}

export function Alert({ tone = 'error', className, children }: AlertProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn('rounded-brand px-4 py-3 text-sm', TONE_CLASSES[tone], className)}
    >
      {children}
    </div>
  );
}
