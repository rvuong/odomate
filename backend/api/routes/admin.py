from fastapi import APIRouter, Query
from typing import List
from services.weaviate_client import get_all_artworks


router = APIRouter()

@router.get("/admin/artworks", tags=["artworks"])
def list_artworks(limit: int = Query(100, le=500), offset: int = Query(0, ge=0)) -> List[dict]:
    return get_all_artworks(limit=limit, offset=offset)
