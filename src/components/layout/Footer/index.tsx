import { Container, Logo } from '@/components/ui';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface py-8">
      <Container className="flex flex-col items-center gap-4 text-center">
        <Logo width={110} asLink={false} />
        <p className="text-sm text-muted">
          Marketplace de revenda de ingressos · {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}
