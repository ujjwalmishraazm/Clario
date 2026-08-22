"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  FileVideo,
  Loader2,
  Plus,
} from "lucide-react";

import { useVideos } from "@/hooks/use-videos";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getStatusContent(
  status: "PENDING" | "PROCESSING" | "READY" | "FAILED",
) {
  switch (status) {
    case "READY":
      return {
        label: "Ready",
        className:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      };

    case "PROCESSING":
      return {
        label: "Processing",
        className:
          "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
      };

    case "FAILED":
      return {
        label: "Failed",
        className:
          "border-destructive/20 bg-destructive/10 text-destructive",
      };

    default:
      return {
        label: "Pending",
        className:
          "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
      };
  }
}

export default function VideosPage() {
  const {
    data: videos = [],
    isLoading,
    isError,
  } = useVideos();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-40 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded-lg bg-muted" />
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
            Unable to load your videos
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while loading your videos.
          </p>
        </div>
      </div>
    );
  }

  const sortedVideos = videos
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    );

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            VIDEO LIBRARY
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            My Videos
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            View and manage your analyzed YouTube videos.
          </p>
        </div>

        <Button asChild>
          <Link href="/videos/new">
            <Plus className="mr-2 size-4" />
            Analyze video
          </Link>
        </Button>
      </div>

      {sortedVideos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-muted">
              <FileVideo className="size-5 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-sm font-semibold">
              No videos yet
            </h2>

            <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
              Analyze your first YouTube video and it will appear here.
            </p>

            <Button className="mt-5" asChild>
              <Link href="/videos/new">
                Analyze a video
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base">
              All videos
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              {sortedVideos.length}{" "}
              {sortedVideos.length === 1 ? "video" : "videos"}
            </p>
          </CardHeader>

          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {sortedVideos.map((video) => {
                const status = getStatusContent(video.status);

                return (
                  <div
                    key={video.id}
                    className="group flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
                        <FileVideo className="size-4 text-muted-foreground" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          YouTube Video
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>{formatDate(video.createdAt)}</span>

                          <span>•</span>

                          <a
                            href={video.youtubeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-foreground"
                          >
                            YouTube
                            <ExternalLink className="size-3" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
                      >
                        {video.status === "PROCESSING" ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : video.status === "PENDING" ? (
                          <Clock3 className="size-3" />
                        ) : null}

                        {status.label}
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link href={`/videos/${video.id}`}>
                          Open
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}