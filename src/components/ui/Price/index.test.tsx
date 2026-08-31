import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Price } from './index';

/**
 * O ICU separa "R$" do número com um espaço não-quebrável cujo code point varia
 * entre versões do Node. Normalizar qualquer whitespace evita um teste que
 * quebra ao trocar a versão do runtime.
 */
const brl = (text: string | null | undefined) => text?.replace(/\s/g, ' ');

describe('Price', () => {
  it('mostra o preço atual e o original riscado com o desconto', () => {
    const { container } = render(<Price price={180} originalPrice={320} />);

    expect(screen.getByText(/44% OFF/)).toBeInTheDocument();
    const riscado = container.querySelector('.line-through');
    expect(brl(riscado?.textContent)).toBe('R$ 320,00');
    expect(brl(container.textContent)).toContain('R$ 180,00');
  });

  it('omite o original e o selo quando não há desconto', () => {
    // Preço igual ao original não é oferta — riscar nada seria desconto fabricado.
    const { container } = render(<Price price={320} originalPrice={320} />);

    expect(screen.queryByText(/OFF/)).not.toBeInTheDocument();
    expect(container.querySelector('.line-through')).toBeNull();
  });

  it('não mostra desconto quando a revenda é mais cara que o original', () => {
    const { container } = render(<Price price={400} originalPrice={320} />);

    expect(screen.queryByText(/OFF/)).not.toBeInTheDocument();
    expect(brl(container.textContent)).toContain('R$ 400,00');
  });
});
