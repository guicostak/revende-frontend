import { describe, expect, it } from 'vitest';
import { SEO_LIMITS, SITE } from '@/config';
import { absoluteUrl, seoDescription, seoTitle, truncate } from './seo';

describe('absoluteUrl', () => {
  it('transforma path relativo em URL absoluta', () => {
    // Open Graph e canonical exigem absoluta; relativa é ignorada pelo crawler.
    expect(absoluteUrl('/evento/7')).toBe(`${SITE.url}/evento/7`);
  });
});

describe('truncate', () => {
  it('devolve o texto intacto quando já cabe', () => {
    expect(truncate('curto', 20)).toBe('curto');
  });

  it('normaliza espaços repetidos e quebras de linha', () => {
    expect(truncate('a   b\n\nc', 20)).toBe('a b c');
  });

  it('corta no espaço, não no meio da palavra', () => {
    const original = 'São Paulo Rio de Janeiro Belo Horizonte';
    const resultado = truncate(original, 20);

    expect(resultado.length).toBeLessThanOrEqual(20);
    expect(resultado).toMatch(/…$/);

    // O corte tem que cair numa fronteira de palavra: o trecho mantido é um
    // prefixo do original que termina exatamente onde havia um espaço.
    const mantido = resultado.slice(0, -1);
    expect(original.startsWith(mantido)).toBe(true);
    expect(original[mantido.length]).toBe(' ');
  });

  it('respeita o limite mesmo sem espaço aproveitável', () => {
    const resultado = truncate('a'.repeat(50), 10);
    expect(resultado.length).toBeLessThanOrEqual(10);
  });
});

describe('seoTitle', () => {
  it('escolhe a primeira variante que cabe no orçamento', () => {
    const completa = 'Ingressos para Festival de Verão em São Paulo';
    expect(seoTitle(completa, 'Ingressos para Festival de Verão', 'Festival')).toBe(completa);
  });

  it('degrada para a variante mais curta em vez de truncar', () => {
    const longa = 'Ingressos de revenda para o megaevento internacional de música eletrônica';
    const curta = 'Festival';

    // Cortar "São Pau…" é pior que abrir mão da cidade.
    expect(seoTitle(longa, curta)).toBe(curta);
  });

  it('trunca como último recurso, respeitando o espaço da marca', () => {
    const longa = 'x'.repeat(200);
    const resultado = seoTitle(longa);

    expect(resultado.length).toBeLessThanOrEqual(SEO_LIMITS.title - SITE.name.length - 3);
  });

  it('não quebra sem variante alguma', () => {
    expect(seoTitle()).toBe('');
  });
});

describe('seoDescription', () => {
  it('respeita o limite de descrição do SERP', () => {
    const resultado = seoDescription('palavra '.repeat(80));
    expect(resultado.length).toBeLessThanOrEqual(SEO_LIMITS.description);
  });
});
