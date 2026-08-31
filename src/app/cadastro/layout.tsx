import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar conta',
  description:
    'Crie sua conta na Revende e comece a comprar e revender ingressos de shows e eventos em minutos.',
  alternates: { canonical: '/cadastro' },
};

export default function CadastroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
