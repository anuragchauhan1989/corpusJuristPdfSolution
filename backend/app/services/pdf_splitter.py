import re
import pdfplumber
from PyPDF2 import PdfReader, PdfWriter
from pathlib import Path
from typing import Union, List, Tuple

REF_PATTERN = re.compile(
    r"Ref\s*No:\s*(CJLC\/HFL\/LN\/S\.25\/DEC\/2025-\d+)"
)


def safe_filename(ref_no: str) -> str:
    return ref_no.replace("/", "-").replace("\\", "-")


def split_pdf_by_ref(
    pdf_path: Union[str, Path],
    output_dir: Union[str, Path]
):
    pdf_path = Path(pdf_path)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # =========================
    # PASS 1: Detect Ref pages
    # =========================
    ref_pages: List[Tuple[int, str]] = []

    with pdfplumber.open(str(pdf_path)) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            match = REF_PATTERN.search(text)
            if match:
                ref_pages.append((page_index, match.group(1)))

    if not ref_pages:
        return []

    # =========================
    # PASS 2: Split PDFs
    # =========================
    reader = PdfReader(str(pdf_path))
    results = []

    for i, (start_page, ref_no) in enumerate(ref_pages):
        end_page = (
            ref_pages[i + 1][0] - 1
            if i + 1 < len(ref_pages)
            else len(reader.pages) - 1
        )

        writer = PdfWriter()

        for page_num in range(start_page, end_page + 1):
            writer.add_page(reader.pages[page_num])

        safe_name = safe_filename(ref_no)
        file_path = output_path / f"{safe_name}.pdf"

        with open(file_path, "wb") as f:
            writer.write(f)

        results.append({
            "ref_no": ref_no,
            "file_name": file_path.name,
            "file_url": f"/files/{file_path.name}"
        })

    return results
