---
tags: [seo, checklist]
---

# Checklist de SEO

Rode ao criar ou alterar uma rota pública.

## Indexação

- [ ] O conteúdo principal aparece no HTML sem JavaScript
- [ ] Rota pública indexável; rota de sessão com `robots: { index: false }`
- [ ] Canonical apontando para a própria URL
- [ ] A rota entrou no `sitemap.ts`
- [ ] Existe pelo menos um link interno apontando para ela

→ [[indexacao-e-crawl]] · [[arquitetura-de-informacao]]

## On-page

- [ ] `title` único, 50–60 caracteres, palavra-chave no começo
- [ ] `description` única, 150–160 caracteres, com motivo para clicar
- [ ] Um `<h1>`, com o tema da página
- [ ] Hierarquia de heading sem pular nível
- [ ] URL em minúsculas, com hífen, em português
- [ ] Nenhuma outra rota disputando a mesma busca

→ [[metadata-e-titles]] · [[estrutura-semantica]]

## Conteúdo

- [ ] A informação principal está no primeiro parágrafo
- [ ] Termo que o usuário busca aparece naturalmente no `<h1>` e no início
- [ ] Nada de palavra-chave empilhada
- [ ] Texto de link descreve o destino

→ [[copy-de-interface]] · [[ai-seo]]

## Dados estruturados

- [ ] Página de evento tem JSON-LD `Event` + `Offer`
- [ ] Todo dado do schema também está visível na página
- [ ] Validado no Rich Results Test

→ [[dados-estruturados]]

## Mídia

- [ ] Toda imagem com `alt` descritivo (ou `alt=""` se decorativa)
- [ ] `next/image` com `sizes` correto
- [ ] Imagem acima da dobra com `priority`
- [ ] `openGraph.images` definido

→ [[imagens-e-midia]]

## Performance

- [ ] `npm run build` — First Load JS abaixo de ~130KB
- [ ] Sem layout pulando ao carregar (loader com a altura do conteúdo)
- [ ] Requisições independentes em paralelo, não encadeadas

→ [[performance-e-web-vitals]]

## Relacionados

[[principios-de-seo]] · [[checklist-de-design]] · [[00-mapa]]
