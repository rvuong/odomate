from fastapi import APIRouter, File, Form, HTTPException, Path, Query, UploadFile
from pydantic import BaseModel, constr
from typing import List, Optional
from services.recognition import extract_image_embedding
from services.storage import upload_artwork_image
from services.weaviate_client import get_all_artworks, get_weaviate_client
from PIL import Image
from io import BytesIO
import logging
import os
import uuid

router = APIRouter()

@router.get("/admin/artworks", tags=["artworks"])
async def list_artworks(limit: int = Query(100, le=500), offset: int = Query(0, ge=0)) -> List[dict]:
    return get_all_artworks(limit=limit, offset=offset)

@router.post("/admin/artworks", tags=["artworks"])
async def add_artwork(
    title: str = Form(...),
    artist: Optional[str] = Form(None),
    year: Optional[int] = Form(None),
    description: str = Form(...),
    file: UploadFile = File(...)
 ) -> dict:
    # Read and vectorize the image
    image_bytes = await file.read()

    # Store the image in the upload folder
    uploaded = upload_artwork_image(file, image_bytes)

    # Add to weaviate
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    embedding = extract_image_embedding(image)

    client = get_weaviate_client()
    client.connect()
    collection = client.collections.get("Artwork")

    collection.data.insert(
        uuid=uuid.uuid4(),
        properties={
            "title": title,
            "artist": artist,
            "year": year,
            "description": description,
            "uri": uploaded["image_uri"],
            "embedding": embedding.tolist(),
        },
        vector=embedding.tolist()
    )

    client.close()

    return {"status": "ok"}


def upload_artwork_image(file: UploadFile = File(...), content: bytes = None) -> str:
    logger = logging.getLogger(__name__)

    # Generate a unique filename
    ext = os.path.splitext(file.filename)[-1].lower()
    unique_name = f"{uuid.uuid4()}{ext}"

    logger.info(f"Unique filename generated: {unique_name}...")

    file_path = os.path.join(UPLOAD_FOLDER, unique_name)
    logger.info(f"* Saving file to {file_path}...")

    # Save the file to the upload folder
    logger.info(f"* Received file {file.filename} of size {len(content)} bytes and content_type={file.content_type}")

    try:
        image = Image.open(BytesIO(content)).convert("RGB")
    except Exception as e:
        logger.error(f"*** Error processing image: {e}")
        raise HTTPException(
            status_code=400,
            detail="Invalid image file."
        )

    with open(file_path, "wb") as buffer:
        buffer.write(content)

    image_uri = f"/{UPLOAD_FOLDER}/{unique_name}"

    return {"status": "ok", "image_uri": image_uri}

@router.delete("/admin/artworks/{artwork_id}", tags=["artworks"])
async def delete_artwork(artwork_id: str = Path(...)) -> dict:
    logger = logging.getLogger(__name__)

    client = get_weaviate_client()
    client.connect()
    collection = client.collections.get("Artwork")

    # Delete the artwork by UUID
    try:
        logger.info(f"Deleting artwork with ID: {artwork_id}...")

        # Get the artwork file name from the database, which is the URI
        # and delete the file from the uploads directory
        artwork = collection.query.fetch_object_by_id(artwork_id)
        if not artwork:
            raise HTTPException(
                status_code=404,
                detail=f"Artwork with ID {artwork_id} not found."
            )
        file_uri = artwork.properties.get('uri')

        # Delete the artwork from Weaviate
        collection.data.delete_by_id(artwork_id)
        logger.info(f"Deleted artwork with ID: {artwork_id}")

        client.close()

        # Delete the image file from the uploads directory
        if file_uri:
            image_path = file_uri.lstrip('/')
            if os.path.exists(image_path):
                os.remove(image_path)
                logger.info(f"Deleted image file: {image_path}")
            else:
                logger.warning(f"Image file not found: {image_path}")

        return {"status": "ok", "deleted_artwork_id": artwork_id}

    except Exception as e:
        logger.error(f"Error deleting artwork with ID {artwork_id}: {e}")

        client.close()
        raise HTTPException(
            status_code=404,
            detail=f"Artwork with ID {artwork_id} not found."
        )

class ArtworkUpdate(BaseModel):
    title: constr(strip_whitespace=True, min_length=1) | None = None
    artist: str | None = None
    year: int | None = None
    description: str | None = None

@router.put("/admin/artworks/{artwork_id}", tags=["artworks"])
async def update_artwork(
    artwork_id: str,
    update: ArtworkUpdate
):
    client = get_weaviate_client()
    client.connect()
    collection = client.collections.get("Artwork")

    # Validate the artwork ID
    try:
        collection.query.fetch_object_by_id(artwork_id)
    except Exception as e:
        client.close()
        raise HTTPException(
            status_code=404,
            detail=f"Artwork with ID {artwork_id} not found."
        )

    try:
        collection.data.update(
            uuid=artwork_id,
            properties={
                "title": update.title,
                "artist": update.artist,
                "year": update.year,
                "description": update.description
            }
        )
    except Exception as e:
        client.close()
        raise HTTPException(
            status_code=500,
            detail="Failed to update artwork."
        )

    client.close()

    return {"status": "ok", "updated_artwork_id": artwork_id}
