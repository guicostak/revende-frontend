---
tags: [design, regra]
fonte: [refactoring-ui]
---

# Espaçamento e layout

## Escala

Só estes valores: **4, 8, 16, 24, 32, 48, 64px** → `1, 2, 4, 6, 8, 12, 16` no Tailwind.

`p-3`, `gap-5`, `mt-7` são exceções, não padrão. `p-[13px]` não existe.

## Espaço comunica relação

Elementos próximos são lidos como do mesmo grupo. Distantes, como grupos diferentes.

| Relação | Espaço | Classe |
| ------- | ------ | ------ |
| Ícone + rótulo | 4px | `gap-1` |
| Campo + label | 4–8px | `gap-1` |
| Itens de uma lista | 12–16px | `space-y-4` |
| Blocos dentro de um card | 24px | `gap-6` |
| Seções da página | 48–64px | `space-y-12` |

**O espaço entre grupos é maior que o espaço dentro do grupo.** Se os dois são iguais, o
usuário não enxerga a estrutura.

## Largura

Largura total quase nunca é o certo.

| Conteúdo | Largura |
| -------- | ------- |
| Página | `<Container>` (`max-w-page`, 72rem) |
| Formulário | `max-w-md` a `max-w-2xl` |
| Bloco de texto corrido | `max-w-prose` (~65 caracteres) |

Formulário largo faz o olho viajar do label até o campo. `/login` e `/cadastro` usam
`max-w-md`; `/anunciar` usa `max-w-2xl` porque tem grid de dois campos.

## Alinhamento

Texto à esquerda por padrão. Centralize só: hero, título curto, estado vazio, tela de
uma ação só.

Parágrafo centralizado obriga o olho a procurar o início de cada linha.

## Grid

```
grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3
```

Mobile-first: escreva o estado mobile sem prefixo e adicione `md:`/`lg:`. Ver
[[design-tokens]] para o mapeamento dos breakpoints antigos.

## Regras

- Espaçamento vertical entre irmãos: prefira `space-y-*` no pai a `mt-*` em cada filho.
- Nada de `<br>` para criar espaço.
- Em dúvida entre dois valores da escala, use o maior.
- A faixa central nunca é redigitada: `mx-auto max-w-page px-4` mora em `<Container>`.
  Bastava um dos três shells divergir para o logo sair do alinhamento dos cards.

## Relacionados

[[design-tokens]] · [[hierarquia-visual]] · [[tipografia]] · [[00-mapa]]
