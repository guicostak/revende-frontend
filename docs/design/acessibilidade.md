---
tags: [design, acessibilidade, seo, regra]
fonte: [refactoring-ui, ux-heuristics]
---

# Acessibilidade

Alvo: **WCAG 2.1 AA**. Boa parte disso também é SEO — o crawler lê a página pelos mesmos
sinais que o leitor de tela. Ver [[estrutura-semantica]].

## Não negociável

- **Todo input tem label associado.** É o que `<Textfield>` já faz com `useId()`. Não
  substitua label por placeholder: placeholder some quando o usuário digita.
- **Contraste**: 4.5:1 em texto normal, 3:1 em texto grande e em borda de controle.
- **Foco visível.** O `:focus-visible` global em `globals.css` é obrigatório. `outline: none`
  sem substituto é bug.
- **Teclado.** Tudo que clica precisa funcionar com Tab + Enter. Se você precisou de
  `onClick` numa `<div>`, use `<button>`.
- **Cor nunca sozinha.** Ver [[cor]].
- **Alvo de toque ≥ 44px** em qualquer coisa clicável no celular. É por isso que o
  tamanho padrão do `<Button>` (`md`) tem exatamente 44px de altura; `sm` (36px) só pode
  aparecer em contexto denso de desktop, nunca como a ação principal de uma tela.

## Semântica

- `<button>` para ação, `<a>`/`<Link>` para navegação. Nunca troque os dois: link abre em
  nova aba, botão não; botão dispara em Espaço, link não.
- Um `<h1>` por página, sem pular níveis.
- Landmark: `<header>`, `<main>`, `<footer>`, `<nav>` — já no `layout.tsx`.
- Lista de coisas é `<ul>`/`<li>`, não uma pilha de `<div>`.

## ARIA só quando o HTML não dá conta

ARIA errado é pior que ausente. Ordem: elemento nativo → atributo nativo → ARIA.

Em uso aqui:

- `aria-label` em controle só com ícone (`<Logo>`, botão de ícone)
- `aria-invalid` no campo com erro (`<Textfield>`)
- `role="alert"` na mensagem de erro (`<Alert>`) — anuncia sozinha
- `aria-pressed` nos botões do `<SegmentedControl>` (usado em `/anunciar`)

## Formulário

- Erro aparece **junto do campo**, não só no topo.
- Nunca só cor de borda para indicar erro — texto sempre.
- Não desabilite o submit por validação: mostre o que falta ao tentar enviar.
  Botão desabilitado sem explicação é beco sem saída.
- `autoComplete` correto (`email`, `current-password`, `new-password`, `tel`).

## Verificação

```
Tab pela página inteira — dá para chegar em tudo e o foco é visível?
Zoom em 200% — o conteúdo continua legível sem scroll horizontal?
```

## Relacionados

[[cor]] · [[estrutura-semantica]] · [[estados-e-feedback]] · [[heuristicas-ux]] · [[00-mapa]]
