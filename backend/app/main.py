from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.upload import router as upload_router

app = FastAPI(title="PDF Loan Agreement Splitter")

# CORS (frontend will call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Step 1: Serve split PDFs
app.mount(
    "/files",
    StaticFiles(directory="outputs"),
    name="files"
)

# API routes
app.include_router(upload_router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "Backend is running"}
