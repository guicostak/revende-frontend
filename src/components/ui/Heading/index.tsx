import { cn } from '@/common/utils';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';
export type HeadingSize = 'display' | 'page' | 'section' | 'card';
export type HeadingTone = 'default' | 'onBrand';

const SIZE_CLASSES: Record<HeadingSize, string> = {
  display: 'text-display', // o token já carrega peso e entrelinha
  page: 'text-2xl font-bold',
  section: 'text-xl font-bold',
  card: 'text-base font-bold',
};

const TONE_CLASSES: Record<HeadingTone, string> = {
  default: 'text-ink',
  onBrand: 'text-on-brand',
};

/** Tamanho que cada nível assume quando nada é dito. */
const DEFAULT_SIZE: Record<HeadingTag, HeadingSize> = {
  h1: 'page',
  h2: 'section',
  h3: 'card',
  h4: 'card',
};

interface HeadingProps {
  /** Nível semântico. Escolha pela estrutura do documento, nunca pelo tamanho. */
  as?: HeadingTag;
  /** Só quando o tamanho visual precisa divergir do nível — um `h2` pequeno continua `h2`. */
  size?: HeadingSize;
  tone?: HeadingTone;
  className?: string;
  children: React.ReactNode;
}

/**
 * Título de página, seção ou card.
 *
 * Separa a tag (semântica, lida por leitor de tela e por buscador) do tamanho
 * (visual). Ver `docs/design/tipografia.md`.
 *
 * `tone` existe em vez de sobrescrever a cor por `className`: `cn()` apenas
 * concatena, então duas classes de cor de texto deixariam o resultado na mão da
 * ordem do CSS gerado.
 */
export function Heading({ as: Tag = 'h2', size, tone = 'default', className, children }: HeadingProps) {
  return (
    <Tag className={cn(SIZE_CLASSES[size ?? DEFAULT_SIZE[Tag]], TONE_CLASSES[tone], className)}>
      {children}
    </Tag>
  );
}
