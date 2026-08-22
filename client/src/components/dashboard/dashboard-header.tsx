import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5" />
            AI Video Workspace
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Turn your next video into knowledge.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Analyze a video, get its transcript and AI insights, then ask
            questions about what was discussed.
          </p>
        </div>

        <Button asChild size="lg" className="shrink-0">
          <Link href="/videos/new">
            Analyze a video
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}