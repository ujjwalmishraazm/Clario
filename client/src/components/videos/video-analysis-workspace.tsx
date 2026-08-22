"use client";

import {
  CheckCircle2,
  ClipboardList,
  FileText,
  HelpCircle,
  ListChecks,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoChat } from "@/components/videos/video-chat";
import type { VideoDetail } from "@/lib/api/videos";

type VideoAnalysisWorkspaceProps = {
  video: VideoDetail;
};

function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string => typeof item === "string",
  );
}

export function VideoAnalysisWorkspace({
  video,
}: VideoAnalysisWorkspaceProps) {
  const analysis = video.analysis;

  if (!analysis) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Sparkles className="size-8 text-muted-foreground" />

          <h2 className="mt-4 text-lg font-semibold">
            Analysis is not available yet
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            The video is ready, but analysis data has not been generated.
          </p>
        </CardContent>
      </Card>
    );
  }

  const actionItems = toStringList(analysis.actionItems);
  const keyDecisions = toStringList(analysis.keyDecisions);
  const openQuestions = toStringList(analysis.openQuestions);

  return (
    <div className="space-y-6">
      {/* Title */}
      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="size-5 text-primary" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                AI-generated title
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                {analysis.title}
              </h2>

              <p className="mt-3 break-all text-sm text-muted-foreground">
                {video.youtubeUrl}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="size-5 text-primary" />
            Summary
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-7 text-muted-foreground">
            {analysis.summary}
          </p>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="grid gap-6 lg:grid-cols-2">
        <InsightCard
          icon={<ListChecks className="size-5 text-primary" />}
          title="Key decisions"
          items={keyDecisions}
          emptyMessage="No key decisions were identified."
        />

        <InsightCard
          icon={<ClipboardList className="size-5 text-primary" />}
          title="Action items"
          items={actionItems}
          emptyMessage="No action items were identified."
        />
      </div>

      {/* Open questions */}
      <InsightCard
        icon={<HelpCircle className="size-5 text-primary" />}
        title="Open questions"
        items={openQuestions}
        emptyMessage="No open questions were identified."
      />

      {/* Transcript */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="size-5 text-primary" />
            Transcript
          </CardTitle>
        </CardHeader>

        <CardContent>
          {video.transcript?.content ? (
            <div className="max-h-[600px] overflow-y-auto rounded-xl border border-border/60 bg-muted/30 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                {video.transcript.content}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Transcript is not available.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Ask this video */}
      <VideoChat videoId={video.id} />
    </div>
  );
}

type InsightCardProps = {
  icon: React.ReactNode;
  title: string;
  items: string[];
  emptyMessage: string;
};

function InsightCard({
  icon,
  title,
  items,
  emptyMessage,
}: InsightCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {items.length > 0 ? (
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li
                key={`${title}-${index}`}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

                <span className="text-sm leading-6 text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}