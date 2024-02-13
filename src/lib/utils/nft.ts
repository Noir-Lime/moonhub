import type { NFT } from "opensea-js";
import type { T_Cart } from "../trpc/router/cart/cart.interface";
import { createFilenameLogger } from "../logger";

const logger = createFilenameLogger(import.meta.url);

export const combineNftandCollectionID = (
  nft_id: string,
  collection: string
): string => {
  logger.trace({ nft_id, collection }, "Combining NFT and collection ID");
  return `${nft_id}_${collection}`;
};

export const reduceNftToID = (nft: NFT): string => {
  logger.trace({ nft }, "Reducing NFT to ID");
  return combineNftandCollectionID(nft.identifier, nft.collection);
};

export const reduceCartItem = (cart_item: T_Cart): string => {
  logger.trace({ cart_item }, "Reducing cart item to ID");
  return combineNftandCollectionID(cart_item.nft_id, cart_item.collection);
};
