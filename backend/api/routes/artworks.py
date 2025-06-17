from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import JSONResponse
from pathlib import Path
from services.recognition import extract_image_embedding
# from services.weaviate_client import query_similar_artwork
import uuid

router = APIRouter()

@router.post("/artworks", tags=["artworks"])
async def upload_image(artwork: UploadFile = File(...)):
    # Tu pourrais ici stocker, traiter, etc.
    print(f"📸 Image reçue : {artwork.filename}")
    return JSONResponse(status_code=200, content={"status": "ok"})
