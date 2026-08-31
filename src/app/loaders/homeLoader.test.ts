import { beforeEach, describe, expect, it, vi } from 'vitest';
import { makeEvent, makeListing } from '@/test/factories';

const list = vi.fn();
vi.mock('@/services', async () => {
  const actual = await vi.importActual<typeof import('@/services')>('@/services');
  return { ...actual, listingService: { list } };
});

const { filterListings, loadHomePage } = await import('./homeLoader');

describe('filterListings', () => {
  const listings = [
    makeListing({ id: 1, event: makeEvent({ name: 'Festival de Verão', city: 'São Paulo', category: 'Festival' }) }),
    makeListing({ id: 2, event: makeEvent({ id: 2, name: 'Show da Virada', city: 'Rio de Janeiro', category: 'Show' }) }),
  ];

  it('devolve tudo quando a busca está vazia ou só com espaços', () => {
    expect(filterListings(listings, '')).toHaveLength(2);
    expect(filterListings(listings, '   ')).toHaveLength(2);
  });

  it('busca por nome do evento, ignorando caixa', () => {
    expect(filterListings(listings, 'festival')).toHaveLength(1);
    expect(filterListings(listings, 'VIRADA')[0].id).toBe(2);
  });

  it('busca por cidade e por categoria', () => {
    expect(filterListings(listings, 'rio de janeiro')[0].id).toBe(2);
    expect(filterListings(listings, 'show')).toHaveLength(1);
  });

  it('devolve lista vazia quando nada casa', () => {
    expect(filterListings(listings, 'ópera')).toEqual([]);
  });

  it('não quebra com anúncio sem categoria', () => {
    const semCategoria = [makeListing({ event: makeEvent({ category: undefined }) })];
    expect(() => filterListings(semCategoria, 'festival')).not.toThrow();
    expect(filterListings(semCategoria, 'festival')).toHaveLength(1);
  });
});

describe('loadHomePage', () => {
  beforeEach(() => {
    list.mockReset();
  });

  it('esconde anúncio vendido ou cancelado da vitrine', async () => {
    list.mockResolvedValue([
      makeListing({ id: 1, status: 'ATIVO' }),
      makeListing({ id: 2, status: 'VENDIDO' }),
      makeListing({ id: 3, status: 'CANCELADO' }),
    ]);

    const { listings, error } = await loadHomePage();

    expect(error).toBeNull();
    expect(listings.map((l) => l.id)).toEqual([1]);
  });

  it('transforma falha da API em estado de erro, não em exceção', async () => {
    list.mockRejectedValue(new Error('conexão recusada'));

    const { listings, error } = await loadHomePage();

    expect(listings).toEqual([]);
    expect(error).toBe('conexão recusada');
  });
});
