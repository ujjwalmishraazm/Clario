"use client";

import { useEffect, useState } from "react";
import { Loader2, Send, Sparkles, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import {
  createConversation,
  getConversations,
  sendMessage,
} from "@/lib/api/conversations";

type Message = {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
};

type VideoChatProps = {
  videoId: string;
};

export function VideoChat({ videoId }: VideoChatProps) {
  const [conversationId, setConversationId] = useState<string | null>(
    null,
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    async function loadConversation() {
      try {
        const conversations = await getConversations(videoId);

        if (conversations.length === 0) {
          return;
        }

        const latestConversation = conversations[0];

        setConversationId(latestConversation.id);

        setMessages(
          latestConversation.messages.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
          })),
        );
      } catch (error) {
        console.error("Failed to load conversation:", error);

        toast.error("Unable to load conversation", {
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong while loading your conversation.",
        });
      } finally {
        setIsLoadingHistory(false);
      }
    }

    loadConversation();
  }, [videoId]);

  async function handleAsk() {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isSending) {
      return;
    }

    setIsSending(true);

    try {
      let activeConversationId = conversationId;

      if (!activeConversationId) {
        const conversation = await createConversation(videoId);

        activeConversationId = conversation.id;

        setConversationId(activeConversationId);
      }

      const result = await sendMessage(
        activeConversationId,
        trimmedQuestion,
      );

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: result.userMessage.id,
          role: result.userMessage.role,
          content: result.userMessage.content,
        },
        {
          id: result.assistantMessage.id,
          role: result.assistantMessage.role,
          content: result.assistantMessage.content,
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error("Video chat error:", error);

      toast.error("Unable to get an answer", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          Ask this video
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {isLoadingHistory ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />

            <span className="ml-2 text-sm text-muted-foreground">
              Loading conversation...
            </span>
          </div>
        ) : messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "USER"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.role === "ASSISTANT" && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="size-4 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "USER"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border/60 bg-muted/40"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-6">
                    {message.content}
                  </p>
                </div>

                {message.role === "USER" && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-background">
                    <User className="size-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/60 px-6 py-8 text-center">
            <Sparkles className="mx-auto size-7 text-muted-foreground" />

            <p className="mt-3 text-sm font-medium">
              Ask anything about this video
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Ask questions about the transcript, summary, or content.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleAsk();
              }
            }}
            placeholder="Ask anything about this video..."
            disabled={isSending || isLoadingHistory}
            className="min-h-24 resize-none rounded-xl"
          />

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Press Enter to ask. Use Shift + Enter for a new line.
            </p>

            <Button
              onClick={handleAsk}
              disabled={
                !question.trim() ||
                isSending ||
                isLoadingHistory
              }
              className="rounded-xl"
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  Ask
                  <Send className="ml-2 size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}