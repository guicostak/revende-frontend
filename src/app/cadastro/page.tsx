'use client';

import Link from 'next/link';
import { ROUTES } from '@/common/constants';
import { Alert, Button, Card, Heading, Textfield } from '@/components/ui';
import { useCadastroHook } from './hooks/useCadastroHook';

export default function CadastroPage() {
  const { values, handleChange, handleSubmit, error, submitting, minPasswordLength } =
    useCadastroHook();

  return (
    <div className="mx-auto max-w-md">
      <Card className="p-6 md:p-8">
        <Heading as="h1">Criar conta</Heading>
        <p className="mt-1 text-sm text-muted">
          Comece a comprar e revender ingressos em minutos.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Textfield
            label="Nome completo"
            name="name"
            autoComplete="name"
            placeholder="Seu nome"
            value={values.name}
            onChange={handleChange}
            required
          />
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
            autoComplete="new-password"
            hint={`Mínimo de ${minPasswordLength} caracteres`}
            value={values.password}
            onChange={handleChange}
            required
          />
          <Textfield
            label="Telefone (opcional)"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+55 11 99999-0000"
            value={values.phone}
            onChange={handleChange}
          />

          {error && <Alert>{error}</Alert>}

          <Button type="submit" fullWidth size="lg" disabled={submitting}>
            {submitting ? 'Criando...' : 'Criar conta'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          Já tem conta?{' '}
          <Link href={ROUTES.login} className="font-semibold text-brand-500">
            Entrar
          </Link>
        </p>
      </Card>
    </div>
  );
}
