from fastapi import File, UploadFile, HTTPException
from io import BytesIO
from PIL import Image
import logging
import os
import uuid

UPLOAD_FOLDER = "uploads/artworks"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def upload_artwork_image(file: UploadFile = File(...), content: bytes = None) -> str:
    logger = logging.getLogger(__name__)

    # Generate a unique filename
    ext = os.path.splitext(file.filename)[-1].lower()
    unique_name = f"{uuid.uuid4()}{ext}"

    logger.info(f"Unique filename generated: {unique_name}...")

    file_path = os.path.join(UPLOAD_FOLDER, unique_name)
    logger.info(f"Saving file to {file_path}...")

    # Save the file to the upload folder
    logger.info(f"Received file {file.filename} of size {len(content)} bytes and content_type={file.content_type}")

    try:
        image = Image.open(BytesIO(content)).convert("RGB")
    except Exception as e:
        logger.error(f"Error processing image: {e}")
        raise HTTPException(
            status_code=400,
            detail="Invalid image file."
        )

    with open(file_path, "wb") as buffer:
        buffer.write(content)

    image_uri = f"/{UPLOAD_FOLDER}/{unique_name}"

    return {"status": "ok", "image_uri": image_uri}

def delete_artwork_image(file_uri: str) -> str:
    logger = logging.getLogger(__name__)
    logger.info(f"Deleting image file {file_uri}...")

    if file_uri:
        image_path = file_uri.lstrip('/')
        if os.path.exists(image_path):
            os.remove(image_path)
            logger.info(f"Deleted image file: {image_path}")
        else:
            logger.warning(f"Image file not found: {image_path}")


    return {"status": "ok"}
