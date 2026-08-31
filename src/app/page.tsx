import { Suspense } from 'react';
import type { Metadata } from 'next';
import { seoDescription, seoTitle } from '@/common/utils';
import { SITE } from '@/config';
import { ListingCard, ListingSearchField } from '@/components/listing';
import { Alert, EmptyState, Heading } from '@/components/ui';
import { filterListings, loadHomePage } from './loaders/homeLoader';

export const metadata: Metadata = {
  // `title.template` do layout raiz não se aplica ao próprio segmento raiz —
  // a home precisa carregar a marca no título.
  title: { absolute: `${seoTitle('Ingressos de revenda para shows e eventos')} · ${SITE.name}` },
  description: seoDescription(
    'Compre e revenda ingressos de shows, festivais e eventos com segurança. Encontre ingresso para evento esgotado ou repasse o que você não vai usar.',
  ),
  alternates: { canonical: '/' },
};

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q = '' } = await searchParams;
  const { listings, error } = await loadHomePage();
  const results = filterListings(listings, q);

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-brand bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-12 md:px-12">
        <Heading as="h1" size="display" tone="onBrand" className="max-w-2xl">
          Revenda e compre ingressos com segurança
        </Heading>
        <p className="mt-4 max-w-xl text-brand-100">
          O jeito simples de repassar aquele ingresso que você não vai usar — ou achar aquele
          evento esgotado.
        </p>

        {/*
          `ListingSearchField` lê a busca de `useSearchParams`, que exige um
          boundary de Suspense para não forçar a página inteira a virar client.

          O fallback tem a altura exata do campo (p-2 + alvo de toque de 44px)
          para o hero não pular quando a ilha client hidrata.
        */}
        <Suspense fallback={<div className="mt-6 h-15 max-w-xl rounded-full bg-surface/40" />}>
          <ListingSearchField />
        </Suspense>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <Heading as="h2">
            {q ? `Resultados para "${q}"` : 'Ingressos à venda'}
          </Heading>
          <span className="shrink-0 text-sm text-muted">{results.length} resultado(s)</span>
        </div>

        {error && (
          <Alert>
            Não foi possível carregar os anúncios: {error}
            <p className="mt-1 text-xs opacity-80">
              Verifique se a API está rodando e se NEXT_PUBLIC_API_URL aponta para ela.
            </p>
          </Alert>
        )}

        {!error && results.length === 0 && (
          <EmptyState
            title={q ? 'Nenhum ingresso encontrado' : 'Nenhum ingresso à venda no momento'}
            description={
              q
                ? 'Tente buscar por outro evento, cidade ou categoria.'
                : 'Assim que alguém anunciar um ingresso, ele aparece aqui.'
            }
          />
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
