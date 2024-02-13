import { createFilenameLogger } from "../../logger";
import { getPrisma } from "../../prisma/prisma";
import type { T_Cart } from "../../trpc/router/cart/cart.interface";
import { convert_PrismaCart_to_TCart } from "./cart.utils";

const logger = createFilenameLogger(import.meta.url);

export class CartService {
  static async getCart(
    user_id: string,
    prisma = getPrisma()
  ): Promise<T_Cart[]> {
    logger.debug({ user_id }, "getCart");
    const prisma_carts = await prisma.cart.findMany({
      where: {
        user_id,
      },
    });

    return prisma_carts.map(convert_PrismaCart_to_TCart);
  }

  static async updateCart(
    user_id: string,
    cart: T_Cart[],
    prisma = getPrisma()
  ): Promise<void> {
    logger.debug({ user_id, cart }, "updateCart");
    for (const cart_item of cart) {
      if (cart_item.user_id !== user_id) {
        logger.error("Invalid update cart input");
        throw new Error("Invalid update cart input");
      }
    }

    await prisma.$transaction(async (prisma_trx) => {
      await prisma_trx.cart.deleteMany({
        where: {
          user_id,
        },
      });
      await prisma_trx.cart.createMany({
        data: cart,
      });
    });
  }
}
