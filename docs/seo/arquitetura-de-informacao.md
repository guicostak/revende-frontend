---
tags: [seo, ux, regra]
fonte: [site-architecture, ux-heuristics]
---

# Arquitetura de informação

## Regra dos 3 cliques

Toda página importante a no máximo 3 cliques da home. Hoje o site é raso — tudo está a 1
clique — e isso é uma vantagem que se perde fácil ao crescer.

```
/                                    L0
├── /evento/[id]                     L1
├── /login · /cadastro               L1
├── /anunciar                        L1  (protegida)
└── /meus-anuncios                   L1  (protegida)
```

## Raso enquanto der

Vá o mais plano possível sem sujar a navegação. Só adicione um nível quando uma listagem
passar de ~20 itens ou quando surgir uma intenção de busca própria.

Quando o catálogo crescer, os níveis naturais são:

```
/eventos/[cidade]              → "ingressos em Curitiba"
/eventos/[categoria]           → "ingressos de festival"
/evento/[id]                   → o evento específico
```

Cada um desses só existe se tiver **conteúdo próprio e busca própria**. Página de
categoria vazia é conteúdo raso — atrapalha em vez de ajudar.

## Sem página órfã

Toda página precisa de pelo menos um link interno apontando para ela. Página que só o
sitemap conhece quase não é rastreada.

Hoje `/evento/[id]` é alcançada pelos cards da home. Se a home passar a paginar, os
eventos fora da primeira página ficam órfãos — aí a listagem por cidade/categoria deixa
de ser opcional.

## Link interno

- Texto descritivo, ver [[estrutura-semantica]].
- Link de página forte para página que precisa de força. A home é a página mais forte:
  o que ela linka, ganha.
- Não encha o rodapé de links — dilui todos.

## Implementado

Breadcrumb em `/evento/[id]` (`Início › <evento>`) pelo componente `<Breadcrumb>`, sempre
pareado com `breadcrumbJsonLd` — ver [[dados-estruturados]].

`app/not-found.tsx` com link de volta para a home, devolvendo HTTP 404 real.

## Relacionados

[[rotas-e-navegacao]] · [[estrutura-semantica]] · [[indexacao-e-crawl]] · [[heuristicas-ux]] · [[00-mapa]]
