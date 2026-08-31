import { cn } from '@/common/utils';

interface SpinnerProps {
  className?: string;
  /** Texto lido por leitores de tela e exibido ao lado quando `label` é visível. */
  label?: string;
}

export function Spinner({ className, label = 'Carregando...' }: SpinnerProps) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted">
      <span
        aria-hidden
        className={cn(
          'h-4 w-4 animate-spin rounded-full border-2 border-brand-200 border-t-brand-500',
          className,
        )}
      />
      <span>{label}</span>
    </span>
  );
}

/** Estado de carregamento ocupando a área de conteúdo da página. */
export function PageLoader({ label }: { label?: string }) {
  return (
    <div className="flex justify-center py-16">
      <Spinner label={label} />
    </div>
  );
}
