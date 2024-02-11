import SourceMapSupport from "source-map-support";
if (process.versions.bun) {
  SourceMapSupport.install({
    emptyCacheBetweenOperations: true,
    overrideRetrieveSourceMap: true,
    retrieveSourceMap: (source) => {
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

const launchServer = async () => {
  const app = Express();

  const vite_dev_middleware = (
    await createServer({
      root: root_dirname,
      plugins: [react(), vike({ prerender: true })],
      server: {
        middlewareMode: true,
      },
      appType: "custom",
    })
  ).middlewares;

  app.use(vite_dev_middleware);

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
