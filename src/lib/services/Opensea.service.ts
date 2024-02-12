import { ethers } from "ethers";
const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io");

import { Chain, OpenSeaSDK } from "opensea-js";
import { createFilenameLogger } from "../logger";

const logger = createFilenameLogger(import.meta.url);

const opensea_sdk = new OpenSeaSDK(provider, {
  apiKey: process.env.OPENSEA_API_KEY,
  chain: Chain.Mainnet,
});

export class OpenseaService {
  static async getAssets() {
    logger.debug("getAssets");
    const assets = await opensea_sdk.api.getNFTsByCollection(
      "boredapeyachtclub"
    );
    return assets;
  }
}
