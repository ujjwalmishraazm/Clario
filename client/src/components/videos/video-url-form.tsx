"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import {
  AlertTriangle,
  ArrowRight,
  Link,
  Loader2,
  Monitor,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  type VideoUrlFormValues,
  videoUrlSchema,
} from "@/lib/validation/video";

type CreateVideoResponse = {
  success: boolean;
  message?: string;
  code?: string;
  data?: {
    id?: string;
    status?: "PENDING" | "PROCESSING" | "READY" | "FAILED";
    duration_seconds?: number;
    title?: string | null;
    max_duration_seconds?: number;
  };
};

type ProcessVideoResponse = {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    status: "PENDING" | "PROCESSING" | "READY" | "FAILED";
  };
};

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  if (remainingSeconds === 0) {
    return `${minutes} min`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

export function VideoUrlForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [longVideo, setLongVideo] = useState<{
    duration: number;
    title?: string | null;
  } | null>(null);

  const form = useForm<VideoUrlFormValues>({
    resolver: zodResolver(videoUrlSchema),
    defaultValues: {
      youtubeUrl: "",
    },
  });

  async function onSubmit(data: VideoUrlFormValues) {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLongVideo(null);

    try {
      const createResponse =
        await axios.post<CreateVideoResponse>(
          "/api/videos",
          {
            youtubeUrl: data.youtubeUrl,
          },
        );

      if (
        !createResponse.data.success ||
        !createResponse.data.data
      ) {
        throw new Error(
          createResponse.data.message ??
            "Unable to create video",
        );
      }

      const videoId = createResponse.data.data.id;

      if (!videoId) {
        throw new Error("Video ID was not returned");
      }

      const processResponse =
        await axios.post<ProcessVideoResponse>(
          `/api/videos/${videoId}/process`,
        );

      if (
        !processResponse.data.success ||
        !processResponse.data.data
      ) {
        throw new Error(
          processResponse.data.message ??
            "Unable to start video processing",
        );
      }

      toast.success("Video processing started", {
        description:
          "Your video is now being analyzed by AI.",
      });

      form.reset();

      router.push(`/videos/${videoId}`);
    } catch (error) {
      const axiosError =
        error as AxiosError<CreateVideoResponse>;

      /*
       * ---------------------------------------------------
       * LONG VIDEO
       * ---------------------------------------------------
       */
      if (
        axiosError.response?.status === 422 &&
        axiosError.response.data?.code === "VIDEO_TOO_LONG"
      ) {
        const duration =
          axiosError.response.data.data?.duration_seconds;

        if (typeof duration === "number") {
          setLongVideo({
            duration,
            title:
              axiosError.response.data.data?.title,
          });

          return;
        }
      }

      const message =
        axiosError.response?.data?.message ??
        (error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.");

      toast.error("Unable to process video", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Controller
          name="youtubeUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="youtube-url">
                YouTube URL
              </FieldLabel>

              <div className="relative">
                <Link className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  {...field}
                  id="youtube-url"
                  type="url"
                  inputMode="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  autoComplete="off"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  className="h-12 rounded-xl pl-10 pr-3"
                />
              </div>

              <FieldDescription>
                Paste a public YouTube video URL. We&apos;ll extract
                the audio and analyze it with AI.
              </FieldDescription>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl sm:w-auto sm:min-w-48"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Checking video...
            </>
          ) : (
            <>
              Analyze video
              <ArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>
      </form>

      {/* Long video warning */}
      {longVideo && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-red-500/25 bg-red-500/[0.03]">
          <div className="relative">
            {/* Glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-red-500/10 blur-3xl" />

            <div className="relative flex gap-4 p-5 sm:p-6">
              {/* Animated icon */}
              <div className="relative flex size-11 shrink-0 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-xl bg-red-500/10" />

                <div className="relative flex size-11 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10">
                  <AlertTriangle className="size-5 text-red-500" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">
                    This video is too long for Cloud
                  </p>

                  <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-red-500">
                    {formatDuration(longVideo.duration)}
                  </span>
                </div>

                {longVideo.title && (
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {longVideo.title}
                  </p>
                )}

                <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm">
                  Clario Cloud currently supports videos up to{" "}
                  <strong className="text-foreground">
                    5 minutes
                  </strong>
                  . Your video is{" "}
                  <strong className="text-foreground">
                    {formatDuration(longVideo.duration)}
                  </strong>
                  .
                </p>

                <div className="mt-4 rounded-xl border border-red-500/15 bg-background/50 p-3">
                  <div className="flex items-start gap-3">
                    <Monitor className="mt-0.5 size-4 shrink-0 text-red-500" />

                    <p className="text-xs leading-5 text-muted-foreground">
                      You can process this video locally using your
                      own computer. Your Clario cloud transcription
                      quota will not be used.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button
                    asChild
                    size="sm"
                    className="group bg-red-500 text-white hover:bg-red-600"
                  >
                    <a href="/local-processing">
                      Process locally
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setLongVideo(null)}
                    className="text-muted-foreground"
                  >
                    Try another video
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}