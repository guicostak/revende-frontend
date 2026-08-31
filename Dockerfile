# syntax=docker/dockerfile:1

# ---------- dependências ----------
# Camada própria: mudar código não refaz o npm ci.
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# `NEXT_PUBLIC_*` é inlinado no bundle em tempo de BUILD, não lido em runtime.
# Por isso a URL da API entra como build arg: a imagem de homologação e a de
# produção são artefatos diferentes, ainda que do mesmo commit.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---------- runtime ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Container não roda como root. Vários hosts recusam se rodar.
RUN addgroup -S nodejs -g 1001 && adduser -S nextjs -u 1001 -G nodejs

# O standalone traz o server.js e só as dependências usadas; `static` e `public`
# ficam de fora dele de propósito e precisam ser copiados à parte.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# HOSTNAME 0.0.0.0: o padrão do standalone escuta só em localhost, e o
# container ficaria inalcançável de fora.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
