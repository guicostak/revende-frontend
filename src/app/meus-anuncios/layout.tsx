import type { Metadata } from 'next';

/** Rota de sessão: sem login não tem conteúdo útil, então fica fora do índice. */
export const metadata: Metadata = {
  title: 'Meus anúncios',
  robots: { index: false, follow: false },
};

export default function MeusAnunciosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
