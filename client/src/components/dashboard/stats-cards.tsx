import {
  CheckCircle2,
  Clock3,
  Film,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatsCardsProps = {
  totalVideos?: number;
  readyVideos?: number;
  processingVideos?: number;
  failedVideos?: number;
};

const stats = [
  {
    key: "total",
    title: "Total videos",
    icon: Film,
    description: "Videos you've analyzed",
  },
  {
    key: "ready",
    title: "Ready",
    icon: CheckCircle2,
    description: "Successfully analyzed",
  },
  {
    key: "processing",
    title: "Processing",
    icon: Clock3,
    description: "Currently being analyzed",
  },
  {
    key: "failed",
    title: "Failed",
    icon: XCircle,
    description: "Need another attempt",
  },
];

export function StatsCards({
  totalVideos = 0,
  readyVideos = 0,
  processingVideos = 0,
  failedVideos = 0,
}: StatsCardsProps) {
  const values: Record<string, number> = {
    total: totalVideos,
    ready: readyVideos,
    processing: processingVideos,
    failed: failedVideos,
  };

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.key}
            className="group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>

              <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted transition-transform duration-200 group-hover:scale-105">
                <Icon className="size-4 text-muted-foreground" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-semibold tracking-tight">
                {values[stat.key]}
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}