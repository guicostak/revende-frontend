---
tags: [design, regra]
fonte: [refactoring-ui]
---

# Profundidade e sombras

Sombra comunica **elevação**: o quanto o elemento está acima da página.

| Elemento | Token | Leitura |
| -------- | ----- | ------- |
| Card, item de lista | `shadow-soft` | apoiado na página |
| Card em hover, hero, popover | `shadow-card` | levantado |
| Fundo, seção | nenhuma | é a página |

## Regras

- Se tudo flutua, nada tem profundidade. A maior parte da tela não tem sombra.
- Sombra é preto transparente, nunca cinza opaco — cinza opaco vira mancha sobre fundo
  colorido.
- Alternativa sem sombra: borda `border-line` + mudança de fundo (`surface` sobre
  `surface-muted/40`). É o que separa a maioria dos blocos aqui.
- Sombra não substitui espaço. Card apertado com sombra continua apertado.

## Hover que levanta

`ListingCard` usa `hover:-translate-y-1 hover:shadow-card`: o card sobe um pouco e a
sombra cresce junto. Os dois têm que andar juntos — subir sem crescer a sombra parece
bug de render.

Transição de 150–250ms. Acima disso o card parece pesado. Ver [[microinteracoes]].

## Relacionados

[[design-tokens]] · [[microinteracoes]] · [[espacamento-e-layout]] · [[00-mapa]]
