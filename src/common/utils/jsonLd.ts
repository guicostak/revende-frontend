import { SITE } from '@/config';
import type { EventDto, ListingDto } from '@/types';
import { absoluteUrl } from './seo';
import { ROUTES } from '@/common/constants';

/**
 * Construtores de JSON-LD (schema.org).
 *
 * Regra inegociável: o schema só descreve o que está visível na página. Preço,
 * data e local aqui têm que bater com o que o usuário lê — divergência é motivo
 * de penalidade manual, não só de perder o resultado rico.
 */

type JsonLdNode = Record<string, unknown>;

/** Empacota vários nós em um único bloco `@graph`. */
export function jsonLdGraph(...nodes: JsonLdNode[]): JsonLdNode {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

export function organizationJsonLd(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
    description: SITE.description,
  };
}

export function websiteJsonLd(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'pt-BR',
    publisher: { '@id': absoluteUrl('/#organization') },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absoluteUrl('/?q={search_term_string}'),
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * `Event` + `Offer`, o schema de maior retorno neste produto: o Google mostra
 * data, local e faixa de preço direto no resultado.
 *
 * Só anúncios ATIVOS viram oferta — anunciar preço de item vendido é o erro
 * clássico que derruba o resultado rico.
 */
export function eventJsonLd(event: EventDto, listings: ListingDto[]): JsonLdNode {
  const active = listings.filter((listing) => listing.status === 'ATIVO');
  const eventUrl = absoluteUrl(ROUTES.event(event.id));

  return {
    '@type': 'Event',
    '@id': `${eventUrl}#event`,
    name: event.name,
    startDate: event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: eventUrl,
    ...(event.description ? { description: event.description } : {}),
    ...(event.imageUrl ? { image: [event.imageUrl] } : {}),
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
        addressCountry: 'BR',
      },
    },
    ...(active.length > 0
      ? {
          offers: active.map((listing) => ({
            '@type': 'Offer',
            url: eventUrl,
            price: listing.price.toFixed(2),
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock',
            inventoryLevel: listing.quantity,
            category: listing.ticketType,
          })),
        }
      : {}),
  };
}
