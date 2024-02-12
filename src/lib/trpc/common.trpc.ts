import { initTRPC } from "@trpc/server"

const t = initTRPC.create();

export const trpc_router = t.router;
export const public_procedure = t.procedure;