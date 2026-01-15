import fitz

def extract_text_from_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text("text")
    return text

def simple_resume_parser(file_path: str) -> dict:
    raw_text = extract_text_from_pdf(file_path)
    return {"raw_text": raw_text}