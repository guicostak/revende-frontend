import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SellerLine } from './index';

describe('SellerLine', () => {
  it('mostra o nome do vendedor com destaque sobre o rótulo', () => {
    render(<SellerLine name="Marina Alves" />);

    const nome = screen.getByText('Marina Alves');
    expect(nome).toHaveClass('font-semibold');
    // O rótulo é apoio; o nome é o dado que se avalia.
    expect(screen.getByText(/Vendido por/)).toBeInTheDocument();
  });

  it('usa a mesma copy em qualquer contexto', () => {
    // Card e linha divergiam ("por X" vs "Vendido por X") antes deste componente.
    const { container } = render(<SellerLine name="João" />);
    expect(container.textContent).toBe('Vendido por João');
  });
});
