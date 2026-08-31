---
tags: [design, regra]
fonte: [web-typography, refactoring-ui]
---

# Tipografia

Uma família só: `Arial, Helvetica, sans-serif` (o `mainFont` herdado). Hierarquia vem de
tamanho e peso, não de fonte nova.

## Escala

| Papel | Classe | Peso | Entrelinha |
| ----- | ------ | ---- | ---------- |
| Hero | `text-display` | 800 (no token) | 1.1 (no token) |
| Título de página | `text-2xl` | `font-bold` | padrão |
| Título de seção | `text-xl` | `font-bold` | padrão |
| Título de card | `text-base` | `font-bold` | padrão |
| Corpo | `text-base` | `font-normal` | `leading-relaxed` |
| Secundário | `text-sm` | `font-normal` | padrão |
| Metadado / label | `text-xs` | `font-semibold` | padrão |

`text-display` é fluido (`clamp`): cresce de 30px a 40px entre 375px e 1024px de tela.
Por isso **não** recebe `md:`/`lg:` — o degrau é contínuo.

Na prática você não digita nenhuma dessas classes: use `<Heading>`, que amarra tag
semântica e tamanho visual. Ver `DESIGN_SYSTEM.md` §3.

## Regras

- Corpo nunca abaixo de 16px (`text-base`). `text-sm` é para apoio, não para leitura.
- Título tem entrelinha apertada (1.1–1.25); texto corrido, folgada (1.5–1.75).
- Linha de texto entre 45 e 75 caracteres. Bloco corrido leva `max-w-prose`.
- Peso mínimo 400. Nada de `font-light` em corpo.
- `font-bold` é ênfase, não decoração. Se metade do parágrafo está em bold, nada está.

## Hierarquia de heading é semântica, não visual

`<h1>` … `<h6>` definem a estrutura do documento — não escolha a tag pelo tamanho que
ela renderiza. Um `<h2>` que precisa parecer pequeno recebe `text-sm`; ele continua
sendo `<h2>`.

Isso não é detalhe de estilo: é o que leitor de tela e buscador usam para entender a
página. Ver [[estrutura-semantica]] e [[acessibilidade]].

## Relacionados

[[hierarquia-visual]] · [[estrutura-semantica]] · [[acessibilidade]] · [[00-mapa]]
