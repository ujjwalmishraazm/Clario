import { prisma } from "@/lib/prisma";
import { VideoStatus } from "@prisma/client";
import { processVideoWithAI } from "./aiservice";

export async function startVideoProcessing(
    videoId: string,
    userId: string,
) {
    const video = await prisma.video.findFirst({
        where: {
            id: videoId,
            userId,
        },
    });

    if (!video) {
        throw new Error("VIDEO_NOT_FOUND");
    }

    if (
        video.status !== VideoStatus.PENDING &&
        video.status !== VideoStatus.FAILED
    ) {
        throw new Error("VIDEO_ALREADY_PROCESSING");
    }

    // Mark video as processing
    await prisma.video.update({
        where: {
            id: video.id,
        },
        data: {
            status: VideoStatus.PROCESSING,
            errorMessage: null,
        },
    });

    try {
        // Call Python AI service
        const aiResult = await processVideoWithAI({
            videoId: video.id,
            youtubeUrl: video.youtubeUrl,
            language: "english",
        });

        // Save transcript + timestamps + analysis + final status
        const updatedVideo = await prisma.$transaction(async (tx) => {
            await tx.transcript.upsert({
                where: {
                    videoId: video.id,
                },
                update: {
                    content: aiResult.data.transcript,
                    language: "english",
                    segments: aiResult.data.segments,
                },
                create: {
                    videoId: video.id,
                    content: aiResult.data.transcript,
                    language: "english",
                    segments: aiResult.data.segments,
                },
            });

            await tx.analysis.upsert({
                where: {
                    videoId: video.id,
                },
                update: {
                    title: aiResult.data.title,
                    summary: aiResult.data.summary,
                    actionItems: aiResult.data.action_items,
                    keyDecisions: aiResult.data.key_decisions,
                    openQuestions: aiResult.data.open_questions,
                },
                create: {
                    videoId: video.id,
                    title: aiResult.data.title,
                    summary: aiResult.data.summary,
                    actionItems: aiResult.data.action_items,
                    keyDecisions: aiResult.data.key_decisions,
                    openQuestions: aiResult.data.open_questions,
                },
            });

            return tx.video.update({
                where: {
                    id: video.id,
                },
                data: {
                    status: VideoStatus.READY,
                    errorMessage: null,
                },
            });
        });

        return updatedVideo;
    } catch (error) {
        console.error("Video processing failed:", error);

        await prisma.video.update({
            where: {
                id: video.id,
            },
            data: {
                status: VideoStatus.FAILED,
                errorMessage:
                    error instanceof Error
                        ? error.message
                        : "Video processing failed",
            },
        });

        throw new Error("VIDEO_PROCESSING_FAILED");
    }
}