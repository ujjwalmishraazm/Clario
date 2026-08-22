import axios from "axios";

export type VideoStatus =
  | "PENDING"
  | "PROCESSING"
  | "READY"
  | "FAILED";

export type Video = {
  id: string;
  userId: string;
  youtubeUrl: string;
  duration: number | null;
  status: VideoStatus;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
};

type GetVideosResponse = {
  success: boolean;
  videos: Video[];
};

export async function getVideos(): Promise<Video[]> {
  const response =
    await axios.get<GetVideosResponse>("/api/videos");

  if (!response.data.success) {
    throw new Error("Failed to fetch videos");
  }

  return response.data.videos;
};

export type VideoDetail = Video & {
  transcript: {
    id: string;
    videoId: string;
    content: string;
    language: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;

  analysis: {
    id: string;
    videoId: string;
    title: string;
    summary: string;
    actionItems: unknown;
    keyDecisions: unknown;
    openQuestions: unknown;
    createdAt: string;
    updatedAt: string;
  } | null;
};

type GetVideoResponse = {
  success: boolean;
  data: VideoDetail;
  message?: string;
};

type ProcessVideoResponse = {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    status: VideoStatus;
  };
};

export async function getVideoById(
  videoId: string,
): Promise<VideoDetail> {
  const response = await axios.get<GetVideoResponse>(
    `/api/videos/${videoId}`,
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message ?? "Failed to fetch video",
    );
  }

  return response.data.data;
}

export async function processVideo(
  videoId: string,
): Promise<{
  id: string;
  status: VideoStatus;
}> {
  const response =
    await axios.post<ProcessVideoResponse>(
      `/api/videos/${videoId}/process`,
    );

  if (
    !response.data.success ||
    !response.data.data
  ) {
    throw new Error(
      response.data.message ??
        "Failed to start video processing",
    );
  }

  return response.data.data;
}