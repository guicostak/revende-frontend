---
tags: [arquitetura, seo, regra]
fonte: [site-architecture]
---

# Rotas e navegação

## Rotas atuais

| URL              | Arquivo                      | Público? |
| ---------------- | ---------------------------- | -------- |
| `/`              | `app/page.tsx`               | sim      |
| `/evento/[id]`   | `app/evento/[id]/page.tsx`   | sim      |
| `/login`         | `app/login/page.tsx`         | sim      |
| `/cadastro`      | `app/cadastro/page.tsx`      | sim      |
| `/anunciar`      | `app/anunciar/page.tsx`      | protegida |
| `/meus-anuncios` | `app/meus-anuncios/page.tsx` | protegida |

Nenhuma página está a mais de 1 clique da home. Ver [[arquitetura-de-informacao]] para a
regra dos 3 cliques e o que fazer quando surgirem categorias.

## Regras de URL

- Minúsculas, com hífen, em português: `/meus-anuncios`, nunca `/myListings`.
- URL descreve conteúdo, não implementação: `/evento/123`, não `/page?type=event&id=123`.
- Rota nova entra em `common/constants/routes.ts` **antes** de ser usada.
- Navegação por `<Link>` ou `<ButtonLink>`. `router.push` só depois de uma ação
  (submit, logout), nunca no lugar de um link — link é crawlável e abre em nova aba.

## Server vs Client Component

O padrão é Server Component. `'use client'` só quando houver estado, efeito, evento de
DOM ou context.

| Precisa de...                   | Component |
| ------------------------------- | --------- |
| `useState`, `useEffect`, context | client   |
| `onClick`, `onChange`            | client   |
| só JSX + props                   | server    |
| `export const metadata`          | **server** |

Consequência prática: uma página `'use client'` **não pode** exportar `metadata`. A saída
é um `layout.tsx` server ao lado dela. Ver [[metadata-e-titles]].

Empurre o `'use client'` para a folha da árvore, não para a raiz — cada boundary de
client arrasta todo o import graph dele para o bundle.

## Relacionados

[[camadas]] · [[metadata-e-titles]] · [[arquitetura-de-informacao]] · [[performance-e-web-vitals]] · [[00-mapa]]
