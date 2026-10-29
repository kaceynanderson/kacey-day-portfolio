"""One-time published résumé credential-status correction.

The already-approved two-page résumé layout and all other wording are retained.
The ICF credential and PMP are pending, not earned.
"""
from pathlib import Path
import os
import fitz

TARGETS = ("Kacey-Day-Resume-2026.pdf", "Kacey-Day-Resume.pdf")
FIRST = "Completed: Multiple Subject Teaching Credential · Project Management Certificate · Certified Professional Coach (CPC) · Google Educator"
SECOND = "Training: ICF Coach Training · Crisis Prevention Training | Pending: ICF Credential · Project Management Professional (PMP)"

def patch(path: Path) -> None:
    doc = fitz.open(str(path))
    if len(doc) != 2:
        raise ValueError(f"{path}: expected the approved two-page résumé")
    original_links = len(doc[0].get_links())
    page = doc[1]
    text = page.get_text()
    if "Pending: ICF Credential" in text and "Project Management Professional (PMP)" in text:
        print(f"Already corrected: {path}")
        doc.close()
        return
    if "Multiple Subject Teaching Credential" not in text or "ICF Coach Training (training)" not in text:
        raise ValueError(f"{path}: source credential text has changed unexpectedly")
    page.add_redact_annot(fitz.Rect(41, 714.4, 568, 733.45), fill=(1, 1, 1))
    page.apply_redactions(images=0, graphics=0, text=0)
    for y, line in ((721.6, FIRST), (730.7, SECOND)):
        if fitz.get_text_length(line, fontname="helv", fontsize=7) > 510:
            raise ValueError("Credential line exceeds the available page width")
        page.insert_text((41.85, y), line, fontname="helv", fontsize=7.0, color=(62/255, 77/255, 94/255))
    tmp = path.with_suffix(".fixed.pdf")
    doc.save(str(tmp), garbage=4, deflate=True)
    doc.close()
    check = fitz.open(str(tmp))
    final_text = check[1].get_text()
    if len(check) != 2 or len(check[0].get_links()) != original_links:
        raise ValueError(f"{path}: pagination or links changed")
    for required in ("Completed:", "Training:", "Pending: ICF Credential", "Project Management Professional (PMP)"):
        if required not in final_text:
            raise ValueError(f"{path}: missing {required}")
    if "ICF Coach Training (training)" in final_text:
        raise ValueError(f"{path}: obsolete credential wording remains")
    check.close()
    os.replace(str(tmp), str(path))
    print(f"Corrected: {path}")

for filename in TARGETS:
    patch(Path(filename))
