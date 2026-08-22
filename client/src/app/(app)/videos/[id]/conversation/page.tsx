import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";

import { VideoChat } from "@/components/videos/video-chat";

type ConversationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ConversationPage({
  params,
}: ConversationPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <Link
          href={`/videos/${id}`}
          className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to video
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <MessageSquare className="size-5 text-primary" />
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              VIDEO CONVERSATION
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Ask this video
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Ask questions about this video and get answers grounded in
          its content.
        </p>
      </div>

      <VideoChat videoId={id} />
    </div>
  );
}