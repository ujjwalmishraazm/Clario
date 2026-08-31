# Clario

### AI Video Knowledge Platform

Clario transforms YouTube videos into structured, searchable knowledge.

Instead of watching an entire video again to find one specific piece of information, Clario analyzes the video and gives you a timestamped transcript, AI-generated insights, and a conversational interface for asking questions about the video's content.

---

## ✨ Features

### 🔐 Authentication & Workspace

- User signup and login
- JWT-based authentication
- HTTP-only authentication cookies
- Protected application routes
- User-specific video ownership
- Authorization checks
- Persistent conversations and messages
- Profile and workspace settings

### 🎥 YouTube Video Analysis

Paste a public YouTube URL and let Clario analyze it.

Supported URL formats:

```text
https://www.youtube.com/watch?v=...
https://www.youtube.com/shorts/...
```

Before processing, Clario fetches video metadata and validates the input against configured processing constraints.

The system checks:

- Video duration
- Video title
- Live-stream status
- Processing limits

### 🎙️ AI Transcription

Clario supports cloud and local transcription backends.

#### Cloud Transcription

Uses Groq's Whisper API for fast transcription.

```env
TRANSCRIBE_BACKEND=groq
```

#### Local Transcription

Uses `faster-whisper` to process transcription on the user's own computer.

```env
TRANSCRIBE_BACKEND=local
WHISPER_MODEL_SIZE=small
```

The default local model is Whisper Small so that local processing can also work on lower-end hardware.

Users with stronger hardware can configure a larger Whisper model if their system supports it.

### ⏱️ Timestamped Transcripts

Clario preserves timestamps for individual transcript segments.

Example:

```text
00:23 → 00:38
Transcript segment...

00:38 → 00:45
Another transcript segment...
```

This keeps the relationship between the generated transcript and the original video.

### 🧠 Structured AI Analysis

After transcription, Clario generates structured information from the video:

- AI-generated title
- Summary
- Action items
- Key decisions
- Open questions
- Full transcript
- Timestamped transcript segments

This transforms raw transcription into useful, organized knowledge.

### 🔎 RAG-based Video Q&A

Clario indexes the transcript using embeddings and a vector database.

When a user asks a question:

```text
Question
   ↓
Vector Search
   ↓
Relevant Transcript Context
   ↓
AI Response
```

The system retrieves relevant information from the specific video before generating the answer.

This allows users to have conversations about the actual content of a video instead of using a generic chatbot.

### 💬 Video Conversations

Users can ask questions about analyzed videos and maintain conversations around them.

Conversations and messages are persisted so users can return to previous discussions.

### ⚡ Cloud + Local Processing

Clario uses a hybrid processing approach.

Shorter videos can be processed through the cloud pipeline.

When a video exceeds configured cloud constraints, Clario provides a dedicated Local Processing option with step-by-step instructions.

The local workflow explains how to:

1. Clone the project
2. Install dependencies
3. Configure environment variables
4. Configure local Whisper
5. Start the AI service
6. Process the video locally

This allows users to use their own computer resources for larger workloads.

### 🛡️ Input & Usage Constraints

Clario includes processing safeguards to control resource usage and cloud AI costs.

Current safeguards include:

- Video duration validation
- Audio file size validation
- Per-user processing limits
- Cloud processing constraints
- Local processing fallback

Current audio processing limit:

```text
50 MB
```

Cloud processing is intended for shorter videos within the configured application limits.

### 🎨 Workspace UI

Clario provides a complete workspace experience including:

- Dashboard
- Video library
- Video analysis
- Conversations
- Profile
- Settings
- Local processing guide
- Responsive layouts
- Light/dark theme support
- Consistent component-based UI

---

# 🏗️ Architecture

Clario separates the web application from the AI processing service.

```text
                       ┌──────────────────────┐
                       │      Next.js App     │
                       │                      │
                       │ UI + Authentication  │
                       │ API Routes           │
                       │ Application Logic    │
                       └──────────┬───────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │ PostgreSQL + Prisma  │
                       └──────────────────────┘

                                  │
                                  │ AI Processing
                                  ▼

                       ┌──────────────────────┐
                       │    FastAPI Service   │
                       └──────────┬───────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
             ┌─────────────┐             ┌─────────────┐
             │   yt-dlp    │             │ FFmpeg /    │
             │             │             │ Pydub       │
             └──────┬──────┘             └──────┬──────┘
                    │                           │
                    └─────────────┬─────────────┘
                                  ▼
                         Audio Processing
                                  │
                                  ▼
                   ┌─────────────────────────┐
                   │ Groq Whisper /          │
                   │ Local faster-whisper    │
                   └────────────┬────────────┘
                                ▼
                           Transcript
                                │
                 ┌──────────────┴──────────────┐
                 ▼                             ▼
          AI Analysis                       RAG
                 │                             │
                 ▼                             ▼
       Summary / Actions              Embeddings / Search
       Decisions / Questions                  │
                                              ▼
                                      Video Q&A
```

---

# 🔄 Complete Processing Pipeline

A video follows this pipeline:

```text
1. User submits YouTube URL
              ↓
2. Fetch video metadata
              ↓
3. Validate input and processing constraints
              ↓
4. Create video record
              ↓
5. Start processing
              ↓
6. Extract audio using yt-dlp
              ↓
7. Convert audio to 16kHz mono WAV
              ↓
8. Split audio into chunks
              ↓
9. Transcribe audio
              ↓
10. Generate timestamped transcript
              ↓
11. Generate summary
              ↓
12. Generate title
              ↓
13. Extract action items
              ↓
14. Extract key decisions
              ↓
15. Extract open questions
              ↓
16. Index transcript
              ↓
17. Store analysis
              ↓
18. Video becomes READY
              ↓
19. User asks questions
              ↓
20. RAG retrieves relevant transcript context
              ↓
21. AI generates a video-specific answer
```

---

# 🧩 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- Framer Motion

### Backend

- Next.js API Routes
- Python
- FastAPI

### Database

- PostgreSQL
- Prisma ORM

### AI

- Groq
- Whisper
- faster-whisper
- Mistral
- LangChain
- Embeddings
- Chroma
- Retrieval-Augmented Generation (RAG)

### Media Processing

- yt-dlp
- FFmpeg
- Pydub

### Authentication & Validation

- JWT
- HTTP-only cookies
- Zod

### Development Tools

- Git
- Postman
- Docker
- Vercel

---

# 📁 Project Structure

```text
Clario/
│
├── client/
│   └── src/
│       ├── app/
│       │   ├── (app)/
│       │   ├── (auth)/
│       │   ├── (public)/
│       │   └── api/
│       │
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       └── services/
│
├── aiServices/
│   ├── api/
│   ├── core/
│   ├── utils/
│   ├── downloads/
│   └── main.py
│
└── README.md
```

---

# ⚙️ Environment Variables

## Client

Create:

```text
client/.env.local
```

Configure the required application values:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
AI_SERVICE_URL=http://127.0.0.1:8000
```

Use the actual values required by your environment.

## AI Service

Create:

```text
aiServices/.env
```

Example:

```env
GROQ_API_KEY=your_groq_api_key
MISTRAL_API_KEY=your_mistral_api_key

TRANSCRIBE_BACKEND=groq
WHISPER_MODEL_SIZE=small
```

For local transcription:

```env
TRANSCRIBE_BACKEND=local
WHISPER_MODEL_SIZE=small
```

> Never commit `.env`, `.env.local`, API keys, or other secrets to GitHub.

---

# 🖥️ Local Development

## 1. Clone the Repository

```bash
git clone https://github.com/ujjwalmishraazm/Clario
cd Clario
```

## 2. Install Client Dependencies

```bash
cd client
npm install
```

Create the required `.env.local` file.

Start the Next.js application:

```bash
npm run dev
```

---

## 3. Setup the AI Service

Open another terminal:

```bash
cd aiServices
```

Create a Python virtual environment:

### Windows

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Create:

```text
.env
```

and configure the required AI provider keys.

Start FastAPI:

```powershell
uvicorn main:app --reload
```

The AI service runs locally at:

```text
http://127.0.0.1:8000
```

---

# 💻 Local Processing

Cloud processing is intentionally limited to protect resources and API usage.

When a video exceeds the configured cloud constraints, use the Local Processing option in Clario.

The local pipeline is:

```text
YouTube
   ↓
yt-dlp
   ↓
Audio
   ↓
FFmpeg / Pydub
   ↓
faster-whisper
   ↓
Transcript
   ↓
AI Analysis
```

Default local configuration:

```env
TRANSCRIBE_BACKEND=local
WHISPER_MODEL_SIZE=small
```

Users with stronger hardware can configure a larger Whisper model according to their available CPU, RAM, GPU, and storage.

Local processing may take significantly longer on CPU-only or lower-end systems.

---

# 🧪 Testing

The project can be tested layer by layer.

### Authentication

- Signup
- Login
- Current user
- Logout

### Video APIs

- Create video
- List videos
- Get video
- Verify ownership
- Start processing

### AI Service

- Video metadata
- YouTube audio extraction
- Audio conversion
- Audio chunking
- Transcription
- Timestamp generation
- AI analysis
- Transcript indexing
- RAG questions

---

# 🔒 Security

Clario includes application-level security measures such as:

- JWT authentication
- HTTP-only cookies
- Protected routes
- User ownership checks
- Request validation with Zod
- User-scoped video access
- Environment-based secret configuration

API keys and private configuration should always remain outside version control.

---

# ⚠️ Current Limitations

Clario is currently a V1 project with some intentional limitations:

- Public YouTube videos are the primary input
- Cloud processing has duration and size constraints
- Audio processing currently has a 50 MB limit
- Local processing depends on the user's hardware
- CPU-only local transcription can take significant time
- YouTube extraction can occasionally fail because of changes or restrictions in YouTube's media delivery
- AI provider availability depends on external services

---

# 🔮 Future Improvements

Potential future improvements include:

- Background processing jobs
- Dedicated AI workers
- Real-time processing progress
- Improved retry and recovery
- Timestamp-linked RAG answers
- Clickable transcript timestamps
- Object storage for processing files
- More scalable vector storage
- Better processing observability
- Additional transcription providers
- GPU-based local processing
- Expanded media input support

---

# 🎯 Why Clario?

Clario was built to explore how a real AI product can combine full-stack engineering with modern AI systems.

The project brings together:

- Authentication
- Authorization
- API architecture
- Database modeling
- Media processing
- AI transcription
- LLM-based analysis
- Embeddings
- Vector search
- RAG
- Cloud AI services
- Local AI inference
- Usage constraints
- Persistent conversations
- Product-focused UX

The goal is not simply to summarize a video.

The goal is to transform long-form video into a **persistent, searchable knowledge source that users can explore and interact with.**

---

# 👨‍💻 Author

### Created by Ujjwal

---

## License

This project is currently intended as a personal portfolio and learning project.