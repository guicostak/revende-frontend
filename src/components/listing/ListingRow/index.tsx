import {
  LISTING_STATUS_LABELS,
  LISTING_STATUS_TONES,
  TICKET_TYPE_LABELS,
} from '@/common/constants';
import { formatDateTime } from '@/common/utils';
import { Badge, Card, Price } from '@/components/ui';
import type { ListingDto } from '@/types';
import { QuantityHint } from '../QuantityHint';
import { SellerLine } from '../SellerLine';

interface ListingRowProps {
  listing: ListingDto;
  /** Exibe o status do anúncio (usado em "Meus anúncios"). */
  showStatus?: boolean;
  /** Botões de ação renderizados à direita. */
  actions?: React.ReactNode;
}

/** Anúncio em formato de linha — usado na página do evento e em "Meus anúncios". */
export function ListingRow({ listing, showStatus, actions }: ListingRowProps) {
  return (
    <Card className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-6">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{TICKET_TYPE_LABELS[listing.ticketType]}</Badge>
          {showStatus && (
            <Badge tone={LISTING_STATUS_TONES[listing.status]}>
              {LISTING_STATUS_LABELS[listing.status]}
            </Badge>
          )}
          <QuantityHint quantity={listing.quantity} />
        </div>

        <SellerLine name={listing.sellerName} className="mt-2" />

        <p className="mt-1 text-sm text-muted">
          {listing.event.name} · {formatDateTime(listing.event.date)} · {listing.event.city}
        </p>

        {listing.description && (
          <p className="mt-1 text-sm text-ink/70">{listing.description}</p>
        )}

        <Price
          price={listing.price}
          originalPrice={listing.originalPrice}
          size="lg"
          className="mt-4"
        />
      </div>

      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </Card>
  );
}
