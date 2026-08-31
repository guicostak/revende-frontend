---
tags: [design, regra]
fonte: [refactoring-ui]
---

# Design tokens

Os tokens vieram do frontend anterior (`common/styles/theme.tsx`, styled-components).

**A fonte de verdade é uma só: o bloco `@theme` de `src/app/globals.css`.** É ele que
gera as classes do Tailwind, e é o único arquivo que precisa existir para o sistema
funcionar.

`src/common/styles/theme.ts` é um **espelho parcial**, só para os casos em que um valor
precisa ser lido em JS (`window.matchMedia`, `style` calculado, cor de meta tag). Em JSX
use a classe, nunca `theme.color.*`.

Regra prática: alterou um valor no `globals.css`, replique no `theme.ts` **se ele estiver
lá**. Não adicione ao `theme.ts` um token que ninguém lê em JS — foi o que fez os dois
arquivos divergirem antes (`inputBackground`, `transition.slow` viveram meses só no TS,
sem nenhum consumidor).

## Cores

| Token | Valor | Vinha de |
| ----- | ----- | -------- |
| `brand-500` | `#e82c4f` | `primaryColor` |
| `brand-600` | `#d4304e` | `darkMain` |
| `brand-50…900` | escala derivada | — |
| `ink` | `#2b2a2a` | `textColor` |
| `muted` | `#575555` | `darkGrey` |
| `surface` | `#ffffff` | `mainBackground` |
| `surface-muted` | `#efefef` | `secondBackground` |
| `line` | `rgba(0,0,0,.17)` | `borderColor` |
| `selected` | `rgba(232,44,79,.13)` | `selected` |
| `success` / `danger` / `warning` | — | novos |
| `on-brand` | `#ffffff` | novo — texto sobre fundo de cor cheia |

`text-white` está proibido junto com a paleta genérica: existe `text-on-brand` para que
"branco" seja um papel nomeado, e não um valor solto que o dark mode um dia teria que
caçar componente por componente.

## Forma e profundidade

- Raio: `rounded-brand` (10px, o raio dos botões do design original) ou `rounded-full`.
- Sombra: `shadow-soft` (elemento apoiado) e `shadow-card` (elemento levantado).
- Fonte: `Arial, Helvetica, sans-serif` (`mainFont`), aplicada no `body`.

## Layout e tamanho fluido

| Token | Classe | Valor |
| ----- | ------ | ----- |
| `container-page` | `max-w-page` | `72rem` — largura máxima do conteúdo |
| `text-display` | `text-display` | `clamp(1.875rem, 1.25rem + 2.5vw, 2.5rem)` |

`max-w-page` não é digitado à mão: use `<Container>`. `text-display` é o único tamanho
fluido do sistema e por isso **não** leva `md:`/`lg:` — ver [[tipografia]].

## Breakpoints: dois, e só dois

`sm`, `xl` e `2xl` estão **desligados** no `@theme` (`--breakpoint-sm: initial`). Só
existem `md:` (≥768px) e `lg:` (≥1024px).

Não é economia de CSS: breakpoint disponível é breakpoint que alguém usa sem pensar, e o
produto passa a ter cinco layouts para manter e testar. Se um terceiro ponto de quebra
for mesmo necessário, ele volta no `globals.css` — e só lá.

## Dark mode

Não existe, e é decisão. Os tokens já são semânticos (`surface`, `ink`, `muted`,
`on-brand`, `line`), então o dia em que for preciso é redefinir esses nomes dentro de
`@media (prefers-color-scheme: dark)` e de `[data-theme="dark"]`, num bloco só.

**Não** espalhe `dark:` pelos componentes: se isso parecer necessário, é sinal de que
algum componente tem cor crua em vez de token.

## Regras

- **Nunca** use a paleta genérica do Tailwind: `bg-pink-600`, `text-gray-500`,
  `border-gray-200` estão proibidos. Eles fogem da marca e criam três cinzas diferentes
  na mesma tela.
- Valor arbitrário (`p-[13px]`, `text-[#f03]`) só com justificativa escrita no PR.
- Token novo entra no `globals.css` **e** ganha uma linha aqui. No `theme.ts`, só se for
  lido em JS.
- Cor de um primitivo não se sobrescreve por `className` — vira prop (`tone`, `variant`,
  `overlay`). Ver [[componentes]].

## Armadilha do `@layer`

Regra CSS fora de `@layer` vence qualquer utilitário do Tailwind — que vive na layer
`utilities`. Um `* { margin: 0; padding: 0 }` solto zera todo `px-4` e `space-y-*` da
aplicação. Por isso o reset em `globals.css` está dentro de `@layer base`. Isso já
quebrou o layout uma vez; não tire de lá.

## Relacionados

[[cor]] · [[espacamento-e-layout]] · [[tipografia]] · [[profundidade-e-sombras]] · [[componentes]] · [[00-mapa]]

Referência de API dos tokens e componentes: `DESIGN_SYSTEM.md` na raiz.
