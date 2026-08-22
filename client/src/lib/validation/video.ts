import { z } from "zod";

export const videoUrlSchema = z.object({
  youtubeUrl: z
    .string()
    .trim()
    .url("Please enter a valid URL")
    .refine(
      (url) =>
        url.includes("youtube.com/") ||
        url.includes("youtu.be/"),
      "Please enter a valid YouTube URL",
    ),
});

export type VideoUrlFormValues = z.infer<
  typeof videoUrlSchema
>;