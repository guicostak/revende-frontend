---
tags: [design, regra]
fonte: [refactoring-ui, web-typography]
---

# Hierarquia visual

Nem tudo pode ser importante. Hierarquia se cria com três alavancas — **tamanho**,
**peso** e **cor** — combinadas de duas em duas.

Usar as três (grande + bold + escuro) é o recurso do elemento mais importante da página.
Se tudo usa as três, nada se destaca.

## Três níveis de texto

| Nível | Classe | Uso |
| ----- | ------ | --- |
| Primário | `text-ink font-bold` | título, preço, nome do evento |
| Secundário | `text-ink` | corpo, descrição |
| Terciário | `text-muted text-sm` | data, cidade, metadado, label |

## Label é menos importante que o valor

O rótulo apoia o dado, não compete com ele. "Preço de revenda" pequeno e `text-muted`;
`R$ 180,00` grande e `font-extrabold`. Ver `ListingCard` e `ListingRow`.

## Hierarquia de botão

| Nível | Variante | Quando |
| ----- | -------- | ------ |
| Primário | `<Button>` | uma ação por tela — a que o usuário veio fazer |
| Secundário | `<Button variant="secondary">` | alternativa legítima (Cancelar) |
| Terciário | `<Button variant="ghost">` | ação de baixo risco (Sair) |

**Um primário por tela.** Dois botões vermelhos lado a lado anulam um ao outro.

## Cor semântica não é peso visual

`danger` comunica *natureza*, não *importância*. "Cancelar anúncio" é uma ação rotineira:
use `secondary`, não `danger`. Vermelho gritante é para destruição irreversível.

## Regras

- Todo texto secundário é `text-muted`. Não invente um terceiro cinza.
- Título de seção: `text-2xl font-bold text-ink`. Título de página: [[componentes|PageHeader]].
- Não use `uppercase` em bloco de texto — só em label curto (categoria do evento).

## Relacionados

[[tipografia]] · [[cor]] · [[espacamento-e-layout]] · [[principios-de-design]] · [[00-mapa]]
