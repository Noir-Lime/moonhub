import type { Cart } from "@prisma/client";
import type { T_Cart } from "./cart.interface";

export const convert_PrismaCart_to_TCart = (cart: Cart): T_Cart => {
  return {
    ...cart,
    image_url: cart.image_url ?? undefined,
  };
};
