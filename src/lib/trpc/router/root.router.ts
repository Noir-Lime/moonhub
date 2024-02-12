import type { ListNFTsResponse } from "opensea-js";
import { createFilenameLogger } from "../../logger";
import { OpenseaService } from "../../services/Opensea.service";
import { public_procedure, trpc_router } from "../common.trpc";

const logger = createFilenameLogger(import.meta.url);

export const root_router = trpc_router({
  hello_world: public_procedure.query(async () => {
    logger.debug("hello_world");

    return "Hello, world!";
  }),

  get_assets: public_procedure.query(async (): Promise<ListNFTsResponse> => {
    return await OpenseaService.getAssets();
  }),
});
export type Root_Router = typeof root_router;
