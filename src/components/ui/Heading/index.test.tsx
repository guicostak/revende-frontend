import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from './index';

describe('Heading', () => {
  it('renderiza a tag semântica pedida', () => {
    render(<Heading as="h1">Meus anúncios</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Meus anúncios');
  });

  it('deriva o tamanho do nível quando `size` não é dito', () => {
    render(<Heading as="h1">Título</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('text-2xl');
  });

  it('permite tamanho divergente sem trocar a tag', () => {
    // Um h2 pequeno continua sendo h2: heading é semântica, não tamanho.
    render(
      <Heading as="h2" size="card">
        Detalhes
      </Heading>,
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-base');
  });

  it('troca a cor por `tone`, sem duas classes de cor conflitando', () => {
    render(
      <Heading as="h1" tone="onBrand">
        Hero
      </Heading>,
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-on-brand');
    expect(heading).not.toHaveClass('text-ink');
  });
});
