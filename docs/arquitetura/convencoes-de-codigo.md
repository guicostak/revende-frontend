---
tags: [arquitetura, regra]
fonte: [clean-code, pragmatic-programmer]
---

# Convenções de código

## Idioma

- **Código, tipos, funções, variáveis**: inglês.
- **Texto de interface, comentários, mensagens de erro, nomes de rota**: português.

Motivo: o código conversa com bibliotecas em inglês; a interface conversa com o usuário
brasileiro. Misturar dentro de uma mesma camada é que confunde.

## Nomes

| Coisa            | Padrão                  | Exemplo             |
| ---------------- | ----------------------- | ------------------- |
| Componente       | `PascalCase`            | `ListingCard`       |
| Hook de tela     | `use<Nome>Hook`         | `useAnunciarHook`   |
| Hook genérico    | `use<Coisa>`            | `useAsync`          |
| Service          | `<domínio>Service`      | `listingService`    |
| Constante        | `SCREAMING_SNAKE_CASE`  | `TICKET_TYPE_LABELS`|
| Arquivo de componente | sempre `index.tsx` na pasta do componente | |

Booleano começa com `is`/`has`/`should`. Handler começa com `handle`. Prop de callback
começa com `on`.

## Imports

Sempre pelo alias `@/`. Nada de `../../`.

Ordem: libs externas → `@/` → relativos. Tipo entra com `import type`.

## Tipos

- Sem `any`. Use `unknown` e faça narrowing.
- DTO da API vive em `src/types/`, com o sufixo `Dto`.
- União fechada vem de `as const` + `typeof`, não de enum:
  ```ts
  export const TICKET_TYPES = ['INTEIRA', 'MEIA', 'VIP', 'BACKSTAGE'] as const;
  export type TicketType = (typeof TICKET_TYPES)[number];
  ```
  Assim a lista existe em runtime (para popular um `<select>`) e o tipo sai de graça.
- Objeto que vai virar query string precisa ser `type`, não `interface` — interface não é
  atribuível a `Record<string, ...>`. Ver `EventFilters` em `src/types/event.ts`.

## Comentários

Explicam **por quê**, não **o quê**. Se o comentário descreve o que a linha faz, o nome
da função é que está ruim.

JSDoc de uma linha em tudo que é exportado de `services/`, `hooks/` e `common/utils/`.

## Antes de fechar

```bash
npx tsc --noEmit && npm run build
```

## Relacionados

[[camadas]] · [[componentes]] · [[hooks]] · [[00-mapa]]
