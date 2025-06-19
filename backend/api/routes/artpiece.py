import io
import uuid
from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from pathlib import Path
from PIL import Image
from services.recognition import extract_image_embedding
from services.weaviate_client import search_similar_artworks


router = APIRouter()

@router.post("/artpiece", tags=["artworks"])
async def upload_image(artpiece: UploadFile = File(...)):
    print(f"📸 Image received: {artpiece.filename}")

    image = Image.open(io.BytesIO(await artpiece.read())).convert("RGB")
    embedding = extract_image_embedding(image).tolist()

    results = search_similar_artworks(embedding)

    return {
        "status": "ok",
        "message": f"The image ({artpiece.filename}) was successfully processed.",
        "matches": [
            {
                "id": obj.uuid,
                "properties": obj.properties,
            }
            for obj in results
        ],
    }
