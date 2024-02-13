import type { ListNFTsResponse } from "opensea-js";
import { createFilenameLogger } from "../../../logger";
import { OpenseaService } from "../../../services/Opensea/Opensea.service";
import { public_procedure, trpc_router } from "../../common.trpc";

const logger = createFilenameLogger(import.meta.url);

export const asset_router = trpc_router({
  get_assets: public_procedure.query(async (): Promise<ListNFTsResponse> => {
    logger.debug("get_assets");
    return await OpenseaService.getAssets();
  }),
});
export type Asset_Router = typeof asset_router;
