'use client';

import Link from 'next/link';
import { ROUTES } from '@/common/constants';
import { Alert, Button, Card, Heading, Textfield } from '@/components/ui';
import { useLoginHook } from './hooks/useLoginHook';

export default function LoginPage() {
  const { values, handleChange, handleSubmit, error, submitting } = useLoginHook();

  return (
    <div className="mx-auto max-w-md">
      <Card className="p-6 md:p-8">
        <Heading as="h1">Entrar</Heading>
        <p className="mt-1 text-sm text-muted">Bem-vindo de volta à Revende.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Textfield
            label="E-mail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            value={values.email}
            onChange={handleChange}
            required
          />
          <Textfield
            label="Senha"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••"
            value={values.password}
            onChange={handleChange}
            required
          />

          {error && <Alert>{error}</Alert>}

          <Button type="submit" fullWidth size="lg" disabled={submitting}>
            {submitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          Não tem conta?{' '}
          <Link href={ROUTES.register} className="font-semibold text-brand-500">
            Criar conta
          </Link>
        </p>
      </Card>
    </div>
  );
}
