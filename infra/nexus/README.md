# Nexus — repositório de artefatos

Nexus Repository Manager 3 local, para publicar a imagem Docker do frontend em
**homologação**. O `docker-compose.yml` ao lado sobe a instância; este arquivo
descreve a configuração que precisa ser feita **uma vez**, na interface.

## 1. Subir

```bash
docker compose -f infra/nexus/docker-compose.yml up -d
```

O primeiro boot leva de 2 a 4 minutos (mais em Mac ARM, onde a imagem roda
emulada). Acompanhe:

```bash
docker compose -f infra/nexus/docker-compose.yml logs -f
```

Está pronto quando isto responde `200`:

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8081/service/rest/v1/status
```

## 2. Primeiro acesso

A senha inicial do `admin` é gerada no volume:

```bash
docker exec revende-nexus cat /nexus-data/admin.password
```

Acesse <http://localhost:8081>, entre como `admin` com essa senha e troque-a no
assistente. **Mantenha o acesso anônimo desabilitado** quando o assistente
perguntar: repositório de artefato aberto é repositório que qualquer um empurra.

## 3. Criar o repositório Docker hosted

Em **Settings (⚙) → Repository → Repositories → Create repository → `docker (hosted)`**:

| Campo | Valor |
| ----- | ----- |
| Name | `docker-hosted` |
| HTTP connector port | `5000` |
| Allow anonymous docker pull | desmarcado |
| Enable Docker V1 API | desmarcado |
| Deployment policy | `Allow redeploy` |

A porta `5000` já está publicada no `docker-compose.yml`. Ela é separada da 8081
porque a API do Docker Registry exige porta ou subdomínio próprios — não existe
como servi-la sob um path.

## 4. Ligar o realm de autenticação do Docker

Em **Settings (⚙) → Security → Realms**, mova **Docker Bearer Token Realm** para
a coluna *Active* e salve.

Sem isso o `docker login` falha com `401`, mesmo com usuário e senha corretos —
é o erro mais comum nesta configuração.

## 5. Criar o usuário da pipeline

Em **Settings (⚙) → Security → Users → Create local user**:

- ID: `ci-publisher`
- Roles: uma role com os privilégios `nx-repository-view-docker-docker-hosted-add`
  e `...-edit` (crie em *Security → Roles*)

Não use o `admin` na pipeline: quando a credencial vazar — e credencial de CI
vaza — o estrago fica limitado a publicar imagem, não a administrar o Nexus.

## 6. Registry inseguro (só em desenvolvimento local)

O conector da porta 5000 fala HTTP puro. O Docker recusa registries HTTP por
padrão. Em **Docker Desktop → Settings → Docker Engine**, acrescente:

```json
{ "insecure-registries": ["localhost:5000"] }
```

Isto é aceitável em máquina de desenvolvimento e **não** em rede compartilhada.
Numa instalação real, ponha um proxy reverso com TLS na frente e remova esta
exceção.

## 7. Testar o fluxo à mão

```bash
docker login localhost:5000 -u ci-publisher
docker build -t localhost:5000/revende-frontend:teste \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8080 \
  --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 .
docker push localhost:5000/revende-frontend:teste
```

Confirme em **Browse → docker-hosted**.

## 8. Ligar a pipeline

A pipeline só publica quando o repositório tem estas configurações. Enquanto
faltarem, o estágio de deploy é pulado com um aviso no painel — de propósito,
para não deixar a `main` vermelha por configuração ausente.

**Variável** (Settings → Secrets and variables → Actions → Variables):

| Nome | Exemplo |
| ---- | ------- |
| `NEXUS_REGISTRY` | `nexus.seudominio.com.br:5000` |
| `NEXUS_IMAGE` | `revende-frontend` |
| `UAT_API_URL` | `https://revende-backend-....run.app` |
| `UAT_SITE_URL` | `https://homologacao.seudominio.com.br` |

**Segredos** (mesma tela, aba Secrets):

| Nome | O quê |
| ---- | ----- |
| `NEXUS_USERNAME` | `ci-publisher` |
| `NEXUS_PASSWORD` | a senha desse usuário |

## Limitação importante

**Um Nexus em `localhost` não é alcançável pelo runner do GitHub.** O runner é
uma máquina efêmera na nuvem; `localhost` lá é ela mesma.

Para a publicação sair de verdade, uma das três:

1. **Runner self-hosted** na máquina ou na rede onde o Nexus roda — é o caminho
   mais direto para um Nexus local.
2. **Expor o Nexus** em endereço público com TLS (proxy reverso, ou um túnel
   como `cloudflared` em ambiente de estudo).
3. **Subir o Nexus no GCP**, no mesmo projeto do backend, e apontar
   `NEXUS_REGISTRY` para lá.

Até então o `docker compose` daqui serve para desenvolver e testar o fluxo
localmente, com o passo 7 acima.
