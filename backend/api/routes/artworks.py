from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from pathlib import Path
from services.recognition import extract_image_embedding
from services.weaviate_client import search_similar_artworks
from PIL import Image
import uuid
import io

router = APIRouter()

@router.post("/artworks", tags=["artworks"])
async def upload_image(artwork: UploadFile = File(...)):
    print(f"📸 Image received: {artwork.filename}")

    image = Image.open(io.BytesIO(await artwork.read())).convert("RGB")
    embedding = extract_image_embedding(image).tolist()

    results = search_similar_artworks(embedding)

    return {
        "matches": [
            {
                "id": obj.uuid,
                "properties": obj.properties,
            }
            for obj in results
        ],
        "status": "ok",
        "message": f"The image ({artwork.filename}) was successfully processed.",
    }
