import json
import google.generativeai as genai
from pdfplumber import open as open_pdf
from app.core.config import settings
from typing import Dict, Any

def init_gemini():
    genai.configure(api_key=settings.GEMINI_API_KEY)
    return genai.GenerativeModel("gemini-2.0-flash")

def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    with open_pdf(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def analyze_resume(text: str) -> Dict[str, Any]:
    if not settings.GEMINI_API_KEY or settings.GEMINI_API_KEY.lower() == "test":
        # Mocking for local test with "test" API KEY
        return {
            "ats_score": 85.0,
            "skill_gap": "Lacks cloud deployment experience.",
            "suggestions": "Add projects demonstrating AWS deployment.",
            "recommended_roles": "Junior Backend Developer, Python Developer",
            "missing_keywords": "Docker, CI/CD, AWS"
        }
    model = init_gemini()
    prompt = f"""
    You are an expert ATS (Applicant Tracking System) reviewer and recruiter.
    Analyze the following resume text and provide a JSON response with exactly these fields:
    - "ats_score": A float between 0 and 100 representing how well optimized this resume is.
    - "skill_gap": A short string describing what skills the candidate might be missing for modern software engineering roles.
    - "suggestions": A short string with 2-3 actionable suggestions for improving the resume.
    - "recommended_roles": A comma-separated string of job titles this person should apply to.
    - "missing_keywords": A comma-separated string of important industry keywords missing from the text.
    
    Ensure the output is strictly valid JSON without any markdown blocks.
    
    Resume Text:
    {text}
    """
    
    try:
        response = model.generate_content(prompt)
        content = response.text.replace("```json", "").replace("```", "").strip()
        data = json.loads(content)
        return data
    except Exception as e:
        print(f"Error analyzing with Gemini: {e}")
        return {
            "ats_score": 0.0,
            "skill_gap": "Analysis failed",
            "suggestions": "Analysis failed",
            "recommended_roles": "Analysis failed",
            "missing_keywords": "Analysis failed"
        }
