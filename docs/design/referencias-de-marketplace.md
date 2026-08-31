---
tags: [design, pesquisa, referencia]
fonte: [sympla, ingresso.com, olx, mercado-livre]
data: 2026-08-27
---

# Referências de marketplace

Levantamento de campo em **Sympla**, **Ingresso.com**, **OLX** e **Mercado Livre** para
servir de contexto criativo. Não é para copiar tela — é para entender que convenções o
usuário brasileiro já traz na cabeça quando chega na Revende.

Os dois primeiros são venda **primária** de ingresso (o produtor vende). Os dois últimos
são **C2C** — pessoa vendendo para pessoa. A Revende é o cruzamento dos dois: ingresso de
evento, vendido por gente comum. Por isso as lições vêm em dose dupla e às vezes brigam.

## O que cada um faz

### Sympla — a gramática do ingresso

**Home**: o hero é só busca + filtro de lugar. Nada de manifesto. Abaixo, trilhos de
eventos com títulos que são *intenções*, não categorias: "Ingressos até 50% OFF",
"Eventos mais comprados nas últimas 24h", "Encontre o que fazer no fim de semana",
"Vistos recentemente". Chips de coleção: Teatros, Festas e Shows, Stand Up, Infantil.

**Página do evento** — o template mais relevante para nós:

- Faixa escura no topo com a arte do evento à direita e a informação à esquerda
- `<h1>` do evento, depois data com ícone, depois local com ícone (casa de show + cidade/UF)
- Badge **"Parcele em até 12x"** logo abaixo do local, antes de qualquer preço
- Botão **Compartilhar** sobre a imagem
- Duas colunas: descrição à esquerda, **seletor de ingresso fixo (sticky) à direita**
- Cada lote no seletor: tag de escassez `[ÚLTIMO LOTE]`, nome, `R$ 607,00 (+78,91 taxa)`,
  `em até 12x R$ 70,94`, `Vendas até 03/09/2026`, stepper de quantidade
- Link **"Entenda nossa taxa"**, campo de cupom, e o CTA nasce desabilitado:
  **"Selecione um Ingresso"**
- `<title>`: `Festival HackTown 2026 em Santa Rita do Sapucaí - Sympla`

### Ingresso.com — densidade e catálogo

Tema escuro. Card enxuto: badge de tipo (`CINEMA`, `PRÉ-VENDA`), título, classificação
etária, duração, gêneros. Trilho "Em Alta". A informação do card é toda **filtro
mental**: em 3 segundos você sabe se é para você.

### OLX — confiança em primeiro plano

Cabeçalho de resultado que se explica: `"ingresso" no Brasil` · `1 - 50 de 103 resultados`
· ordenação `Mais Relevantes` · filtros na lateral.

O card de anúncio C2C, em ordem:

1. Título
2. Selo de garantia da plataforma (`Entrega Fácil`)
3. **Nome do vendedor + nota (`Coast  4.9`)**
4. Preço grande
5. Parcelamento (`em até 1x de R$ 25,00 sem juros`)
6. **Cidade - UF**
7. **Recência (`Hoje, 08:35`)**
8. Favoritar

### Mercado Livre — o bloco de preço canônico

```
R$ 3.449          ← original, pequeno, riscado, muted
R$ 2.199   36% OFF ← atual, enorme; desconto em verde
no Pix
ou R$ 2.444 em 10x R$ 244,40 sem juros
R$ 20 OFF com Cupom
Frete grátis       ← verde
```

Vendedor: `LG · 4.9 | +1000 vendidos`. E o detalhe que vale roubar: ao lado do compacto
`4.9` existe o texto completo **"Classificação 4.9 de 5 estrelas. Mais de 1000 produtos
vendidos"** para leitor de tela. É [[acessibilidade|cor e ícone nunca sozinhos]] aplicado
a um rating.

Filtros trazem **contagem por faceta**: `Oferta relâmpago (1414)`, `Até R$55 (4045)`.
Ninguém clica num filtro para descobrir que ele dá zero.

---

## Os dez princípios

### 1. Preço é o herói; a economia é o argumento

Todo mundo usa o mesmo bloco de três linhas: original riscado pequeno, atual enorme,
percentual em destaque. Numa plataforma de revenda o desconto **é** a proposta de valor —
ele merece o mesmo peso que o preço.

Na Revende: já temos `discountPercent` e o badge `-26%`. Falta o mesmo tratamento na
`ListingRow`, onde hoje o desconto aparece só como preço riscado discreto.

### 2. Taxa explícita, sempre antes do checkout

Sympla escreve `(+78,91 taxa)` ao lado de cada preço e ainda linka "Entenda nossa taxa".

Em revenda, taxa escondida é o principal destruidor de confiança — o comprador já chega
desconfiado de estar sendo passado para trás. Custo que aparece só no fim é
[[heuristicas-ux|dark pattern]], não otimização.

**Regra**: qualquer taxa da Revende aparece na mesma linha do preço, na listagem e na
página do evento. Nunca só no checkout.

### 3. Em C2C, confiança no vendedor é metade do produto

OLX e ML colocam nome + nota + volume de vendas **no card**, antes do clique. Sympla não
precisa: quem vende é o produtor oficial.

A Revende é C2C e hoje mostra apenas `por Maria Souza`, sem nenhum sinal de confiança.
Esse é o maior buraco da interface atual — maior que qualquer ajuste visual.

O que falta, em ordem de impacto: nota do vendedor, número de vendas concluídas, tempo de
conta, e um selo de garantia da plataforma (o equivalente ao "Entrega Fácil" da OLX).

### 4. Escassez e recência — reais, nunca fabricadas

`[ÚLTIMO LOTE]`, `Vendas até 03/09/2026`, `Hoje, 08:35`, `+1000 vendidos`, `mais comprados
nas últimas 24h`.

Todos são **fatos verificáveis**, não pressão inventada. Contador falso e "3 pessoas vendo
agora" sem lastro queimam a confiança que a plataforma inteira depende.

Na Revende os fatos disponíveis já são bons: quantos ingressos restam no anúncio, quantos
dias faltam para o evento, quando o anúncio foi publicado.

### 5. Data e local são identidade, não detalhe

Sympla e OLX repetem cidade/UF e data em **todo** card, sem exceção. Ingresso de show é
decidido por três coisas: o que é, quando é, onde é. Esconder qualquer uma força o
usuário a clicar para descobrir que não servia.

Na Revende: `ListingCard` já traz `data · cidade`. Manter isso inviolável.

### 6. Estado do item nunca é ambíguo

Vendido, cancelado, esgotado, "seu anúncio" — cada um tem tratamento visual próprio e
texto. Botão desabilitado sem explicação é beco sem saída.

### 7. A ação de compra fica ancorada

O seletor de ingresso da Sympla é sticky na coluna direita: a página rola, a decisão
fica. No mobile, o padrão equivalente é a barra fixa no rodapé com preço + CTA.

Na Revende: a página do evento hoje tem um botão "Comprar" por anúncio, que sai de vista
ao rolar. Numa lista longa de ofertas isso custa conversão.

### 8. Categoria é porta de entrada, não enfeite

As "coleções" da Sympla são navegação **e** landing page de busca. Cada uma vira uma URL
que ranqueia por uma intenção própria.

Ligação direta com [[arquitetura-de-informacao]]: quando a Revende tiver catálogo,
`/eventos/[cidade]` e `/eventos/[categoria]` são as duas primeiras portas.

### 9. Filtro que mostra o resultado antes do clique

Contagem por faceta (ML) e total de resultados (OLX). O usuário só investe atenção num
filtro que promete alguma coisa.

### 10. O card tem anatomia fixa

Os quatro sites repetem os mesmos slots, na mesma ordem, em todo card. Consistência aqui
não é preguiça — é o que permite escanear cinquenta itens em dez segundos.

**Anatomia proposta para o card da Revende:**

```
[ imagem 16:9 ]  [tipo de ingresso]        [-26%]
CATEGORIA
Nome do evento
data · cidade
──────────────────────────────
2 ingressos          R$ 480,00
Maria Souza ⭐ 4.9    R$ 650,00 (riscado)
```

---

## Adotar, adaptar, rejeitar

| Padrão | Decisão | Por quê |
| ------ | ------- | ------- |
| Bloco de preço de 3 linhas (ML) | **Adotar** | é a convenção que o brasileiro já lê |
| Taxa explícita ao lado do preço (Sympla) | **Adotar** | confiança é o ativo de uma revenda |
| Nota e histórico do vendedor no card (OLX/ML) | **Adotar** | C2C sem sinal de confiança não converte |
| Recência do anúncio (OLX) | **Adotar** | ingresso é perecível; anúncio velho é suspeito |
| Trilhos por intenção na home (Sympla) | **Adaptar** | só quando houver catálogo — trilho vazio é pior que nenhum |
| Seletor sticky de ingresso (Sympla) | **Adaptar** | aqui são ofertas de vendedores diferentes, não lotes do mesmo produtor |
| Parcelamento em destaque | **Adaptar** | só quando o checkout existir de verdade |
| Tema escuro (Ingresso.com) | **Rejeitar** | nossa marca é vermelha sobre branco; ver [[cor]] |
| Publicidade e patrocinado no meio dos resultados | **Rejeitar** | mistura anúncio pago com oferta real e corrói a confiança |
| Contadores de urgência sem lastro | **Rejeitar** | ver princípio 4 |

## Isto virou regra de negócio

Os princípios 2, 3 e 4 não são preferência visual — são o modelo de negócio. Foram
promovidos para `docs/negocio/`:

- [[confianca-do-vendedor]] (princípio 3)
- [[transparencia-de-preco]] (princípios 1 e 2)
- [[urgencia-honesta]] (princípio 4)

## O que já foi aplicado

- **Bloco de preço** no padrão Mercado Livre: original riscado em cima, atual grande
  embaixo, `% OFF` em destaque. Componente `<Price>`, usado no card e na linha.
- **Escassez real**: "Último ingresso" quando `quantity === 1`.
- **Proximidade real**: selo "Hoje" / "Amanhã" / "Faltam N dias" quando o evento está a
  7 dias ou menos.
- **Vendedor com peso próprio** ("Vendido por **Maria Souza**") em vez de diluído na
  linha de metadados — o lugar do sinal de confiança já está reservado.

## O que continua bloqueado

Depende de campo que a API ainda não devolve:

1. ⚠️ Nota e histórico do vendedor → `sellerRating`, `sellerSalesCount`, `sellerSince`
2. ⚠️ Taxa da plataforma junto do preço → `serviceFee`, `totalPrice`
3. ⚠️ Recência do anúncio ("publicado há 2 dias") → `createdAt`

E, sem depender de backend: barra fixa de compra no mobile na página do evento.

## Relacionados

[[principios-de-design]] · [[hierarquia-visual]] · [[copy-de-interface]] ·
[[heuristicas-ux]] · [[arquitetura-de-informacao]] · [[acessibilidade]] · [[00-mapa]]
