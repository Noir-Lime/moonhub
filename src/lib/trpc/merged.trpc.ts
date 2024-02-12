import { mergeRouters } from "@trpc/server/unstable-core-do-not-import";
import { root_router } from "./router/root.router";

export const merged_router = mergeRouters(root_router);
export type Merged_Router = typeof merged_router;
