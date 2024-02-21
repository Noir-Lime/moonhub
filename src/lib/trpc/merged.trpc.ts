import { mergeRouters } from "@trpc/server/unstable-core-do-not-import";
import { chat_router } from "./router/chat.router";

export const merged_router = mergeRouters(chat_router);
