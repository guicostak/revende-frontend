'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/common/constants';
import { toIsoDate } from '@/common/utils';
import { useAsync, useForm, useRequireAuth } from '@/hooks';
import { eventService, listingService, toErrorMessage } from '@/services';
import type { TicketType } from '@/types';

export type EventMode = 'existing' | 'new';

/** Opções do seletor de origem do evento, na ordem em que aparecem. */
export const EVENT_MODE_OPTIONS = [
  { value: 'existing', label: 'Evento existente' },
  { value: 'new', label: 'Criar novo evento' },
] as const satisfies readonly { value: EventMode; label: string }[];

const INITIAL_LISTING = {
  eventId: '',
  originalPrice: '',
  price: '',
  quantity: '1',
  description: '',
};

const INITIAL_EVENT = {
  name: '',
  date: '',
  venue: '',
  city: '',
  category: '',
  imageUrl: '',
  description: '',
};

/**
 * Fluxo de publicação de anúncio: escolhe (ou cria) o evento e então cria o
 * listing. Também garante que a página só é usada por quem está logado.
 */
export function useAnunciarHook() {
  const router = useRouter();
  const { checking } = useRequireAuth();

  const fetchEvents = useCallback(() => eventService.list(), []);
  const { data: events } = useAsync(fetchEvents, { initialData: [] });

  const [mode, setMode] = useState<EventMode>('existing');
  const [ticketType, setTicketType] = useState<TicketType>('INTEIRA');
  const listingForm = useForm(INITIAL_LISTING);
  const eventForm = useForm(INITIAL_EVENT);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const resolveEventId = useCallback(async (): Promise<number> => {
    if (mode === 'existing') {
      const id = Number(listingForm.values.eventId);
      if (!id) throw new Error('Selecione um evento');
      return id;
    }

    const created = await eventService.create({
      ...eventForm.values,
      date: toIsoDate(eventForm.values.date),
    });
    return created.id;
  }, [mode, listingForm.values.eventId, eventForm.values]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setError(null);
      setSubmitting(true);
      try {
        const { originalPrice, price, quantity, description } = listingForm.values;

        await listingService.create({
          eventId: await resolveEventId(),
          ticketType,
          originalPrice: Number(originalPrice),
          price: Number(price),
          quantity: Number(quantity),
          description: description || undefined,
        });

        router.push(ROUTES.myListings);
      } catch (err) {
        setError(toErrorMessage(err, 'Não foi possível publicar o anúncio'));
      } finally {
        setSubmitting(false);
      }
    },
    [listingForm.values, resolveEventId, ticketType, router],
  );

  return {
    checking,
    events: events ?? [],
    mode,
    setMode,
    ticketType,
    setTicketType,
    listingForm,
    eventForm,
    error,
    submitting,
    handleSubmit,
  };
}
