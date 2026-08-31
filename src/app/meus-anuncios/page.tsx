'use client';

import { ROUTES } from '@/common/constants';
import { ListingRow } from '@/components/listing';
import { Alert, Button, ButtonLink, EmptyState, PageHeader, PageLoader } from '@/components/ui';
import { useMeusAnunciosHook } from './hooks/useMeusAnunciosHook';

export default function MeusAnunciosPage() {
  const { checking, listings, loading, error, pendingId, markSold, cancel } =
    useMeusAnunciosHook();

  if (checking) return <PageLoader />;

  return (
    <div>
      <PageHeader
        title="Meus anúncios"
        description="Acompanhe e gerencie os ingressos que você colocou à venda."
        action={
          <ButtonLink href={ROUTES.createListing}>Novo anúncio</ButtonLink>
        }
      />

      {loading && <PageLoader />}
      {error && <Alert className="mb-4">{error}</Alert>}

      {!loading && listings.length === 0 && (
        <EmptyState
          title="Você ainda não tem anúncios"
          description="Publique seu primeiro ingresso e ele aparecerá aqui."
          action={<ButtonLink href={ROUTES.createListing}>Anunciar ingresso</ButtonLink>}
        />
      )}

      <div className="space-y-4">
        {listings.map((listing) => (
          <ListingRow
            key={listing.id}
            listing={listing}
            showStatus
            actions={
              listing.status === 'ATIVO' ? (
                <>
                  <Button
                    variant="success"
                    disabled={pendingId === listing.id}
                    onClick={() => markSold(listing.id)}
                  >
                    Marcar vendido
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={pendingId === listing.id}
                    onClick={() => cancel(listing.id)}
                  >
                    Cancelar
                  </Button>
                </>
              ) : null
            }
          />
        ))}
      </div>
    </div>
  );
}
