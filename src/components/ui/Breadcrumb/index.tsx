import Link from 'next/link';

export interface BreadcrumbItem {
  name: string;
  /** Sem `path` o item é a página atual (não vira link). */
  path?: string;
}

/**
 * Trilha de navegação. Serve o usuário ("onde estou, como volto") e o resultado
 * de busca — pareie sempre com `breadcrumbJsonLd`.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Você está aqui">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {item.path && !isLast ? (
                <Link href={item.path} className="font-semibold hover:text-brand-500">
                  {item.name}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="line-clamp-1">
                  {item.name}
                </span>
              )}
              {!isLast && <span aria-hidden>›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
