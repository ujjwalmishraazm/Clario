"use client";

import { motion } from "framer-motion";
import { Brain, FileText, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

const features = [
  {
    icon: FileText,
    title: "Understand any video",
    description: "Turn long-form content into searchable knowledge.",
  },
  {
    icon: Brain,
    title: "Extract what matters",
    description: "Get summaries, decisions, questions, and action items.",
  },
  {
    icon: Sparkles,
    title: "Ask your video",
    description: "Chat with your content instead of watching it again.",
  },
];

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[-10%] top-[-15%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
    
        <section className="hidden flex-col justify-between px-8 py-10 lg:flex xl:px-16">
       
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide">
             Clario
              </p>

              <p className="text-xs text-muted-foreground">
                Watch less. Understand more.
              </p>
            </div>
          </motion.div>

       
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-4 text-sm font-medium text-muted-foreground">
                VIDEO → KNOWLEDGE
              </p>

              <h2 className="text-5xl font-semibold tracking-tight xl:text-6xl">
                Your videos have
                <span className="block text-muted-foreground">
                  more to say.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
                Transform videos into searchable transcripts, concise
                insights, and an AI assistant you can actually ask questions.
              </p>
            </motion.div>

       
            <div className="mt-12 space-y-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 * (index + 1),
                    }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card/70">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

       
          <p className="text-xs text-muted-foreground">
            Built for turning information into understanding.
          </p>
        </section>

     
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </section>
      </div>
    </main>
  );
}