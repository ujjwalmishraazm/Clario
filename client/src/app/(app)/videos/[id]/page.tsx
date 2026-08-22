"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { VideoAnalysisWorkspace } from "@/components/videos/video-analysis-workspace";
import { VideoProcessingState } from "@/components/videos/video-processing-state";
import { getVideoById } from "@/lib/api/videos";

export default function VideoPage() {
  const params = useParams<{ id: string }>();
  const videoId = params.id;

  const {
    data: video,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId),
    enabled: Boolean(videoId),
  });

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-5xl items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />

          <p className="mt-4 text-sm text-muted-foreground">
            Loading video...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !video) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-5xl items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">
            Unable to load video
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "The video could not be found."}
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-flex text-sm font-medium underline underline-offset-4"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to dashboard
        </Link>
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground">
          VIDEO ANALYSIS
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Video workspace
        </h1>

        <p className="mt-2 max-w-3xl break-all text-sm text-muted-foreground">
          {video.youtubeUrl}
        </p>
      </div>

      {video.status === "READY" ? (
        <VideoAnalysisWorkspace video={video} />
      ) : (
        <VideoProcessingState
          status={video.status}
          errorMessage={video.errorMessage}
          videoId={video.id}
        />
      )}
    </div>
  );
}