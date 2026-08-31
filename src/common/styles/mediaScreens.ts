/**
 * Breakpoints migrados de `common/styles/mediaScreens.tsx` do projeto antigo.
 *
 * O projeto tem **dois** pontos de quebra, e só dois. No JSX use os prefixos do
 * Tailwind, que já batem com estes limites:
 *   - mobile  (< 768px)   -> classes sem prefixo (mobile-first)
 *   - tablet  (>= 768px)  -> prefixo `md:`
 *   - desktop (>= 1024px) -> prefixo `lg:`
 *
 * `sm:`, `xl:` e `2xl:` estão desligados no `globals.css` de propósito.
 *
 * Este módulo existe só para quando a media query precisa ser lida em JS/TS
 * (ex.: `window.matchMedia`). Valor novo aqui exige valor novo lá.
 */

export const breakpoints = {
  /** Último pixel considerado mobile. */
  mobile: 767,
  /** Último pixel considerado tablet. */
  tablet: 1023,
} as const;

export const media = {
  mobile: `(max-width: ${breakpoints.mobile}px)`,
  tablet: `(min-width: ${breakpoints.mobile + 1}px) and (max-width: ${breakpoints.tablet}px)`,
  desktop: `(min-width: ${breakpoints.tablet + 1}px)`,
} as const;

export type MediaQuery = keyof typeof media;
