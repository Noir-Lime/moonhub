import { Type, type Static } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

export const Typebox_SendMessageInput = Type.Object({
  message: Type.String(),
});

export const Typebox_RespondToUser = Type.Object({
  message: Type.String(),
});
export const Compiled_Typebox_RespondToUser = TypeCompiler.Compile(
  Typebox_RespondToUser
);
export type T_RespondToUser = Static<typeof Typebox_RespondToUser>;

export const Typebox_GetEmails = Type.Object({
  message: Type.String({
    description: "The message to send to the user confirming the action.",
  }),
  args: Type.Object({
    page: Type.Number(),
    per_page: Type.Number(),
    type: Type.Union([Type.Literal("inbox"), Type.Literal("unread")]),
  }),
});
export const Compiled_Typebox_GetEmails =
  TypeCompiler.Compile(Typebox_GetEmails);
export type T_GetEmails = Static<typeof Typebox_GetEmails>;

export const Typebox_ScheduleEmailSequence = Type.Object({
  message: Type.String({
    description: "The message to send to the user confirming the action.",
  }),
  args: Type.Object({
    recipient: Type.String({
      description: "The name, not email, of the recipient.",
    }),
    sequence: Type.Array(
      Type.Object({
        time: Type.String({
          description: "Format: 'YYYY-MM-DDTHH:MM:SSZ'.",
        }),
        title: Type.String(),
        body: Type.String(),
      }),
      {
        description:
          "The sequence of emails to send. The next on the list will be sent if no response is received from the user.",
      }
    ),
  }),
});
export const Compiled_Typebox_ScheduleEmailSequence = TypeCompiler.Compile(
  Typebox_ScheduleEmailSequence
);
export type T_ScheduleEmailSequence = Static<
  typeof Typebox_ScheduleEmailSequence
>;

export const Typebox_MessageResponse = Type.Object({
  message: Type.String(),
  function_call: Type.Optional(
    Type.Object({
      name: Type.String(),
      args: Type.Record(Type.String(), Type.Any()),
    })
  ),
});
export const Compiled_Typebox_MessageResponse = TypeCompiler.Compile(
  Typebox_MessageResponse
);
export type T_MessageResponse = Static<typeof Typebox_MessageResponse>;
