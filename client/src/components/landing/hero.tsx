import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
  
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
       
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />

            AI-powered video intelligence

            <span className="ml-1 h-1 w-1 rounded-full bg-muted-foreground" />

            Understand videos faster
          </div>

          <h1 className="text-balance text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Stop watching.
            <span className="block text-muted-foreground">
              Start understanding.
            </span>
          </h1>

     
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            Turn videos into searchable knowledge with AI-powered
            transcription, summaries, insights, and conversational Q&A.
          </p>

      
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-11 px-6" asChild>
              <Link href="/signup">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-11 px-6"
              asChild
            >
              <Link href="#how-it-works">
                <Play className="mr-2 h-4 w-4" />
                See how it works
              </Link>
            </Button>
          </div>

     
          <p className="mt-6 text-xs text-muted-foreground">
            Start with a YouTube video. No complicated setup.
          </p>
        </div>
      </div>
    </section>
  );
}