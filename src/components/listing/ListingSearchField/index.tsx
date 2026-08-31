'use client';

import { Button } from '@/components/ui';
import { useListingSearchFieldHook } from './hooks/useListingSearchFieldHook';

/**
 * Campo de busca da home. Ilha client dentro de uma página server — o único
 * pedaço da home que precisa de interatividade.
 */
export function ListingSearchField() {
  const { value, setValue, handleSubmit } = useListingSearchFieldHook();

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="mt-6 flex max-w-xl items-center gap-2 rounded-full bg-surface p-2 shadow-card"
    >
      <input
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Buscar por evento, cidade ou categoria..."
        aria-label="Buscar ingressos"
        className="min-h-11 flex-1 rounded-full bg-transparent px-4 text-ink outline-none placeholder:text-muted"
      />
      <Button type="submit" pill>
        Buscar
      </Button>
    </form>
  );
}
