'use client';

import Link from 'next/link';
import { ROUTES } from '@/common/constants';
import { firstName } from '@/common/utils';
import { Badge, Button, ButtonLink, Container, Logo } from '@/components/ui';
import { useNavbarHook } from './hooks/useNavbarHook';

export function Navbar() {
  const { user, isAuthenticated, handleLogout } = useNavbarHook();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      {/*
        `md` (44px) e não `sm` nas ações: no celular a Navbar é a única barra de
        navegação da tela, e o alvo de toque não pode ficar abaixo de 44px.
      */}
      <Container className="flex min-h-16 items-center justify-between gap-4 py-2">
        <Logo width={130} priority />

        <nav className="flex items-center gap-2 text-sm font-semibold md:gap-4">
          <Link href={ROUTES.home} className="hidden text-muted hover:text-brand-500 md:block">
            Eventos
          </Link>

          {isAuthenticated ? (
            <>
              <Link href={ROUTES.myListings} className="text-muted hover:text-brand-500">
                Meus anúncios
              </Link>
              <ButtonLink href={ROUTES.createListing}>Quero vender</ButtonLink>
              <Button variant="ghost" onClick={handleLogout}>
                Sair
              </Button>
              {user && <Badge className="hidden md:inline-flex">{firstName(user.name)}</Badge>}
            </>
          ) : (
            <>
              <Link href={ROUTES.login} className="text-muted hover:text-brand-500">
                Entrar
              </Link>
              <ButtonLink href={ROUTES.register}>Criar conta</ButtonLink>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
}
