---
tags: [arquitetura, regra]
---

# Estado e autenticação

## Onde cada estado vive

| Tipo de estado                     | Onde              |
| ---------------------------------- | ----------------- |
| Formulário, filtro, aberto/fechado | `useState` no hook da página |
| Dados da API                       | `useAsync` no hook da página |
| Sessão do usuário                  | `AuthContext`     |
| Constante de domínio               | `common/constants/` |

Não existe store global neste projeto, e não deve existir enquanto só a sessão for
compartilhada entre telas. Context para uma coisa; `useState` para o resto.

## Sessão

- `useAuth()` expõe `user`, `loading`, `isAuthenticated`, `setSession`, `logout`.
- O token vai para o `localStorage` e é injetado pelo `httpClient` — **nunca** passe
  `Authorization` na mão.
- `localStorage` só através de `common/utils/storage.ts`. No servidor não existe `window`,
  e um acesso direto quebra o render.

## O primeiro render não tem sessão

`AuthProvider` só lê o storage dentro de um `useEffect`, depois da hidratação. Então
existe um instante em que `user` é `null` mesmo com o usuário logado. É por isso que
`loading` existe e por isso que rota protegida usa:

```ts
const { checking } = useRequireAuth();
if (checking) return <PageLoader />;
```

Redirecionar antes de `loading` virar `false` chuta o usuário logado para o login.

## Limite importante

`useRequireAuth` é proteção de **experiência**, não de segurança. O bundle da página
protegida é público; quem garante autorização é a API. Nunca coloque dado sensível numa
página confiando só nesse guard.

## Relacionados

[[hooks]] · [[services-e-http]] · [[rotas-e-navegacao]] · [[estados-e-feedback]] · [[00-mapa]]
