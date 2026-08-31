import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  daysUntil,
  discountPercent,
  eventProximityLabel,
  firstName,
  formatBRL,
  quantityLabel,
  toIsoDate,
} from './format';

/** O separador que o ICU usa em "R$ 120,00" varia entre versões do Node. */
const normalize = (value: string) => value.replace(/\s/g, ' ');

describe('formatBRL', () => {
  it('formata como moeda brasileira', () => {
    expect(normalize(formatBRL(120))).toBe('R$ 120,00');
    expect(normalize(formatBRL(1234.5))).toBe('R$ 1.234,50');
  });

  it('formata zero sem cair em string vazia', () => {
    expect(normalize(formatBRL(0))).toBe('R$ 0,00');
  });
});

describe('discountPercent', () => {
  it('calcula o desconto arredondado', () => {
    expect(discountPercent(320, 180)).toBe(44);
    expect(discountPercent(100, 50)).toBe(50);
  });

  it('devolve 0 quando o preço não é menor que o original', () => {
    expect(discountPercent(100, 100)).toBe(0);
    expect(discountPercent(100, 150)).toBe(0);
  });

  it('devolve 0 com original inválido, em vez de dividir por zero', () => {
    expect(discountPercent(0, 50)).toBe(0);
    expect(discountPercent(-10, 5)).toBe(0);
  });
});

describe('quantityLabel', () => {
  // Escassez sai do estoque real: docs/negocio/urgencia-honesta.md
  it('trata o último ingresso como caso próprio', () => {
    expect(quantityLabel(1)).toBe('Último ingresso');
  });

  it('pluraliza a partir de dois', () => {
    expect(quantityLabel(2)).toBe('2 ingressos');
    expect(quantityLabel(10)).toBe('10 ingressos');
  });
});

describe('daysUntil e eventProximityLabel', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  /** Fixa o relógio às 10h, para o cálculo não depender da hora do runner. */
  const freezeAt = (iso: string) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(iso));
  };

  it('conta dias inteiros, ignorando a hora do dia', () => {
    freezeAt('2026-03-10T23:00:00');
    // 1h de distância no relógio, mas o evento é no dia seguinte.
    expect(daysUntil('2026-03-11T00:00:00')).toBe(1);
  });

  it('devolve negativo para evento que já passou', () => {
    freezeAt('2026-03-10T10:00:00');
    expect(daysUntil('2026-03-08T10:00:00')).toBe(-2);
  });

  it('rotula hoje, amanhã e a semana', () => {
    freezeAt('2026-03-10T10:00:00');
    expect(eventProximityLabel('2026-03-10T22:00:00')).toBe('Hoje');
    expect(eventProximityLabel('2026-03-11T22:00:00')).toBe('Amanhã');
    expect(eventProximityLabel('2026-03-15T22:00:00')).toBe('Faltam 5 dias');
    expect(eventProximityLabel('2026-03-17T22:00:00')).toBe('Faltam 7 dias');
  });

  it('não inventa urgência fora da janela de 7 dias', () => {
    freezeAt('2026-03-10T10:00:00');
    expect(eventProximityLabel('2026-03-18T22:00:00')).toBeNull();
    expect(eventProximityLabel('2026-06-01T22:00:00')).toBeNull();
  });

  it('não rotula evento que já passou', () => {
    freezeAt('2026-03-10T10:00:00');
    expect(eventProximityLabel('2026-03-09T22:00:00')).toBeNull();
  });
});

describe('firstName', () => {
  it('extrai o primeiro nome', () => {
    expect(firstName('Marina Alves Souza')).toBe('Marina');
  });

  it('lida com nome único e com espaços sobrando', () => {
    expect(firstName('Marina')).toBe('Marina');
    expect(firstName('  Marina Alves  ')).toBe('Marina');
  });
});

describe('toIsoDate', () => {
  it('converte o datetime-local do formulário para ISO', () => {
    expect(toIsoDate('2026-03-10T20:00')).toBe(new Date('2026-03-10T20:00').toISOString());
  });
});
