import re
import pdfplumber
from PyPDF2 import PdfReader, PdfWriter
from pathlib import Path
from typing import Union

REF_PATTERN = re.compile(
    r"Ref\s*No:\s*(CJLC\/HFL\/LN\/S\.25\/DEC\/2025-\d+)"
)

def safe_filename(ref_no: str) -> str:
    """
    Convert Ref No into a filesystem-safe filename
    """
    return ref_no.replace("/", "-").replace("\\", "-")


def split_pdf_by_ref(
    pdf_path: Union[str, Path],
    output_dir: Union[str, Path]
):
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    results = []

    reader = PdfReader(str(pdf_path))

    with pdfplumber.open(str(pdf_path)) as pdf:
        writer = None
        current_ref = None

        for page_index, plumber_page in enumerate(pdf.pages):
            text = plumber_page.extract_text() or ""
            match = REF_PATTERN.search(text)

            # 🔹 New Ref No detected
            if match:
                if writer and current_ref:
                    safe_name = safe_filename(current_ref)
                    file_path = output_path / f"{safe_name}.pdf"

                    with open(file_path, "wb") as f:
                        writer.write(f)

                    results.append({
                        "ref_no": current_ref,
                        "file_name": f"{safe_name}.pdf",
                        "file_url": f"/files/{safe_name}.pdf"
                    })

                current_ref = match.group(1)
                writer = PdfWriter()

            # 🔹 Add page via PyPDF2
            if writer:
                writer.add_page(reader.pages[page_index])

        # 🔹 Save last PDF
        if writer and current_ref:
            safe_name = safe_filename(current_ref)
            file_path = output_path / f"{safe_name}.pdf"

            with open(file_path, "wb") as f:
                writer.write(f)

            results.append({
                "ref_no": current_ref,
                "file_name": f"{safe_name}.pdf",
                "file_url": f"/files/{safe_name}.pdf"
            })

    return results
