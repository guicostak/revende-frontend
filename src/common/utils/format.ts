const LOCALE = 'pt-BR';

/** Formata um número como moeda brasileira: 120 -> "R$ 120,00". */
export function formatBRL(value: number): string {
  return value.toLocaleString(LOCALE, { style: 'currency', currency: 'BRL' });
}

/** Formata uma data ISO como "12 de mar. de 2026, 20:00". */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(LOCALE, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Formata uma data ISO sem o horário. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/** Converte um `datetime-local` do formulário para ISO 8601. */
export function toIsoDate(localDateTime: string): string {
  return new Date(localDateTime).toISOString();
}

/** Primeiro nome, para saudações e badges. */
export function firstName(fullName: string): string {
  return fullName.trim().split(' ')[0] ?? fullName;
}

/** Percentual de desconto entre o preço original e o de revenda. */
export function discountPercent(originalPrice: number, price: number): number {
  if (originalPrice <= 0 || price >= originalPrice) return 0;
  return Math.round((1 - price / originalPrice) * 100);
}

/** Dias inteiros entre hoje e a data do evento. Negativo se já passou. */
export function daysUntil(iso: string): number {
  const MS_PER_DAY = 86_400_000;
  const target = new Date(iso);
  const startOfDay = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return Math.round((startOfDay(target) - startOfDay(new Date())) / MS_PER_DAY);
}

/**
 * Rótulo de proximidade do evento, só quando ele de fato está perto.
 *
 * Devolve `null` fora da janela de 7 dias — urgência aqui é informação, não
 * pressão: ver `docs/negocio/urgencia-honesta.md`.
 */
export function eventProximityLabel(iso: string): string | null {
  const days = daysUntil(iso);
  if (days < 0) return null;
  if (days === 0) return 'Hoje';
  if (days === 1) return 'Amanhã';
  if (days <= 7) return `Faltam ${days} dias`;
  return null;
}

/** "Último ingresso" / "2 ingressos" — escassez a partir do estoque real. */
export function quantityLabel(quantity: number): string {
  if (quantity === 1) return 'Último ingresso';
  return `${quantity} ingressos`;
}
