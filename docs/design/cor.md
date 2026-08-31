---
tags: [design, regra, acessibilidade]
fonte: [refactoring-ui]
---

# Cor

## Paleta

Só existem quatro famílias: `brand` (50–900), neutros (`ink`, `muted`, `surface`,
`surface-muted`, `line`), semânticos (`success`, `danger`, `warning`) e branco.

Ver [[design-tokens]] para os valores.

## Onde cada uma entra

| Uso | Cor |
| --- | --- |
| Ação principal, link, destaque | `brand-500` |
| Hover / pressed do primário | `brand-600` |
| Fundo sutil de destaque | `brand-50` ou `selected` |
| Texto principal | `ink` |
| Texto secundário | `muted` |
| Fundo de página | `surface-muted/40` |
| Fundo de card | `surface` |
| Borda | `line` |

## Regras

- **Cor sozinha nunca carrega informação.** Status de anúncio tem cor *e* texto
  (`ATIVO`/`VENDIDO`/`CANCELADO`), nunca só um ponto colorido. Isso é acessibilidade
  para daltônicos, não preferência estética.
- Contraste mínimo: 4.5:1 em texto normal, 3:1 em texto ≥18px e em elementos de
  interface. `muted` (`#575555`) sobre branco dá ~7:1 — seguro. `brand-500` sobre branco
  dá ~4.6:1: serve para texto, não para texto pequeno em cima de `brand-50`.
- Não use preto puro. O mais escuro da paleta é `ink` (`#2b2a2a`).
- Vermelho de erro é `danger`, não `brand-500`. A marca é vermelha; se erro também for,
  o usuário não distingue alerta de identidade.

## O conflito da marca

`brand-500` é vermelho e `danger` é vermelho. Para não confundir:

- Erro sempre vem com ícone/texto e fundo `danger/10`, nunca só cor de texto.
- Botão destrutivo usa `variant="danger"`; botão de marca usa `primary`.
- Em dúvida numa ação reversível, prefira `secondary` — ver [[hierarquia-visual]].

## Relacionados

[[design-tokens]] · [[acessibilidade]] · [[hierarquia-visual]] · [[estados-e-feedback]] · [[00-mapa]]
