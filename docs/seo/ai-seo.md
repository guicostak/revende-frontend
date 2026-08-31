---
tags: [seo, regra]
fonte: [ai-seo]
---

# SEO para buscadores de IA

SEO tradicional te faz **ranquear**. SEO para IA te faz ser **citado**.

Google AI Overviews, ChatGPT, Perplexity e Gemini respondem sem clique. Uma página bem
estruturada pode ser citada mesmo sem estar em primeiro lugar — o critério é qualidade,
estrutura e extraibilidade, não só posição.

## Pré-requisito: HTML que existe sem JavaScript

Crawler de IA em geral **não executa JavaScript**. Página renderizada no cliente
simplesmente não entra no índice deles.

Este é o bloqueio número um do projeto hoje. Ver [[indexacao-e-crawl]].

## O que torna conteúdo extraível

- **Responda antes de contextualizar.** A informação principal vem no primeiro
  parágrafo, não depois de uma introdução.
- **Um fato por bloco.** Parágrafo curto, com uma afirmação verificável.
- **Heading em forma de pergunta** quando o conteúdo responde uma pergunta —
  "Como funciona a revenda de ingressos na Revende?"
- **Dado concreto** (número, data, preço, local) é o que mais se cita. Marketing vago não
  se cita.
- **Tabela e lista** são mais fáceis de extrair que prosa corrida.

## Dados estruturados pesam mais aqui

`Event` com data, local e preço dá à IA um fato pronto para citar, sem ela precisar
interpretar a página. Ver [[dados-estruturados]].

## Oportunidade concreta

Uma seção de FAQ curta na página do evento — "Como recebo o ingresso?", "E se o evento
for cancelado?" — com `FAQPage` no schema. É o formato que mais aparece em resposta de
IA, e resolve dúvida real de quem compra ingresso de revenda. Ganha nas duas pontas.

## O que não fazer

- Repetir palavra-chave. Modelo de linguagem lê semântica; empilhar termo só piora.
- Texto gerado em massa sem informação nova. Conteúdo raso não é citado.
- Esconder conteúdo atrás de aba ou acordeão. Ver [[estrutura-semantica]].

## Relacionados

[[indexacao-e-crawl]] · [[dados-estruturados]] · [[copy-de-interface]] · [[principios-de-seo]] · [[00-mapa]]
