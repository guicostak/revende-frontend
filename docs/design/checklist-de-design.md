---
tags: [design, checklist]
---

# Checklist de design

Rode antes de fechar qualquer tarefa que mexeu em interface.

## Tokens

- [ ] Nenhuma cor genérica do Tailwind (`gray-*`, `pink-*`, `red-*`) — só a paleta da marca
- [ ] Nenhum valor arbitrário (`p-[13px]`, `text-[#f03]`)
- [ ] Raio via `rounded-brand` / `rounded-full`; sombra via `shadow-soft` / `shadow-card`
- [ ] Token novo entrou em `globals.css` (e em `theme.ts` só se for lido em JS)
- [ ] Nenhum `text-white`/`bg-white` — use `text-on-brand` / `bg-surface`
- [ ] Nenhuma cor ou fundo de primitivo sobrescrito por `className` (virou prop)

→ [[design-tokens]]

## Hierarquia e espaço

- [ ] Teste do olho semicerrado: a hierarquia aparece?
- [ ] Um único botão primário na tela
- [ ] Label menos pesado que o valor que ele rotula
- [ ] Espaçamento só na escala 4/8/16/24/32/48/64
- [ ] Espaço entre grupos > espaço dentro do grupo
- [ ] Largura de conteúdo limitada (nada de texto ocupando a tela inteira)

→ [[hierarquia-visual]] · [[espacamento-e-layout]]

## Estados

- [ ] Os quatro estados existem: carregando, erro, vazio, com conteúdo
- [ ] Vazio e erro têm mensagens diferentes
- [ ] Ação assíncrona desabilita o gatilho e troca o rótulo
- [ ] Mensagem de erro diz o que fazer, em português, sem jargão

→ [[estados-e-feedback]]

## Acessibilidade

- [ ] Todo input com label (via `<Textfield>`)
- [ ] Contraste ≥ 4.5:1 em texto normal
- [ ] Tab chega em tudo e o foco é visível
- [ ] Botão só com ícone tem `aria-label`
- [ ] Nenhuma informação transmitida só por cor
- [ ] Um `<h1>`, sem pular nível

→ [[acessibilidade]] · [[estrutura-semantica]]

## Responsivo

- [ ] Escrito mobile-first, sem prefixo para mobile
- [ ] Sem scroll horizontal em 375px
- [ ] Alvo de toque ≥ 44px nas ações principais (`Button` `md`/`lg`; `sm` só em
      contexto denso de desktop)
- [ ] Só `md:` e `lg:` — `sm:`, `xl:` e `2xl:` não existem neste projeto
- [ ] Testado em 375, 768 e 1280 **no browser**, não só no código

## Copy

- [ ] Botão diz o resultado ("Publicar anúncio"), não o mecanismo ("Enviar")
- [ ] Vocabulário do glossário, sem sinônimo novo
- [ ] Cortou metade das palavras

→ [[copy-de-interface]]

## Vitrine, oferta e preço

- [ ] Preço atual grande; original riscado, pequeno e `muted`; desconto em destaque
- [ ] Qualquer taxa aparece junto do preço, não só no checkout
- [ ] Data e cidade visíveis em todo card de anúncio
- [ ] Estado do item (vendido, cancelado, seu anúncio) explícito, nunca só botão morto
- [ ] Sinal de urgência é fato verificável, nunca contador fabricado

→ [[referencias-de-marketplace]]

## Relacionados

[[principios-de-design]] · [[design-tokens]] · [[componentes]] · [[referencias-de-marketplace]] · [[checklist-seo]] · [[00-mapa]]

Referência de API dos componentes: `DESIGN_SYSTEM.md` na raiz.
