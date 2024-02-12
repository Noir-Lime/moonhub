import { httpBatchLink } from "@trpc/client";

export const shared_client_args = {
  links: [
    httpBatchLink({
      url: "/trpc",
    }),
  ],
};
