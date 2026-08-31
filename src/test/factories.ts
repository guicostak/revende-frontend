import type { EventDto, ListingDto } from '@/types';

/**
 * Fábricas de dados para teste.
 *
 * Cada teste sobrescreve só o campo que está exercitando; o resto vem daqui.
 * Sem isso, mudar um campo do DTO obrigaria a editar dezenas de literais.
 */
export function makeEvent(overrides: Partial<EventDto> = {}): EventDto {
  return {
    id: 1,
    name: 'Festival de Verão',
    date: '2026-12-01T20:00:00',
    venue: 'Allianz Parque',
    city: 'São Paulo',
    category: 'Festival',
    ...overrides,
  } as EventDto;
}

export function makeListing(overrides: Partial<ListingDto> = {}): ListingDto {
  return {
    id: 1,
    event: makeEvent(),
    sellerId: 10,
    sellerName: 'Marina Alves',
    ticketType: 'INTEIRA',
    originalPrice: 320,
    price: 180,
    quantity: 2,
    status: 'ATIVO',
    ...overrides,
  } as ListingDto;
}
