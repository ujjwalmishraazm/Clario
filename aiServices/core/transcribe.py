import os
from faster_whisper import WhisperModel
from groq import Groq
import time  

TRANSCRIBE_BACKEND = os.getenv("TRANSCRIBE_BACKEND", "local")
WHISPER_MODEL_SIZE = os.getenv("WHISPER_MODEL_SIZE", "small")

_model = None


def load_model():
    global _model
    if _model is None:
        print(f"Loading Whisper model: {WHISPER_MODEL_SIZE} (int8)...")
        _model = WhisperModel(WHISPER_MODEL_SIZE, device="cpu", compute_type="int8")
        print("Whisper model loaded.")
    return _model


def transcribe_chunk_local(chunk_path: str, translate_to_english: bool = False) -> str:
    """Runs on your own machine — free, uses your CPU/RAM."""

    model = load_model()
    task = "translate" if translate_to_english else "transcribe"

    start_time = time.perf_counter()

    segments, info = model.transcribe(chunk_path, task=task)

    full_text = ""
    for segment in segments:
        full_text += segment.text

    elapsed = time.perf_counter() - start_time

    print(f"  Detected language: {info.language} ({info.language_probability:.2f} confidence)")
    print(f"  Transcription time: {elapsed:.2f} seconds")

    return full_text.strip()


def transcribe_chunk_groq(chunk_path: str, translate_to_english: bool = False) -> str:
    """Runs on Groq's servers — needs GROQ_API_KEY in your environment/.env.

    Groq's Whisper API has TWO separate endpoints (not a task parameter
    like local faster-whisper):
      - client.audio.transcriptions.create(...) -> keeps original language
      - client.audio.translations.create(...)   -> always outputs English
    """
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    with open(chunk_path, "rb") as f:
        if translate_to_english:
            response = client.audio.translations.create(
                file=f,
                model="whisper-large-v3",
            )
        else:
            response = client.audio.transcriptions.create(
                file=f,
                model="whisper-large-v3",
            )
    return response.text.strip()


def transcribe_chunk(chunk_path: str, language: str = "english") -> str:
    """
    Routes to whichever backend is configured (local/groq), and tells that
    backend whether to translate to English based on `language`.

    language="english"  -> transcribe as-is (task="transcribe")
    language="hinglish"/"hindi" (or anything non-English) -> translate
      Hindi/Hinglish audio into English text (task="translate")
    """
    translate_to_english = language.lower() != "english"

    if TRANSCRIBE_BACKEND == "groq":
        return transcribe_chunk_groq(chunk_path, translate_to_english=translate_to_english)
    return transcribe_chunk_local(chunk_path, translate_to_english=translate_to_english)


def transcribe_all_chunks(chunk_paths: list, language: str = "english") -> str:
    all_transcripts = []
    print(f"Using backend: {TRANSCRIBE_BACKEND} | language mode: {language}")

    for i, chunk_path in enumerate(chunk_paths):
        print(f"Transcribing chunk {i + 1}/{len(chunk_paths)}: {chunk_path}")
        text = transcribe_chunk(chunk_path, language=language)
        all_transcripts.append(text)

    return " ".join(all_transcripts)


