import { PrismaClient } from "@prisma/client";
import { createFilenameLogger } from "../logger";

const logger = createFilenameLogger(import.meta.url);

export const getPrisma = (): PrismaClient => {
  logger.trace("Getting Prisma");
  return new PrismaClient();
};
