# Design System — Revende

Referência de **API**: quais tokens e componentes existem, como se chamam e quando usar
cada um. Consulte este arquivo **antes de escrever qualquer estilo**.

O *porquê* de cada regra mora no vault Obsidian em [`docs/design/`](docs/00-mapa.md) —
este documento aponta para lá em vez de repetir a teoria, para não existirem duas versões
da mesma regra divergindo com o tempo.

Stack: Next.js 15 (App Router) · React 19 · TypeScript · **Tailwind CSS v4**. Sem
CSS-in-JS, sem CSS Modules, sem biblioteca de componentes. Não troque nada disso.

---

## 1. Tokens

Fonte de verdade única: o bloco `@theme` de [`src/app/globals.css`](src/app/globals.css).
É ele que gera as classes do Tailwind.

[`src/common/styles/theme.ts`](src/common/styles/theme.ts) é um **espelho parcial**, só
para os casos em que um valor precisa ser lido em JS (`window.matchMedia`, `style`
calculado, cor de meta tag). Em JSX use sempre a classe, nunca `theme.color.*`.

### Cor

| Token | Classe | Valor | Usar para |
| ----- | ------ | ----- | --------- |
| `brand-500` | `bg-brand-500` `text-brand-500` | `#e82c4f` | ação primária, marca, destaque |
| `brand-600` | `bg-brand-600` | `#d4304e` | hover/pressed de superfície da marca |
| `brand-700` | `text-brand-700` | `#ae213b` | texto da marca sobre fundo claro (contraste) |
| `brand-50…400`, `800`, `900` | — | escala | fundos suaves e degradês |
| `ink` | `text-ink` | `#2b2a2a` | texto principal |
| `muted` | `text-muted` | `#575555` | texto secundário, label, metadado |
| `surface` | `bg-surface` | `#ffffff` | fundo de card, input, barra |
| `surface-muted` | `bg-surface-muted` | `#efefef` | fundo alternativo, faixa, estado inativo |
| `line` | `border-line` | `rgba(0,0,0,.17)` | toda borda |
| `selected` | `bg-selected` | `rgba(232,44,79,.13)` | estado selecionado, badge da marca |
| `success` | `text-success` `bg-success/10` | `#1a7f4b` | confirmação, desconto, "Ativo" |
| `danger` | `text-danger` `bg-danger/10` | `#c0392b` | erro, ação destrutiva |
| `warning` | `text-warning` `bg-warning/10` | `#b7791f` | escassez real, atenção |
| `on-brand` | `text-on-brand` | `#ffffff` | texto/ícone **sobre fundo de cor cheia** |

**Nunca** use a paleta genérica do Tailwind (`bg-gray-100`, `text-pink-600`,
`border-red-300`). Ela foge da marca e produz três cinzas diferentes na mesma tela.
→ [`docs/design/cor.md`](docs/design/cor.md)

`text-white` também não: existe `text-on-brand` justamente para que "branco" seja um
papel nomeado e não um valor solto.

### Tipografia

Uma família só: `Arial, Helvetica, sans-serif` (`--font-sans`, aplicada no `body`).
Hierarquia vem de **tamanho e peso**, nunca de fonte nova.

| Papel | Classe | Peso | Tamanho |
| ----- | ------ | ---- | ------- |
| Hero / título de destaque | `text-display` | 800 (no token) | fluido, 30px → 40px |
| Título de página | `text-2xl` | `font-bold` | 24px |
| Título de seção | `text-xl` | `font-bold` | 20px |
| Título de card | `text-base` | `font-bold` | 16px |
| Corpo | `text-base` | normal | 16px |
| Secundário / apoio | `text-sm` | normal | 14px |
| Metadado / label | `text-xs` | `font-semibold` | 12px |

`text-display` é o único tamanho fluido do sistema: `clamp(1.875rem, 1.25rem + 2.5vw,
2.5rem)`. Cresce sem degrau entre 375px e 1024px, por isso **não** leva `md:`/`lg:`.

Na prática você não digita essas classes — use `<Heading>` (§3).

Regras: corpo nunca abaixo de `text-base`; linha entre 45 e 75 caracteres (`max-w-prose`
em texto corrido); `font-bold` é ênfase, não decoração.
→ [`docs/design/tipografia.md`](docs/design/tipografia.md)

### Espaçamento

A escala do Tailwind já é em `rem`. O sistema usa **só estes degraus**:

| px | 4 | 8 | 16 | 24 | 32 | 48 | 64 |
| -- | - | - | -- | -- | -- | -- | -- |
| classe | `1` | `2` | `4` | `6` | `8` | `12` | `16` |

`gap-3`, `p-5`, `mt-7` são exceção com justificativa, não padrão. `p-[13px]` não existe.

| Relação | Espaço |
| ------- | ------ |
| Ícone + rótulo, campo + label | `gap-1` / `gap-2` |
| Itens de uma lista | `space-y-4` |
| Blocos dentro de um card | `gap-4` a `gap-6` |
| Seções da página | `space-y-12` |

**O espaço entre grupos é maior que o espaço dentro do grupo.** Em dúvida entre dois
degraus, use o maior. → [`docs/design/espacamento-e-layout.md`](docs/design/espacamento-e-layout.md)

### Forma, profundidade e movimento

| Token | Classe | Valor | Usar para |
| ----- | ------ | ----- | --------- |
| `radius-brand` | `rounded-brand` | `10px` | botão, input, card — o raio padrão |
| — | `rounded-full` | — | badge, pill, avatar, campo de busca |
| `shadow-soft` | `shadow-soft` | sombra curta | elemento apoiado (card em repouso) |
| `shadow-card` | `shadow-card` | sombra difusa | elemento levantado (hover, flutuante) |
| — | `duration-200` | 200ms | toda transição de cor/estado |

`.motion-lift` é uma classe marcadora: quem a usa tem o `transform` de hover cancelado
sob `prefers-reduced-motion`. Se um componente novo se desloca no hover, marque-o.
→ [`docs/design/profundidade-e-sombras.md`](docs/design/profundidade-e-sombras.md) ·
[`docs/design/microinteracoes.md`](docs/design/microinteracoes.md)

### Layout

| Token | Classe | Valor |
| ----- | ------ | ----- |
| `container-page` | `max-w-page` | `72rem` |

Na prática, use `<Container>` (§3) — nunca redigite `mx-auto max-w-page px-4`.

### Breakpoints

**Dois pontos de quebra, e só dois.** `sm`, `xl` e `2xl` estão **desligados** no
`globals.css` de propósito: breakpoint disponível é breakpoint que alguém usa sem pensar,
e o produto passa a ter cinco layouts para manter.

| Faixa | Prefixo | Largura |
| ----- | ------- | ------- |
| mobile | *(sem prefixo)* | < 768px |
| tablet | `md:` | ≥ 768px |
| desktop | `lg:` | ≥ 1024px |

`src/common/styles/mediaScreens.ts` traz os mesmos limites para quando a media query
precisa ser lida em JS.

### Dark mode

**Não implementado, e é uma decisão, não um esquecimento** — o produto não tem tema
escuro e ninguém pediu.

Os tokens já são semânticos (`surface`, `ink`, `muted`, `on-brand`, `line`), então
adicionar depois é mexer em um bloco só. Quando for a hora: redefina esses tokens dentro
de `@media (prefers-color-scheme: dark)` e de `[data-theme="dark"]` no `globals.css`, e
revise contraste. **Não** espalhe `dark:` pelos componentes — se isso for necessário, é
sinal de que algum componente tem cor crua em vez de token.

---

## 2. Estrutura de pastas

```
src/components/
├── ui/          primitivos — não conhecem domínio. Nada de ListingDto aqui.
├── layout/      shell da aplicação (Navbar, Footer)
├── listing/     domínio: anúncio
└── seo/         JsonLd
```

- **Um componente por pasta, com `index.tsx`**: `components/ui/Button/index.tsx`.
- Cada grupo tem um `index.ts` de barril. Importe por ele:
  `import { Button, Card } from '@/components/ui'`.
- **Exports nomeados**, nunca `default` (exceto `page.tsx` / `layout.tsx`).
- Lógica do componente vai em `hooks/use<Nome>Hook.ts` **ao lado**, não no `index.tsx`.
- Componente que conhece um DTO é de domínio: vai em `components/<domínio>/`, não em `ui/`.

Nomes: componente `PascalCase`; hook `use<Nome>Hook`; constante `SCREAMING_SNAKE_CASE`;
prop booleana afirmativa (`bare`, `overlay`, `fullWidth`), nunca negativa (`noPadding`).

Composição antes de props: quando o componente precisar de mais de uma variação de
conteúdo, receba `children` / um nó (`action`, `actions`) em vez de crescer a lista de
props. `PageHeader`, `EmptyState` e `ListingRow` fazem isso.

---

## 3. Componentes primitivos (`@/components/ui`)

### `Container`

Faixa central: largura máxima da página e respiração lateral.

```tsx
<Container as="main" className="flex-1 py-8">{children}</Container>
```

| Prop | Tipo | Padrão |
| ---- | ---- | ------ |
| `as` | `div \| main \| section \| header \| footer \| nav` | `div` |

Use no shell de qualquer barra que precise alinhar com o conteúdo (é o que mantém o logo
da Navbar na mesma coluna dos cards).

### `Heading`

Separa a **tag** (semântica) do **tamanho** (visual).

```tsx
<Heading as="h1">Meus anúncios</Heading>                      {/* h1, text-2xl */}
<Heading as="h1" size="display" tone="onBrand">Hero</Heading>  {/* h1 grande, branco */}
<Heading as="h2" size="card">Detalhes do ingresso</Heading>    {/* h2 pequeno */}
```

| Prop | Tipo | Padrão |
| ---- | ---- | ------ |
| `as` | `h1 \| h2 \| h3 \| h4` | `h2` |
| `size` | `display \| page \| section \| card` | segue a tag: h1→`page`, h2→`section`, h3/h4→`card` |
| `tone` | `default \| onBrand` | `default` |

Escolha a tag pela **estrutura do documento** — leitor de tela e buscador leem isso. Um
`h2` que precisa parecer pequeno recebe `size="card"` e continua `h2`.

`tone` existe em vez de `className="text-on-brand"` porque `cn()` só concatena classes:
duas classes de cor de texto deixariam o vencedor por conta da ordem do CSS gerado.

### `Button` / `ButtonLink`

```tsx
<Button type="submit" fullWidth size="lg" disabled={submitting}>
  {submitting ? 'Publicando...' : 'Publicar anúncio'}
</Button>

<ButtonLink href={ROUTES.createListing}>Novo anúncio</ButtonLink>
```

| Prop | Valores | Padrão |
| ---- | ------- | ------ |
| `variant` | `primary \| secondary \| ghost \| danger \| success` | `primary` |
| `size` | `sm` (36px) `md` (44px) `lg` (48px) | `md` |
| `fullWidth` | `boolean` | — |
| `pill` | `boolean` — `rounded-full` em vez de `rounded-brand` | — |

**`md` é o padrão porque 44px é o alvo mínimo de toque.** `sm` fica abaixo disso de
propósito e só pode aparecer em contexto denso de desktop, ao lado de outro conteúdo
clicável — nunca como ação principal de uma tela no celular.

`ButtonLink` tem o mesmo visual e navega: use para ir a outra rota, em vez de
`onClick={() => router.push()}` (que quebra abrir em nova aba e não é lido como link).

Um único botão `primary` por tela.

### `Card`

```tsx
<Card className="p-6 md:p-8">…</Card>
<Card bare className="overflow-hidden">…</Card>   {/* imagem sangrando na borda */}
```

`bare` remove o padding interno. Herda `rounded-brand border-line bg-surface shadow-soft`.

### `Badge`

```tsx
<Badge tone="success">Ativo</Badge>
<Badge overlay tone="warning" className="absolute right-4 top-4">Faltam 2 dias</Badge>
```

| Prop | Valores | Padrão |
| ---- | ------- | ------ |
| `tone` | `brand \| neutral \| success \| danger \| warning` | `brand` |
| `overlay` | `boolean` — fundo sólido para uso **sobre imagem** | — |

Use `overlay` em vez de sobrescrever o fundo por `className`: com duas classes de
background, quem vence depende da ordem do CSS gerado, não do seu código.

### `Field` — `Textfield` / `Selectfield` / `Textareafield`

Todo input passa por aqui. O componente gera o `id` (`useId`) e amarra o `<label>`,
então **acessibilidade não depende de ninguém lembrar**.

```tsx
<Textfield
  label="E-mail"
  name="email"
  type="email"
  autoComplete="email"
  value={values.email}
  onChange={handleChange}
  error={errors.email}
  hint="Usamos só para o comprovante"
  required
/>
```

`error` pinta a borda, marca `aria-invalid` e renderiza a mensagem com `role="alert"`.
`wrapperClassName` posiciona o campo; `className` vai no controle.

### `SegmentedControl`

Alterna entre duas ou três opções exclusivas que valem ser vistas ao mesmo tempo (um
`<select>` esconderia as alternativas).

```tsx
<SegmentedControl
  label="Origem do evento"
  options={EVENT_MODE_OPTIONS}
  value={mode}
  onChange={setMode}
/>
```

`label` é o rótulo do grupo para leitor de tela. Genérico em `T extends string`: o tipo
das opções amarra o `value` e o `onChange`.

### `PageHeader`

`<h1>` + descrição + uma ação. Cabeçalho padrão de tela interna.

```tsx
<PageHeader
  title="Meus anúncios"
  description="Acompanhe e gerencie os ingressos que você colocou à venda."
  action={<ButtonLink href={ROUTES.createListing}>Novo anúncio</ButtonLink>}
/>
```

### Estados: `Spinner` / `PageLoader` / `Alert` / `EmptyState`

Os quatro estados de uma tela — carregando, erro, vazio, com conteúdo — **sempre existem**,
e vazio nunca é tratado como erro.

```tsx
if (checking) return <PageLoader />;

{error && <Alert>{error}</Alert>}                         {/* tone: error | success | info */}

{!error && items.length === 0 && (
  <EmptyState
    title="Você ainda não tem anúncios"
    description="Publique seu primeiro ingresso e ele aparecerá aqui."
    action={<ButtonLink href={ROUTES.createListing}>Anunciar ingresso</ButtonLink>}
  />
)}
```

`Alert` com `tone="error"` sai como `role="alert"`; os demais, `role="status"`.

### `Price`

```tsx
<Price price={listing.price} originalPrice={listing.originalPrice} size="lg" />
```

Ordem fixa: original riscado em cima, atual grande embaixo, `% OFF` ao lado. É a convenção
que o comprador brasileiro já lê. Quando a API devolver `serviceFee`, a taxa entra **dentro
deste componente** — nunca só no checkout.
→ [`docs/negocio/transparencia-de-preco.md`](docs/negocio/transparencia-de-preco.md)

### `Breadcrumb` · `Logo`

`Breadcrumb` recebe `items: { name, path? }[]` — o último item, sem `path`, é a página
atual. Pareie sempre com `breadcrumbJsonLd`.

`Logo` é o único jeito de exibir a marca. Nunca `<img>` direto.

---

## 4. Componentes de domínio (`@/components/listing`)

| Componente | Papel |
| ---------- | ----- |
| `ListingCard` | anúncio em grade (home, busca) |
| `ListingRow` | anúncio em linha (página do evento, meus anúncios); aceita `actions` |
| `SellerLine` | **quem está vendendo** — linha própria, copy única |
| `QuantityHint` | estoque restante, com ênfase só quando é o último |
| `BuyButton` | ilha client que sabe se o anúncio é do próprio usuário |
| `ListingSearchField` | busca da home (ilha client) |

`SellerLine` e `QuantityHint` existem porque a mesma informação aparecia duplicada — e
divergente — em `ListingCard` e `ListingRow`. Toda tela nova que mostrar um anúncio usa
os dois; é assim que a regra "confiança do vendedor aparece em todo lugar" se sustenta
sem depender de memória.
→ [`docs/negocio/confianca-do-vendedor.md`](docs/negocio/confianca-do-vendedor.md)

---

## 5. Responsividade

**Mobile-first não é preferência, é a ordem em que o CSS é escrito.** O estado sem
prefixo é o do celular; `md:` e `lg:` só adicionam.

```tsx
// certo
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

// errado — desktop primeiro, mobile como remendo
<div className="grid grid-cols-3 max-md:grid-cols-1">
```

- Uma base só: **nunca** duplique um componente em versão mobile e versão desktop.
  A diferença é CSS, não árvore de componentes.
- `flex-col md:flex-row` resolve a maior parte dos casos de linha que vira pilha.
- Alvo de toque ≥ 44px em qualquer coisa clicável no celular (`h-11` / `min-h-11`).
- Sem scroll horizontal em 375px. Conteúdo largo (tabela, código) rola dentro do próprio
  container com `overflow-x-auto`.
- Unidades relativas: `rem` (a escala do Tailwind já é), `%`, `clamp()` para tamanho
  fluido. `px` fixo só em borda, e em imagem com dimensão conhecida.
- Teste em **375, 768 e 1280** antes de considerar a tarefa fechada.

---

## 6. Performance

O que o projeto faz — e por que não faz mais que isso:

- **Server Component é o padrão.** `'use client'` só com estado, efeito, evento de DOM
  ou context. Home e página do evento são server: o HTML sai pronto, sem JS de UI.
- **Ilha client**, não página client: `BuyButton` e `ListingSearchField` são o pedaço
  interativo dentro de uma página server. Envolva em `<Suspense>` o que lê
  `useSearchParams`, senão a página inteira vira client.
- **CSS que o browser otimiza**: Tailwind gera classes estáticas. Sem CSS-in-JS, sem
  estilo calculado em runtime.
- **Fonte do sistema** (`Arial, Helvetica`): zero request, zero FOUT.
- **`next/image` sempre**, com `sizes` correto e `priority` só acima da dobra.
- **Sem `React.memo`, sem `dynamic()` — de propósito.** Não há componente de UI caro o
  bastante para justificar. Memoização especulativa custa legibilidade e não devolve nada
  medível. Se um dia um componente pesar de verdade (gráfico, editor, mapa), aí sim
  `next/dynamic`, e com o número que provou o problema.
- **`useCallback` no `fetcher` de `useAsync` é obrigatório** — sem ele a busca dispara a
  cada render. Essa é a única memoização não negociável do projeto.

---

## 7. Checklist — rode antes de fechar qualquer tarefa de UI

Os itens de **Tokens** são verificados automaticamente por
`npm run check:tokens`, que roda na pipeline e reprova o PR. O resto continua
sendo trabalho de gente — nenhum script julga hierarquia visual.

**Tokens** *(automatizado)*
- [ ] Zero cor hardcoded e zero paleta genérica do Tailwind (`gray-*`, `pink-*`, `red-*`)
- [ ] Zero valor arbitrário (`p-[13px]`, `text-[#f03]`)
- [ ] Espaçamento só nos degraus 1/2/4/6/8/12/16
- [ ] Raio via `rounded-brand`/`rounded-full`; sombra via `shadow-soft`/`shadow-card`
- [ ] Token novo entrou no `@theme` do `globals.css` (e no `theme.ts` se for lido em JS)

**Componentes**
- [ ] Reusei o primitivo em vez de recriar a marcação — em especial `Heading`, `Container`,
      `Button`, `Card`, `Badge`, `Textfield`
- [ ] Nada de sobrescrever cor/fundo de um primitivo por `className`: se faltou variação,
      adicione uma prop (`tone`, `variant`, `overlay`)
- [ ] Componente com DTO ficou fora de `ui/`
- [ ] Anúncio na tela mostra `SellerLine`, data, cidade e `Price`

**Estados**
- [ ] Carregando, erro, vazio e com conteúdo existem; vazio ≠ erro
- [ ] Ação assíncrona desabilita o gatilho e troca o rótulo ("Publicando...")

**Acessibilidade**
- [ ] Todo input via `<Textfield>`/`<Selectfield>`/`<Textareafield>`
- [ ] Um `<h1>` por página, sem pular nível; tag escolhida pela semântica
- [ ] Tab alcança tudo, foco visível, contraste ≥ 4.5:1
- [ ] Botão só com ícone tem `aria-label`; cor nunca carrega informação sozinha

**Responsivo**
- [ ] Escrito mobile-first, só `md:` e `lg:`
- [ ] Sem scroll horizontal em 375px; alvo de toque ≥ 44px
- [ ] Verificado em 375, 768 e 1280 **no browser**, não só no código

**Copy**
- [ ] Botão diz o resultado ("Publicar anúncio"), não o mecanismo ("Enviar")
- [ ] Vocabulário fixo: *anúncio*, *evento*, *entrar*

**Fechamento**
- [ ] `npx tsc --noEmit` e `npm run build` passam
- [ ] Passei também por [`docs/seo/checklist-seo.md`](docs/seo/checklist-seo.md)

---

## 8. Ao criar um componente novo

1. É primitivo (não conhece domínio) → `components/ui/<Nome>/index.tsx`.
   Conhece um DTO → `components/<domínio>/<Nome>/index.tsx`.
2. Só tokens. Se faltar um valor, o token entra no `@theme` — não vira `[13px]`.
3. Mobile-first; `md:`/`lg:` só adicionam.
4. Variação vira **prop nomeada** (`tone`, `variant`, `size`), não `className` de fora.
5. Tem lógica? Vai para `hooks/use<Nome>Hook.ts` ao lado.
6. Exporte no `index.ts` do grupo.
7. Documente aqui, na seção 3 ou 4, com um exemplo de uso real.
