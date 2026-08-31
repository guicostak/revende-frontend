---
tags: [seo, regra]
fonte: [seo-audit]
---

# Metadata e titles

## Regras de title

- **Único por página.** Título duplicado faz as páginas competirem entre si.
- 50–60 caracteres. Acima disso o Google corta.
- Palavra-chave no começo, marca no fim: `Ingressos para <evento> em <cidade> · Revende`.
- Descreve a página, não a empresa.

## Regras de description

- Única por página, 150–160 caracteres.
- Contém a palavra-chave e uma razão para clicar.
- Não é fator de ranqueamento — é fator de **clique**. Escreva para o humano.

## Como fazer no App Router

Server Component exporta `metadata`. Página estática:

```tsx
export const metadata: Metadata = {
  title: 'Entrar · Revende',
  description: 'Acesse sua conta para comprar e revender ingressos.',
};
```

Página dinâmica usa `generateMetadata`:

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { id } = await params;
  const event = await eventService.getById(Number(id));
  return {
    title: `Ingressos para ${event.name} em ${event.city} · Revende`,
    description: `Compre e revenda ingressos para ${event.name}...`,
    alternates: { canonical: `/evento/${id}` },
    openGraph: { images: event.imageUrl ? [event.imageUrl] : [] },
  };
}
```

## Página `'use client'` não pode exportar metadata

É a restrição que mais aparece aqui. Duas saídas:

1. **Preferida**: transformar a página em Server Component e mover a interatividade para
   um componente client filho.
2. **Rápida**: criar um `layout.tsx` (server) na pasta da rota, exportando a `metadata`,
   com a `page.tsx` client dentro.

## Estado atual — implementado

O `layout.tsx` raiz define `metadataBase`, `title.template`, `openGraph`, `twitter` e
`robots`. Cada rota tem title e description próprios:

| Rota | Como |
| ---- | ---- |
| `/` | `metadata` na própria page (server) |
| `/evento/[id]` | `generateMetadata` com nome, cidade e menor preço |
| `/login`, `/cadastro` | `layout.tsx` server ao lado da page client |
| `/anunciar`, `/meus-anuncios` | idem, com `robots: { index: false }` |

Helpers em `common/utils/seo.ts`: `seoTitle()`, `seoDescription()`, `absoluteUrl()`.

## Duas armadilhas que custaram tempo

**O `title.template` não vale para o próprio segmento que o define.** O layout raiz
declara o template, então `app/page.tsx` — que está no mesmo segmento — não recebe o
sufixo da marca. A home usa `title: { absolute: '... · Revende' }`.

**Truncar título corta no meio da palavra.** `seoTitle()` recebe variantes da mais
completa para a mais curta e devolve a primeira que cabe:

```ts
seoTitle(
  `Ingressos para ${event.name} em ${event.city}`,
  `Ingressos para ${event.name}`,
  event.name,
)
```

Abrir mão da cidade é melhor que publicar "…em São…" no resultado de busca.

## Relacionados

[[estrutura-semantica]] · [[indexacao-e-crawl]] · [[copy-de-interface]] · [[rotas-e-navegacao]] · [[00-mapa]]
