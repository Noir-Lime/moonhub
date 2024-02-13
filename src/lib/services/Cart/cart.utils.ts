import type { Cart } from "@prisma/client";
import type { T_Cart } from "../../trpc/router/cart/cart.interface";
import { createFilenameLogger } from "../../logger";

const logger = createFilenameLogger(import.meta.url);

export const convert_PrismaCart_to_TCart = (cart: Cart): T_Cart => {
  logger.trace({ cart }, "Convert PrismaCart to TCart");
  return {
    ...cart,
    image_url: cart.image_url ?? undefined,
  };
};
