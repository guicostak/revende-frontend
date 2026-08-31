import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { QuantityHint } from './index';

describe('QuantityHint', () => {
  it('destaca o último ingresso', () => {
    render(<QuantityHint quantity={1} />);

    const hint = screen.getByText('Último ingresso');
    expect(hint).toHaveClass('text-warning');
  });

  it('não destaca quando ainda há estoque', () => {
    render(<QuantityHint quantity={4} />);

    const hint = screen.getByText('4 ingressos');
    expect(hint).toHaveClass('text-muted');
    expect(hint).not.toHaveClass('text-warning');
  });

  it('carrega a informação no texto, não só na cor', () => {
    // Acessibilidade: cor nunca é o único portador da informação.
    render(<QuantityHint quantity={1} />);
    expect(screen.getByText('Último ingresso')).toBeInTheDocument();
  });
});
