import { createTRPCClient } from "@trpc/client";
import type { Cart_Router } from "../router/cart/cart.router";
import { shared_client_args } from "./shared";

export const trpc_cart_client =
  createTRPCClient<Cart_Router>(shared_client_args);
