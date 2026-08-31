---
tags: [seo, performance, regra]
fonte: [high-perf-browser, seo-audit]
---

# Performance e Web Vitals

Métricas de campo, com as metas do Google:

| Métrica | Meta | O que mede |
| ------- | ---- | ---------- |
| **LCP** | < 2,5s | quando o maior elemento visível aparece |
| **INP** | < 200ms | resposta a interação |
| **CLS** | < 0,1 | quanto o layout pula |

## Latência é o gargalo, não banda

Cada requisição paga DNS + TCP + TLS antes do primeiro byte. Menos idas e voltas vale
mais que arquivo menor.

Consequência direta aqui: a página do evento faz **duas** chamadas em `Promise.all`
(evento + anúncios) em vez de encadeadas. Encadear dobraria a latência.

## LCP

O maior elemento é quase sempre a imagem de capa ou o `<h1>`.

- Imagem acima da dobra leva `priority` — `/evento/[id]` já faz isso.
- `sizes` correto em toda imagem `fill`, senão baixa a variante errada. Ver [[imagens-e-icones]].
- Fonte do sistema (Arial) já elimina o custo de webfont. Se um dia entrar webfont:
  `font-display: swap`, `preload`, WOFF2, subset, teto de ~200KB.
- Buscar no servidor melhora LCP: o conteúdo vem no HTML em vez de depender de um round
  trip do browser. Ver [[indexacao-e-crawl]].

## CLS

- Toda imagem com dimensão reservada — é o motivo de `next/image` ser obrigatório.
- Skeleton/loader com **a mesma altura** do conteúdo que vai substituir.
- Nada injetado acima do conteúdo depois do primeiro paint (banner, alerta).
- Alerta de erro entra em espaço já reservado, não empurrando a página.

## INP

- Animar só `transform` e `opacity`. Ver [[microinteracoes]].
- Filtro pesado em lista grande vai para `useMemo` — `useHomeHook` já faz.
- Empurrar `'use client'` para a folha reduz JS no bundle. Ver [[rotas-e-navegacao]].

## Orçamento

- JS de primeira carga: manter abaixo de ~130KB. Hoje ~120KB.
- Dependência nova precisa de justificativa. `cn()` tem 5 linhas justamente para não
  puxar `clsx` + `tailwind-merge`.

## Verificação

```bash
npm run build   # olhe a coluna First Load JS
```

Depois: PageSpeed Insights e o relatório de Core Web Vitals do Search Console.

## Relacionados

[[imagens-e-icones]] · [[microinteracoes]] · [[indexacao-e-crawl]] · [[rotas-e-navegacao]] · [[00-mapa]]
