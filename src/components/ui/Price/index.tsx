import { discountPercent, formatBRL } from '@/common/utils';
import { cn } from '@/common/utils';

type PriceSize = 'md' | 'lg';

const CURRENT_CLASSES: Record<PriceSize, string> = {
  md: 'text-xl',
  lg: 'text-3xl',
};

interface PriceProps {
  price: number;
  originalPrice: number;
  size?: PriceSize;
  className?: string;
}

/**
 * Bloco de preço da Revende.
 *
 * A ordem — original riscado em cima, preço atual embaixo — é a convenção que o
 * comprador brasileiro já lê (Mercado Livre, OLX): o olho desce e a última coisa
 * que fica é o que se paga. Ver `docs/negocio/transparencia-de-preco.md`.
 *
 * Quando existir taxa de serviço, ela entra logo abaixo do preço atual, nunca só
 * no checkout.
 */
export function Price({ price, originalPrice, size = 'md', className }: PriceProps) {
  const discount = discountPercent(originalPrice, price);

  return (
    <div className={cn('flex flex-col', className)}>
      {discount > 0 && (
        <span className="text-xs text-muted line-through">{formatBRL(originalPrice)}</span>
      )}

      <span className="flex items-center gap-2">
        <span className={cn('font-extrabold leading-none text-ink', CURRENT_CLASSES[size])}>
          {formatBRL(price)}
        </span>
        {discount > 0 && (
          <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-bold text-success">
            {discount}% OFF
          </span>
        )}
      </span>
    </div>
  );
}
