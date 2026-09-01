import os
import time
from dataclasses import dataclass

from dotenv import load_dotenv
from faster_whisper import WhisperModel
from groq import Groq


load_dotenv()


TRANSCRIBE_BACKEND = os.getenv(
    "TRANSCRIBE_BACKEND",
    "local",
)

WHISPER_MODEL_SIZE = os.getenv(
    "WHISPER_MODEL_SIZE",
    "small",
)


_model = None


@dataclass
class TranscriptSegment:
    start: float
    end: float
    text: str


@dataclass
class TranscriptResult:
    text: str
    segments: list[TranscriptSegment]


def load_model():
    global _model

    if _model is None:
        print(
            f"Loading Whisper model: "
            f"{WHISPER_MODEL_SIZE} (int8)..."
        )

        _model = WhisperModel(
            WHISPER_MODEL_SIZE,
            device="cpu",
            compute_type="int8",
        )

        print("Whisper model loaded.")

    return _model


def transcribe_chunk_local(
    chunk_path: str,
    translate_to_english: bool = False,
) -> TranscriptResult:
    """Runs transcription locally using faster-whisper."""

    model = load_model()

    task = (
        "translate"
        if translate_to_english
        else "transcribe"
    )

    start_time = time.perf_counter()

    segments, info = model.transcribe(
        chunk_path,
        task=task,
    )

    transcript_segments: list[TranscriptSegment] = []

    for segment in segments:
        text = segment.text.strip()

        if not text:
            continue

        transcript_segments.append(
            TranscriptSegment(
                start=float(segment.start),
                end=float(segment.end),
                text=text,
            )
        )

    elapsed = time.perf_counter() - start_time

    print(
        f"  Detected language: "
        f"{info.language} "
        f"({info.language_probability:.2f} confidence)"
    )

    print(
        f"  Transcription time: "
        f"{elapsed:.2f} seconds"
    )

    full_text = " ".join(
        segment.text
        for segment in transcript_segments
    )

    return TranscriptResult(
        text=full_text.strip(),
        segments=transcript_segments,
    )


def transcribe_chunk_groq(
    chunk_path: str,
    translate_to_english: bool = False,
) -> TranscriptResult:
    """
    Runs transcription using Groq Whisper.

    Groq returns segment-level timestamps when using
    verbose_json + timestamp_granularities=["segment"].
    """

    groq_api_key = os.getenv("GROQ_API_KEY")

    if not groq_api_key:
        raise ValueError(
            "GROQ_API_KEY is not configured."
        )

    client = Groq(
        api_key=groq_api_key,
    )

    with open(chunk_path, "rb") as f:
        if translate_to_english:
            response = client.audio.translations.create(
                file=f,
                model="whisper-large-v3",
                response_format="verbose_json",
                timestamp_granularities=["segment"],
            )
        else:
            response = client.audio.transcriptions.create(
                file=f,
                model="whisper-large-v3",
                response_format="verbose_json",
                timestamp_granularities=["segment"],
            )

    transcript_segments: list[TranscriptSegment] = []

    for segment in response.segments or []:
        text = segment["text"].strip()

        if not text:
            continue

        transcript_segments.append(
            TranscriptSegment(
                start=float(segment["start"]),
                end=float(segment["end"]),
                text=text,
            )
        )

    full_text = " ".join(
        segment.text
        for segment in transcript_segments
    )

    return TranscriptResult(
        text=full_text.strip(),
        segments=transcript_segments,
    )


def transcribe_chunk(
    chunk_path: str,
    language: str = "english",
) -> TranscriptResult:
    """
    Routes transcription to the configured backend.

    English:
        Keep the original language.

    Non-English:
        Translate the audio into English.
    """

    translate_to_english = (
        language.lower() != "english"
    )

    if TRANSCRIBE_BACKEND.lower() == "groq":
        return transcribe_chunk_groq(
            chunk_path,
            translate_to_english=translate_to_english,
        )

    return transcribe_chunk_local(
        chunk_path,
        translate_to_english=translate_to_english,
    )


def transcribe_all_chunks(
    chunk_paths: list,
    language: str = "english",
) -> TranscriptResult:
    """
    Transcribes all audio chunks.

    Whisper timestamps are relative to each individual
    audio chunk, so we convert them into timestamps
    relative to the original audio.
    """

    all_segments: list[TranscriptSegment] = []

    print(
        f"Using backend: "
        f"{TRANSCRIBE_BACKEND} | "
        f"language mode: {language}"
    )

    # chunk_audio() currently creates 10-minute chunks.
    chunk_duration_seconds = 10 * 60

    for i, chunk_path in enumerate(chunk_paths):
        print(
            f"Transcribing chunk "
            f"{i + 1}/{len(chunk_paths)}: "
            f"{chunk_path}"
        )

        result = transcribe_chunk(
            chunk_path,
            language=language,
        )

        chunk_offset = (
            i * chunk_duration_seconds
        )

        for segment in result.segments:
            all_segments.append(
                TranscriptSegment(
                    start=segment.start + chunk_offset,
                    end=segment.end + chunk_offset,
                    text=segment.text,
                )
            )

    full_text = " ".join(
        segment.text
        for segment in all_segments
    )

    return TranscriptResult(
        text=full_text.strip(),
        segments=all_segments,
    )