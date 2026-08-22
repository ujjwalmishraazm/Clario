import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-muted/30 px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background">
              <Sparkles className="h-5 w-5" />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your next video could be understood in minutes.
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Stop replaying long videos just to find one piece of
              information. Let AI do the heavy lifting.
            </p>

            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start analyzing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}