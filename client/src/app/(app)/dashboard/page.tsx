"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { RecentVideos } from "@/components/dashboard/recent-videos";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { useVideos } from "@/hooks/use-videos";

export default function DashboardPage() {
  const { data: videos = [], isLoading, isError } = useVideos();

  const totalVideos = videos.length;

  const readyVideos = videos.filter(
    (video) => video.status === "READY",
  ).length;

  const processingVideos = videos.filter(
    (video) => video.status === "PROCESSING",
  ).length;

  const failedVideos = videos.filter(
    (video) => video.status === "FAILED",
  ).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-48 animate-pulse rounded-2xl bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            Unable to load your videos
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while loading your workspace.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <StatsCards
        totalVideos={totalVideos}
        readyVideos={readyVideos}
        processingVideos={processingVideos}
        failedVideos={failedVideos}
      />

      {videos.length === 0 ? (
        <EmptyState />
      ) : (
        <RecentVideos
          videos={videos
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .slice(0, 5)}
        />
      )}
    </div>
  );
}