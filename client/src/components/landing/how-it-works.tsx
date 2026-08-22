import {
  ArrowRight,
  Brain,
  MessageSquare,
  PlaySquare,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PlaySquare,
    title: "Add a YouTube video",
    description:
      "Paste the YouTube URL you want to understand. No complicated setup required.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Let AI analyze it",
    description:
      "The video is processed into a transcript, summary, action items, decisions, and open questions.",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Ask questions",
    description:
      "Ask questions about the video and get answers based on its processed content.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
      
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted">
            <Sparkles className="h-5 w-5" />
          </div>

          <p className="mt-5 text-sm font-medium text-muted-foreground">
            HOW IT WORKS
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            From video to answers in three steps
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Give the AI your video and let it turn hours of content into
            information you can actually use.
          </p>
        </div>

      
        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
       
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-11 hidden border-t border-dashed border-border md:block"
          />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-border bg-background p-6"
              >
                <div className="relative flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-xs font-medium text-muted-foreground">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>

                {step.number !== "03" && (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-4 top-8 z-10 hidden h-8 w-8 rounded-full border border-border bg-background p-1.5 text-muted-foreground md:block"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}