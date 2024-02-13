FROM node:18 as builder
WORKDIR /app
ENV NODE_ENV=production

COPY ./vite.config.ts ./
COPY ./package.json ./
COPY ./.eslintrc ./
COPY ./tsconfig.json ./
COPY ./bun.lockb ./
COPY ./root.ts ./

COPY ./prisma ./prisma
COPY ./src ./src
COPY ./scripts ./scripts

RUN bun install --frozen-lockfile
RUN bun run build

# Keep container running
CMD ["tail", "-f", "/dev/null"]

FROM oven/bun:1 as runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src/server ./src/server
COPY --from=builder /app/root.ts ./

ENV NODE_ENV="production"
ENV DATABASE_URL=""
ENV OPENSEA_API_KEY=""

EXPOSE 3000

CMD ["bun", "run", "start"]