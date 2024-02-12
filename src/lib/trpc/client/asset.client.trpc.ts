import { createTRPCClient } from "@trpc/client";
import { shared_client_args } from "./shared";
import type { Asset_Router } from "../router/asset.router";

export const trpc_asset_client =
  createTRPCClient<Asset_Router>(shared_client_args);
