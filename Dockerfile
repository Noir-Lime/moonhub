FROM imbios/bun-node as builder
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
COPY ./server ./server
COPY ./scripts ./scripts

RUN bun install --frozen-lockfile
RUN npm run prebuild
RUN bun run build

ENV NODE_ENV="production"
ENV DATABASE_URL=""
ENV OPENSEA_API_KEY=""

EXPOSE 3000

CMD ["bun", "run", "start"]