import logging
from fastapi import FastAPI, Request
from api.routes import admin, artpiece, health


app = FastAPI()

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

app.middleware("http")
async def log_request(request: Request, call_next):
    logging.info(f" Request: {request.method} {request.url.path}")
    try:
        response = await call_next(request)
        logging.info(f" Response: {response.status_code}")
    except Exception as e:
        logging.error(f" Error: {e}")
        return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})
    return response

app.include_router(admin.router, prefix="/api")
app.include_router(artpiece.router, prefix="/api")
app.include_router(health.router, prefix="/api")
