

from utils.audio_processor import download_youtube_audio, convert_to_wav, chunk_audio
from core.transcribe import transcribe_all_chunks
from core.summarize import summarize, generate_title
from core.extractor import extract_action_items, extract_key_decisions, extract_questions
from core.rag import index_transcript, ask


def process_video(
    video_id: str,
    youtube_url: str,
    language: str = "english",
) -> dict:
    raw_audio_path = download_youtube_audio(youtube_url)
    wav_path = convert_to_wav(raw_audio_path)
    chunks = chunk_audio(wav_path)

    transcript = transcribe_all_chunks(chunks, language=language)

    summary = summarize(transcript)
    title = generate_title(transcript)
    action_items = extract_action_items(transcript)
    key_decisions = extract_key_decisions(transcript)
    open_questions = extract_questions(transcript)

    index_transcript(video_id,transcript)

    return {
        "transcript": transcript,
        "summary": summary,
        "title": title,
        "action_items": action_items,
        "key_decisions": key_decisions,
        "open_questions": open_questions,
    }


if __name__ == "__main__":
    youtube_url = input("Enter YouTube URL: ").strip()
    language = input("Language (english/hinglish): ").strip() or "english"

    result = process_video(youtube_url, language=language)

    print("\n--- TITLE ---")
    print(result["title"])

    print("\n--- SUMMARY ---")
    print(result["summary"])

    print("\n--- ACTION ITEMS ---")
    print(result["action_items"])

    print("\n--- KEY DECISIONS ---")
    print(result["key_decisions"])

    print("\n--- OPEN QUESTIONS ---")
    print(result["open_questions"])

    while True:
        question = input("\nAsk a question about this video (or press Enter to quit): ")
        if not question:
            break
        print(ask(question))
