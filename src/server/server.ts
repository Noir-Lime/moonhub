Error.stackTraceLimit = 100;

// This is necessary for bun to run properly in development.
// Bun's runtime handle source maps differently, which results in more files being loaded.
// One of these files is @babel/core which is a dependency of @vitejs/plugin-react.
// For some reason, @babel/core crashes the source map support when it's loaded by bun, but not nodejs.
import SourceMapSupport from "source-map-support";
if (process.versions.bun) {
  SourceMapSupport.install({
    overrideRetrieveSourceMap: true,
    retrieveSourceMap: () => {
      return null;
    },
  });
}

import Express from "express";
import react from "@vitejs/plugin-react";
import { createServer } from "vite";
import vike from "vike/plugin";
import { renderPage } from "vike/server";
import { root_dirname } from "../root";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { merged_router } from "../lib/trpc/merged.trpc";
import { createFilenameLogger } from "../lib/logger";

const logger = createFilenameLogger(import.meta.url);

const launchServer = async () => {
  const app = Express();

  const vite_dev_middleware = (
    await createServer({
      root: root_dirname,
      plugins: [react(), vike({ prerender: true })],
      server: {
        middlewareMode: true,
      },
    })
  ).middlewares;

  app.use(vite_dev_middleware);

  app.use(
    "/trpc",
    createExpressMiddleware({
      router: merged_router,
      batching: {
        enabled: true,
      },
      onError({ error }) {
        logger.error(error);
      },
    })
  );

  app.get("*", async (req, res, next) => {
    const rendered_page = await renderPage({
      urlOriginal: req.originalUrl,
    });

    if (!rendered_page.httpResponse) {
      return next();
    }

    const { body, statusCode, headers, earlyHints } =
      rendered_page.httpResponse;

    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });

    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode);
    res.send(body);
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

launchServer();
