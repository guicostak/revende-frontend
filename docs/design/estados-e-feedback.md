---
tags: [design, regra]
fonte: [ux-heuristics, microinteractions]
---

# Estados e feedback

Toda tela que busca dados tem **quatro** estados. Faltou um, a tela está incompleta.

| Estado | Componente | Quando |
| ------ | ---------- | ------ |
| Carregando | `<PageLoader />` | requisição em voo |
| Erro | `<Alert>{error}</Alert>` | requisição falhou |
| Vazio | `<EmptyState />` | sucesso, zero resultados |
| Com conteúdo | a lista | sucesso, ≥1 resultado |

Vazio e erro são coisas diferentes. "Nenhum ingresso encontrado" ≠ "a API caiu".
Trocar um pelo outro faz o usuário achar que o produto não tem conteúdo.

## Visibilidade do estado do sistema

O usuário nunca deve se perguntar "clicou?". Toda ação assíncrona:

1. Desabilita o gatilho enquanto roda (`disabled={submitting}`)
2. Troca o rótulo para o gerúndio ("Publicando...")
3. Termina em resultado visível — navegação, lista atualizada ou mensagem

`useMeusAnunciosHook` guarda `pendingId` justamente para desabilitar só a linha em ação,
não a página inteira.

## Mensagem de erro

Formato: **o que aconteceu + o que fazer**.

| Ruim | Bom |
| ---- | --- |
| "Erro 400" | "E-mail ou senha incorretos." |
| "Validation error" | "A senha precisa ter ao menos 6 caracteres." |
| "Failed to fetch" | "Não foi possível carregar os anúncios. Verifique sua conexão." |

Nunca mostre stack trace nem nome de campo da API. `toErrorMessage(err, 'fallback')`
sempre recebe um fallback em português.

## Estado vazio é oportunidade

Estado vazio tem título, uma linha de explicação e **uma ação**. "Você ainda não tem
anúncios" + botão "Anunciar ingresso" — não um parágrafo triste sozinho.

## Estados de controle

Todo elemento interativo precisa de `default`, `hover`, `focus-visible`, `active`,
`disabled` visualmente distintos. `:focus-visible` global já está em `globals.css`;
não o remova. Ver [[acessibilidade]].

## Relacionados

[[microinteracoes]] · [[heuristicas-ux]] · [[copy-de-interface]] · [[hooks]] · [[00-mapa]]
