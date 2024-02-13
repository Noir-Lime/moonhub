import { public_procedure, trpc_router } from "../../common.trpc";
import { CompiledCheck } from "../../../typebox/compile";
import {
  Type_Cart,
  Type_User_Id,
  Update_Cart_Input,
  type T_Cart,
} from "./cart.interface";
import { Type } from "@sinclair/typebox";
import { CartService } from "../../../services/Cart/Cart.service";
import { createFilenameLogger } from "../../../logger";

const logger = createFilenameLogger(import.meta.url);

export const cart_router = trpc_router({
  get_cart: public_procedure
    .input(CompiledCheck(Type_User_Id))
    .output(CompiledCheck(Type.Array(Type_Cart)))
    .query(async ({ input }): Promise<T_Cart[]> => {
      logger.debug({ input }, "get_cart");
      return CartService.getCart(input.user_id);
    }),

  update_cart: public_procedure
    .input(CompiledCheck(Update_Cart_Input))
    .mutation(async ({ input }): Promise<void> => {
      logger.debug({ input }, "update_cart");
      await CartService.updateCart(input.user_id, input.cart);
    }),
});
export type Cart_Router = typeof cart_router;
