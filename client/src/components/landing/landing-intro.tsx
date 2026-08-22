"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function LandingIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex size-20 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-primary/10" />

          <div className="absolute inset-2 animate-[spin_5s_linear_infinite] rounded-2xl border border-primary/20 border-t-primary/70" />

          <div className="relative flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="size-6 animate-pulse" />
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Clario
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Understand more.
          </p>
        </div>

        <div className="mt-6 h-1 w-36 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-[landing-progress_1s_ease-in-out_infinite] rounded-full bg-primary" />
        </div>

        <style jsx>{`
          @keyframes landing-progress {
            0% {
              transform: translateX(-100%);
            }

            100% {
              transform: translateX(300%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}