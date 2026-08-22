import { prisma } from "@/lib/prisma";

type createdvideos = {
    userId: string;
    youtubeUrl: string;
};
export async function createvideo(data: createdvideos) {
    return prisma.video.create({
        data: {
            userId: data.userId,
            youtubeUrl: data.youtubeUrl,
        },
    });
}

export async function getVideo(userId: string) {
    return prisma.video.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getVideoById(
    videoId: string,
    userId: string,
) {
    return prisma.video.findFirst({
        where: {
            id: videoId,
            userId,
        },
        include: {
            transcript: true,
            analysis: true,
        },
    });
}

export async function deleteVideo(videoId: string, userId: string) {
    return prisma.video.deleteMany({
        where: {
            id: videoId,
            userId,
        },
    });
}
