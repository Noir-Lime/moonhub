import { TypeCompiler } from "@sinclair/typebox/compiler";
import type { Static, TSchema } from "@sinclair/typebox";
import { createFilenameLogger } from "../logger";

const logger = createFilenameLogger(import.meta.url);
export function CompiledCheck<T extends TSchema>(
  schema: T,
  references: TSchema[] = []
): (input: unknown) => Static<T> {
  logger.trace({ schema, references }, "CompiledCheck");

  const check = TypeCompiler.Compile(schema, references);
  return (input: unknown): Static<T> => {
    if (check.Check(input)) return input as Static<T>;
    throw Error("Invalid Input");
  };
}
