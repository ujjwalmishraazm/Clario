import { getAuthenticatedUser } from "@/lib/authenticatedUser";
import { prisma } from "@/lib/prisma";
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
  try {
    const user = getAuthenticatedUser(request);

    const { id: videoId } = await context.params;

    // Find video and verify ownership
    const video = await prisma.video.findFirst({
      where: {
        id: videoId,
        userId: user.id,
      },
    });

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found",
        },
        { status: 404 },
      );
    }

    // Conversation is only allowed for a processed video
    if (video.status !== "READY") {
      return NextResponse.json(
        {
          success: false,
          message: "Video is not ready for conversation",
        },
        { status: 409 },
      );
    }

    // Create conversation
    const conversation = await prisma.conversation.create({
      data: {
        videoId: video.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: conversation.id,
          videoId: conversation.videoId,
          title: conversation.title,
          createdAt: conversation.createdAt,
        },
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

    console.error(
      "POST /api/videos/[id]/conversations:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}


export async function GET(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const user = getAuthenticatedUser(request);

    const { id: videoId } = await context.params;

    // Verify that the video belongs to the authenticated user
    const video = await prisma.video.findFirst({
      where: {
        id: videoId,
        userId: user.id,
      },
    });

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Video not found",
        },
        { status: 404 },
      );
    }

    // Get conversations and their messages
    const conversations = await prisma.conversation.findMany({
      where: {
        videoId: video.id,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: conversations,
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

    console.error(
      "GET /api/videos/[id]/conversations:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}