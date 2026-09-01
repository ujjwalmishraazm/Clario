import { getAuthenticatedUser } from "@/lib/authenticatedUser";
import { videoSchema } from "@/lib/zod/videoSchema";
import { getVideo, createvideo } from "@/services/video.service";
import { getVideoMetadata } from "@/services/aiservice";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const MAX_VIDEOS_PER_USER = 3;
const MAX_DURATION_SECONDS = 5 * 60;

export async function POST(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);

    const data = await request.json();

    const validatedData = videoSchema.safeParse(data);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid video data",
        },
        { status: 400 },
      );
    }

    const youtubeUrl = validatedData.data.youtubeUrl;

    /*
     * -------------------------------------------------------
     * 1. CHECK USER QUOTA
     * -------------------------------------------------------
     *
     * Do this BEFORE calling yt-dlp metadata.
     */
    const videoCount = await prisma.video.count({
      where: {
        userId: user.id,
      },
    });

    if (videoCount >= MAX_VIDEOS_PER_USER) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You've reached your video limit. Delete a video to add another.",
        },
      );
    }

    /*
     * -------------------------------------------------------
     * 2. GET YOUTUBE METADATA
     * -------------------------------------------------------
     *
     * This does NOT download the audio.
     */
    const metadata = await getVideoMetadata(youtubeUrl);

    /*
     * -------------------------------------------------------
     * 3. REJECT LIVE VIDEOS
     * -------------------------------------------------------
     */
    if (metadata.is_live) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Live streams and premieres cannot be processed by Clario Cloud.",
        },
        { status: 400 },
      );
    }

    /*
     * -------------------------------------------------------
     * 4. CHECK VIDEO DURATION
     * -------------------------------------------------------
     */
    if (
      metadata.duration_seconds !== null &&
      metadata.duration_seconds > MAX_DURATION_SECONDS
    ) {
      return NextResponse.json(
        {
          success: false,
          code: "VIDEO_TOO_LONG",
          message:
            "This video exceeds the 5-minute cloud processing limit.",
          data: {
            duration_seconds: metadata.duration_seconds,
            title: metadata.title,
            max_duration_seconds: MAX_DURATION_SECONDS,
          },
        },
        { status: 422 },
      );
    }

    /*
     * -------------------------------------------------------
     * 5. ONLY NOW CREATE THE VIDEO
     * -------------------------------------------------------
     */
    const video = await createvideo({
      userId: user.id,
      youtubeUrl,
    });

    return NextResponse.json(
      {
        success: true,
        data: video,
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "UNAUTHENTICATED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    console.error("POST /api/videos error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);

    const videos = await getVideo(user.id);

    return NextResponse.json(
      {
        success: true,
        videos,
      },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "UNAUTHENTICATED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    console.error("GET /api/videos error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}