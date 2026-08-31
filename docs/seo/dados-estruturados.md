---
tags: [seo, regra]
fonte: [schema-markup]
---

# Dados estruturados

JSON-LD no `<head>`. É o formato que o Google recomenda e o mais fácil de manter — não
se mistura com a marcação.

## Schemas que este produto pede

| Página | Tipo | Por quê |
| ------ | ---- | ------- |
| `/` | `WebSite` + `Organization` | nome, logo, caixa de busca no SERP |
| `/evento/[id]` | **`Event`** + `Offer` | resultado rico de evento: data, local, preço |
| `/evento/[id]` | `BreadcrumbList` | trilha no resultado de busca |

`Event` é o de maior retorno aqui: o Google mostra data, local e faixa de preço direto no
resultado. É o schema que este produto existe para preencher.

## Campos de `Event`

Obrigatórios: `name`, `startDate`, `location`.
Recomendados: `image`, `description`, `endDate`, `eventStatus`, `eventAttendanceMode`,
`offers` (com `price`, `priceCurrency`, `availability`, `url`, `validFrom`), `organizer`.

Os dados já existem em `EventDto` e `ListingDto` — falta serializar.

## Regra de ouro: schema não mente

Só marque o que está visível na página. Preço no schema tem que ser o preço na tela;
data no schema tem que ser a data na tela. Divergência é motivo de penalidade manual, não
só de perder o resultado rico.

E mantenha sincronizado: anúncio vendido precisa sair do `offers`.

## Como implementar

Um helper em `src/common/utils/` gerando o objeto a partir do DTO, e no Server Component:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(event, listings)) }}
/>
```

Combine tipos com `@graph` em vez de vários `<script>`.

## Validação

- Rich Results Test: `https://search.google.com/test/rich-results`
- Validator: `https://validator.schema.org/`

Não confie em `curl` para conferir schema de terceiros — JSON-LD injetado por JS não
aparece no HTML estático.

## Estado atual — implementado

Construtores em `common/utils/jsonLd.ts`, injeção pelo componente server
`<JsonLd data={...} />`:

| Onde | Grafo |
| ---- | ----- |
| `layout.tsx` raiz | `Organization` + `WebSite` (com `SearchAction`) |
| `/evento/[id]` | `Event` + `Offer` + `BreadcrumbList` |

`eventJsonLd` filtra por `status === 'ATIVO'` antes de montar as ofertas — anunciar preço
de ingresso vendido é o erro clássico que derruba o resultado rico.

O mesmo filtro vale para a vitrine: `loadHomePage` só devolve anúncios ativos, para o que
está na tela bater com o que está no schema.

## Relacionados

[[metadata-e-titles]] · [[estrutura-semantica]] · [[indexacao-e-crawl]] · [[ai-seo]] · [[00-mapa]]
