---
tags: [design, seo, regra]
fonte: [refactoring-ui, seo-audit]
---

# Imagens e ícones

## Sempre `next/image`

`<img>` cru está proibido. `next/image` dá lazy loading, `srcset`, formato moderno e —
o mais importante para [[performance-e-web-vitals|CLS]] — reserva o espaço antes da
imagem chegar.

Host externo precisa estar em `next.config.ts` → `images.remotePatterns`.

## Proporção fixa, `object-fit: cover`

Imagem de evento vem de URL arbitrária, em qualquer proporção. A grade só fica alinhada
se o container definir a altura e a imagem preencher:

```tsx
<div className="relative h-40 w-full overflow-hidden bg-brand-50">
  <Image src={...} alt={...} fill sizes="..." className="object-cover" />
</div>
```

`fill` exige `position: relative` no pai. Nunca estique a imagem — corte.

## `sizes` não é opcional

Com `fill`, sem `sizes` o browser baixa a maior variante possível. Declare o layout real:

```
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

## Alt text

- Imagem informativa: descreva o conteúdo — `alt={event.name}`.
- Imagem decorativa: `alt=""` (vazio, não ausente).
- Nunca "imagem", "foto", "banner". O leitor de tela já anuncia que é imagem.

Alt serve acessibilidade **e** busca por imagem. Ver [[acessibilidade]] e [[imagens-e-midia]].

## Fallback

Toda imagem opcional precisa de estado sem imagem. `ListingCard` renderiza um bloco
`bg-brand-50` com "sem imagem" — nunca um quadrado quebrado.

## Ícones

- Tamanho conforme contexto: `w-4 h-4` inline, `w-5 h-5` em botão, `w-6 h-6` em nav.
- Um conjunto só, com a mesma espessura de traço.
- Ícone sozinho num botão exige `aria-label`.
- Emoji não é ícone: não escala, não herda cor, varia por sistema.

## Logo

Sempre `<Logo />` (`src/components/ui/Logo/index.tsx`), nunca `<img src="/img/logos/logo.png">`.
O componente já trata proporção (868×250), link para a home e `aria-label`.

## Relacionados

[[acessibilidade]] · [[performance-e-web-vitals]] · [[imagens-e-midia]] · [[00-mapa]]
