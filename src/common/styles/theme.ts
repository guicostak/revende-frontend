/**
 * Espelho em TypeScript dos design tokens da Revende.
 *
 * **A fonte de verdade é o bloco `@theme` de `src/app/globals.css`.** Este
 * arquivo existe apenas para os casos em que um token precisa ser lido em JS —
 * canvas, `style` inline calculado, cor de meta tag. Em JSX use as classes do
 * Tailwind (`bg-brand-500`, `text-ink`), nunca `theme.color.brand[500]`.
 *
 * Por isso ele só carrega os tokens que de fato existem no CSS: token que vive
 * só aqui é token que ninguém aplica. Alterou um valor no `globals.css`,
 * replique aqui — a sincronia é manual.
 *
 * Origem: `common/styles/theme.tsx` do projeto antigo (styled-components).
 * primaryColor -> brand[500], darkMain -> brand[600], textColor -> ink,
 * darkGrey -> muted, secondBackground -> surfaceMuted.
 */

export const theme = {
  color: {
    /** Escala derivada da cor primária da marca (#E82C4F). */
    brand: {
      50: '#fdeaed',
      100: '#fad5dc',
      200: '#f6abb9',
      300: '#f18095',
      400: '#ed5672',
      500: '#e82c4f', // primaryColor
      600: '#d4304e', // darkMain (hover/pressed)
      700: '#ae213b',
      800: '#80182b',
      900: '#5d1220',
    },
    /** Texto principal (antigo textColor). */
    ink: '#2b2a2a',
    /** Texto secundário (antigo darkGrey). */
    muted: '#575555',
    /** Fundo principal (antigo mainBackground). */
    surface: '#ffffff',
    /** Fundo alternativo (antigo secondBackground). */
    surfaceMuted: '#efefef',
    /** Borda padrão (antigo borderColor). */
    line: 'rgba(0, 0, 0, 0.17)',
    /** Estado selecionado (antigo selected). */
    selected: 'rgba(232, 44, 79, 0.13)',
    success: '#1a7f4b',
    danger: '#c0392b',
    warning: '#b7791f',
    /** Texto sobre fundo de cor cheia. */
    onBrand: '#ffffff',
  },

  font: {
    /** Antigo mainFont. */
    sans: 'Arial, Helvetica, sans-serif',
  },

  radius: {
    /** Raio padrão de botões, inputs e cards no design antigo. */
    brand: '10px',
  },

  shadow: {
    /** Antigo boxShadow. */
    soft: '0 1px 2px rgba(170, 166, 166, 0.44)',
    card: '0 2px 10px rgba(170, 166, 166, 0.28)',
  },

  /** Largura máxima do conteúdo — `max-w-page`. */
  containerPage: '72rem',
} as const;

export type Theme = typeof theme;
export type BrandShade = keyof Theme['color']['brand'];
