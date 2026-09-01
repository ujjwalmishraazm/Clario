"use client";



import {
  AlertTriangle,
  Check,
  ChevronRight,
  CircleCheck,
  Clipboard,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  FileCode2,
  HardDrive,
  Laptop,
  Play,
  Terminal,
  Zap,
} from "lucide-react";
import { useState } from "react";



import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function CodeBlock({
  children,
  copyText,
}: {
  children: React.ReactNode;
  copyText?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!copyText) return;

    await navigator.clipboard.writeText(copyText);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-muted/40">
      <pre className="overflow-x-auto p-4 pr-14 text-xs leading-6 sm:text-sm">
        <code>{children}</code>
      </pre>

      {copyText && (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          aria-label="Copy command"
        >
          {copied ? (
            <Check className="size-4 text-red-500" />
          ) : (
            <Clipboard className="size-4" />
          )}
        </button>
      )}
    </div>
  );
}

function Step({
  number,
  icon,
  title,
  description,
  children,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <div className="absolute left-5 top-14 hidden h-[calc(100%-2rem)] w-px bg-border sm:block" />

      <div className="relative flex gap-4">
        <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 transition-all duration-300 group-hover:border-red-500/40 group-hover:bg-red-500/15 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.12)] sm:size-11">
          {icon}
        </div>

        <div className="min-w-0 flex-1 pb-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-500">
              Step {number}
            </p>

            <h2 className="mt-1 text-base font-semibold tracking-tight sm:text-lg">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
              {description}
            </p>
          </div>

          <Card className="mt-4 overflow-hidden transition-all duration-300 group-hover:border-red-500/20">
            <CardContent className="p-4 sm:p-5">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ModelCard({
  name,
  description,
  level,
  recommended,
}: {
  name: string;
  description: string;
  level: string;
  recommended?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        recommended
          ? "border-red-500/30 bg-red-500/[0.03]"
          : "border-border bg-background"
      }`}
    >
      {recommended && (
        <div className="absolute right-0 top-0 rounded-bl-lg bg-red-500 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-white">
          Recommended
        </div>
      )}

      <div className="flex items-start gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${
            recommended
              ? "border-red-500/20 bg-red-500/10 text-red-500"
              : "border-border bg-muted/50 text-muted-foreground"
          }`}
        >
          <Cpu className="size-5" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{name}</p>
          </div>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>

          <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {level}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LocalProcessingPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-red-500/10 bg-gradient-to-b from-red-500/[0.035] via-background to-background px-5 py-12 sm:px-8 sm:py-16">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 size-72 -translate-x-1/2 rounded-full bg-red-500/[0.07] blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          {/* Animated orb */}
          <div className="relative flex size-32 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-red-500/[0.06]" />

            <div className="absolute inset-2 animate-[spin_5s_linear_infinite] rounded-full border border-red-500/15 border-t-red-500/70" />

            <div className="absolute inset-4 animate-[spin_8s_linear_infinite_reverse] rounded-full border border-red-500/10 border-b-red-500/40" />

            <div className="absolute inset-6 rounded-full bg-red-500/10 blur-xl" />

            <div className="relative flex size-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 shadow-[0_0_45px_rgba(239,68,68,0.18)]">
              <Laptop className="size-7 animate-pulse text-red-500" />
            </div>
          </div>

          <div className="mt-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-500 sm:text-xs">
              Local Processing
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your computer.
              <br />
              <span className="text-red-500">Your processing.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Go beyond Clario&apos;s cloud limits by running video
              transcription directly on your own machine.
            </p>
          </div>

          {/* Animated progress */}
          <div className="mt-7 w-52 overflow-hidden rounded-full bg-muted">
            <div className="h-1 w-1/2 animate-[local-progress_2.5s_ease-in-out_infinite] rounded-full bg-red-500" />
          </div>

          <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">
            Powered by your hardware
          </p>
        </div>

        <style jsx>{`
          @keyframes local-progress {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(300%);
            }
          }
        `}</style>
      </section>

      {/* CLOUD LIMIT */}
      <Card className="overflow-hidden border-red-500/20">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="flex items-center justify-center bg-red-500/10 p-5 sm:w-24">
              <AlertTriangle className="size-6 text-red-500" />
            </div>

            <div className="flex-1 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold">
                  Cloud processing has limits
                </p>

                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-red-500">
                  Free Cloud
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">
                Clario Cloud currently supports videos up to{" "}
                <strong className="text-foreground">5 minutes</strong>.
                Larger workloads can be processed locally instead.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium">
                <span className="rounded-lg border border-border bg-muted/50 px-3 py-2">
                  ☁️ Cloud
                </span>

                <ChevronRight className="size-4 text-muted-foreground" />

                <span className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-red-500">
                  💻 Your computer
                </span>

                <ChevronRight className="size-4 text-muted-foreground" />

                <span className="rounded-lg border border-border bg-muted/50 px-3 py-2">
                  🎙️ Whisper
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* INTRO */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Getting started
        </p>

        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Set up local processing
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Follow the steps below to run Clario&apos;s AI processing on
          your own computer.
        </p>
      </div>

      {/* STEPS */}
      <div>
        <Step
          number="01"
          icon={<Terminal className="size-5" />}
          title="Install the prerequisites"
          description="Your computer needs a few tools before it can run the local worker."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: <Terminal className="size-5" />,
                title: "Git",
                text: "To clone Clario.",
              },
              {
                icon: <Code2 className="size-5" />,
                title: "Python 3.12+",
                text: "Runs the AI service.",
              },
              {
                icon: <Play className="size-5" />,
                title: "FFmpeg",
                text: "Processes audio.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-muted/20 p-4 transition-colors hover:border-red-500/20 hover:bg-red-500/[0.02]"
              >
                <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground">
                  {item.icon}
                </div>

                <p className="mt-3 text-sm font-medium">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Step>

        <Step
          number="02"
          icon={<ExternalLink className="size-5" />}
          title="Clone the Clario repository"
          description="Get the project onto your computer."
        >
          <CodeBlock
            copyText={`git clone YOUR_GITHUB_REPOSITORY_URL\ncd YOUR_LOCAL_WORKER_FOLDER`}
          >
            {`git clone - https://github.com/ujjwalmishraazm
cd YOUR_LOCAL_WORKER_FOLDER`}
          </CodeBlock>

          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            Replace the placeholder with the Clario GitHub repository
            link.
          </p>
        </Step>

        <Step
          number="03"
          icon={<Terminal className="size-5" />}
          title="Create your Python environment"
          description="Keep Clario's local dependencies isolated from the rest of your computer."
        >
          <CodeBlock copyText="python -m venv .venv">
            python -m venv .venv
          </CodeBlock>

          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Windows
          </p>

          <div className="mt-2">
            <CodeBlock copyText={".venv\\Scripts\\Activate.ps1"}>
              .venv\Scripts\Activate.ps1
            </CodeBlock>
          </div>
        </Step>

        <Step
          number="04"
          icon={<DownloadIcon />}
          title="Install dependencies"
          description="Install the packages required by the local AI service."
        >
          <CodeBlock copyText="pip install -r requirements.txt">
            pip install -r requirements.txt
          </CodeBlock>
        </Step>

        <Step
          number="05"
          icon={<FileCode2 className="size-5" />}
          title="Configure your .env"
          description="Tell Clario to use the local Whisper backend."
        >
          <div className="flex items-center gap-3 rounded-xl border border-red-500/15 bg-red-500/[0.03] p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
              <FileCode2 className="size-4" />
            </div>

            <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
              Create a file named <code>.env</code> in the AI service
              directory.
            </p>
          </div>

          <div className="mt-4">
            <CodeBlock
              copyText={`TRANSCRIBE_BACKEND=local\nWHISPER_MODEL_SIZE=small`}
            >
              {`TRANSCRIBE_BACKEND=local
WHISPER_MODEL_SIZE=small`}
            </CodeBlock>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-muted/20 p-4">
            <p className="text-sm font-medium">
              🔐 Keep secrets private
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
              Never commit your personal <code>.env</code> file or API
              keys to GitHub. Use <code>.env.example</code> for public
              configuration examples.
            </p>
          </div>
        </Step>
      </div>

      {/* MODEL SECTION */}
      <section className="space-y-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500 sm:size-11">
              <Cpu className="size-5" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Choose your hardware level
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                Pick a Whisper model
              </h2>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            The model you choose determines how much CPU, RAM, and
            processing time your computer will need.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <ModelCard
            name="Tiny"
            description="Fastest and lightest option. Best when hardware resources are limited."
            level="Low-end hardware"
          />

          <ModelCard
            name="Small"
            description="A practical balance between transcription quality and performance."
            level="Recommended"
            recommended
          />

          <ModelCard
            name="Medium"
            description="Higher quality with significantly greater memory and processing requirements."
            level="Powerful hardware"
          />

          <ModelCard
            name="Large-v3"
            description="Highest-quality option. Intended for machines with strong CPU/GPU resources."
            level="High-end hardware"
          />
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-red-500/15 bg-red-500/[0.03] p-4">
          <Zap className="mt-0.5 size-4 shrink-0 text-red-500" />

          <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
            <strong className="text-foreground">
              For a low-end laptop:
            </strong>{" "}
            start with <strong>Small</strong> or <strong>Tiny</strong>.
            Larger models may be too slow or memory-intensive.
          </p>
        </div>
      </section>

      {/* FINAL STEPS */}
      <div>
        <Step
          number="06"
          icon={<Play className="size-5" />}
          title="Start the local worker"
          description="Launch the local AI service from your terminal."
        >
          <CodeBlock copyText="python main.py">
            python main.py
          </CodeBlock>
        </Step>

        <Step
          number="07"
          icon={<HardDrive className="size-5" />}
          title="Process your long video"
          description="Now your own computer can handle videos beyond the cloud limit."
        >
          <div className="space-y-2">
            {[
              "Open the local worker.",
              "Enter your YouTube URL.",
              "Choose the Whisper model for your hardware.",
              "Start processing.",
              "Wait while Clario downloads, converts, transcribes, and analyzes the video.",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted/60"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-xs font-medium text-red-500">
                  {index + 1}
                </div>

                <p className="pt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Step>
      </div>

      {/* PIPELINE */}
      <section className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Under the hood
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            What happens on your computer?
          </h2>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-5">
              {[
                ["01", "YouTube", "URL"],
                ["02", "yt-dlp", "Audio"],
                ["03", "FFmpeg", "WAV"],
                ["04", "Whisper", "Transcript"],
                ["05", "Clario", "Analysis"],
              ].map(([number, title, subtitle], index) => (
                <div
                  key={number}
                  className="relative rounded-xl border border-border bg-muted/20 p-4 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/[0.02]"
                >
                  <p className="text-[10px] font-semibold text-red-500">
                    {number}
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {title}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {subtitle}
                  </p>

                  {index < 4 && (
                    <ChevronRight className="absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 bg-background text-muted-foreground sm:block" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* BENEFITS */}
      <Card className="overflow-hidden border-red-500/20 bg-red-500/[0.02]">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <CircleCheck className="size-5" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Why use local processing?
              </p>

              <div className="mt-3 grid gap-2 text-xs leading-5 text-muted-foreground sm:grid-cols-2 sm:gap-x-8">
                <p>✓ Process videos longer than the cloud limit</p>
                <p>✓ Use your own CPU/GPU resources</p>
                <p>✓ No cloud processing quota is consumed</p>
                <p>✓ Choose a Whisper model for your hardware</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FOOTER */}
      <footer className="border-t pt-8 pb-5 text-center">
        <p className="text-xs text-muted-foreground">
          Clario · Local AI Processing
        </p>

        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-red-500">
          Created by Ujjwal Mishra
        </p>
      </footer>
    </div>
  );
}

function DownloadIcon() {
  return <Download className="size-5" />;
}