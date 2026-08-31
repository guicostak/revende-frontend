---
tags: [seo, performance, regra]
fonte: [seo-audit, high-perf-browser]
---

# Imagens e mídia (SEO)

Complementa [[imagens-e-icones]], que trata do lado visual.

## O que a busca lê de uma imagem

1. `alt` — descrição do conteúdo
2. Nome do arquivo — `show-metallica-sp.jpg` diz mais que `IMG_4821.jpg`
3. Contexto ao redor — heading e parágrafo próximos
4. Presença no sitemap de imagens (só vale com catálogo grande)

## Regras

- `alt` descritivo em toda imagem informativa. `alt={event.name}` no card e na capa.
- `alt=""` em decorativa. Nunca omitir o atributo.
- Nada de palavra-chave empilhada no alt: descreva a imagem, não a busca.
- Formato moderno e lazy loading: `next/image` resolve os dois sozinho.
- Imagem acima da dobra: `priority` (e portanto **sem** lazy).

## Imagem de terceiro

`imageUrl` do evento vem de host arbitrário. Isso tem custo: DNS + TLS para um host novo,
fora do controle de cache.

- Host precisa estar em `next.config.ts` → `remotePatterns`.
- `next.config.ts` tem lista fechada de origens. `hostname: "**"` foi removido: ele
  transformava o otimizador de imagem do Next em proxy aberto. Host novo entra na lista
  conscientemente.
- Sempre um fallback visual quando a URL falhar. Ver [[imagens-e-icones]].

## Open Graph

A imagem do evento é a melhor OG image de `/evento/[id]` — é ela que aparece quando
alguém compartilha o link no WhatsApp ou no Instagram, e compartilhamento é o principal
canal de descoberta de ingresso.

Implementado: `generateMetadata` de `/evento/[id]` publica `openGraph.images` com a
imagem do evento e `alt` com o nome. Ver [[metadata-e-titles]].

## Relacionados

[[imagens-e-icones]] · [[performance-e-web-vitals]] · [[metadata-e-titles]] · [[00-mapa]]
