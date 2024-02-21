# Moonhub Take-home challenge - James Zhao

### Tech stack
Bun ( or Nodejs )
Vite + Vike
React
tRPC

### Other technologies used

OpenAI (GPT-3 & GPT-4)
Typebox
Mutative
React Query
Material UI
Pino
CSSModules
ExpressJS
Chat-UI-Kit

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
2. Bun over NodeJS - Very fast runtime, startup times are almost instant.
3. Typebox over zod - Zod is notoriously hard on the typescript compiler: https://dev.to/nicklucas/typescript-runtime-validators-and-dx-a-type-checking-performance-analysis-of-zodsuperstructyuptypebox-5416
4. Mutative - Faster, better than immer and manual mutations: https://github.com/unadlib/mutative
5. ExpressJS - With Bun, express becomes very respectiable in terms of speed. Also, has first class support with Vike.
6. MUI - Looks nice without much effort

### Issues encountered

https://github.com/remix-run/remix/discussions/8482

### Goals Addressed
I designed a rudimentary front end system for a simple Chatbot that enables the user to chat and have the bot complete simple tasks such as retreiving and scheduling emails.

It is easily extensible and can be shaped into anything based off of this boilerplate.

The bot currently has 2 functions implemented: Get Emails, Schedule Email Sequence. The arguments for these functions are defined in src/lib/trpc/router/chat.types.ts

##### Frontend Architecture

The frontend architecture consists of using Vite + Vike as the main driver behind the server, bundler, static generator, etc. This is because Vite is widely considered the spiritual successor to webpack, and is extremely fast at bundling projects together. Vike allows us to "DIY" our own NextJS and implement things like static site generation, server side rendering, and more all in one npm package.

Frontend Framework chosen is React. It's the go to framework for complex, robust apps.

##### Flow of Data
The data flow is simple. User launches the app and sends a chat message. This starts a request to the server, which calls upon OpenAI's model to respond with the appropriate function and arguments. once that's done, the results are given back to the front end where it is displayed as a response from the AI Agent in the chat window.

##### API's Needed for Frontend <> Backend communication
tRPC is chosen as the interconnect between front and back end. It is very intuitive to use, easy to extend, and enables vastly greater developer velocity than other frameworks like GraphQL.

Currently there is only one tRPC route declared, 'sendMessage'. This takes in a user's new message and returns a response which may include a function call.

##### Scaling Up
This boilerplate implements a system that can be easily scaled up to 100k MAU and beyond.

Using Bun + Express on the backend, performance shouldn't be a concern at 100k MAU. Vite + Vike ensures that it is not a React SPA, which means each page has its own static bundle, which reduces load times and ensures that there is scalability if new pages and features need to be added. High performance frameworks are chosen over slower ones, such as Typebox over Zod to ensure low latency and high throughput. Streaming could be enabled on the backend with OpenAI models to further decrease First Token latency. Static site generation with Vike ensures page load times are snappy and extremely performant. A database could be attached to the service which allows users to save chat history and see previous actions, which could be done through something like Prisma or EdgeDB.
