import {
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { VideoUrlForm } from "@/components/videos/video-url-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewVideoPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-7">
      {/* Back */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-3"
        >
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 size-4" />
            Back to dashboard
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div>
        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-border bg-muted">
          <Sparkles className="size-5" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Analyze a new video
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          Paste a YouTube URL and let AI turn the video into a
          searchable source of knowledge.
        </p>
      </div>

      {/* Cloud processing */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base">
            Video source
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Currently we support public YouTube videos.
          </p>
        </CardHeader>

        <CardContent>
          <VideoUrlForm />
        </CardContent>
      </Card>

      {/* Local processing option */}
      <Card className="overflow-hidden border-red-500/20 bg-red-500/[0.02]">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Icon */}
            <div className="flex items-center justify-center bg-red-500/10 p-5 sm:w-24">
              <div className="relative flex size-12 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-xl bg-red-500/10" />

                <div className="relative flex size-11 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10">
                  <Cpu className="size-5 text-red-500" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold">
                  Need to process a longer video?
                </p>

                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-red-500">
                  Local AI
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">
                Clario Cloud is optimized for shorter videos. For
                videos beyond the cloud limit, you can run the AI
                processing directly on your own computer.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="sm"
                  className="group w-full bg-red-500 text-white hover:bg-red-600 sm:w-auto"
                >
                  <Link href="/local-processing">
                    Process locally
                    <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>

                <Link
                  href="/local-processing"
                  className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:justify-start"
                >
                  How does this work?
                  <ExternalLink className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cloud warning */}
      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

        <div>
          <p className="text-sm font-medium">
            Cloud processing limit
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
            Cloud analysis currently supports videos up to{" "}
            <strong className="text-foreground">
              5 minutes
            </strong>
            . Longer videos can be processed locally using your
            computer&apos;s resources.
          </p>
        </div>
      </div>

      {/* What happens */}
      <div className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5">
        <p className="text-sm font-medium">
          What happens next?
        </p>

        <div className="mt-4 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
          <div>
            <span className="text-xs font-semibold text-red-500">
              01
            </span>

            <p className="mt-1">
              We extract the video&apos;s audio.
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold text-red-500">
              02
            </span>

            <p className="mt-1">
              AI transcribes and analyzes it.
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold text-red-500">
              03
            </span>

            <p className="mt-1">
              You can explore and ask questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}