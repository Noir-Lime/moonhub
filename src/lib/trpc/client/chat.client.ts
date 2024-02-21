import { createTRPCClient } from "@trpc/client";
import type { ChatRouter } from "../router/chat.router";
import { shared_client_args } from "./shared";

export const trpc_chat_client =
  createTRPCClient<ChatRouter>(shared_client_args);
