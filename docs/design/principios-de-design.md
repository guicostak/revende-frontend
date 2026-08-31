---
tags: [design, hub]
tipo: moc
fonte: [refactoring-ui, top-design, design-everyday-things]
---

# Princípios de design

Hub das regras visuais da Revende. Baseado em *Refactoring UI* (Wathan & Schoger),
adaptado aos tokens deste projeto.

## As cinco leis

### 1. Desenhe em escala de cinza primeiro

Se a tela só funciona quando você pinta de vermelho, a hierarquia está errada. Cor é a
última camada, não a estrutura. Ver [[hierarquia-visual]] e [[cor]].

### 2. Nada de valor arbitrário

`padding: 13px` não existe. Só o que está nos tokens: espaçamento na escala 4/8/16/24/32/48/64,
raio `rounded-brand` ou `rounded-full`, sombra `shadow-soft` ou `shadow-card`, cor da paleta
`brand`/`ink`/`muted`/`surface`. Ver [[design-tokens]] e [[espacamento-e-layout]].

### 3. Comece com espaço demais e tire depois

Praticamente nenhum layout erra por ter espaço em excesso. Quase todos erram por
aperto. Ver [[espacamento-e-layout]].

### 4. Nem tudo pode ser importante

Hierarquia vem de três alavancas — tamanho, peso e cor. Combine duas; guarde as três
para o elemento mais importante da página. Ver [[hierarquia-visual]].

### 5. Detalhe é o último passo

Sombra, ícone e animação não salvam um layout errado. Resolva estrutura, espaço e
hierarquia antes. Ver [[microinteracoes]].

## Notas desta seção

| Nota | Sobre |
| ---- | ----- |
| [[design-tokens]] | os valores permitidos e onde eles moram |
| [[hierarquia-visual]] | tamanho, peso, cor |
| [[espacamento-e-layout]] | escala, agrupamento, largura de conteúdo |
| [[cor]] | paleta da marca, contraste, semântica |
| [[tipografia]] | escala, entrelinha, medida |
| [[profundidade-e-sombras]] | elevação |
| [[imagens-e-icones]] | proporção, `object-fit`, tamanho de ícone |
| [[estados-e-feedback]] | loading, erro, vazio, desabilitado |
| [[microinteracoes]] | gatilho, regra, feedback |
| [[acessibilidade]] | contraste, foco, teclado, leitor de tela |
| [[heuristicas-ux]] | usabilidade e carga cognitiva |
| [[copy-de-interface]] | texto como parte da interface |
| [[referencias-de-marketplace]] | convenções de Sympla, OLX e Mercado Livre |
| [[checklist-de-design]] | o que verificar antes de fechar |

## Teste do olho semicerrado

Semicerre os olhos na tela. A hierarquia ainda aparece? Se tudo vira uma mancha
uniforme, o contraste entre primário e secundário está fraco.

## Relacionados

[[00-mapa]] · [[checklist-de-design]] · [[principios-de-seo]]
