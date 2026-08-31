/** Rotas da aplicação. Use sempre estas constantes em vez de strings soltas. */
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/cadastro',
  createListing: '/anunciar',
  myListings: '/meus-anuncios',
  event: (id: number | string) => `/evento/${id}`,
} as const;
