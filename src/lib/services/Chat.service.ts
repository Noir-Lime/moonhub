import OpenAI from "openai";
import {
  Typebox_RespondToUser,
  Compiled_Typebox_RespondToUser,
  Typebox_GetEmails,
  type T_MessageResponse,
  Compiled_Typebox_GetEmails,
  Typebox_ScheduleEmailSequence,
  Compiled_Typebox_ScheduleEmailSequence,
} from "../trpc/router/chat.types";

const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

enum ChatFunction {
  RespondToUser = "respondToUser",
  GetEmails = "getEmails",
  ScheduleEmail = "scheduleEmail",
}

export class ChatService {
  static async sendMessage(message: string): Promise<T_MessageResponse> {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: [
            `You are a helpful assistant called "Moonhub AI".`,
            "You are given a few functions to call to help the user with their task.",
            "You must respond to the user with the function call and its arguments.",
            `It is currently ${new Date().toLocaleString()}`,
          ].join("\n"),
        },
        {
          role: "user",
          content: message,
        },
      ],
      functions: [
        {
          name: ChatFunction.RespondToUser,
          description: "Respond to the user without any other action.",
          parameters: JSON.parse(JSON.stringify(Typebox_RespondToUser)),
        },
        {
          name: ChatFunction.GetEmails,
          description: "Get emails from the user's inbox.",
          parameters: JSON.parse(JSON.stringify(Typebox_GetEmails)),
        },
        {
          name: ChatFunction.ScheduleEmail,
          description: "Schedule an email to be sent to the user.",
          parameters: JSON.parse(JSON.stringify(Typebox_ScheduleEmailSequence)),
        },
      ],
    });

    console.debug(response.choices[0]?.message);

    let response_msg: string | undefined = undefined;
    let response_fn_call: T_MessageResponse["function_call"];

    if (response.choices[0]?.message.content) {
      response_msg = response.choices[0]?.message.content;
    }

    if (response.choices[0]?.message.function_call) {
      const args = JSON.parse(
        response.choices[0]?.message.function_call.arguments
      );
      const name = response.choices[0]?.message.function_call.name;

      switch (name) {
        case ChatFunction.RespondToUser: {
          if (Compiled_Typebox_RespondToUser.Check(args)) {
            response_msg = args.message;
          }

          break;
        }
        case ChatFunction.GetEmails: {
          if (Compiled_Typebox_GetEmails.Check(args)) {
            response_msg = args.message;
            response_fn_call = {
              name,
              args: args.args,
            };
          }

          break;
        }
        case ChatFunction.ScheduleEmail: {
          if (Compiled_Typebox_ScheduleEmailSequence.Check(args)) {
            response_msg = args.message;
            response_fn_call = {
              name,
              args: args.args,
            };
          }

          break;
        }
      }
    }

    if (!response_msg) throw new Error("No response from OpenAI");

    return {
      message: response_msg,
      function_call: response_fn_call,
    };
  }
}
