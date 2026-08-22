import { getAuthenticatedUser } from "@/lib/authenticatedUser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = getAuthenticatedUser(request);

    const conversations = await prisma.conversation.findMany({
      where: {
        video: {
          userId: user.id,
        },
      },
      include: {
        video: {
          select: {
            id: true,
            youtubeUrl: true,
            analysis: {
              select: {
                title: true,
              },
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
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

    console.error("GET /api/conversations:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}