---
tags: [design, seo, copy, regra]
fonte: [ux-heuristics, copywriting, page-cro]
---

# Copy de interface

Texto é interface. É a parte que o usuário mais lê e a que o buscador mais entende.

## Voz

Português do Brasil, segunda pessoa direta ("você"), tom direto sem ser seco.
Sem "nós da Revende", sem exclamação, sem emoji em texto de sistema.

## Botão diz o resultado, não o mecanismo

| Fraco | Forte |
| ----- | ----- |
| "Enviar" | "Publicar anúncio" |
| "OK" | "Marcar vendido" |
| "Saiba mais" | "Ver oferta" |

Verbo + substantivo. O usuário deve saber o que acontece antes de clicar.

## Título de página

Diz o que a página **é**, não dá boas-vindas. "Meus anúncios", não "Sua área".
O `<h1>` da página é também o sinal mais forte de tema para busca — ver
[[metadata-e-titles]] e [[estrutura-semantica]].

## Vocabulário fixo

Uma coisa, um nome, em toda a aplicação:

| Conceito | Termo | Nunca |
| -------- | ----- | ----- |
| Item à venda | **anúncio** | listing, oferta, post |
| Show/festival | **evento** | atração, festa |
| Papel de ingresso | **inteira / meia-entrada / VIP / backstage** | tipo 1, INTEIRA cru |
| Entrar | **entrar** | logar, acessar, autenticar |

Rótulo de domínio vem de `common/constants/listing.ts`. Não escreva o texto solto no JSX
— senão o mesmo conceito ganha três nomes.

## Erro

Formato: o que aconteceu + o que fazer. Ver [[estados-e-feedback]].

## Corte

Escreva, depois corte metade. "Comece a comprar e revender ingressos em minutos." é uma
frase de apoio — não vira parágrafo.

## Copy e busca

Texto de interface é o conteúdo indexável destas páginas. Escreva a palavra que o
usuário busca — "ingresso", "revenda", "evento", o nome da cidade — de forma natural no
`<h1>` e no primeiro parágrafo. Não repita a palavra até doer: leia em voz alta; se soar
forçado, o Google também acha.

## Relacionados

[[heuristicas-ux]] · [[metadata-e-titles]] · [[estados-e-feedback]] · [[ai-seo]] · [[00-mapa]]
