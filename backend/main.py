from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Resume Analyzer API",
    description="Backend API for analyzing resumes with AI",
    version="1.0.0",
)

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.56.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api import auth, resume

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(resume.router, prefix="/api/v1/resumes", tags=["resumes"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Resume Analyzer API"}
