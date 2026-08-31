---
tags: [seo, hub]
tipo: moc
fonte: [seo-audit, ai-seo, site-architecture]
---

# Princípios de SEO

Hub das regras de busca. O produto é um marketplace: a maior parte do tráfego qualificado
vem de gente procurando **"ingresso <evento>"** ou **"ingresso <cidade>"**. As páginas
que precisam ranquear são `/` e `/evento/[id]`.

## Ordem de prioridade

Resolver fora de ordem é desperdício. Não adianta otimizar título de página que o Google
não consegue rastrear.

1. **Rastreabilidade e indexação** — o Google acha e indexa? → [[indexacao-e-crawl]]
2. **Fundação técnica** — o site é rápido e funciona no mobile? → [[performance-e-web-vitals]]
3. **On-page** — título, heading, conteúdo → [[metadata-e-titles]], [[estrutura-semantica]]
4. **Qualidade de conteúdo** — a página merece ranquear? → [[copy-de-interface]]
5. **Dados estruturados e autoridade** → [[dados-estruturados]], [[ai-seo]]

## O problema estrutural deste projeto

Hoje **todas** as páginas são `'use client'` e buscam dados no browser. Consequência: o
HTML inicial que o crawler recebe é uma casca vazia. O Google renderiza JavaScript, mas
com atraso e sem garantia; ChatGPT, Perplexity e a maioria dos crawlers de IA **não
renderizam**.

Para `/evento/[id]`, que é a página que precisa ranquear, isso é o gargalo — maior que
qualquer ajuste de título. A correção é buscar o evento no servidor (Server Component) e
deixar client só a parte interativa.

Ver [[indexacao-e-crawl]] para o plano e o estado atual.

## Regras que valem sempre

- Uma página, um tema, uma URL. Nada de duas rotas competindo pela mesma busca.
- URL legível, em minúsculas, com hífen, em português. Ver [[rotas-e-navegacao]].
- Todo conteúdo importante existe no HTML, não só depois de um clique.
- Toda página tem `<h1>` único e `metadata` própria.
- Link interno com texto descritivo: "ver oferta" > "clique aqui".

## Notas desta seção

[[metadata-e-titles]] · [[estrutura-semantica]] · [[dados-estruturados]] ·
[[arquitetura-de-informacao]] · [[indexacao-e-crawl]] · [[imagens-e-midia]] ·
[[performance-e-web-vitals]] · [[ai-seo]] · [[checklist-seo]]

## Relacionados

[[00-mapa]] · [[principios-de-design]] · [[copy-de-interface]]
