from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from app.models.base_class import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    resumes = relationship("Resume", back_populates="owner")

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    s3_url = Column(String, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="resumes")
    
    analysis = relationship("Analysis", back_populates="resume", uselist=False)

class Analysis(Base):
    __tablename__ = "analysis_results"
    
    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"))
    
    ats_score = Column(Float)
    skill_gap = Column(Text)
    suggestions = Column(Text)
    recommended_roles = Column(Text)
    missing_keywords = Column(Text)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    resume = relationship("Resume", back_populates="analysis")

