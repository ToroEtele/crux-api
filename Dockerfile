FROM node:22.20.0-alpine AS build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:22.20.0-alpine
WORKDIR /app

RUN apk add --no-cache openssl
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY locales locales
COPY assets assets

EXPOSE 4000

CMD ["sh", "-c", "pnpm run migration:run && pnpm run server:prod"]
