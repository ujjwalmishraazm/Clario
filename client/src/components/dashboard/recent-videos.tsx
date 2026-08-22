import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  FileVideo,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type DashboardVideo = {
  id: string;
  title?: string | null;
  youtubeUrl: string;
  status: "PENDING" | "PROCESSING" | "READY" | "FAILED";
  createdAt: string | Date;
};

type RecentVideosProps = {
  videos?: DashboardVideo[];
};

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getStatusContent(status: DashboardVideo["status"]) {
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

export function RecentVideos({
  videos = [],
}: RecentVideosProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base">
            Recent videos
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Your latest video analyses
          </p>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/videos">
            View all
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-t border-border px-6 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-muted">
              <FileVideo className="size-5 text-muted-foreground" />
            </div>

            <h3 className="mt-4 text-sm font-semibold">
              No videos yet
            </h3>

            <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
              Analyze your first YouTube video and your recent
              analyses will appear here.
            </p>

            <Button className="mt-5" asChild>
              <Link href="/videos/new">
                Analyze a video
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {videos.map((video) => {
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
                      <Link
                        href={`/videos/${video.id}`}
                        className="block truncate text-sm font-medium transition-colors hover:text-primary"
                      >
                        {video.title || "Untitled video"}
                      </Link>

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
                      className="opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
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
        )}
      </CardContent>
    </Card>
  );
}