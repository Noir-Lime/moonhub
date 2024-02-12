import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { Root_Router } from "../router/root.router";

export const trpc_root_client = createTRPCClient<Root_Router>({
  links: [
    httpBatchLink({
      url: "/trpc",
    }),
  ],
});
