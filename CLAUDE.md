# Revende — Frontend

Marketplace de revenda de ingressos. Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4.

Este arquivo é a referência de arquitetura do projeto. **Leia antes de criar ou mover
qualquer arquivo.** Ele foi derivado da arquitetura do frontend anterior
(`apps/revende/frontend`, CRA + styled-components), adaptada ao App Router.

Para qualquer tarefa de UI, **leia `DESIGN_SYSTEM.md` na raiz antes de escrever
estilo**: é o catálogo de tokens e componentes (nome, assinatura, quando usar). Este
arquivo resume a arquitetura; o `DESIGN_SYSTEM.md` é a API; `docs/design/` é o porquê.

---

## Contexto de produto — leia antes de qualquer decisão

A Revende é um marketplace **C2C**: quem vende é uma pessoa desconhecida repassando um
ingresso, não o produtor oficial do evento.

Isso não é detalhe de posicionamento, é o que o produto é. O comprador chega
**desconfiado por padrão** — cambista, ingresso falso, PIX e sumiço são a experiência de
referência dele nesse mercado. Não vendemos acesso a ingresso (o Google já faz isso):
vendemos **confiança de que a transação vai dar certo**.

Três regras saem daí e mandam em design e em API. Detalhe em `docs/negocio/`:

1. **Confiança do vendedor é metade do produto.** Todo lugar onde um anúncio aparece
   mostra sinal de confiança do vendedor. Nome sozinho não é sinal.
   → `docs/negocio/confianca-do-vendedor.md`
2. **Todo custo aparece antes do checkout.** Taxa que surge no fim confirma a suspeita do
   comprador. → `docs/negocio/transparencia-de-preco.md`
3. **Urgência só com fato verificável.** "Último ingresso" porque `quantity === 1`, nunca
   contador fabricado. → `docs/negocio/urgencia-honesta.md`

Consequência de referência: a Sympla pode ignorar a regra 1 porque quem vende lá é o
produtor oficial — a plataforma empresta a própria reputação. Nós não podemos. Copiar a
interface da Sympla sem isso é copiar a solução de um problema que não é o nosso.
→ `docs/design/referencias-de-marketplace.md`

---

## Base de conhecimento — rede Obsidian em `docs/`

`docs/` é um vault do Obsidian com as regras detalhadas do projeto: arquitetura, design e
SEO. Este arquivo é o resumo operacional; a rede é o aprofundamento e o *porquê*.

**Entrada: [`docs/00-mapa.md`](docs/00-mapa.md).**

Antes de trabalhar, leia as notas da linha correspondente:

| Vou fazer... | Leia |
| ------------ | ---- |
| Qualquer estilo ou componente | **`DESIGN_SYSTEM.md`** (raiz) — sempre, antes de tudo |
| Qualquer coisa que o usuário vê | `negocio/regras-de-negocio.md` |
| Uma tela / componente novo | `design/principios-de-design.md`, `design/heuristicas-ux.md` |
| Vitrine, card de oferta, preço | `design/referencias-de-marketplace.md` (Sympla, OLX, Mercado Livre) |
| Uma rota nova | `seo/principios-de-seo.md`, `arquitetura/rotas-e-navegacao.md` |
| Um hook / service | `arquitetura/camadas.md`, `arquitetura/hooks.md`, `arquitetura/services-e-http.md` |
| Mexer em cor, espaço, tipografia | `design/design-tokens.md` + a nota específica |
| Metadata, schema, indexação | `seo/metadata-e-titles.md`, `seo/dados-estruturados.md`, `seo/indexacao-e-crawl.md` |
| Fechar uma tarefa | `design/checklist-de-design.md` **e** `seo/checklist-seo.md` |

As notas se referenciam por `[[wikilink]]`. `docs/skills/skills-de-referencia.md` registra
de qual skill externa cada regra veio.

**Ao criar uma regra nova**: ela vira uma nota em `docs/`, e só um resumo de uma linha
entra aqui. Regra sem nota vira folclore.

---

## Comandos

```bash
npm run dev            # servidor de desenvolvimento (http://localhost:3000)
npm run build          # build de produção (roda typecheck)
npm run start          # sobe o build de produção
npm run lint           # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck      # tsc --noEmit — rode sempre antes de finalizar uma tarefa
npm test               # testes unitários (Vitest)
npm run test:watch     # testes em modo watch
npm run test:coverage  # cobertura em lcov (o que o SonarCloud consome)
npm run check:tokens   # guarda dos tokens do design system
npm run check:bundle   # orçamento do JS compartilhado (precisa de build antes)
```

Antes de abrir PR, o mínimo é `npm run typecheck && npm run lint && npm test &&
npm run check:tokens`. A pipeline roda exatamente isso, e mais.

A API (backend Spring) roda em `http://localhost:8080`. A URL vem de
`NEXT_PUBLIC_API_URL` em `.env.local`.

---

## Estrutura de pastas

```
src/
├── app/                     # Rotas (App Router). Só composição de UI.
│   ├── layout.tsx           # Shell + metadata raiz + JSON-LD global
│   ├── globals.css          # Reset + design tokens (@theme do Tailwind)
│   ├── robots.ts            # robots.txt
│   ├── sitemap.ts           # sitemap.xml dinâmico (lê eventos da API)
│   ├── not-found.tsx        # 404
│   ├── page.tsx             # Home (server)
│   ├── loaders/             # Carga de dados da Home (equivalente server do hook)
│   ├── login/{page.tsx,layout.tsx,hooks/}
│   ├── cadastro/{page.tsx,layout.tsx,hooks/}
│   ├── anunciar/{page.tsx,layout.tsx,hooks/}
│   ├── meus-anuncios/{page.tsx,layout.tsx,hooks/}
│   └── evento/[id]/{page.tsx,loaders/}   # server + generateMetadata + JSON-LD
│
├── components/
│   ├── ui/                  # Primitivos: Button, Field, Card, Badge, Container,
│   │                        #   Heading, SegmentedControl, Price, Logo...
│   ├── layout/              # Navbar, Footer
│   ├── seo/                 # JsonLd
│   └── listing/             # Domínio: ListingCard, ListingRow, SellerLine,
│                            #   QuantityHint, BuyButton, ListingSearchField
│
├── services/                # Camada de acesso à API — ÚNICO lugar com `fetch`
│   ├── httpClient.ts        # fetch + token + JSON + ApiError
│   ├── authService.ts
│   ├── eventService.ts
│   └── listingService.ts
│
├── hooks/                   # Hooks reutilizáveis (useAsync, useForm, useRequireAuth)
├── context/                 # React Context (AuthContext)
├── config/                  # env.ts, apiConfig.ts (endpoints, storage keys), seo.ts
├── types/                   # DTOs e tipos de domínio (auth, event, listing)
└── common/
    ├── styles/              # theme.ts (tokens em TS), mediaScreens.ts
    ├── constants/           # ROUTES, labels de domínio
    └── utils/               # format.ts, storage.ts, cn.ts, seo.ts, jsonLd.ts

DESIGN_SYSTEM.md             # catálogo de tokens e componentes — leia antes de estilizar
docs/                        # vault Obsidian — regras detalhadas (ver seção acima)
├── 00-mapa.md               # entrada da rede
├── negocio/                 # regras que mandam em design e API
├── arquitetura/  design/  seo/  skills/
```

---

## Regras de arquitetura

### 1. Camadas — a direção da dependência é sempre para baixo

```
app/ (páginas)  →  components/  →  hooks/  →  services/  →  config/ + types/
```

- **Página** (`app/**/page.tsx`): só monta a UI. Sem `fetch`, sem regra de negócio,
  sem `useState` de fluxo. Deve ser legível de cima a baixo como uma árvore de JSX.
- **Hook** (`app/**/hooks/useXHook.ts`): todo o estado, validação, orquestração e
  navegação da página. É onde a lógica mora.
- **Service** (`services/*.ts`): fala com a API. Recebe e devolve tipos de `types/`.
- **Nunca** chame `fetch` fora de `services/httpClient.ts`.
- **Nunca** monte URL de API na mão — use `API_ENDPOINTS` em `config/apiConfig.ts`.
- **Nunca** escreva um path de rota literal (`"/login"`) — use `ROUTES` em
  `common/constants/routes.ts`.

### 2. Padrão "componente + hook" (herdado do projeto antigo)

Cada página ou componente com lógica ganha uma pasta com o hook ao lado:

```
app/login/
├── page.tsx                  # marcação
└── hooks/useLoginHook.ts     # estado + submit + navegação
```

O nome do hook segue `use<Nome>Hook`. Se o hook passar a ser usado por mais de uma
página, promova para `src/hooks/`.

Helpers muito específicos de um componente vão em uma subpasta `helpers/` ao lado
(mesma convenção do projeto antigo).

> `app/**/hooks/` não vira rota: no App Router só `page.tsx` / `route.ts` criam rotas.

### 3. Componentes

- Um componente por pasta, com `index.tsx`: `components/ui/Button/index.tsx`.
- Cada grupo (`ui`, `layout`, `listing`) tem um `index.ts` de barril — importe por ele:
  `import { Button, Card } from '@/components/ui'`.
- **Exports nomeados**, não `default` (exceto `page.tsx` / `layout.tsx`, que o Next exige).
- `ui/` não conhece domínio. Nada de `ListingDto` dentro de `components/ui/`.
- Componente de domínio vai em `components/<domínio>/`.

### 4. Server vs Client Components

- O padrão é Server Component. Só marque `'use client'` quando houver estado, efeito,
  evento de DOM ou context.
- Páginas que chamam hooks de dados são client (`'use client'` no topo).
- Todo hook em `src/hooks/` e todo componente de `ui/` que usa hook já é `'use client'`.

### 5. Estado assíncrono

Use `useAsync` (`src/hooks/useAsync.ts`) em vez de repetir `useState` de
`data/loading/error`:

```ts
const fetchListings = useCallback(() => listingService.list(), []);
const { data, loading, error, reload } = useAsync(fetchListings, { initialData: [] });
```

O `fetcher` **precisa** estar em `useCallback`, senão a busca dispara a cada render.

### 6. Erros

- `httpClient` lança `ApiError` com `status`.
- Nos hooks, capture com `toErrorMessage(err, 'mensagem padrão')` e guarde uma string
  em `error`.
- Na página, renderize com `<Alert>{error}</Alert>`.

### 7. Autenticação

- Sessão em `context/AuthContext.tsx` (`useAuth()`), persistida em `localStorage`
  pelas chaves de `STORAGE_KEYS`.
- Token é injetado automaticamente pelo `httpClient`. Não passe `Authorization` na mão.
- Página protegida usa `useRequireAuth()` e renderiza `<PageLoader />` enquanto
  `checking` for `true`.
- `localStorage` só via `common/utils/storage.ts` (o servidor não tem `window`).

---

## Design system

Catálogo completo em `DESIGN_SYSTEM.md`. O resumo:

A identidade visual veio do projeto antigo (`common/styles/theme.tsx`). **A fonte de
verdade é uma só**: o bloco `@theme` de `src/app/globals.css`, que gera as classes do
Tailwind.

`src/common/styles/theme.ts` é um espelho **parcial**, só para valores que precisem ser
lidos em JS (`window.matchMedia`, `style` calculado). Em JSX use a classe, nunca
`theme.color.*`. Token novo entra no `globals.css`; no `theme.ts`, só se for lido em JS.

### Cores

| Token             | Valor       | Origem no projeto antigo |
| ----------------- | ----------- | ------------------------ |
| `brand-500`       | `#e82c4f`   | `primaryColor`           |
| `brand-600`       | `#d4304e`   | `darkMain`               |
| `brand-50…900`    | escala      | derivada do `#e82c4f`    |
| `ink`             | `#2b2a2a`   | `textColor`              |
| `muted`           | `#575555`   | `darkGrey`               |
| `surface`         | `#ffffff`   | `mainBackground`         |
| `surface-muted`   | `#efefef`   | `secondBackground`       |
| `line`            | `rgba(0,0,0,.17)` | `borderColor`      |
| `selected`        | `rgba(232,44,79,.13)` | `selected`     |
| `success` / `danger` / `warning` | — | novos                  |
| `on-brand`        | `#ffffff`   | novo — texto sobre cor cheia |

Use `bg-brand-500`, `text-ink`, `text-muted`, `border-line`. **Não** use as paletas
genéricas do Tailwind (`bg-pink-600`, `text-gray-500`) — elas fogem da marca. `text-white`
também não: existe `text-on-brand`.

### Outros tokens

- Raio: `rounded-brand` (10px, o raio dos botões do design antigo) ou `rounded-full`.
- Sombra: `shadow-soft`, `shadow-card`.
- Fonte: `Arial, Helvetica, sans-serif` (`mainFont` do projeto antigo), aplicada no `body`.
- Largura da página: `max-w-page` (72rem) — na prática, via `<Container>`.
- Hero: `text-display`, único tamanho fluido (`clamp`, 30→40px). Não leva `md:`/`lg:`.
- Logo: `public/img/logos/logo.png`, sempre via `<Logo />` — nunca `<img>` direto.
- **Sem dark mode**, por decisão. Tokens já são semânticos; ver `DESIGN_SYSTEM.md` §1.

### Breakpoints

`mediaScreens.ts` do projeto antigo (mobile <768, tablet 768–1023, desktop ≥1024) está
mapeado nos prefixos do Tailwind:

| Antigo  | Tailwind         |
| ------- | ---------------- |
| mobile  | (sem prefixo)    |
| tablet  | `md:` (≥768px)   |
| desktop | `lg:` (≥1024px)  |

Escreva mobile-first. `common/styles/mediaScreens.ts` existe para quando a media query
precisa ser lida em JS (`window.matchMedia`).

**`sm:`, `xl:` e `2xl:` estão desligados** no `globals.css`. Dois pontos de quebra bastam;
breakpoint disponível é breakpoint que alguém usa sem pensar.

---

## Regras de design

O detalhe está em `docs/design/`. O essencial, que vale para todo PR:

1. **Só tokens.** Nada de `bg-gray-100`, `text-pink-600` ou `p-[13px]`. Paleta da marca,
   escala de espaçamento 4/8/16/24/32/48/64, `rounded-brand`, `shadow-soft`/`shadow-card`.
2. **Hierarquia com duas alavancas** — tamanho, peso, cor. As três só no elemento mais
   importante da tela. Um botão primário por tela.
3. **Espaço entre grupos maior que dentro do grupo.** Em dúvida, use o valor maior da escala.
4. **Os quatro estados existem**: carregando, erro, vazio, com conteúdo — e vazio ≠ erro.
   Use `<PageLoader>`, `<Alert>`, `<EmptyState>`.
5. **Ação assíncrona** desabilita o gatilho e troca o rótulo ("Publicando...").
6. **Acessibilidade não é opcional**: todo input com label (use `<Textfield>`), contraste
   4.5:1, foco visível, tudo alcançável por Tab, cor nunca sozinha carregando informação.
   Título via `<Heading>`: a tag vem da semântica, o tamanho da prop `size`.
7. **Reuse o primitivo** em vez de recriar a marcação. Variação vira **prop** (`tone`,
   `variant`, `overlay`), nunca `className` sobrescrevendo cor ou fundo — `cn()` só
   concatena, e quem vence passaria a depender da ordem do CSS gerado.
8. **Mobile-first**, sem scroll horizontal em 375px, alvo de toque ≥44px — é o tamanho
   padrão do `<Button>` (`md`). `sm` (36px) só em contexto denso de desktop.
9. **Copy**: botão diz o resultado ("Publicar anúncio"), não o mecanismo ("Enviar").
   Vocabulário fixo — *anúncio*, *evento*, *entrar*.

### Vitrine, oferta e preço

Vindo do levantamento em Sympla, Ingresso.com, OLX e Mercado Livre:

10. **Preço usa `<Price>`**, nunca marcação solta. A ordem é original riscado em cima,
    atual grande embaixo, `% OFF` em destaque — é a convenção que o comprador brasileiro
    já lê. Taxa, quando existir, entra dentro do mesmo componente.
11. **Data e cidade em todo card de anúncio.** Ingresso se decide por o quê, quando e
    onde; esconder um dos três força um clique inútil.
12. **Vendedor tem linha própria** — use `<SellerLine>`. É o que se avalia antes do preço.
13. **Escassez vem de `quantity` e `event.date`** — use `<QuantityHint>` e
    `eventProximityLabel()`. Nada de contador inventado.

Checklist completo: `docs/design/checklist-de-design.md`.
Contexto criativo: `docs/design/referencias-de-marketplace.md`.

---

## Regras de SEO

O detalhe está em `docs/seo/`. As páginas que precisam ranquear são `/` e `/evento/[id]`.

1. **O conteúdo tem que existir no HTML sem JavaScript.** Crawler de IA não roda JS, e o
   Googlebot renderiza com atraso. Página que precisa ranquear é Server Component; só a
   parte interativa é `'use client'`.
2. **Uma intenção de busca, uma URL.** Nada de duas rotas disputando a mesma busca.
3. **`title` e `description` únicos por página.** 50–60 e 150–160 caracteres, palavra-chave
   no começo do título. Página client não exporta `metadata` — crie um `layout.tsx` server
   ao lado ou converta a página.
4. **Um `<h1>` por página**, sem pular nível de heading. Heading é semântica, não tamanho.
5. **Rota de sessão** (`/anunciar`, `/meus-anuncios`) leva `robots: { index: false }`.
6. **`next/image` sempre**, com `alt` descritivo, `sizes` correto e `priority` acima da dobra.
7. **JSON-LD `Event` + `Offer`** na página do evento — e todo dado do schema tem que estar
   visível na página.
8. **URL** em minúsculas, com hífen, em português, declarada em `ROUTES`.

Checklist completo: `docs/seo/checklist-seo.md`.

---

## Convenções de código

- **Idioma**: código, tipos e nomes em inglês; texto de interface, comentários e
  mensagens de erro em português.
- **Imports**: sempre com o alias `@/` (`@/services`, `@/components/ui`). Nada de `../../`.
- Ordem: libs externas → `@/` → relativos.
- **Tipos**: sem `any`. Use `unknown` + narrowing. `import type` para tipos.
- **Nomenclatura**: componentes `PascalCase`; hooks `use<Nome>Hook`; services
  `<domínio>Service`; constantes `SCREAMING_SNAKE_CASE`; arquivos de componente
  sempre `index.tsx` dentro da pasta do componente.
- **Comentários**: explicam *por quê*, não *o quê*. JSDoc curto em funções exportadas
  de `services/`, `hooks/` e `utils/`.
- **Acessibilidade**: todo input usa `<Textfield>` (que já liga `label` ao `id`);
  botão só de ícone precisa de `aria-label`.
- **Imagens**: `next/image`. Hosts externos precisam estar em `next.config.ts`.

---

## Ao adicionar uma feature

1. Tipos do domínio em `src/types/`.
2. Endpoints em `config/apiConfig.ts` e métodos no service correspondente.
3. Rota nova em `common/constants/routes.ts`.
4. `app/<rota>/page.tsx` + `app/<rota>/hooks/use<Nome>Hook.ts`.
5. Componentes reutilizáveis em `components/ui/`; de domínio em `components/<domínio>/`.
6. `metadata` da rota (ou `layout.tsx` server, se a página for client).
7. Rode `npx tsc --noEmit` e `npm run build`.
8. Passe pelos três checklists: `DESIGN_SYSTEM.md` §7, `docs/design/checklist-de-design.md`
   e `docs/seo/checklist-seo.md`.
9. Verifique **no browser** em 375, 768 e 1280 antes de dar a tarefa por fechada.

---

## Pipeline

`.github/workflows/ci.yml` roda em push e PR na `main`. Espelha a estrutura do
`revende-backend`, adaptada ao stack Node:

| Estágio | O que faz |
| ------- | --------- |
| Validação | `tsc`, ESLint, guarda dos tokens, actionlint |
| Build | `next build` + orçamento do JS compartilhado |
| Testes e cobertura | Vitest com lcov, resumo no painel |
| Segurança | CodeQL (`javascript-typescript`) |
| Quality gate | SonarCloud, projeto `guicostak_revende-frontend` |
| Resumo | painel final; reprova se qualquer estágio falhou |

Duas guardas são próprias deste projeto e ficam em `scripts/`:

- **`check-design-tokens.mjs`** — reprova paleta genérica do Tailwind, `text-white`,
  medida ou cor mágica (`p-[13px]`, `text-[#f03]`) e breakpoint desligado (`sm:`,
  `xl:`, `2xl:`). É o `DESIGN_SYSTEM.md` §7 deixando de depender de memória.
- **`check-bundle-budget.mjs`** — mede o First Load JS compartilhado em gzip e reprova
  acima de **120 KB** (hoje em 103 KB). Subir o teto é decisão explícita, editando a
  constante com justificativa.

## Pendências conhecidas

### Bloqueado por campo que a API ainda não devolve

São as três regras de `docs/negocio/` que ainda não têm dado para existir. O layout já
reserva o lugar de cada uma:

1. `sellerRating`, `sellerSalesCount`, `sellerSince` → sinal de confiança dentro de
   `<SellerLine>` (o lugar já está marcado com TODO no componente)
2. `serviceFee`, `totalPrice` → taxa dentro do `<Price>`, e no `Offer` do JSON-LD
3. `createdAt` no `ListingDto` → recência ("publicado há 2 dias")

### Produto

- O botão "Comprar" na página do evento ainda não tem fluxo de checkout.
- Sem barra fixa de compra no mobile na página do evento.
- Quando o catálogo crescer: `/eventos/[cidade]` e `/eventos/[categoria]`, e mover o
  filtro da home para a API (`eventService.list` já aceita `city` e `name`).

### Backend em produção

O backend está no Cloud Run (`https://revende-backend-jhgfodkzya-uc.a.run.app`).
`/actuator/health` responde `UP`, mas **`/api/events` e `/api/listings` devolvem 401 com
`WWW-Authenticate: Basic`** — a revisão implantada está com a segurança padrão do Spring
Boot, não com o `SecurityFilterChain` do projeto. Enquanto isso não for corrigido no
repositório do backend, o frontend não consegue apontar para a nuvem: a home e a página
do evento (as duas que precisam ranquear) renderizariam vazias.

### Geral

- Cobertura de testes em ~45%. O que tem lógica está coberto (`httpClient` 97%,
  `useAsync` 100%, `format` 92%); o que falta são os hooks de página
  (`use<Nome>Hook`), o `AuthContext` e os utilitários de JSON-LD.
- `NEXT_PUBLIC_SITE_URL` precisa apontar para o domínio real em produção: canonical,
  Open Graph, sitemap e JSON-LD saem dele.
- Deploy ainda não existe: falta o estágio de publicação no Nexus.
