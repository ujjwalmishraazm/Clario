"use client";

import { AlertCircle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type VideoStatus =
  | "PENDING"
  | "PROCESSING"
  | "READY"
  | "FAILED";

type VideoProcessingStateProps = {
  status: VideoStatus;
  errorMessage?: string | null;
  videoId: string;
};

export function VideoProcessingState({
  status,
  errorMessage,
  videoId,
}: VideoProcessingStateProps) {
  const router = useRouter();

  if (status === "READY") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-7 text-primary" />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            Your video is ready
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            The video has been transcribed and analyzed successfully.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (status === "FAILED") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="size-7 text-destructive" />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            Video processing failed
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {errorMessage ||
              "Something went wrong while processing your video."}
          </p>

          <Button
            className="mt-6"
            onClick={() => router.refresh()}
          >
            <RefreshCw className="mr-2 size-4" />
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full border border-border bg-muted">
          <Loader2 className="size-7 animate-spin" />
        </div>

        <h2 className="mt-5 text-xl font-semibold">
          {status === "PENDING"
            ? "Preparing your video"
            : "Analyzing your video"}
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {status === "PENDING"
            ? "Your video has been added and is waiting to be processed."
            : "AI is extracting the audio, generating the transcript, and creating insights. This may take a little while."}
        </p>

        <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
          <span
            className={
              status === "PENDING"
                ? "font-medium text-foreground"
                : ""
            }
          >
            Added
          </span>

          <span>→</span>

          <span
            className={
              status === "PROCESSING"
                ? "font-medium text-foreground"
                : ""
            }
          >
            Processing
          </span>

          <span>→</span>

          <span>Ready</span>
        </div>
      </CardContent>
    </Card>
  );
}