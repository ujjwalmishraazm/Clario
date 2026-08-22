import { ArrowLeft, Sparkles } from "lucide-react";
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
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="-ml-3">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 size-4" />
            Back to dashboard
          </Link>
        </Button>
      </div>

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

      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <p className="text-sm font-medium">
          What happens next?
        </p>

        <div className="mt-3 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
          <div>
            <span className="font-medium text-foreground">
              01
            </span>
            <p className="mt-1">We extract the video's audio.</p>
          </div>

          <div>
            <span className="font-medium text-foreground">
              02
            </span>
            <p className="mt-1">AI transcribes and analyzes it.</p>
          </div>

          <div>
            <span className="font-medium text-foreground">
              03
            </span>
            <p className="mt-1">You can explore and ask questions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}