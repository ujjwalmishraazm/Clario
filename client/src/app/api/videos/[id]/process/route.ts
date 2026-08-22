import { getAuthenticatedUser } from "@/lib/authenticatedUser";
import { startVideoProcessing } from "@/services/video-processing.service";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  request: NextRequest,
  context: RouteContext,
) {
  console.log("🔥 PROCESS ROUTE HIT");
  try {

    const user = getAuthenticatedUser(request);


    const { id } = await context.params;

    // 3. Start processing
    const video = await startVideoProcessing(id, user.id);



    return NextResponse.json(
      {
        success: true,
        message: "Video processing started",
        data: {
          id: video.id,
          status: video.status,
        },
      },
      { status: 202 },
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

    if (
      error instanceof Error &&
      error.message === "VIDEO_NOT_FOUND"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found",
        },
        { status: 404 },
      );
    }

    if (
      error instanceof Error &&
      error.message === "VIDEO_ALREADY_PROCESSING"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Video is already processing or has already been processed",
        },
        { status: 409 },
      );
    }

    console.error("POST /api/videos/[id]/process:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}