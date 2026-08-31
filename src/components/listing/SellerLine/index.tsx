import { cn } from '@/common/utils';

interface SellerLineProps {
  name: string;
  className?: string;
}

/**
 * Quem está vendendo — linha própria em todo lugar onde um anúncio aparece.
 *
 * Num marketplace C2C o vendedor é um desconhecido, e é o que o comprador
 * avalia antes do preço. Por isso não é metadado espremido junto da data:
 * ver `docs/negocio/confianca-do-vendedor.md`.
 *
 * A copy é uma só ("Vendido por X") em card e em linha — variar o texto entre
 * duas telas para a mesma informação já era o caso antes deste componente.
 *
 * TODO: quando a API devolver `sellerRating` / `sellerSalesCount`, o sinal de
 * confiança entra aqui, ao lado do nome. Nome sozinho não é sinal.
 */
export function SellerLine({ name, className }: SellerLineProps) {
  return (
    <p className={cn('text-sm', className)}>
      <span className="text-muted">Vendido por </span>
      <span className="font-semibold text-ink">{name}</span>
    </p>
  );
}
