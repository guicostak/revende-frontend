import { cn } from '@/common/utils';

export type BadgeTone = 'brand' | 'neutral' | 'success' | 'danger' | 'warning';

const TONE_TEXT: Record<BadgeTone, string> = {
  brand: 'text-brand-700',
  neutral: 'text-muted',
  success: 'text-success',
  danger: 'text-danger',
  warning: 'text-warning',
};

const TONE_BG: Record<BadgeTone, string> = {
  brand: 'bg-selected',
  neutral: 'bg-surface-muted',
  success: 'bg-success/10',
  danger: 'bg-danger/10',
  warning: 'bg-warning/10',
};

interface BadgeProps {
  tone?: BadgeTone;
  /**
   * Badge posicionado sobre imagem: troca o fundo translúcido do tom por um
   * fundo sólido, que é o que garante contraste sobre foto qualquer.
   *
   * É uma prop e não `className="bg-surface/90"` porque `cn()` só concatena:
   * duas classes de fundo deixariam o vencedor por conta da ordem do CSS.
   */
  overlay?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ tone = 'brand', overlay, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold',
        TONE_TEXT[tone],
        overlay ? 'bg-surface/90 shadow-soft' : TONE_BG[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
