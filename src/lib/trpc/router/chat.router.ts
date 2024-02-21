import { ChatService } from "../../services/Chat.service";
import { CompiledCheck } from "../../typebox/compile";
import { public_procedure, trpc_router } from "../common.trpc";
import { Typebox_SendMessageInput } from "./chat.types";

export const chat_router = trpc_router({
  send_message: public_procedure
    .input(CompiledCheck(Typebox_SendMessageInput))
    .mutation(async ({ input }) => {
      return ChatService.sendMessage(input.message);
    }),
});
export type ChatRouter = typeof chat_router;
