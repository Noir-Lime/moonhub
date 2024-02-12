import type { NFT } from "opensea-js";
import type { T_Cart } from "../trpc/router/cart/cart.interface";

export const combineNftandCollectionID = (
  nft_id: string,
  collection: string
): string => {
  return `${nft_id}_${collection}`;
};

export const reduceNftToID = (nft: NFT): string => {
  return combineNftandCollectionID(nft.identifier, nft.collection);
};

export const reduceCartItem = (cart_item: T_Cart): string => {
  return combineNftandCollectionID(cart_item.nft_id, cart_item.collection);
};
