import type { QueryFunctionContext } from "@tanstack/react-query";
import { trpc_cart_client } from "../../lib/trpc/client/root.client.trpc";
import type {
  T_Cart,
  T_Update_Cart_Input,
} from "../../lib/trpc/router/cart/cart.interface";
import { combineNftandCollectionID, reduceNftToID } from "../../lib/utils/nft";
import type { NFT } from "opensea-js";
import { trpc_asset_client } from "../../lib/trpc/client/asset.client.trpc";

export const Cart_Q_Key = "get_cart";
export const getCart_Key = (user_id: string) => [Cart_Q_Key, user_id] as const;
export const getCart_Fn = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<typeof getCart_Key>>): Promise<
  Map<string, T_Cart>
> => {
  const cart_list = await trpc_cart_client.get_cart.query({
    user_id: queryKey[1],
  });

  const cart_map = new Map<string, T_Cart>();

  for (const cart_item of cart_list) {
    cart_map.set(
      combineNftandCollectionID(cart_item.nft_id, cart_item.collection),
      cart_item
    );
  }

  return cart_map;
};

export const updateCart_Fn = async (
  input: T_Update_Cart_Input
): Promise<void> => {
  console.debug("Update Cart");
  await trpc_cart_client.update_cart.mutate(input);
};

export const Opensea_Q_Key = "opensea_nfts";
export const getOpenseaNfts_Fn = async (): Promise<Map<string, NFT>> => {
  // Set minimum delay to 1 second
  const [response] = await Promise.all([
    trpc_asset_client.get_assets.query(),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);

  const nft_map = new Map<string, NFT>();
  for (const nft of response.nfts) {
    nft_map.set(reduceNftToID(nft), nft);
  }

  return nft_map;
};
