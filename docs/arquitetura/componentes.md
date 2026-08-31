---
tags: [arquitetura, design, regra]
fonte: [clean-code, refactoring-ui]
---

# Componentes

Três famílias, com fronteiras rígidas:

| Pasta                  | Conhece domínio? | Exemplo                    |
| ---------------------- | ---------------- | -------------------------- |
| `components/ui/`       | **Não**          | `Button`, `Textfield`, `Card`, `Container`, `Heading` |
| `components/layout/`   | Só navegação     | `Navbar`, `Footer`         |
| `components/<domínio>/`| Sim              | `ListingCard`, `ListingRow`|

Se um componente em `ui/` precisou importar `ListingDto`, ele está na pasta errada.

## Estrutura de arquivo

```
components/ui/Button/
├── index.tsx              # o componente
└── hooks/useXHook.ts      # só se tiver lógica
```

Um componente por pasta, sempre `index.tsx`. Cada família tem um `index.ts` de barril —
importe por ele: `import { Button, Card } from '@/components/ui'`.

**Exports nomeados**, nunca `default` (exceto `page.tsx` e `layout.tsx`, que o Next exige).

## Variantes por mapa, não por `if`

```ts
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: '...',
  secondary: '...',
};
```

Adicionar uma variante vira uma linha no mapa, e o TypeScript garante que nenhuma ficou
sem estilo. Ver `src/components/ui/Button/index.tsx`.

## Classes conflitantes

`cn()` só concatena — não resolve conflito entre utilitários do Tailwind. Se `rounded-brand`
e `rounded-full` chegam juntos, quem vence é a ordem no CSS gerado, não a ordem na string.
Por isso `Button` tem a prop `pill` em vez de aceitar `className="rounded-full"`.

**Regra:** conflito de utilitário vira prop, não `className`.

Vale para **cor e fundo** também, não só para raio:

- `Badge` tem `overlay` em vez de aceitar `className="bg-surface/90"` sobre o `tone`
- `Heading` tem `tone="onBrand"` em vez de aceitar `className="text-on-brand"` sobre o
  `text-ink` que ele já aplica

Nos dois casos o resultado antes dependia da ordem em que o Tailwind gerou as regras —
funcionava por acidente, e um rebuild podia inverter.

## Quando extrair um componente

- O mesmo bloco de JSX apareceu pela **terceira** vez.
- O bloco tem estado próprio que não interessa ao pai.
- O bloco tem um nome óbvio no domínio (`ListingRow`), não um nome estrutural (`Box2`).

Não extraia por "está ficando grande". Extraia por "isto é outra coisa".

## Relacionados

[[camadas]] · [[design-tokens]] · [[hierarquia-visual]] · [[acessibilidade]] · [[00-mapa]]

Catálogo dos componentes com assinatura e exemplo: `DESIGN_SYSTEM.md` na raiz.
