from fastapi import FastAPI

from api.video import router as video_router
from api.chat import router as chat_router

app = FastAPI(
    title="AI Video Analyzer AI Service",
)

app.include_router(video_router)
app.include_router(chat_router)