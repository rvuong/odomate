from fastapi import File, UploadFile, HTTPException
from io import BytesIO
from PIL import Image
import os
import uuid

UPLOAD_FOLDER = "uploads/artworks"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def upload_artwork_image(file: UploadFile = File(...), content: bytes = None) -> str:
    # Generate a unique filename
    ext = os.path.splitext(file.filename)[-1].lower()
    unique_name = f"{uuid.uuid4()}{ext}"

    print(f"Unique filename generated: {unique_name}...")

    file_path = os.path.join(UPLOAD_FOLDER, unique_name)
    print(f"Saving file to {file_path}...")

    # Save the file to the upload folder
    print(f"Received file {file.filename} of size {len(content)} bytes and content_type={file.content_type}")

    try:
        image = Image.open(BytesIO(content)).convert("RGB")
    except Exception as e:
        print(f"Error processing image: {e}")
        raise HTTPException(
            status_code=400,
            detail="Invalid image file."
        )

    with open(file_path, "wb") as buffer:
        buffer.write(content)

    image_uri = f"/{UPLOAD_FOLDER}/{unique_name}"

    return {"status": "ok", "image_uri": image_uri}
