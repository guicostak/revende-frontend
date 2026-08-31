---
tags: [negocio, hub]
tipo: moc
---

# Regras de negócio

Regras que **não** saem do código nem da API — vêm do modelo de negócio da Revende e
mandam em design, produto e backend ao mesmo tempo. Quando uma decisão de interface
conflitar com uma regra daqui, a regra ganha.

## Por que esta seção existe

A Revende não é a Sympla. Na Sympla quem vende é o produtor oficial do evento: a
plataforma empresta a própria reputação para a transação, e o comprador não precisa
avaliar o vendedor.

Aqui quem vende é uma pessoa desconhecida repassando um ingresso — o mercado com a pior
reputação prévia que existe no Brasil. O comprador chega **desconfiado por padrão**, e
com razão: cambista, ingresso falso, PIX e sumiço são a experiência de referência dele.

Isso muda o que o produto é. Não vendemos acesso a ingresso — o Google já faz isso.
Vendemos **confiança de que a transação vai dar certo**. Todo o resto é consequência.

## As regras

| # | Regra | Nota |
| - | ----- | ---- |
| 1 | Todo anúncio expõe sinal de confiança do vendedor | [[confianca-do-vendedor]] |
| 2 | Todo custo aparece antes do checkout | [[transparencia-de-preco]] |
| 3 | Urgência só com fato verificável | [[urgencia-honesta]] |

## Consequência prática

Cada uma dessas regras tem contrapartida no backend. São conversas de API, não de CSS —
e é por isso que estão documentadas aqui e não só em `docs/design/`.

## Relacionados

[[referencias-de-marketplace]] · [[principios-de-design]] · [[00-mapa]]
