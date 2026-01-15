from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_google_vertexai import VertexAI
from langchain_core.runnables.history import RunnableWithMessageHistory
from session_store import get_session_history
from prompts import (
    interviewer_system_prompt,
    evaluator_system_prompt,
    resume_structuring_system_prompt,
    job_role_system_prompt,
)
import re
import os
import json
from dotenv import load_dotenv
load_dotenv()

llm = VertexAI(
    model_name="gemini-2.0-flash",
    project=os.getenv("GCP_PROJECT_ID"),
    location="global",
    temperature=0.3,
)

def clean_json_response(text: str):
    cleaned = re.sub(r"```(json)?", "", text, flags=re.IGNORECASE).strip("` \n")
    return cleaned

# Resume Parsing
resume_chain = (
    ChatPromptTemplate.from_messages([
        ("system", resume_structuring_system_prompt),
        ("human", "{resume_text}")
    ]) | llm | StrOutputParser()
)

def parse_resume(resume_text: str) -> dict:
    result = resume_chain.invoke({"resume_text": resume_text})
    try:
        result = clean_json_response(result)
        return json.loads(result)
    except:
        return {"error": "Failed to parse resume", "raw": result}

# Job Role Parsing
job_chain = (
    ChatPromptTemplate.from_messages([
        ("system", job_role_system_prompt),
        ("human", "Role: {job_role}\nDescription: {job_description}")
    ]) | llm | StrOutputParser()
)

def parse_job(job_role: str, job_description: str = "") -> dict:
    result = job_chain.invoke({"job_role": job_role, "job_description": job_description})
    try:
        result = clean_json_response(result)
        return json.loads(result)
    except:
        return {"error": "Failed to parse job role", "raw": result}

# Interview Flow
interview_prompt = ChatPromptTemplate.from_messages([
    ("system", interviewer_system_prompt),
    ("system", "Candidate Profile (JSON):\n{candidate_profile}\n\nJob Role Context (JSON):\n{job_context}"),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}")
])

interview_chain = interview_prompt | llm | StrOutputParser()

conversational_interview = RunnableWithMessageHistory(
    interview_chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
)

def interview_step(query: str, session_id: str, candidate_profile: str = "{}", job_context: str = "{}") -> str:
    return conversational_interview.invoke(
        {
            "input": query,
            "candidate_profile": candidate_profile,
            "job_context": job_context,
        },
        config={"configurable": {"session_id": session_id}},
    )

# Evaluation Flow
evaluation_prompt = ChatPromptTemplate.from_messages([
    ("system", evaluator_system_prompt),
    ("human", "Candidate Profile:\n{candidate_profile}\n\nJob Role Context:\n{job_context}\n\nTranscript:\n{transcript}")
])

evaluation_chain = evaluation_prompt | llm | StrOutputParser()

def evaluate_interview(transcript: str, candidate_profile: str = "{}", job_context: str = "{}") -> dict:
    result = evaluation_chain.invoke({
        "transcript": transcript,
        "candidate_profile": candidate_profile,
        "job_context": job_context,
    })
    try:
        result = clean_json_response(result)
        return json.loads(result)
    except:
        return {"error": "Failed to parse evaluation", "raw": result}
