import type { Metadata } from 'next';
import { ROUTES } from '@/common/constants';
import { ButtonLink, EmptyState } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <EmptyState
      title="Página não encontrada"
      description="O link pode estar quebrado ou o anúncio pode ter saído do ar."
      action={<ButtonLink href={ROUTES.home}>Ver ingressos à venda</ButtonLink>}
    />
  );
}
