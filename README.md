# AI Resume Analyzer SaaS

This application consists of a Next.js frontend and a FastAPI (Python) backend using a PostgreSQL database (hosted in Docker).

Here is exactly how you can start everything from scratch manually. You will need to open **three separate terminals** (PowerShell or Command Prompt).

---

## Prerequisites
Before starting, ensure that **Docker Desktop** is open and running on your machine.

---

### Step 1: Start the PostgreSQL Database
1. Open Terminal 1.
2. Ensure you are in the root directory: `c:\Users\wwwja\Downloads\newapp`
3. Check that Docker Desktop is actively running.
4. Run the following command to start the database in the background:
   ```bash
   docker-compose up -d db
   ```
*(You can close this terminal once it says "Started" or "Running")*

---

### Step 2: Start the FastAPI Backend
1. Open a **New Terminal** (Terminal 2).
2. Navigate to the `backend` folder:
   ```bash
   cd c:\Users\wwwja\Downloads\newapp\backend
   ```
3. Activate the Python virtual environment:
   ```bash
   .\venv\Scripts\activate
   ```
4. Start the backend server using Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```
*(Leave this terminal open. Your backend API is now running at `http://localhost:8000`)*

---

### Step 3: Start the Next.js Frontend
1. Open a **New Terminal** (Terminal 3).
2. Navigate to the `frontend` folder:
   ```bash
   cd c:\Users\wwwja\Downloads\newapp\frontend
   ```
3. Start the Node.js development server:
   ```bash
   npm run dev
   ```
*(Leave this terminal open. Your frontend UI is now running at `http://localhost:3000`)*

---

### You're Done! 🎉
You can now open your browser and go to **[http://localhost:3000](http://localhost:3000)** to view the application!
