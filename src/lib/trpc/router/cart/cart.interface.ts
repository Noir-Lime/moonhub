import { Type, type Static } from "@sinclair/typebox";

export const Type_User_Id = Type.Object({
  user_id: Type.String(),
});

export const Type_Cart = Type.Object({
  user_id: Type.String(),
  nft_id: Type.String(),
  collection: Type.String(),
  image_url: Type.Optional(Type.String()),
});
export type T_Cart = Static<typeof Type_Cart>;

export const Update_Cart_Input = Type.Composite([
  Type_User_Id,
  Type.Object({
    cart: Type.Array(Type_Cart),
  }),
]);
export type T_Update_Cart_Input = Static<typeof Update_Cart_Input>;
