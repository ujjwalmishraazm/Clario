import * as z from "zod";

export const videoSchema = z.object({
  youtubeUrl: z
    .url()
    .refine((url) => {
      const parsedUrl = new URL(url);

      return (
        parsedUrl.hostname === "youtube.com" ||
        parsedUrl.hostname === "www.youtube.com" ||
        parsedUrl.hostname === "youtu.be"
      );
    }, {
      message: "Invalid YouTube URL",
    }),
});