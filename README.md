# AI Resume Analyzer (Production-Level SaaS)

## 🚀 What Is This Project?
The AI Resume Analyzer is a production-grade Software-as-a-Service (SaaS) web application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). 

Users can securely upload their Resume as a PDF, and the system leverages Google's Gemini 2.0 AI model to parse, analyze, and grade the resume. It provides instant, actionable feedback including an ATS score, skill gap analysis, recommended job roles, and specific missing keywords to help them land their dream job.

## 🏗️ Technical Architecture
This project is built using modern, highly scalable technologies reflecting a real-world enterprise application.

### Frontend: Next.js (React)
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS for a responsive, modern dark-mode aesthetic.
- **Features**: State management, Secure JWT authentication routing, Multi-page UI (Landing > Login/Register > Dashboard).

### Backend: FastAPI (Python)
- **Framework**: FastAPI (Async API endpoints)
- **Language**: Python 3.12+
- **Database**: PostgreSQL (Managed locally via Docker, accessed via SQLAlchemy ORM).
- **Security**: JWT (JSON Web Tokens) with Bcrypt password hashing.
- **File Management**: Boto3 S3 Integration (currently configured to write strictly to local storage mimicking S3 paths for development without incurring AWS costs, but ready for production AWS S3 buckets).
- **AI Integration**: Google Generative AI (`gemini-2.0-flash`) via `pdfplumber` text extraction.

### DevOps
- **Containerization**: Docker & Docker-Compose

---

## 🛠️ Step-by-Step Manual Setup Guide
If you are cloning this repository from scratch, follow these instructions to get the application running on your local machine.

### Prerequisites
1. **Node.js** & **npm** (for the frontend).
2. **Python 3.10+** (for the backend).
3. **Docker Desktop** (must be installed and actively running for the database).
4. A **Google Gemini API Key** (Get one for free at Google AI Studio).

### 1. Database Setup (Docker)
Ensure Docker Desktop is open.
Open a terminal in the root directory and run:
```bash
docker-compose up -d db
```
*This spins up a PostgreSQL database instance in the background on port `5432`.*

### 2. Backend Setup (FastAPI)
Open a new terminal and navigate to the `backend` folder:
```bash
cd backend
```
Create a Python Virtual Environment and activate it:
**Windows:**
```powershell
python -m venv venv
.\venv\Scripts\activate
```
**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required Python dependencies:
```bash
pip install -r requirements.txt
```

#### Environment Variables
In the `backend` folder, create a new file named `.env` and add your configuration (replace the Gemini key with your own):
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/resume_db
SECRET_KEY=my_development_secret_key_123_please_change
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_REGION=us-east-1
AWS_S3_BUCKET=local-resume-bucket
GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY
```

#### Database Migrations
Run Alembic to create the tables in the PostgreSQL database based on our Python models:
```bash
set PYTHONPATH=%cd%
alembic upgrade head
```

#### Start the Server
Start the FastAPI server:
```bash
uvicorn main:app --reload
```
*The backend API is now running at `http://localhost:8000`.*

### 3. Frontend Setup (Next.js)
Open a third terminal and navigate to the `frontend` folder:
```bash
cd frontend
```

Install the Node modules:
```bash
npm install
```

Start the Next.js development server:
```bash
npm run dev
```
*The frontend is now running at `http://localhost:3000`.*

---

## 💻 How to Use the App
1. Go to **[http://localhost:3000](http://localhost:3000)** in your browser.
2. Click **Get Started** or **Register** to create an account.
3. Once logged in, you will be redirected to your dashboard.
4. Click the upload box on the left-hand side, select a PDF of your resume, and click **Upload & Analyze**.
5. Wait a few moments while the PDF is parsed and sent to the AI.
6. A beautiful card will appear on the right side detailing your ATS Score, missing keywords, and actionable insights!

---

## Directory Structure
```
AI-Resume-Analyzer-SaaS/
│
├── backend/                  # FastAPI Application
│   ├── alembic.ini           # Database migration configuration
│   ├── alembic/              # Migration history scripts
│   ├── app/                  # Main Backend Code
│   │   ├── api/              # API Route files (auth, basic resumes)
│   │   ├── core/             # Database connection & JWT security setup
│   │   ├── models/           # SQLAlchemy DB Models & Pydantic Schemas
│   │   └── services/         # S3 Upload logic & Gemini AI Logic
│   ├── main.py               # Application Entry Point
│   ├── requirements.txt      # Python Dependencies
│   └── .env                  # (Git-ignored) API variables
│
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── app/              # Next.js App Router UI Files
│   │   │   ├── dashboard/    # User File Upload UI
│   │   │   ├── login/        # JWT Authentication Entry
│   │   │   ├── register/     # Account creation
│   │   │   ├── layout.tsx    # Head and Body Wrappers
│   │   │   └── page.tsx      # Main Landing Page
│   ├── package.json          # Node Dependencies
│   └── tailwind.config.ts    # Styling Configuration
│
└── docker-compose.yml        # PostgreSQL Container Setup
```
## 👨‍💻 Author
Built and maintained by **Arun Jadhav**.
