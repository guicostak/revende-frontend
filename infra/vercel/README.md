# Vercel — produção em `revende.net`

Produção mora na Vercel; homologação continua sendo a imagem Docker no Nexus
(`infra/nexus/README.md`). São dois destinos e dois artefatos: `NEXT_PUBLIC_*` é
inlinado em tempo de build, então **cada ambiente tem seu próprio build**, ainda que
do mesmo commit.

O que é GitOps aqui: a configuração de deploy é arquivo no repositório
(`vercel.json` + os jobs `preview` e `producao` do `.github/workflows/ci.yml`), e o
estado do `main` é o estado do site. Nenhum passo é dado clicando em painel.

---

## 1. Como a publicação acontece

| Evento | O que sai |
| ------ | --------- |
| PR na `main` | URL de pré-visualização, depois de todos os estágios passarem |
| Push verde na `main` | Produção em `revende.net` |
| Push na `main` com `#deployuat` | Homologação no Nexus (caminho separado) |

Os dois jobs da Vercel dependem do estágio `resumo`, que só passa quando validação,
build, testes, CodeQL e quality gate passaram. Não existe caminho até o domínio que
pule a pipeline.

## 2. Por que o deploy automático da Vercel está desligado

`vercel.json` traz:

```json
"git": { "deploymentEnabled": false }
```

Sem isso a Vercel publicaria por conta própria a cada push, em paralelo à pipeline —
e o site poderia mudar sem que os testes tivessem passado. Com a linha acima, o
único deployer é o job `producao`, que constrói com `vercel build` e envia com
`vercel deploy --prebuilt`.

Efeito colateral esperado: o painel da Vercel mostra os deployments como vindos da
CLI, não do GitHub. É o comportamento correto neste desenho.

## 3. Ligar a pipeline

Três segredos no repositório (**Settings → Secrets and variables → Actions**):

| Segredo | Valor |
| ------- | ----- |
| `VERCEL_TOKEN` | gere em vercel.com/account/settings/tokens → *Create Token* |
| `VERCEL_ORG_ID` | `team_B8SXbeLdX1av6YCYo0FRN82v` |
| `VERCEL_PROJECT_ID` | `prj_8a6i4g83QsQqikmZVbDXTGnQIaXf` |

Os dois ids são identificadores públicos do projeto, não credenciais — ficam à vista
em *Project Settings* e *Team Settings*. **O token é credencial**: gere e cole você
mesmo, dê escopo só a este projeto, e nunca o coloque em arquivo do repositório.

Os mesmos ids saem de `.vercel/project.json` (campos `orgId` e `projectId`) depois de:

```bash
npx vercel@latest link
```

Esse arquivo é local e está no `.gitignore`.

Sem os segredos, os dois jobs **não falham**: eles pulam e explicam o que falta no
painel do run, igual à guarda do Nexus. Ou seja, enquanto o token não existir, nada é
publicado — inclusive o primeiro deploy.

## 4. Variáveis de ambiente

Ficam na Vercel (**Project → Settings → Environment Variables**), não no repositório.
`vercel pull` as traz para o build da pipeline.

| Variável | Production | Preview |
| -------- | ---------- | ------- |
| `NEXT_PUBLIC_SITE_URL` | `https://revende.net` | deixe em branco — a Vercel injeta a URL do deployment |
| `NEXT_PUBLIC_API_URL` | URL pública da API | URL da API de homologação |

`NEXT_PUBLIC_SITE_URL` é de onde saem canonical, Open Graph, `sitemap.xml` e o JSON-LD.
Apontar para o valor errado em produção quebra as quatro coisas de uma vez.

### As duas precisam ser do tipo `Config`, nunca `Secret`

No formulário da Vercel, **`Secret` vem marcado por padrão** — e foi assim que as duas
foram criadas na primeira vez. O resultado não é um erro de permissão, é um build que
quebra longe da causa:

```
Failed to collect configuration for /_not-found
  cause: TypeError: Invalid URL
  code: 'ERR_INVALID_URL', input: '[SENSITIVE]'
```

Valor `Secret` é write-only: `vercel pull` não consegue lê-lo e grava um marcador no
`.env` em vez da URL. `new URL(marcador)` em `metadataBase` (`src/app/layout.tsx`)
estoura, e o Next ainda redige o valor como `[SENSITIVE]` no log — então a mensagem não
diz qual variável causou.

Sinal de diagnóstico: se a variável estivesse **ausente**, o fallback de
`src/config/env.ts` (`http://localhost:3000`) é URL válida e o build passaria. Build
quebrando em `Invalid URL` significa que a variável existe e o valor não é URL.

Além de quebrar, `Secret` aqui é semanticamente errado: `NEXT_PUBLIC_*` é inlinado no
bundle do browser em tempo de build — é público por definição, não há o que proteger.

Um `Secret` salvo **não pode ser convertido** para `Config` ("saved secrets are
write-only"). Só apagando e recriando. Na lista, `Config` aparece com ícone `<>` e um
olho para revelar; `Secret` aparece com cadeado e o *Copy to Clipboard* desabilitado.

## 5. O domínio

`revende.net` é registrado na GoDaddy, e **o DNS continua lá** — os nameservers
seguem `ns21/ns22.domaincontrol.com`. Delegar os nameservers para a Vercel era a outra
opção, e foi descartada: o domínio tem MX, SPF, DMARC e DKIM da GoDaddy Professional
Email, e mover os NS levaria o e-mail junto.

Estado aplicado na zona:

| Tipo | Nome | Valor |
| ---- | ---- | ----- |
| `A` | `@` | `216.198.79.1` |
| `CNAME` | `www` | `b2b88612425b4ac0.vercel-dns-017.com.` |

O valor do `CNAME` é **específico deste projeto** — não é o `cname.vercel-dns.com`
genérico. Se o domínio for removido e readicionado na Vercel, esse valor muda: confira
sempre em *Project → Domains → View DNS configuration* antes de editar a zona.

No projeto da Vercel, `revende.net` é o domínio de produção e `www.revende.net` é um
**308 permanente para o apex**. A direção importa e não é arbitrária:
`NEXT_PUBLIC_SITE_URL` é `https://revende.net`, e é de lá que saem canonical, sitemap e
JSON-LD. Canonical apontando para uma URL que redireciona é o conteúdo duplicado que
`docs/seo/indexacao-e-crawl.md` manda evitar. Inverter um lado exige inverter o outro.

Verificação sem depender de cache:

```bash
dig +short @ns21.domaincontrol.com revende.net A
```

Enquanto o DNS não resolve, a Vercel mostra o domínio como *Invalid Configuration*; com
DNS certo e sem deployment ainda, mostra *No Deployment*. Nenhum dos dois é erro de
configuração do projeto.

## 6. `output: 'standalone'` e a Vercel

`next.config.ts` liga `standalone` só fora da Vercel:

```ts
output: process.env.VERCEL ? undefined : 'standalone',
```

`standalone` existe para a imagem Docker do Nexus. A Vercel empacota pela Build
Output API e não usa a pasta `.next/standalone` — mantê-la ligada lá só faria o
build gerar um artefato que ninguém consome.

## 7. A Vercel recusa Next.js vulnerável

O primeiro build deste projeto falhou em 45s com *"Vulnerable version of Next.js
detected"*. Não é aviso: é o build sendo recusado. O projeto estava em **15.1.6**
(jan/2025), que acumula CVEs críticos — entre eles bypass de autorização em middleware
e RCE no protocolo React Flight.

Subimos para **15.5.24**, a linha 15 ainda mantida (tag `backport` no npm). Mesmo major,
mesma API, e `npm audit` deixou de acusar crítico em `next`.

Consequência prática: **a versão do Next não é só dependência, é requisito de deploy.**
Deixar a versão envelhecer não gera só dívida de segurança — em algum momento a
publicação simplesmente para. Vale olhar quando o painel mostrar *Action Required*.

O major seguinte (16.x) existe e é decisão à parte. Um sinal de que ele vai cobrar
trabalho: `next lint` já avisa que sai no 16, e o `package.json` ainda o usa.

---

## Limitações que valem saber antes de publicar

- **A API precisa estar pública.** Hoje o backend no Cloud Run devolve `401` com
  `WWW-Authenticate: Basic` em `/api/events` e `/api/listings`. Com isso, `/` e
  `/evento/[id]` — as duas rotas que precisam ranquear — renderizam vazias em
  produção. Ver a seção *Backend em produção* no `CLAUDE.md`.
- **A API precisa aceitar a origem `https://revende.net`** no CORS.
- **Plano Hobby.** Sem proteção por senha em preview, sem múltiplas regiões, e o uso
  comercial exige plano pago nos termos da Vercel.
- **A pipeline não valida o que publicou.** Não há smoke test contra a URL depois do
  deploy — mesma lacuna já registrada para o Nexus.
