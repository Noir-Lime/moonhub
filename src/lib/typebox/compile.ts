import { TypeCompiler } from "@sinclair/typebox/compiler";
import type { Static, TSchema } from "@sinclair/typebox";

export function CompiledCheck<T extends TSchema>(
  schema: T,
  references: TSchema[] = []
): (input: unknown) => Static<T> {
  const check = TypeCompiler.Compile(schema, references);
  return (input: unknown): Static<T> => {
    if (check.Check(input)) return input as Static<T>;
    throw Error("Invalid Input");
  };
}
