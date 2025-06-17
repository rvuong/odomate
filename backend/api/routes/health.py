import weaviate
import httpx

from fastapi import APIRouter
from weaviate.classes.init import Auth

router = APIRouter()

@router.get("/health")
def health_check():
    """Health check endpoint to verify the API is running."""
    try:
        response = httpx.get("http://weaviate:8080/v1/schema", timeout=2.0)
        if response.status_code == 200:
            return {"status": "ok", "message": "API is healthy - Weaviate is responding"}
        return {"status": "error", "message": f"Weaviate responded with status {response.status_code}"}
    except Exception as e:
        return {"status": "error", "message": f"Weaviate is not reachable: {e}"}

    return {"status": "ok", "message": "API is healthy"}
