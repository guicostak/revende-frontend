---
tags: [seo, regra]
fonte: [seo-audit]
---

# Indexação e crawl

Primeira pergunta de qualquer diagnóstico de SEO: **o Google consegue achar, rastrear e
indexar esta página?** Se a resposta é não, nada mais importa.

## Renderização é o gargalo aqui

Todas as páginas são `'use client'` e buscam dados via `fetch` no browser. O HTML que
chega ao crawler não tem o conteúdo — só o shell.

| Crawler | Roda JS? |
| ------- | -------- |
| Googlebot | sim, mas em segunda passada, com fila e atraso |
| Bingbot | parcialmente |
| GPTBot, PerplexityBot, ClaudeBot | **não** |

Para uma página que precisa ranquear e ser citada, renderizar no cliente é abrir mão da
maior parte do valor. Ver [[ai-seo]].

**Correção**: `/evento/[id]` e `/` viram Server Components que buscam pela API no
servidor; só o que é interativo (busca, botão de comprar) fica client. Os services já
funcionam no servidor — `httpClient` usa `fetch`, e `storage` retorna `null` fora do
browser, então chamada pública funciona igual.

## Regras

- Rota pública é indexável. Rota de sessão (`/anunciar`, `/meus-anuncios`) leva
  `robots: { index: false }` na metadata — não tem conteúdo útil deslogado.
- Toda página indexável tem canonical apontando para ela mesma.
- Uma intenção de busca, uma URL. Sem parâmetro criando duplicata.
- Redirect direto, sem cadeia. HTTP → HTTPS sempre.

## Estado atual — implementado

`/` e `/evento/[id]` são Server Components. No build eles aparecem como
`ƒ (Dynamic) server-rendered on demand` — o HTML sai completo a cada request.

A interatividade virou ilha client: `ListingSearchField` (campo de busca) e `BuyButton`
(precisa da sessão). O JS de primeira carga dessas rotas caiu de ~2 kB para 914 B.

Também no lugar: `app/robots.ts`, `app/sitemap.ts` (dinâmico, lê os eventos da API),
canonical em todas as rotas, `robots: { index: false }` nas rotas de sessão e
`app/not-found.tsx` devolvendo HTTP 404 de verdade.

A busca da home passou a viver na URL (`?q=`): o servidor filtra e devolve o HTML já
filtrado, o resultado é compartilhável e o botão voltar funciona.

## Verificação

```bash
curl -s https://<dominio>/evento/1 | grep -o '<h1[^>]*>[^<]*'
```

Se o `<h1>` não aparece no HTML cru, o crawler que não roda JS também não vê.

## Relacionados

[[metadata-e-titles]] · [[dados-estruturados]] · [[ai-seo]] · [[performance-e-web-vitals]] · [[rotas-e-navegacao]] · [[00-mapa]]
