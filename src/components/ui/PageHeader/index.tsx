import { Heading } from '@/components/ui/Heading';

interface PageHeaderProps {
  title: string;
  description?: string;
  /** Ação principal da tela, alinhada à direita no desktop. */
  action?: React.ReactNode;
}

/** Cabeçalho padrão de tela: `<h1>`, subtítulo opcional e uma ação. */
export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <Heading as="h1">{title}</Heading>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </header>
  );
}
