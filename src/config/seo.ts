import { env } from './env';

/** Identidade do site usada em metadata, Open Graph e dados estruturados. */
export const SITE = {
  name: 'Revende',
  /** Sufixo aplicado pelo `title.template` do layout raiz. */
  titleTemplate: '%s · Revende',
  defaultTitle: 'Revende · Marketplace de revenda de ingressos',
  description:
    'Compre e revenda ingressos de shows, festivais e eventos com segurança. Encontre ingresso para evento esgotado ou repasse o que você não vai usar.',
  url: env.siteUrl,
  locale: 'pt_BR',
  logo: '/img/logos/logo.png',
} as const;

/**
 * Limites do SERP. Título acima de ~60 caracteres e descrição acima de ~160 são
 * truncados pelo Google — cortar antes evita frase interrompida no meio.
 */
export const SEO_LIMITS = {
  title: 60,
  description: 160,
} as const;
