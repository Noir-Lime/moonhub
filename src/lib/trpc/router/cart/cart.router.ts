import { createFilenameLogger } from "../../../logger";
import { public_procedure, trpc_router } from "../../common.trpc";
import { prisma } from "../../../prisma/prisma";
import { CompiledCheck } from "../../../typebox/compile";
import {
  Type_Cart,
  Type_User_Id,
  Update_Cart_Input,
  type T_Cart,
} from "./cart.interface";
import { Type } from "@sinclair/typebox";
import { TRPCError } from "@trpc/server";
import { convert_PrismaCart_to_TCart } from "./cart.utils";

const logger = createFilenameLogger(import.meta.url);

export const cart_router = trpc_router({
  get_cart: public_procedure
    .input(CompiledCheck(Type_User_Id))
    .output(CompiledCheck(Type.Array(Type_Cart)))
    .query(async ({ input }): Promise<T_Cart[]> => {
      const prisma_carts = await prisma.cart.findMany({
        where: {
          user_id: input.user_id,
        },
      });

      return prisma_carts.map(convert_PrismaCart_to_TCart);
    }),

  update_cart: public_procedure
    .input(CompiledCheck(Update_Cart_Input))
    .mutation(async ({ input }): Promise<void> => {
      for (const cart_item of input.cart) {
        if (cart_item.user_id !== input.user_id) {
          logger.error("Invalid update cart input");
          throw new TRPCError({
            code: "BAD_REQUEST",
          });
        }
      }

      await prisma.$transaction(async (prisma_trx) => {
        await prisma_trx.cart.deleteMany({
          where: {
            user_id: input.user_id,
          },
        });
        await prisma_trx.cart.createMany({
          data: input.cart,
        });
      });
    }),
});
export type Cart_Router = typeof cart_router;
