import {
  CheckCircle2,
  FileText,
  ListChecks,
  MessageSquare,
  Sparkles,
  Target,
} from "lucide-react";

const insights = [
  {
    icon: Sparkles,
    label: "Summary",
    value:
      "The speaker explains the main concepts, compares the approaches, and outlines the recommended next steps.",
  },
  {
    icon: ListChecks,
    label: "Action items",
    value: "Review the proposed approach and implement the recommended changes.",
  },
  {
    icon: Target,
    label: "Key decision",
    value: "The team chooses the simpler implementation for the first version.",
  },
  {
    icon: CheckCircle2,
    label: "Open question",
    value: "How should the solution handle future scale?",
  },
];

export function ProductPreview() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
     
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-muted-foreground">
            YOUR VIDEO, ORGANIZED
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            One video. Everything that matters.
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Instead of searching through hours of footage, get the important
            information organized for you.
          </p>
        </div>

   
        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        
          <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              </div>

              <span className="ml-3 hidden text-xs text-muted-foreground sm:block">
              Clario
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Analysis ready
            </div>
          </div>

          <div className="border-b border-border px-5 py-5 sm:px-8">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileText className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Understanding Modern AI Systems
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  YouTube video • AI analysis
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2">
          
            <div className="border-b border-border p-5 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />

                  <h3 className="text-sm font-semibold">Transcript</h3>
                </div>

                <span className="text-xs text-muted-foreground">
                  Searchable
                </span>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  Modern AI systems are increasingly designed around
                  specialized components that work together...
                </p>

                <p>
                  The important part is not just generating an answer, but
                  retrieving the right information before generating it...
                </p>

                <p>
                  This approach makes it possible to work with large amounts
                  of information while keeping responses grounded...
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                Ask anything about this video
              </div>
            </div>

       
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />

                <h3 className="text-sm font-semibold">AI Insights</h3>
              </div>

              <div className="mt-6 space-y-3">
                {insights.map((insight) => {
                  const Icon = insight.icon;

                  return (
                    <div
                      key={insight.label}
                      className="rounded-xl border border-border p-4"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />

                        <span className="text-xs font-medium">
                          {insight.label}
                        </span>
                      </div>

                      <p className="mt-2 text-xs leading-5 text-muted-foreground">
                        {insight.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}