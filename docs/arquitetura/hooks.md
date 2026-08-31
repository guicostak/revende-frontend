---
tags: [arquitetura, regra]
fonte: [clean-code, pragmatic-programmer]
---

# Hooks

Toda a lógica de uma tela vive num hook. A página fica só com a marcação.

## Onde cada hook mora

| Escopo                       | Local                                  | Nome              |
| ---------------------------- | -------------------------------------- | ----------------- |
| Uma página                   | `app/<rota>/hooks/use<Nome>Hook.ts`    | `useLoginHook`    |
| Um componente com lógica     | `components/**/<Comp>/hooks/`          | `useNavbarHook`   |
| Reutilizável na app inteira  | `src/hooks/`                           | `useAsync`        |

Promova para `src/hooks/` **na segunda** vez que o hook for usado, não na primeira
suspeita de que talvez seja reutilizável.

> `app/**/hooks/` não vira rota — no App Router só `page.tsx` e `route.ts` criam rotas.

## Server Component usa loader, não hook

Hook só existe em Client Component. Página que renderiza no servidor carrega dados por um
**loader** — o equivalente server do hook, na mesma posição da árvore:

```
app/evento/[id]/
├── page.tsx                        # Server Component
└── loaders/eventLoader.ts          # busca + trata erro
```

Regras do loader:

- Envolva em `cache()` do React: `generateMetadata` e a página chamam o mesmo loader, e
  o `cache()` garante uma requisição só por request.
- Chamadas independentes vão em `Promise.all`. Encadear dobra a latência.
- Falha vira estado (`error: string`) ou `null`, não exceção — API fora do ar deve
  renderizar aviso, não tela de erro.

## O que o hook devolve

Um objeto plano, com nomes que a página entende sem pensar:

```ts
return { values, handleChange, handleSubmit, error, submitting };
```

Não devolva setters crus (`setLoading`, `setError`) — devolva o estado pronto e as
ações. A página não deve poder colocar o hook num estado inválido.

## useAsync

Não repita `useState` de `data`/`loading`/`error`:

```ts
const fetchListings = useCallback(() => listingService.list(), []);
const { data, loading, error, reload } = useAsync(fetchListings, { initialData: [] });
```

O `fetcher` **precisa** estar em `useCallback` — sem isso ele muda de identidade a cada
render e a busca entra em loop.

## Regras

- Hook não renderiza JSX.
- Hook não monta URL nem chama `fetch` — chama service. Ver [[services-e-http]].
- Todo hook exportado de `src/hooks/` tem `'use client'` no topo e JSDoc de uma linha.
- Efeito com dependência de função → a função vem de `useCallback`.
- Página protegida usa `useRequireAuth()`, não `useEffect` + `router.replace` copiado.

## Relacionados

[[camadas]] · [[services-e-http]] · [[rotas-e-navegacao]] · [[estados-e-feedback]] · [[00-mapa]]
