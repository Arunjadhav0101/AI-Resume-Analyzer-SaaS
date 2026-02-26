from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.models.models import User, Resume, Analysis
from app.models.schemas import ResumeResponse, AnalysisResponse
from app.services.s3_service import upload_resume_to_s3
from app.services.ai_service import extract_text_from_pdf, analyze_resume
import os

router = APIRouter()

@router.post("/upload", response_model=ResumeResponse)
async def upload_resume(
    file: UploadFile = File(...),
    job_role: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    s3_path = await upload_resume_to_s3(file, current_user.id)
    
    resume = Resume(
        title=file.filename,
        s3_url=s3_path,
        owner_id=current_user.id
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)
    
    # Analyze in background or synchronously for now
    local_file_path = s3_path if "uploads/" in s3_path else None
    if not local_file_path:
        # We need to temporarily save it if it went to actual S3 directly.
        pass
        
    # extract and analyze
    text = extract_text_from_pdf(local_file_path)
    analysis_results = analyze_resume(text, job_role)
    
    analysis = Analysis(
        resume_id=resume.id,
        ats_score=analysis_results.get("ats_score", 0.0),
        skill_gap=analysis_results.get("skill_gap", ""),
        suggestions=analysis_results.get("suggestions", ""),
        recommended_roles=analysis_results.get("recommended_roles", ""),
        missing_keywords=analysis_results.get("missing_keywords", "")
    )
    db.add(analysis)
    db.commit()
    db.refresh(resume) # Refresh resume to load the relationship
    
    return resume

@router.get("/", response_model=list[ResumeResponse])
def get_user_resumes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return current_user.resumes

@router.get("/{resume_id}", response_model=ResumeResponse)
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = db.query(Resume).filter(
        Resume.id == resume_id, 
        Resume.owner_id == current_user.id
    ).first()
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
        
    return resume
