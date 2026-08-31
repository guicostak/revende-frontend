import type { Metadata } from 'next';

/** Rota de sessão: sem login não tem conteúdo útil, então fica fora do índice. */
export const metadata: Metadata = {
  title: 'Anunciar ingresso',
  robots: { index: false, follow: false },
};

export default function AnunciarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
