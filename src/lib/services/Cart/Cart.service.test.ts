import { PrismaClient } from "@prisma/client";
import { beforeEach, describe, expect, test } from "vitest";
import { CartService } from "./Cart.service";

const TEST_DB_PASSWORD = process.env.TEST_DB_PASSWORD;
const TEST_DB_USER = process.env.TEST_DB_USER;
const TEST_DB_NAME = process.env.TEST_DB_NAME;
const TEST_DB_PORT = process.env.TEST_DB_PORT;

if (!TEST_DB_PASSWORD) throw new Error("TEST_DB_PASSWORD is not set");
if (!TEST_DB_USER) throw new Error("TEST_DB_USER is not set");
if (!TEST_DB_NAME) throw new Error("TEST_DB_NAME is not set");
if (!TEST_DB_PORT) throw new Error("TEST_DB_PORT is not set");

const test_prisma = new PrismaClient({
  datasourceUrl: `postgresql://${TEST_DB_USER}:${TEST_DB_PASSWORD}@localhost:${TEST_DB_PORT}/${TEST_DB_NAME}`,
});

describe("CartService", () => {
  beforeEach(async () => {
    await test_prisma.cart.deleteMany({});
  });

  describe("getCart", () => {
    test("should return the cart for the user", async () => {
      const user_id_1 = "user_id_1";
      const user_id_2 = "user_id_2";

      await test_prisma.cart.createMany({
        data: [
          {
            collection: "collection_1",
            nft_id: "nft_id_1",
            user_id: user_id_1,
          },
          {
            collection: "collection_2",
            nft_id: "nft_id_2",
            user_id: user_id_1,
          },
          {
            collection: "collection_3",
            nft_id: "nft_id_3",
            user_id: user_id_2,
          },
          {
            collection: "collection_4",
            nft_id: "nft_id_4",
            user_id: user_id_2,
          },
        ],
      });

      const user_1_cart = await CartService.getCart(user_id_1, test_prisma);
      const user_2_cart = await CartService.getCart(user_id_2, test_prisma);

      expect(user_1_cart).toEqual([
        {
          collection: "collection_1",
          nft_id: "nft_id_1",
          user_id: user_id_1,
        },
        {
          collection: "collection_2",
          nft_id: "nft_id_2",
          user_id: user_id_1,
        },
      ]);
      expect(user_2_cart).toEqual([
        {
          collection: "collection_3",
          nft_id: "nft_id_3",
          user_id: user_id_2,
        },
        {
          collection: "collection_4",
          nft_id: "nft_id_4",
          user_id: user_id_2,
        },
      ]);
    });
  });

  describe("updateCart", () => {
    test("should update the cart for the user", async () => {
      const user_id = "user_id";

      await CartService.updateCart(
        user_id,
        [
          {
            collection: "collection_1",
            nft_id: "nft_id_1",
            user_id,
          },
          {
            collection: "collection_2",
            nft_id: "nft_id_2",
            user_id,
          },
        ],
        test_prisma
      );

      const user_cart = await CartService.getCart(user_id, test_prisma);

      expect(user_cart).toEqual([
        {
          collection: "collection_1",
          nft_id: "nft_id_1",
          user_id,
        },
        {
          collection: "collection_2",
          nft_id: "nft_id_2",
          user_id,
        },
      ]);

      await CartService.updateCart(
        user_id,
        [
          {
            collection: "collection_3",
            nft_id: "nft_id_3",
            user_id,
          },
          {
            collection: "collection_4",
            nft_id: "nft_id_4",
            user_id,
          },
        ],
        test_prisma
      );

      const user_cart_updated = await CartService.getCart(user_id, test_prisma);

      expect(user_cart_updated).toEqual([
        {
          collection: "collection_3",
          nft_id: "nft_id_3",
          user_id,
        },
        {
          collection: "collection_4",
          nft_id: "nft_id_4",
          user_id,
        },
      ]);
    });
  });
});
