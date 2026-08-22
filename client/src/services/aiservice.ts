type ProcessVideoInput = {
    videoId: string;
    youtubeUrl: string;
    language?: "english" | "hinglish";
};

type ProcessVideoData = {
    transcript: string;
    summary: string;
    title: string;
    action_items: string[];
    key_decisions: string[];
    open_questions: string[];
};

type ProcessVideoResponse = {
    success: boolean;
    videoId: string;
    data: ProcessVideoData;
};

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

if (!AI_SERVICE_URL) {
    throw new Error("AI_SERVICE_URL is not configured");
}

export async function processVideoWithAI(
    input: ProcessVideoInput,
): Promise<ProcessVideoResponse> {
    const response = await fetch(`${AI_SERVICE_URL}/process-video`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(
            `AI service request failed: ${response.status} ${errorMessage}`,
        );
    }

    const data: ProcessVideoResponse = await response.json();

    return data;
}

type AskVideoInput = {
    videoId: string;
    question: string;
};

type AskVideoResponse = {
    success: boolean;
    videoId: string;
    answer: string;
};

export async function askVideoWithAI(
    input: AskVideoInput,
): Promise<AskVideoResponse> {
    const response = await fetch(`${AI_SERVICE_URL}/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });

    if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(
            `AI service request failed: ${response.status} ${errorMessage}`,
        );
    }

    const data: AskVideoResponse = await response.json();

    return data;
}