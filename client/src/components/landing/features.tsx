import {
  Brain,
  CheckCircle2,
  FileText,
  ListChecks,
  MessageSquare,
  Target,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Transcription",
    description:
      "Convert video audio into a searchable transcript using AI-powered speech recognition.",
  },
  {
    icon: Brain,
    title: "Smart Summaries",
    description:
      "Get the important ideas from a long video without watching every minute.",
  },
  {
    icon: ListChecks,
    title: "Action Items",
    description:
      "Automatically identify tasks and actionable items mentioned throughout the video.",
  },
  {
    icon: Target,
    title: "Key Decisions",
    description:
      "Surface important decisions and conclusions so they are easy to find later.",
  },
  {
    icon: CheckCircle2,
    title: "Open Questions",
    description:
      "Discover questions raised in the conversation that still need answers.",
  },
  {
    icon: MessageSquare,
    title: "Ask AI",
    description:
      "Ask natural-language questions about the video and get answers grounded in its content.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-t border-border bg-muted/20"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
       
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-muted-foreground">
            EVERYTHING YOU NEED
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Turn hours of video into useful knowledge
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            AI analyzes your video and organizes the information into
            something you can actually work with.
          </p>
        </div>

      
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-base font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}