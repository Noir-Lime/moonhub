import { mergeRouters } from "@trpc/server/unstable-core-do-not-import";
import { cart_router } from "./router/cart/cart.router";
import { asset_router } from "./router/asset/asset.router";

export const merged_router = mergeRouters(cart_router, asset_router);
export type Merged_Router = typeof merged_router;
