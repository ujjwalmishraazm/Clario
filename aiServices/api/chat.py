from fastapi import APIRouter
from pydantic import BaseModel

from core.rag import ask

router = APIRouter()


class AskRequest(BaseModel):
    videoId: str
    question: str


@router.post("/ask")
def ask_question(request: AskRequest):
    answer = ask(
        video_id=request.videoId,
        question=request.question,
    )

    return {
        "success": True,
        "videoId": request.videoId,
        "answer": answer,
    }