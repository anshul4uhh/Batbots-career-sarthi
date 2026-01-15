from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import fitz
import os
from .analyze_pdf import analyse_resume_gemini

app = FastAPI(title="Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def extract_text_from_resume(file_path: str):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text


@app.get("/")
def home():
    return {"message": "Resume Analyzer API is running 🚀"}


@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile,
    job_description: str = Form(...)
):
    try:
        file_location = f"/tmp/{resume.filename}"
        with open(file_location, "wb") as f:
            f.write(await resume.read())

        resume_content = extract_text_from_resume(file_location)
        result = analyse_resume_gemini(resume_content, job_description)
        return {"status": "success", "data": result}

    except Exception as e:
        return {"status": "error", "message": str(e)}
