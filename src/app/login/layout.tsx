import type { Metadata } from 'next';

/**
 * `page.tsx` é client (formulário), e Client Component não exporta `metadata`.
 * Este layout server existe só para dar título e descrição próprios à rota.
 */
export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Acesse sua conta para comprar e revender ingressos na Revende.',
  alternates: { canonical: '/login' },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
