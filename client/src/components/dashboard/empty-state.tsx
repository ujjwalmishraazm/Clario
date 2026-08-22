import Link from "next/link";
import { ArrowRight, FileVideo, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-border bg-muted">
          <Sparkles className="size-5" />
        </div>

        <CardTitle className="mt-3 text-lg">
          Your workspace is ready
        </CardTitle>

        <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
          Start with a YouTube video and let AI turn it into a
          searchable transcript, summary, insights, and answers.
        </p>
      </CardHeader>

      <CardContent>
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-muted/30 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-4">
              <FileVideo className="size-4 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">
                Add a video
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Paste a YouTube URL to begin.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <Sparkles className="size-4 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">
                Let AI analyze
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Get transcription and structured insights.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <ArrowRight className="size-4 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">
                Ask questions
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Explore the video with AI-powered Q&A.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button asChild>
              <Link href="/videos/new">
                Analyze your first video
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}