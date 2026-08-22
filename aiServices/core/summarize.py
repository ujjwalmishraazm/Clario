from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_text_splitters import RecursiveCharacterTextSplitter


def get_llm():
    return ChatMistralAI(model="mistral-small-latest", temperature=0.3)


def split_transcript(transcript: str) -> list:
    splitter = RecursiveCharacterTextSplitter(chunk_size=3000, chunk_overlap=200)
    return splitter.split_text(transcript)


def summarize(transcript: str) -> str:
    model = get_llm()
    parser = StrOutputParser()

    map_prompt = ChatPromptTemplate.from_messages([
        ("system", "Summarize this portion of a meeting transcript concisely."),
        ("human", "{text}"),
    ])
    map_chain = map_prompt | model | parser

    chunks = split_transcript(transcript)

    chunk_summaries = []
    for chunk in chunks:
        result = map_chain.invoke({"text": chunk})
        chunk_summaries.append(result)

    joined_summaries = "\n\n".join(chunk_summaries)

    combine_prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert meeting summarizer. Combine these partial "
                   "summaries into one final professional meeting summary in "
                   "bullet points."),
        ("human", "{text}"),
    ])
    combine_chain = combine_prompt | model | parser

    final_summary = combine_chain.invoke({"text": joined_summaries})
    return final_summary


def generate_title(transcript: str) -> str:
    model = get_llm()
    parser = StrOutputParser()

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful AI assistant. Give a short professional "
                   "meeting title, max 8 words. Only return the title, nothing else."),
        ("human", "{text}"),
    ])
    chain = prompt | model | parser

    result = chain.invoke({"text": transcript[:2000]})
    return result