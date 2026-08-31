import { cn } from '@/common/utils';

type ContainerTag = 'div' | 'main' | 'section' | 'header' | 'footer' | 'nav';

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** Tag renderizada — use a semântica correta, não sempre `div`. */
  as?: ContainerTag;
}

/**
 * Faixa central de conteúdo: largura máxima da página e a respiração lateral.
 *
 * Existe para que `mx-auto max-w-page px-4` não seja redigitado em cada shell —
 * era o caso do layout raiz, da Navbar e do Footer, e bastava um deles divergir
 * para o logo desalinhar do conteúdo.
 */
export function Container({ as: Tag = 'div', className, ...props }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-page px-4', className)} {...props} />;
}
