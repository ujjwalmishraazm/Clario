import { getAuthenticatedUser } from "@/lib/authenticatedUser";
import { prisma } from "@/lib/prisma";
import { askVideoWithAI } from "@/services/aiservice";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type SendMessageBody = {
  question: string;
};

export async function POST(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const user = getAuthenticatedUser(request);

    const { id: conversationId } = await context.params;

    const body: SendMessageBody = await request.json();

    if (!body.question || body.question.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Question is required",
        },
        { status: 400 },
      );
    }

    const question = body.question.trim();

    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        video: {
          userId: user.id,
        },
      },
      include: {
        video: true,
      },
    });

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation not found",
        },
        { status: 404 },
      );
    }

    if (conversation.video.status !== "READY") {
      return NextResponse.json(
        {
          success: false,
          message: "Video is not ready for questions",
        },
        { status: 409 },
      );
    }

    const userMessage = await prisma.message.create({
      data: {
        conversationId,
        role: "USER",
        content: question,
      },
    });

    const aiResponse = await askVideoWithAI({
      videoId: conversation.video.id,
      question,
    });

    const assistantMessage = await prisma.message.create({
      data: {
        conversationId,
        role: "ASSISTANT",
        content: aiResponse.answer,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          userMessage,
          assistantMessage,
        },
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
      "POST /api/conversations/[id]/messages:",
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