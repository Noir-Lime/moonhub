# Kinetic Take-home challenge - James Zhao
### Tech stack
Prisma + Postgres
Bun ( or Nodejs )
Vite + Vike
React
Docker
Vitest
tRPC

### Other technologies used
Typebox
Mutative
React Query
Material UI
Pino
CSSModules
ExpressJS

### Dev
```
bun run setup:dev
bun run dev
```
### Prod
```
bun run build
bun run prod
```

### Architectural Decisions
1. Vite + Vike - This combination is compatible with bun, and is the closest thing to a fully featured framework like NextJS.
2. Prisma + Postgres - Tried and true, battle tested combination that I'm familiar working with.
3. Bun over NodeJS - Very fast runtime, startup times are almost instant.
4. Vitest - Spiritual successor to Jest built on Vite, runs tests superfast.
5. Typebox over zod - Zod is notoriously hard on the typescript compiler: https://dev.to/nicklucas/typescript-runtime-validators-and-dx-a-type-checking-performance-analysis-of-zodsuperstructyuptypebox-5416
6. Mutative - Faster, better than immer and manual mutations: https://github.com/unadlib/mutative
7. ExpressJS - With Bun, express becomes very respectiable in terms of speed. Also, has first class support with Vike.
8. MUI - Looks nice without much effort



### Issues encountered
https://github.com/prisma/prisma/issues/21241
https://github.com/remix-run/remix/discussions/8482