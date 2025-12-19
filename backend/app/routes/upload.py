import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pdf_splitter import split_pdf_by_ref

router = APIRouter()

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )
    # 🔹 Save uploaded file
    unique_name = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # 🔹 Split PDF using Ref No logic
    try:
        results = split_pdf_by_ref(
            pdf_path=file_path,
            output_dir=OUTPUT_DIR
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {
        "message": "PDF processed successfully",
        "total_files": len(results),
        "files": results
    }
