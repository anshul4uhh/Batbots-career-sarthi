from fastapi import FastAPI, Form, UploadFile, File
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
import json, os

from talk import text_to_speech
from interview import interview_step, evaluate_interview, parse_resume, parse_job
from session_store import get_session_history
from resume_parser import simple_resume_parser

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

SESSION_CONTEXT = {}

@app.get("/")
def root():
    return {"message": "AI Mock Interviewer Backend Running"}

@app.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...), session_id: str = Form("default_session")):
    file_path = f"tmp/{file.filename}"
    os.makedirs("tmp", exist_ok=True)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    
    raw_profile = simple_resume_parser(file_path)
    structured_profile = parse_resume(json.dumps(raw_profile))

    SESSION_CONTEXT[session_id] = {
        "candidate_profile": structured_profile,
        "job_context": {}
    }

    return {"candidate_profile": structured_profile}

@app.post("/upload_job")
async def upload_job(job_role: str = Form(...), job_description: str = Form(""), session_id: str = Form("default_session")):
    structured_job = parse_job(job_role, job_description)

    if session_id not in SESSION_CONTEXT:
        SESSION_CONTEXT[session_id] = {}
    SESSION_CONTEXT[session_id]["job_context"] = structured_job

    return {"job_context": structured_job}

@app.post("/start_interview")
async def start_interview(query: str = Form("Hello"), session_id: str = Form("default_session")):
    SESSION_CONTEXT[session_id] = {
        "candidate_profile": SESSION_CONTEXT.get(session_id, {}).get("candidate_profile", {}),
        "job_context": SESSION_CONTEXT.get(session_id, {}).get("job_context", {})
    }
    history = get_session_history(session_id)
    history.clear()

    context = SESSION_CONTEXT[session_id]
    reply = interview_step(
        query,
        session_id,
        candidate_profile=json.dumps(context.get("candidate_profile", {})),
        job_context=json.dumps(context.get("job_context", {}))
    )
    return {"reply": reply}

@app.post("/answer")
async def answer_question(query: str = Form(...), session_id: str = Form("default_session")):
    context = SESSION_CONTEXT.get(session_id, {})
    reply = interview_step(
        query,
        session_id,
        candidate_profile=json.dumps(context.get("candidate_profile", {})),
        job_context=json.dumps(context.get("job_context", {}))
    )
    chat = get_session_history(session_id)
    history = [{"role": m.type, "content": m.content} for m in chat.messages]
    return {"reply": reply, "chat_history": history}

@app.post("/evaluate")
async def evaluate(session_id: str = Form("default_session")):
    context = SESSION_CONTEXT.get(session_id, {})
    chat = get_session_history(session_id)
    transcript = "\n".join([f"{m.type}: {m.content}" for m in chat.messages])

    evaluation = evaluate_interview(
        transcript,
        candidate_profile=json.dumps(context.get("candidate_profile", {})),
        job_context=json.dumps(context.get("job_context", {}))
    )
    return evaluation

@app.post("/tts")
async def tts_endpoint(text: str = Form(...), lang: str = Form("en"), voice: str = Form("female")):
    audio_bytes = text_to_speech(text, lang, voice)
    return Response(content=audio_bytes, media_type="audio/mpeg")
