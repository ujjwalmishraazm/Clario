"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ArrowRight, Link, Loader2 } from "lucide-react";
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
  data?: {
    id: string;
    status?: "PENDING" | "PROCESSING" | "READY" | "FAILED";
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

export function VideoUrlForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VideoUrlFormValues>({
    resolver: zodResolver(videoUrlSchema),
    defaultValues: {
      youtubeUrl: "",
    },
  });

  async function onSubmit(data: VideoUrlFormValues) {
    if (isSubmitting) return;

    setIsSubmitting(true);

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
        error as AxiosError<{
          success: boolean;
          message?: string;
        }>;

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
              Starting analysis...
            </>
          ) : (
            <>
              Analyze video
              <ArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}