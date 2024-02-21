import { Paper, Typography } from "@mui/material";
import React from "react";
import styles from "./root.module.scss";

import cuid2 from "@paralleldrive/cuid2";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageGroup,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { create } from "mutative";
import { trpc_chat_client } from "../../lib/trpc/client/chat.client";
import { useMutation } from "@tanstack/react-query";
import type { T_MessageResponse } from "../../lib/trpc/router/chat.types";

interface I_Message {
  cuid: string;
  direction: "incoming" | "outgoing";
  content: string;
  args?: T_MessageResponse["function_call"];
}

const RootPage: React.FC = () => {
  const [messages, setMessages] = React.useState<I_Message[]>([
    {
      cuid: cuid2.createId(),
      direction: "incoming",
      content: `Hello! I am your personal assistant "Moonhub AI". I can fetch and schedule emails for you!`,
    },
  ]);

  const message_components = React.useMemo(() => {
    return messages.map((message) => {
      return (
        <MessageGroup direction={message.direction} key={message.cuid}>
          <Avatar
            src={
              message.direction === "outgoing"
                ? "https://api.dicebear.com/7.x/pixel-art/svg"
                : "https://socialmarketing90.com/wp-content/uploads/2023/12/OpenAI-Insta-Version-SVG-2.svg"
            }
          />
          <MessageGroup.Messages>
            <Message
              model={{
                direction: message.direction,
                position: "single",
              }}
            >
              <Message.CustomContent>
                <Typography>{message.content}</Typography>
                {message.args && (
                  <Typography>
                    {JSON.stringify(message.args, null, 2)}
                  </Typography>
                )}
              </Message.CustomContent>
            </Message>
          </MessageGroup.Messages>
        </MessageGroup>
      );
    });
  }, [messages]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (message: string) => {
      setMessages(
        create((draft) => {
          draft.push({
            cuid: cuid2.createId(),
            direction: "outgoing",
            content: message,
          });
        })
      );

      const response = await trpc_chat_client.send_message.mutate({
        message,
      });

      setMessages(
        create((draft) => {
          draft.push({
            cuid: cuid2.createId(),
            direction: "incoming",
            content: response.message,
            args: response.function_call,
          });
        })
      );
    },
  });

  const onMessageSend = React.useCallback(
    (msg: string) => {
      mutate(msg);
    },
    [mutate]
  );

  const typing_indicator = React.useMemo(() => {
    return isPending ? <TypingIndicator content="AI is typing..." /> : null;
  }, [isPending]);

  return (
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <MainContainer>
          <ChatContainer>
            <MessageList typingIndicator={typing_indicator}>
              {message_components}
            </MessageList>
            <MessageInput placeholder="Type a message" onSend={onMessageSend} />
          </ChatContainer>
        </MainContainer>
      </Paper>
    </div>
  );
};

export default RootPage;
