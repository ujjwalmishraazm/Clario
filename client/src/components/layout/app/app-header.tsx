"use client";

import Link from "next/link";
import { Bell, CheckCircle2, Clock3, ExternalLink, XCircle } from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useVideos } from "@/hooks/use-videos";
import { UserMenu } from "./user-menu";
import { usePathname } from "next/navigation";

function getHeaderContent(pathname: string) {
  if (pathname.startsWith("/videos/") && pathname.endsWith("/conversation")) {
    return {
      title: "Conversation",
      description: "Ask questions about your video",
    };
  }

  if (pathname.startsWith("/videos/")) {
    return {
      title: "Video workspace",
      description: "Explore your video intelligence",
    };
  }

  if (pathname === "/videos") {
    return {
      title: "My Videos",
      description: "Your analyzed videos",
    };
  }

  if (pathname === "/conversations") {
    return {
      title: "Conversations",
      description: "Continue your video conversations",
    };
  }

  if (pathname === "/settings") {
    return {
      title: "Settings",
      description: "Manage your Clario workspace",
    };
  }

  if (pathname === "/profile") {
    return {
      title: "Profile",
      description: "Manage your Clario account",
    };
  }

  return {
    title: "Dashboard",
    description: "Your video intelligence workspace",
  };
}

export function AppHeader() {
  const { data: user, isLoading: isUserLoading } =
    useCurrentUser();

  const {
    data: videos = [],
    isLoading: isVideosLoading,
  } = useVideos();

 
  const pathname = usePathname();

  const header = getHeaderContent(pathname);

  const processingVideos = videos.filter(
    (video) => video.status === "PROCESSING",
  );

  const readyVideos = videos.filter(
    (video) => video.status === "READY",
  );

  const failedVideos = videos.filter(
    (video) => video.status === "FAILED",
  );

  const hasNotifications =
    processingVideos.length > 0 ||
    readyVideos.length > 0 ||
    failedVideos.length > 0;

  const notificationCount =
    processingVideos.length +
    readyVideos.length +
    failedVideos.length;

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex h-full w-full items-center gap-2 px-4 sm:px-6">
        <SidebarTrigger className="-ml-1" />

        <Separator
          orientation="vertical"
          className="mr-2 h-5"
        />

        <div className="flex min-w-0 flex-1 items-center">
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold">
              {header.title}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {header.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl"
                aria-label="Notifications"
              >
                <Bell className="size-4" />

                {hasNotifications && (
                  <span
                    aria-hidden="true"
                    className="absolute right-1.5 top-1.5 flex min-w-1.5 items-center justify-center rounded-full bg-primary"
                  >
                    <span className="size-1.5 rounded-full bg-primary" />
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-[calc(100vw-2rem)] max-w-96 rounded-2xl p-2 sm:w-96"
            >
              <DropdownMenuLabel className="px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      Notifications
                    </p>

                    <p className="mt-0.5 text-xs font-normal text-muted-foreground">
                      Activity from your videos
                    </p>
                  </div>

                  {notificationCount > 0 && (
                    <span className="rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      {notificationCount}
                    </span>
                  )}
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {isVideosLoading ? (
                <div className="space-y-2 p-3">
                  <div className="h-14 animate-pulse rounded-xl bg-muted" />
                  <div className="h-14 animate-pulse rounded-xl bg-muted" />
                </div>
              ) : !hasNotifications ? (
                <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
                  <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="size-5 text-emerald-500" />
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    You're all caught up
                  </p>

                  <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                    Nothing needs your attention right now.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {processingVideos.slice(0, 3).map((video) => (
                    <Link
                      key={`processing-${video.id}`}
                      href={`/videos/${video.id}`}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                        <Clock3 className="size-4 text-blue-500" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          Video processing
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                          Your video is currently being analyzed.
                        </p>
                      </div>

                      <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted-foreground" />
                    </Link>
                  ))}

                  {readyVideos.slice(0, 3).map((video) => (
                    <Link
                      key={`ready-${video.id}`}
                      href={`/videos/${video.id}`}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                        <CheckCircle2 className="size-4 text-emerald-500" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          Analysis ready
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                          Your video analysis is ready to explore.
                        </p>
                      </div>

                      <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted-foreground" />
                    </Link>
                  ))}

                  {failedVideos.slice(0, 3).map((video) => (
                    <Link
                      key={`failed-${video.id}`}
                      href={`/videos/${video.id}`}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                        <XCircle className="size-4 text-destructive" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          Processing failed
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                          Something went wrong while analyzing this video.
                        </p>
                      </div>

                      <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted-foreground" />
                    </Link>
                  ))}

                  <DropdownMenuSeparator className="my-2" />

                  <Link
                    href="/videos"
                    className="flex items-center justify-center rounded-xl p-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    View all videos
                  </Link>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <UserMenu
            email={isUserLoading ? undefined : user?.email}
          />
        </div>
      </div>
    </header>
  );
}