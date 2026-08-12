FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies (cached separately from source for faster rebuilds)
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the app
FROM base AS build
RUN apt-get update && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Minimal runtime image
FROM oven/bun:1-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["bun", ".output/server/index.mjs"]
