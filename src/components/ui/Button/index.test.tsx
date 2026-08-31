import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button, ButtonLink } from './index';

describe('Button', () => {
  it('usa `type="button"` por padrão, para não submeter formulário sem querer', () => {
    render(<Button>Cancelar</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respeita `type="submit"` quando pedido', () => {
    render(<Button type="submit">Entrar</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('tem 44px de alvo de toque no tamanho padrão', () => {
    // Regra de acessibilidade do projeto: h-11 = 44px. Ver DESIGN_SYSTEM.md §3.
    render(<Button>Comprar</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
  });

  it('não dispara o clique quando desabilitado', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Publicando...
      </Button>,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('ButtonLink renderiza um link navegável, não um botão', () => {
    render(<ButtonLink href="/anunciar">Quero vender</ButtonLink>);
    // Link e botão têm semânticas diferentes: link abre em nova aba, botão não.
    expect(screen.getByRole('link', { name: 'Quero vender' })).toHaveAttribute(
      'href',
      '/anunciar',
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
