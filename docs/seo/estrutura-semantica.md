---
tags: [seo, acessibilidade, regra]
fonte: [seo-audit, ux-heuristics]
---

# Estrutura semântica

O crawler e o leitor de tela leem a mesma coisa: a estrutura do HTML. Semântica certa
serve os dois de uma vez — não são duas tarefas.

## Headings

- **Um `<h1>` por página**, contendo o tema principal.
- Sem pular nível: `h1 → h2 → h3`.
- Heading descreve seção de conteúdo. Não use heading para deixar texto grande, nem
  `<div class="text-2xl">` para o que é título.

Como está hoje:

| Página | `<h1>` |
| ------ | ------ |
| `/` | "Revenda e compre ingressos com segurança" |
| `/evento/[id]` | nome do evento ✅ |
| `/login` · `/cadastro` | "Entrar" / "Criar conta" |
| `/anunciar` · `/meus-anuncios` | via `<PageHeader>` |

## Landmarks

`<header>`, `<nav>`, `<main>`, `<footer>` — todos já no `layout.tsx`. Conteúdo de página
sempre dentro de `<main>`. Bloco temático vira `<section>` com heading próprio.

## Link

- Texto de link descreve o destino. "Ver oferta", "Meus anúncios" — nunca "clique aqui".
- Navegação é `<a>`/`<Link>`. Um `<div onClick={router.push}>` não é seguido por
  crawler nem alcançado por teclado.
- Link para fora com `rel="noopener noreferrer"`.

## Conteúdo tem que estar no HTML

Texto que só aparece depois de expandir um acordeão ou clicar numa aba tem peso menor —
e para crawler que não roda JS, não existe. Conteúdo que precisa ranquear fica visível no
primeiro paint.

## Uma H1, um tema

Duas páginas disputando "ingresso show São Paulo" canibalizam uma à outra. Uma intenção
de busca → uma URL. Ver [[arquitetura-de-informacao]].

## Relacionados

[[metadata-e-titles]] · [[acessibilidade]] · [[tipografia]] · [[dados-estruturados]] · [[00-mapa]]
