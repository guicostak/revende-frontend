type ClassValue = string | false | null | undefined;

/**
 * Junta classes condicionais. Mantido mínimo de propósito — se um dia
 * precisarmos resolver conflitos entre utilitários do Tailwind, trocar por
 * `clsx` + `tailwind-merge`.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
