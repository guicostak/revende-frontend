---
tags: [negocio, regra, design]
---

# Urgência honesta

**Regra: todo sinal de escassez ou urgência corresponde a um fato verificável no banco.
Nada é fabricado para pressionar.**

## Por quê

Os sinais que funcionam nas referências são todos fatos: `[ÚLTIMO LOTE]` e
`Vendas até 03/09/2026` (Sympla), `Hoje, 08:35` e `+1000 vendidos` (OLX e Mercado Livre).

"3 pessoas vendo agora" sem lastro e contador que reinicia ao recarregar são o oposto: um
comprador desconfiado testa, percebe, e leva a desconfiança para a transação inteira.
Numa plataforma que **vende confiança**, urgência falsa não é agressiva — é suicida.

## Fatos disponíveis hoje

Sem depender de nenhum campo novo:

| Fato | Fonte | Como aparece |
| ---- | ----- | ------------ |
| Resta 1 ingresso no anúncio | `listing.quantity` | "Último ingresso" |
| Evento está próximo | `event.date` | "Amanhã", "Faltam 3 dias" |
| Desconto real | `originalPrice` vs `price` | "-26%" |

## Fatos que dependem do backend

- Recência do anúncio ("publicado hoje") → precisa de `createdAt` em `ListingDto`
- Quantos anúncios restam para o evento → já dá para derivar da lista
- Visualizações reais → só se forem contadas de verdade

## Limite

Urgência entra como **informação**, não como grito. Sem contagem regressiva piscando, sem
vermelho de alerta em anúncio normal — vermelho é a marca, e confundir marca com alarme
custa os dois. Ver [[cor]].

## Estado atual

Implementado com os fatos que já temos: "Último ingresso" quando `quantity === 1` e selo
de proximidade quando o evento está a 7 dias ou menos.

## Relacionados

[[regras-de-negocio]] · [[referencias-de-marketplace]] · [[cor]] · [[copy-de-interface]] · [[00-mapa]]
