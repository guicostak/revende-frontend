'use client';

import { TICKET_TYPE_LABELS } from '@/common/constants';
import {
  Alert,
  Button,
  Card,
  Heading,
  PageHeader,
  PageLoader,
  SegmentedControl,
  Selectfield,
  Textareafield,
  Textfield,
} from '@/components/ui';
import { TICKET_TYPES } from '@/types';
import { useAnunciarHook, EVENT_MODE_OPTIONS } from './hooks/useAnunciarHook';

export default function AnunciarPage() {
  const {
    checking,
    events,
    mode,
    setMode,
    ticketType,
    setTicketType,
    listingForm,
    eventForm,
    error,
    submitting,
    handleSubmit,
  } = useAnunciarHook();

  if (checking) return <PageLoader />;

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Anunciar ingresso"
        description="Publique seu ingresso para revenda. Defina o preço e os detalhes."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <Heading as="h2" size="card">
            Evento
          </Heading>

          <SegmentedControl
            label="Origem do evento"
            options={EVENT_MODE_OPTIONS}
            value={mode}
            onChange={setMode}
            className="mt-4"
          />

          {mode === 'existing' ? (
            <Selectfield
              label="Selecione o evento"
              name="eventId"
              wrapperClassName="mt-4"
              value={listingForm.values.eventId}
              onChange={listingForm.handleChange}
              required
            >
              <option value="">— escolha —</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name} · {event.city}
                </option>
              ))}
            </Selectfield>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Textfield
                label="Nome do evento"
                name="name"
                value={eventForm.values.name}
                onChange={eventForm.handleChange}
                required
              />
              <Textfield
                label="Data e hora"
                name="date"
                type="datetime-local"
                value={eventForm.values.date}
                onChange={eventForm.handleChange}
                required
              />
              <Textfield
                label="Local"
                name="venue"
                value={eventForm.values.venue}
                onChange={eventForm.handleChange}
                required
              />
              <Textfield
                label="Cidade"
                name="city"
                value={eventForm.values.city}
                onChange={eventForm.handleChange}
                required
              />
              <Textfield
                label="Categoria"
                name="category"
                placeholder="Show, Festival, Teatro..."
                value={eventForm.values.category}
                onChange={eventForm.handleChange}
              />
              <Textfield
                label="URL da imagem"
                name="imageUrl"
                type="url"
                value={eventForm.values.imageUrl}
                onChange={eventForm.handleChange}
              />
            </div>
          )}
        </Card>

        <Card>
          <Heading as="h2" size="card">
            Detalhes do ingresso
          </Heading>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Selectfield
              label="Tipo"
              value={ticketType}
              onChange={(event) => setTicketType(event.target.value as typeof ticketType)}
            >
              {TICKET_TYPES.map((type) => (
                <option key={type} value={type}>
                  {TICKET_TYPE_LABELS[type]}
                </option>
              ))}
            </Selectfield>
            <Textfield
              label="Quantidade"
              name="quantity"
              type="number"
              min={1}
              value={listingForm.values.quantity}
              onChange={listingForm.handleChange}
              required
            />
            <Textfield
              label="Preço original (R$)"
              name="originalPrice"
              type="number"
              min={0}
              step="0.01"
              value={listingForm.values.originalPrice}
              onChange={listingForm.handleChange}
              required
            />
            <Textfield
              label="Preço de revenda (R$)"
              name="price"
              type="number"
              min={0}
              step="0.01"
              value={listingForm.values.price}
              onChange={listingForm.handleChange}
              required
            />
          </div>

          <Textareafield
            label="Descrição (opcional)"
            name="description"
            wrapperClassName="mt-4"
            placeholder="Ex: setor, fileira, motivo da revenda..."
            value={listingForm.values.description}
            onChange={listingForm.handleChange}
          />
        </Card>

        {error && <Alert>{error}</Alert>}

        <Button type="submit" fullWidth size="lg" disabled={submitting}>
          {submitting ? 'Publicando...' : 'Publicar anúncio'}
        </Button>
      </form>
    </div>
  );
}
