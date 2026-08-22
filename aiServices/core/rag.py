

import os
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI, MistralAIEmbeddings
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma

load_dotenv()




llm = ChatMistralAI(model_name="mistral-small-latest", temperature=0.1)
parser = StrOutputParser()

embeddings = MistralAIEmbeddings(model="mistral-embed")

vector_store = Chroma(
    collection_name="video_transcripts",
    embedding_function=embeddings,
    persist_directory="./chroma_langchain_db",
)

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful AI assistant. Answer the question using "
               "ONLY the context below. If the answer isn't in the context, "
               "say you don't know — don't make something up.\n\nContext:\n{context}"),
    ("human", "{question}"),
])




def index_transcript(video_id: str, transcript: str):
    chunks = text_splitter.split_text(transcript)

    metadatas = [
        {"video_id": video_id}
        for _ in chunks
    ]

    vector_store.add_texts(
        texts=chunks,
        metadatas=metadatas,
    )  




def retrieve_context(
    video_id: str,
    question: str,
    k: int = 4,
):
    retriever = vector_store.as_retriever(
        search_kwargs={
            "k": k,
            "filter": {"video_id": video_id},
        }
    ) 
    result = retriever.invoke(question)

    chunk = ""
    for i in result:
        chunk += i.page_content + "\n\n"  
    return chunk   




def ask(video_id: str, question: str) -> str:
    context = retrieve_context(video_id, question)     
    chain = prompt | llm | parser
    answer = chain.invoke({"context": context, "question": question})  
    return answer




if __name__ == "__main__":
    sample_transcript = (
        "This is a placeholder. Replace this with a real transcript string "
        "from transcribe_all_chunks() once you've tested this end to end."
    )

    print("Indexing transcript...")
    index_transcript(sample_transcript)

    user_query = input("Ask a question about the video: ")
    answer = ask(user_query)
    print("\n--- ANSWER ---")
    print(answer)