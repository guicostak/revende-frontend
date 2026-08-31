import { SEO_LIMITS, SITE } from '@/config';

/** Transforma um path relativo em URL absoluta. Open Graph exige absoluta. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}

/**
 * Corta no último espaço antes do limite, para não terminar no meio da palavra.
 * Sem reticências quando o texto já cabe.
 */
export function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * Título pronto para o SERP (o sufixo da marca vem do `title.template`).
 *
 * Recebe variantes da mais completa para a mais curta e devolve a primeira que
 * cabe no orçamento. Cortar no meio de "São Paulo" é pior que abrir mão da
 * cidade — por isso a degradação é por variante, não por truncagem.
 */
export function seoTitle(...variants: string[]): string {
  const budget = SEO_LIMITS.title - SITE.name.length - 3;
  const fits = variants.find((variant) => variant.length <= budget);
  return fits ?? truncate(variants[variants.length - 1] ?? '', budget);
}

/** Descrição pronta para o SERP. */
export function seoDescription(text: string): string {
  return truncate(text, SEO_LIMITS.description);
}
