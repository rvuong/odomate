from fastapi import FastAPI
from api.routes import health, artpiece

app = FastAPI()

app.include_router(health.router, prefix="/api")
app.include_router(artpiece.router, prefix="/api")

