from fastapi import APIRouter
from pydantic import BaseModel

from core.pipeline import process_video


router = APIRouter()


class VideoProcessRequest(BaseModel):
    videoId: str
    youtubeUrl: str
    language: str = "english"


@router.post("/process-video")
def process_video_endpoint(request: VideoProcessRequest):
    result = process_video(
    video_id=request.videoId,
    youtube_url=request.youtubeUrl,
    language=request.language,
)

    return {
        "success": True,
        "videoId": request.videoId,
        "data": result,
    }