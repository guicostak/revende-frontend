import { quantityLabel } from '@/common/utils';
import { cn } from '@/common/utils';

interface QuantityHintProps {
  quantity: number;
  className?: string;
}

/**
 * Estoque restante do anúncio, com ênfase só quando ele de fato acabou.
 *
 * A escassez sai de `quantity`, nunca de contador fabricado
 * (`docs/negocio/urgencia-honesta.md`). O destaque é redundante com o texto
 * "Último ingresso": a cor reforça, não carrega a informação sozinha.
 */
export function QuantityHint({ quantity, className }: QuantityHintProps) {
  const isLast = quantity === 1;

  return (
    <span
      className={cn('text-sm', isLast ? 'font-bold text-warning' : 'text-muted', className)}
    >
      {quantityLabel(quantity)}
    </span>
  );
}
