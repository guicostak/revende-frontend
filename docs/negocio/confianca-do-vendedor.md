---
tags: [negocio, regra, design]
---

# Confiança do vendedor

**Regra: em toda superfície onde um anúncio aparece, o vendedor aparece com sinal de
confiança junto. Nome sozinho não é sinal.**

## Por quê

Levantamento em [[referencias-de-marketplace]]: OLX e Mercado Livre colocam nome + nota +
volume de vendas **no card, antes do clique**. Sympla e Ingresso.com não precisam — quem
vende lá é o produtor oficial.

A Revende é C2C. Sem sinal de confiança, o comprador só tem o preço para decidir — e num
mercado onde ele espera ser passado para trás, preço baixo sem reputação lê como golpe,
não como oportunidade. O desconto **piora** a conversão em vez de melhorar.

## O que conta como sinal

Em ordem de força:

1. **Nota do vendedor** (média de avaliações após a transação)
2. **Vendas concluídas** ("+12 vendas") — volume vale mais que nota isolada
3. **Tempo de conta** ("na Revende desde 2025")
4. **Selo da plataforma** — garantia de reembolso, ingresso verificado. É o mais forte de
   todos porque transfere o risco do vendedor desconhecido para a marca.

## Contrapartida no backend

`ListingDto` precisa carregar, junto de `sellerId` e `sellerName`:

```
sellerRating: number | null      // null = vendedor novo, exibir "primeira venda"
sellerSalesCount: number
sellerSince: string              // ISO
```

Vendedor sem histórico não pode ficar sem tratamento: "primeira venda" honesto é melhor
que espaço vazio, que o comprador preenche com desconfiança.

## Regra de acessibilidade que vem junto

Nota nunca é só estrela ou só número colorido. O Mercado Livre acerta isso: ao lado do
compacto `4.9` existe o texto completo "Classificação 4.9 de 5 estrelas. Mais de 1000
produtos vendidos" para leitor de tela. Ver [[acessibilidade]].

## Estado atual

⚠️ Bloqueado pelos campos da API.

Já feito: o vendedor saiu da linha de metadados e ganhou linha própria com nome em
`font-semibold text-ink` ("Vendido por **Maria Souza**"). O slot do sinal de confiança
está reservado ao lado do nome — quando `sellerRating` existir, entra ali sem
reorganizar o card.

## Relacionados

[[regras-de-negocio]] · [[referencias-de-marketplace]] · [[hierarquia-visual]] ·
[[acessibilidade]] · [[00-mapa]]
