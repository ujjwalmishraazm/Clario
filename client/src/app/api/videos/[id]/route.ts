import { getAuthenticatedUser } from "@/lib/authenticatedUser";
import { deleteVideo,  getVideoById } from "@/services/video.service";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
    try {
        const user = getAuthenticatedUser(request);

        const { id } = await context.params;

        const video = await getVideoById(id, user.id);

        if (!video) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Video not found",
                },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: video,
            },
            { status: 200 },
        );
    } catch (error) {
        if (error instanceof Error && error.message === "UNAUTHENTICATED") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 },
            );
        }

        console.error("GET /api/videos/[id]:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 },
        );
    }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const user = getAuthenticatedUser(request);

    const { id } = await context.params;

    const result = await deleteVideo(id, user.id);

    if (result.count === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Video deleted successfully",
      },
      { status: 200 }
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
        { status: 401 }
      );
    }

    console.error("DELETE /api/videos/[id]:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
