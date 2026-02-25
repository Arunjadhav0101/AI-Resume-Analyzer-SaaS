from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class AnalysisResponse(BaseModel):
    id: int
    resume_id: int
    ats_score: float
    skill_gap: Optional[str] = None
    suggestions: Optional[str] = None
    recommended_roles: Optional[str] = None
    missing_keywords: Optional[str] = None

    class Config:
        from_attributes = True

class ResumeResponse(BaseModel):
    id: int
    title: str
    upload_date: datetime
    analysis: Optional[AnalysisResponse] = None

    class Config:
        from_attributes = True
