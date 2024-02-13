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
import { renderPage } from "vike/server";
import { root_dirname } from "../root";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { merged_router } from "../src/lib/trpc/merged.trpc";
import { createFilenameLogger, root_logger } from "../src/lib/logger";
import path from "path";

const logger = createFilenameLogger(import.meta.url);

const is_production = process.env.NODE_ENV === "production";

const launchServer = async (): Promise<void> => {
  const app = Express();

  if (is_production) {
    root_logger.info("Running in production mode");
    app.use(Express.static(path.join(root_dirname, "dist/client")));
  } else {
    root_logger.info("Running in development mode");
    const vite = await import("vite");
    const vite_dev_server = await vite.createServer({
      root: root_dirname,
      server: {
        middlewareMode: true,
      },
    });
    app.use(vite_dev_server.middlewares);
  }

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

    rendered_page.httpResponse.pipe(res);
  });

  const port = import.meta.env.PORT || 3000;

  app.listen(import.meta.env.PORT || 3000, () => {
    root_logger.info(`Server is running on port ${port}`);
  });
};

launchServer();
