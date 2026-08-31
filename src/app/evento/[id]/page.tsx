import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ROUTES } from '@/common/constants';
import {
  breadcrumbJsonLd,
  eventJsonLd,
  formatDateTime,
  jsonLdGraph,
  seoDescription,
  seoTitle,
} from '@/common/utils';
import { BuyButton, ListingRow } from '@/components/listing';
import { JsonLd } from '@/components/seo';
import { Breadcrumb, Card, EmptyState, Heading } from '@/components/ui';
import { loadEventPage } from './loaders/eventLoader';

interface EventoPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EventoPageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await loadEventPage(Number(id));

  if (!data) {
    return { title: 'Evento não encontrado', robots: { index: false, follow: false } };
  }

  const { event, listings } = data;
  const canonical = ROUTES.event(event.id);
  const active = listings.filter((listing) => listing.status === 'ATIVO');
  const cheapest = active.length > 0 ? Math.min(...active.map((l) => l.price)) : null;

  const description = event.description
    ? seoDescription(event.description)
    : seoDescription(
        `Ingressos de revenda para ${event.name}, em ${event.venue}, ${event.city}. ` +
          (cheapest !== null
            ? `${active.length} anúncio(s) a partir de R$ ${cheapest.toFixed(2)}.`
            : 'Acompanhe novos anúncios na Revende.'),
      );

  return {
    title: seoTitle(
      `Ingressos para ${event.name} em ${event.city}`,
      `Ingressos para ${event.name}`,
      event.name,
    ),
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      title: `Ingressos para ${event.name} em ${event.city}`,
      description,
      url: canonical,
      ...(event.imageUrl ? { images: [{ url: event.imageUrl, alt: event.name }] } : {}),
    },
  };
}

export default async function EventoPage({ params }: EventoPageProps) {
  const { id } = await params;
  const data = await loadEventPage(Number(id));

  if (!data) notFound();

  const { event, listings } = data;
  const activeListings = listings.filter((listing) => listing.status === 'ATIVO');

  return (
    <div className="space-y-8">
      <JsonLd
        data={jsonLdGraph(
          eventJsonLd(event, listings),
          breadcrumbJsonLd([
            { name: 'Início', path: ROUTES.home },
            { name: event.name, path: ROUTES.event(event.id) },
          ]),
        )}
      />

      <Breadcrumb items={[{ name: 'Início', path: ROUTES.home }, { name: event.name }]} />

      <Card bare className="overflow-hidden">
        <div className="relative h-56 w-full bg-brand-50 md:h-72">
          {event.imageUrl && (
            <Image
              src={event.imageUrl}
              alt={event.name}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="p-6">
          {event.category && (
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
              {event.category}
            </span>
          )}
          <Heading as="h1" size="display" className="mt-1">
            {event.name}
          </Heading>
          <p className="mt-2 text-muted">
            {formatDateTime(event.date)} · {event.venue}, {event.city}
          </p>
          {event.description && (
            <p className="mt-4 max-w-prose leading-relaxed text-ink/80">{event.description}</p>
          )}
        </div>
      </Card>

      <section>
        <Heading as="h2" className="mb-4">
          Ingressos disponíveis ({activeListings.length})
        </Heading>

        {activeListings.length === 0 ? (
          <EmptyState
            title="Nenhum ingresso à venda para este evento no momento."
            description="Volte mais tarde — anúncios novos aparecem aqui assim que são publicados."
          />
        ) : (
          <div className="space-y-4">
            {activeListings.map((listing) => (
              <ListingRow
                key={listing.id}
                listing={listing}
                actions={<BuyButton listing={listing} />}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
