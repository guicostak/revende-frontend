---
tags: [design, ux, regra]
fonte: [ux-heuristics, design-everyday-things, page-cro]
---

# Heurísticas de UX

Princípio central: **não me faça pensar**. Cada interrogação na cabeça do usuário é
carga cognitiva e chance de abandono.

Usuários não leem — escaneiam. Não escolhem o ótimo — escolhem o primeiro que serve.
Não entendem o sistema — se viram.

## As três leis

### 1. Todo elemento deve ser auto-evidente

Nome claro vence nome esperto, sempre.

| Ruim | Bom |
| ---- | --- |
| "Acessar sua conta" | "Entrar" |
| "Publicar oferta de repasse" | "Anunciar ingresso" |
| "Erro de validação" | "A senha precisa ter ao menos 6 caracteres" |

Se o rótulo precisa de explicação, o problema é o rótulo.

### 2. Número de cliques importa menos que a clareza de cada clique

Três cliques óbvios batem um clique confuso. O usuário abandona quando fica em dúvida,
não quando clica demais. Cada passo precisa ser rápido, óbvio e aumentar a confiança de
que está no caminho certo.

### 3. Corte metade das palavras — depois corte metade do que sobrou

- "Bem-vindo ao nosso site!" → apague
- "Por favor, note que é necessário..." → "Digite sua senha para continuar."
- Instrução que ninguém lê → apague

Ver [[copy-de-interface]].

## Heurísticas de Nielsen aplicadas aqui

| Heurística | Como aparece |
| ---------- | ------------ |
| Visibilidade do estado | loading, "Publicando...", `pendingId` — ver [[estados-e-feedback]] |
| Linguagem do usuário | "ingresso", "anúncio", "evento" — nunca "listing", "DTO" |
| Controle e liberdade | "← voltar" na página do evento; Cancelar em toda ação |
| Consistência | mesmo botão, mesmo card, mesmo espaçamento em todas as telas |
| Prevenção de erro | `min`, `required`, `type` corretos — ver [[microinteracoes]] |
| Reconhecer > lembrar | select de eventos existentes em vez de digitar o ID |
| Ajudar a se recuperar | mensagem diz o que fazer, não só o que falhou |

## Onde estou?

Toda página responde três perguntas sem esforço: onde estou, o que posso fazer aqui,
como volto. Navbar fixa + `<PageHeader>` com título + link de volta.

`/evento/[id]` tem breadcrumb (`Início › <evento>`). Ver [[arquitetura-de-informacao]].

## Custo de abandono

O caminho crítico do produto é **buscar → ver evento → comprar** e **anunciar**. Fricção
nesses fluxos custa receita; fricção no resto custa pouco. Priorize nessa ordem.

## Relacionados

[[copy-de-interface]] · [[estados-e-feedback]] · [[acessibilidade]] · [[arquitetura-de-informacao]] · [[00-mapa]]
