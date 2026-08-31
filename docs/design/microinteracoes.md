---
tags: [design, regra]
fonte: [microinteractions, refactoring-ui]
---

# Microinterações

Toda microinteração tem quatro partes: **gatilho → regra → feedback → fim**.

## Gatilho

Precisa comunicar três coisas: que existe, o que faz e em que estado está.

- Nada de gesto ou hover como único caminho — no toque não existe hover.
- Alvo de toque mínimo de 44×44px. `size="sm"` (32px de altura) só em desktop ou com
  padding extra ao redor.

## Regra

O que pode e o que não pode. Sempre restrinja na entrada, não só na validação:
`type="number"` com `min={1}`, `maxLength`, `required`. Erro que não pode acontecer é
melhor que erro bem explicado.

Trate a borda: zero, máximo, clique repetido, submit duplo. `disabled={submitting}`
existe para o clique duplo.

## Feedback

- Resposta a toque direto: **abaixo de 100ms**. Hover e cor de foco são CSS, nunca JS.
- Use o menor feedback que comunique. Uma mudança de cor antes de um modal.
- Feedback aparece **onde a ação aconteceu**, não num toast no canto oposto.

## Movimento

| Duração | Uso |
| ------- | --- |
| 100–150ms | hover, foco, mudança de cor |
| 200–300ms | card levantando, painel abrindo |
| >400ms | praticamente nunca |

- Anime só `transform` e `opacity` — são as duas propriedades que o browser resolve na
  GPU. Animar `width`, `height` ou `top` força layout a cada frame.
- `transition-colors` em vez de `transition-all`: `transition-all` anima coisas que você
  não pediu e custa caro.
- Movimento tem que ser interrompível. Nada bloqueia a próxima ação do usuário.

## Regras neste projeto

- Botão: `transition-colors duration-200`.
- Card: `hover:-translate-y-1 hover:shadow-card`.
- Nada pisca, gira ou pula sem o usuário ter pedido.

`prefers-reduced-motion` é respeitado em `globals.css`: quem pede menos movimento perde
deslocamento e escala, mas continua vendo mudança de cor e de estado — o feedback
sobrevive, só o desconforto vestibular some.

Componente que se desloca no hover leva a classe `motion-lift` para entrar nessa regra.
É o caso do `ListingCard`.

## Relacionados

[[estados-e-feedback]] · [[profundidade-e-sombras]] · [[acessibilidade]] · [[performance-e-web-vitals]] · [[00-mapa]]
