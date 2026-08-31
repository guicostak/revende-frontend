import Image from 'next/image';
import Link from 'next/link';
import { ROUTES, TICKET_TYPE_LABELS } from '@/common/constants';
import { eventProximityLabel, formatDateTime } from '@/common/utils';
import { Badge, Heading, Price } from '@/components/ui';
import type { ListingDto } from '@/types';
import { QuantityHint } from '../QuantityHint';
import { SellerLine } from '../SellerLine';

interface ListingCardProps {
  listing: ListingDto;
}

/** Card de anúncio usado nas grades de listagem (home, busca). */
export function ListingCard({ listing }: ListingCardProps) {
  const { event } = listing;
  const proximity = eventProximityLabel(event.date);

  return (
    <Link
      href={ROUTES.event(event.id)}
      className="motion-lift group flex flex-col overflow-hidden rounded-brand border border-line bg-surface shadow-soft transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative h-40 w-full overflow-hidden bg-brand-50">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-brand-300">sem imagem</div>
        )}

        <Badge overlay className="absolute left-4 top-4">
          {TICKET_TYPE_LABELS[listing.ticketType]}
        </Badge>

        {/* Urgência a partir de fato real: docs/negocio/urgencia-honesta.md */}
        {proximity && (
          <Badge overlay tone="warning" className="absolute right-4 top-4">
            {proximity}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {event.category && (
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
            {event.category}
          </span>
        )}
        <Heading as="h3" className="line-clamp-2">
          {event.name}
        </Heading>
        <p className="text-sm text-muted">
          {formatDateTime(event.date)} · {event.city}
        </p>

        <SellerLine name={listing.sellerName} />

        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <Price price={listing.price} originalPrice={listing.originalPrice} />
          <QuantityHint quantity={listing.quantity} className="shrink-0" />
        </div>
      </div>
    </Link>
  );
}
