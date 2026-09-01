import axios from "axios";

export type ConversationMessageRole = "USER" | "ASSISTANT";

export type ConversationMessage = {
  id: string;
  conversationId: string;
  role: ConversationMessageRole;
  content: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  videoId: string;
  title: string | null;
  createdAt: string;
  updatedAt?: string;
  messages: ConversationMessage[];
  video?: {
    id: string;
    youtubeUrl: string;
    analysis: {
      title: string;
    } | null;
  };
};

type CreateConversationResponse = {
  success: boolean;
  data?: {
    id: string;
    videoId: string;
    title: string | null;
    createdAt: string;
  };
  message?: string;
};

type GetConversationsResponse = {
  success: boolean;
  data: Conversation[];
  message?: string;
};

type SendMessageResponse = {
  success: boolean;
  data?: {
    userMessage: ConversationMessage;
    assistantMessage: ConversationMessage;
  };
  message?: string;
};

export async function createConversation(
  videoId: string,
): Promise<{
  id: string;
  videoId: string;
  title: string | null;
  createdAt: string;
}> {
  const response =
    await axios.post<CreateConversationResponse>(
      `/api/videos/${videoId}/conversations`,
    );

  if (!response.data.success || !response.data.data) {
    throw new Error(
      response.data.message ??
        "Failed to create conversation",
    );
  }

  return response.data.data;
}

export async function getConversations(
  videoId: string,
): Promise<Conversation[]> {
  const response =
    await axios.get<GetConversationsResponse>(
      `/api/videos/${videoId}/conversations`,
    );

  if (!response.data.success) {
    throw new Error(
      response.data.message ??
        "Failed to fetch conversations",
    );
  }

  return response.data.data;
}

export async function sendMessage(
  conversationId: string,
  question: string,
): Promise<{
  userMessage: ConversationMessage;
  assistantMessage: ConversationMessage;
}> {
  const response =
    await axios.post<SendMessageResponse>(
      `/api/conversations/${conversationId}/messages`,
      {
        question,
      },
    );

  if (!response.data.success || !response.data.data) {
    throw new Error(
      response.data.message ??
        "Failed to send message",
    );
  }

  return response.data.data;
}

type GetAllConversationsResponse = {
  success: boolean;
  data: Conversation[];
  message?: string;
};

export async function getAllConversations(): Promise<Conversation[]> {
  const response =
    await axios.get<GetAllConversationsResponse>(
      "/api/conversations",
    );

  if (!response.data.success) {
    throw new Error(
      response.data.message ??
        "Failed to fetch conversations",
    );
  }

  return response.data.data;
}