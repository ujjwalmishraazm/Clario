import os

import yt_dlp
from dotenv import load_dotenv
from pydub import AudioSegment

from core.transcribe import transcribe_all_chunks

load_dotenv()


DOWNLOAD_DIR = "downloads"

MAX_AUDIO_FILE_SIZE_MB = 50
MAX_AUDIO_FILE_SIZE_BYTES = (
    MAX_AUDIO_FILE_SIZE_MB * 1024 * 1024
)

os.makedirs(DOWNLOAD_DIR, exist_ok=True)


def get_video_metadata(url: str) -> dict:
    """
    Fetch YouTube metadata without downloading the media.

    Used by the cloud input validation step to check:
    - duration
    - title
    - live-stream status
    """

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(
            url,
            download=False,
        )

    return {
        "duration_seconds": info.get("duration"),
        "title": info.get("title"),
        "is_live": info.get("is_live", False),
    }


def download_youtube_audio(url: str) -> str:
    output_path = os.path.join(
        DOWNLOAD_DIR,
        "%(title)s.%(ext)s",
    )

    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": output_path,
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "wav",
                "preferredquality": "192",
            }
        ],
        "quiet": False,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(
            url,
            download=True,
        )

        filename = (
            ydl.prepare_filename(info)
            .replace(".webm", ".wav")
            .replace(".m4a", ".wav")
        )

    return filename


def validate_audio_file_size(file_path: str) -> None:
    """
    Reject downloaded audio files that exceed
    the configured maximum size.
    """

    file_size = os.path.getsize(file_path)

    if file_size > MAX_AUDIO_FILE_SIZE_BYTES:
        raise ValueError(
            f"Downloaded audio exceeds the "
            f"{MAX_AUDIO_FILE_SIZE_MB} MB limit."
        )


def convert_to_wav(input_path: str) -> str:
    """Convert any audio/video file to WAV format using pydub."""

    output_path = (
        os.path.splitext(input_path)[0]
        + "_converted.wav"
    )

    audio = AudioSegment.from_file(input_path)

    audio = (
        audio
        .set_channels(1)
        .set_frame_rate(16000)
    )

    audio.export(
        output_path,
        format="wav",
    )

    return output_path


def chunk_audio(
    wav_path: str,
    chunk_minutes: int = 10,
) -> list:
    audio = AudioSegment.from_wav(wav_path)

    chunk_ms = chunk_minutes * 60 * 1000

    chunks = []

    for i, start in enumerate(
        range(0, len(audio), chunk_ms)
    ):
        chunk = audio[
            start : start + chunk_ms
        ]

        chunk_path = (
            f"{wav_path}_chunk_{i}.wav"
        )

        chunk.export(
            chunk_path,
            format="wav",
        )

        chunks.append(chunk_path)

    return chunks


if __name__ == "__main__":
    YOUTUBE_URL = (
        "https://www.youtube.com/shorts/GR_rQKROEGE"
    )

    print("Step 1/4 — Downloading audio...")

    raw_audio_path = download_youtube_audio(
        YOUTUBE_URL
    )

    print("Checking downloaded file size...")

    validate_audio_file_size(
        raw_audio_path
    )

    print(
        "Step 2/4 — "
        "Converting to 16kHz mono WAV..."
    )

    wav_path = convert_to_wav(
        raw_audio_path
    )

    print("Step 3/4 — Chunking...")

    chunks = chunk_audio(
        wav_path,
        chunk_minutes=10,
    )

    print(
        f"  Created {len(chunks)} chunk(s)"
    )

    print("Step 4/4 — Transcribing...")

    transcript = transcribe_all_chunks(
        chunks,
        language="english",
    )

    print("\n--- FULL TRANSCRIPT ---")
    print(transcript)