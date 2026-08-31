---
tags: [arquitetura, regra]
fonte: [clean-architecture, release-it]
---

# Services e HTTP

`src/services/httpClient.ts` é a **única** saída HTTP da aplicação.

## O que o httpClient resolve (e ninguém mais precisa resolver)

- Monta a URL a partir de `BASE_API_URL` + `API_ENDPOINTS`
- Injeta `Authorization: Bearer <token>` quando há sessão
- Serializa/desserializa JSON e trata `204 No Content`
- Descarta query params vazios
- Normaliza qualquer falha em `ApiError`, que carrega o `status` HTTP

## Regras

- Um service por domínio: `authService`, `eventService`, `listingService`.
- Service recebe e devolve tipos de `src/types/`. Nada de `any`, nada de `Response`.
- Endpoint novo entra em `config/apiConfig.ts` → `API_ENDPOINTS`. Nunca concatene path
  na mão dentro do service.
- Service não conhece React. Sem hooks, sem estado, sem `router`.
- Erro sobe como exceção. Quem captura é o hook, com `toErrorMessage(err, 'fallback')`.

## Falha é estado normal, não exceção

A API cai. A rede oscila. Toda chamada tem três resultados possíveis — sucesso, erro e
"ainda carregando" — e os três precisam ter UI. É por isso que existe [[hooks|useAsync]]:
para que nenhum hook reinvente esse trio e nenhuma tela esqueça um dos três.

`ApiError.status` existe para decisões futuras (401 → deslogar, 429 → backoff). Hoje só
a mensagem é usada; o status já está preservado para quando precisar.

## Anti-padrões

```ts
// ❌ fetch na página
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings`);

// ❌ path na mão dentro do service
httpClient.get(`/api/listings/${id}/sold`);

// ✅
listingService.markSold(id);
```

## Relacionados

[[camadas]] · [[hooks]] · [[estado-e-autenticacao]] · [[00-mapa]]
