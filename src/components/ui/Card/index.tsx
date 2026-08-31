import { cn } from '@/common/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove o padding interno (para cards com imagem sangrando na borda). */
  bare?: boolean;
}

export function Card({ bare, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-brand border border-line bg-surface shadow-soft',
        !bare && 'p-6',
        className,
      )}
      {...props}
    />
  );
}
