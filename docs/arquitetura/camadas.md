---
tags: [arquitetura, regra]
fonte: [clean-architecture, software-design-philosophy]
---

# Camadas

A dependência anda sempre para baixo. Nenhuma seta volta.

```
app/ (páginas)  →  components/  →  hooks/  →  services/  →  config/ + types/
```

| Camada        | Sabe sobre                    | Nunca sabe sobre        |
| ------------- | ----------------------------- | ----------------------- |
| `app/`        | componentes, hooks            | `fetch`, endpoints      |
| `components/` | tipos, utils, outros componentes | services, rotas de API |
| `hooks/`      | services, context, tipos      | JSX, classes de estilo  |
| `services/`   | config, tipos                 | React, componentes      |
| `config/`     | variáveis de ambiente         | qualquer coisa acima    |

## Por quê

Um módulo profundo tem interface pequena e implementação grande. `listingService.list()`
é a interface; a URL, o token, o parse de JSON e o tratamento de erro são a
implementação — e ficam escondidos. Quando a API mudar de shape, muda um arquivo, não
seis páginas.

O inverso — página que chama `fetch` direto — espalha o conhecimento da API por toda a
UI. Foi exatamente isso que motivou a reestruturação deste projeto.

## Regras

- Uma página (`app/**/page.tsx`) só monta JSX. Sem `fetch`, sem validação, sem
  `useState` de fluxo.
- `fetch` existe em exatamente um arquivo: `src/services/httpClient.ts`. Ver [[services-e-http]].
- Nenhum componente em `components/ui/` importa de `services/` ou `types/` de domínio.
- Path de rota nunca é string literal — use `ROUTES` (ver [[rotas-e-navegacao]]).
- Se você precisou importar algo "de lado" (um hook de página dentro de outra página),
  é sinal de que aquilo deveria estar em `src/hooks/`.

## Teste rápido

Consigo deletar `src/app/` inteiro e o resto do `src/` continua compilando?
Se não, alguma camada de baixo está dependendo de uma de cima.

## Relacionados

[[services-e-http]] · [[hooks]] · [[componentes]] · [[convencoes-de-codigo]] · [[00-mapa]]
