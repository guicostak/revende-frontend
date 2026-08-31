---
tags: [negocio, regra, design]
---

# Transparência de preço

**Regra: todo custo que o comprador vai pagar aparece na primeira tela em que o preço
aparece. Nenhum valor surge só no checkout.**

## Por quê

Sympla escreve `R$ 607,00 (+78,91 taxa)` em cada lote e ainda linka "Entenda nossa taxa" —
numa plataforma onde a marca já é confiável. Numa revenda C2C, custo que aparece no fim
não é otimização de funil: é a confirmação do que o comprador já suspeitava.

Custo escondido também é [[heuristicas-ux|dark pattern]] pelos nossos próprios princípios.

## O que precisa estar visível

- Preço do ingresso
- Taxa de serviço da Revende, discriminada
- Total que sai da conta do comprador

E, quando existirem: parcelamento e a política de reembolso, com link.

## O bloco de preço

A convenção que o brasileiro já lê (Mercado Livre) é de cima para baixo:

```
R$ 650,00          original — pequeno, muted, riscado
R$ 480,00  -26%    atual — o maior número da linha; desconto em destaque
+ R$ 38,40 de taxa discriminado, na mesma leitura
```

Original **acima** do atual, não abaixo: o olho lê de cima para baixo e a última coisa
que fica é o que se paga. Ver [[hierarquia-visual]].

## Contrapartida no backend

A taxa precisa vir do servidor, não ser constante no frontend — ela muda por categoria,
por promoção e por regra fiscal, e frontend e cobrança divergindo é problema jurídico,
não bug visual.

```
serviceFee: number
totalPrice: number
```

## Consequência em SEO

`Offer` no JSON-LD tem que declarar o preço que o usuário realmente paga. Schema com
preço sem taxa é divergência entre schema e página — motivo de penalidade manual. Ver
[[dados-estruturados]].

## Estado atual

⚠️ Bloqueado: não existe modelo de taxa.

Já feito: `<Price>` (`components/ui/Price`) implementa a hierarquia correta — original
riscado acima, atual grande abaixo, `% OFF` em `success`. A taxa entra logo abaixo do
preço atual, dentro do mesmo componente, quando o campo existir.

## Relacionados

[[regras-de-negocio]] · [[hierarquia-visual]] · [[dados-estruturados]] ·
[[referencias-de-marketplace]] · [[00-mapa]]
