---
tags: [mapa, hub]
tipo: moc
---

# Rede Revende — mapa

Ponto de entrada da base de conhecimento do frontend da **Revende**. Cada nota é uma
regra ou um princípio aplicável a este repositório, não teoria solta: os exemplos
apontam para arquivos reais em `src/`.

> Regras operacionais do dia a dia (comandos, estrutura de pastas, camadas) vivem em
> `CLAUDE.md`, na raiz. Esta rede é o aprofundamento: o *porquê* por trás de cada regra.

## Comece por aqui

[[regras-de-negocio]] — o que a Revende vende de verdade. Toda decisão de design e de API
desce daí, e uma regra de negócio ganha de uma preferência visual.

## Como usar

1. Antes de **criar uma tela**, leia [[principios-de-design]] e [[heuristicas-ux]].
   Para telas de vitrine, oferta ou preço, leia também [[referencias-de-marketplace]] e
   [[regras-de-negocio]].
2. Antes de **criar uma rota**, leia [[principios-de-seo]] e [[arquitetura-de-informacao]].
3. Antes de **criar um componente ou hook**, leia [[camadas]] e [[componentes]].
4. Antes de **fechar uma tarefa**, rode o [[checklist-seo]] e o [[checklist-de-design]].

## Negócio

- [[regras-de-negocio]] — hub: por que a Revende não é a Sympla
- [[confianca-do-vendedor]] — em C2C, reputação é metade do produto
- [[transparencia-de-preco]] — todo custo antes do checkout
- [[urgencia-honesta]] — escassez só com fato verificável

## Arquitetura

- [[camadas]] — a direção da dependência e por que ela não se inverte
- [[services-e-http]] — o único lugar que fala com a API
- [[hooks]] — onde a lógica mora
- [[componentes]] — design system vs. componente de domínio
- [[estado-e-autenticacao]] — sessão, storage e rotas protegidas
- [[rotas-e-navegacao]] — App Router, Server vs. Client
- [[convencoes-de-codigo]] — nomes, imports, tipos, idioma

## Design

- [[principios-de-design]] — hub das regras visuais
- [[design-tokens]] · [[hierarquia-visual]] · [[espacamento-e-layout]] · [[cor]]
- [[tipografia]] · [[profundidade-e-sombras]] · [[imagens-e-icones]]
- [[estados-e-feedback]] · [[microinteracoes]] · [[acessibilidade]]
- [[heuristicas-ux]] · [[copy-de-interface]] · [[referencias-de-marketplace]]
- [[checklist-de-design]]

## SEO

- [[principios-de-seo]] — hub das regras de busca
- [[metadata-e-titles]] · [[estrutura-semantica]] · [[dados-estruturados]]
- [[arquitetura-de-informacao]] · [[indexacao-e-crawl]] · [[imagens-e-midia]]
- [[performance-e-web-vitals]] · [[ai-seo]] · [[copy-de-interface]]
- [[checklist-seo]]

## Fontes

- [[skills-de-referencia]] — de qual skill externa cada regra veio

## Convenções desta rede

- Nome de arquivo em `kebab-case`, sem acento. Título e conteúdo em português.
- Toda nota termina com **Relacionados** e pelo menos um wikilink.
- Toda regra é acionável: se não dá para verificar em um PR, não é regra — é opinião.
- Regra que ainda não está implementada no código fica marcada como `⚠️ pendente`.
