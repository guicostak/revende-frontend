import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/common/constants';
import { cn } from '@/common/utils';

interface LogoProps {
  /** Largura em px; a altura acompanha a proporção original (868x250). */
  width?: number;
  className?: string;
  /** Quando false, renderiza só a imagem (sem link para a home). */
  asLink?: boolean;
  priority?: boolean;
}

const ASPECT_RATIO = 250 / 868;

export function Logo({ width = 140, className, asLink = true, priority }: LogoProps) {
  const image = (
    <Image
      src="/img/logos/logo.png"
      alt="Revende"
      width={width}
      height={Math.round(width * ASPECT_RATIO)}
      priority={priority}
      className={cn('h-auto w-auto', className)}
    />
  );

  if (!asLink) return image;

  return (
    <Link href={ROUTES.home} aria-label="Ir para a página inicial" className="inline-flex">
      {image}
    </Link>
  );
}
