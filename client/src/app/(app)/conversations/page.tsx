"use client";

import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllConversations } from "@/lib/api/conversations";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function ConversationsPage() {
  const {
    data: conversations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getAllConversations,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-80 animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h1 className="text-lg font-semibold">
            Unable to load conversations
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while loading your conversations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          CONVERSATION HISTORY
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Conversations
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Continue asking questions about your analyzed videos.
        </p>
      </div>

      {conversations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-muted">
              <MessageSquare className="size-5 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-sm font-semibold">
              No conversations yet
            </h2>

            <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
              Open an analyzed video and ask your first question.
            </p>

            <Button className="mt-5" asChild>
              <Link href="/videos">
                Browse videos
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base">
              Your conversations
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              {conversations.length}{" "}
              {conversations.length === 1
                ? "conversation"
                : "conversations"}
            </p>
          </CardHeader>

          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {conversations.map((conversation) => {
                const videoTitle =
                  conversation.video?.analysis?.title ??
                  "Untitled video";

                return (
                  <Link
                    key={conversation.id}
                    href={`/videos/${conversation.videoId}/conversation`}
                    className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <MessageSquare className="size-4 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-3.5 shrink-0 text-primary" />

                        <p className="truncate text-sm font-medium">
                          {conversation.title ??
                            "Video conversation"}
                        </p>
                      </div>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {videoTitle}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {conversation.messages.length}{" "}
                        {conversation.messages.length === 1
                          ? "message"
                          : "messages"}{" "}
                        · {formatDate(conversation.updatedAt ?? conversation.createdAt)}
                      </p>
                    </div>

                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}