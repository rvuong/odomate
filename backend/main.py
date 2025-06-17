# """
# Point d'entrée principal de l'API Art Detection
# """
#
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# import uvicorn
# import os
# from contextlib import asynccontextmanager
#
# from app.core.config import settings
# from app.api.routes import detection, artworks, health
from fastapi import FastAPI
from api.routes import health, artworks

app = FastAPI()

app.include_router(health.router)
app.include_router(artworks.router)

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     """Gestionnaire du cycle de vie de l'application"""
#     # Startup
#     print("🎨 Démarrage de l'API Art Detection...")
#
#     # Vérification des variables d'environnement
#     if not settings.SECRET_KEY:
#         print("⚠️ SECRET_KEY non définie")
#
#     print(f"🔧 Mode Debug: {settings.DEBUG}")
#     print(f"🗄️ Database URL: {settings.DATABASE_URL}")
#
#     yield
#
#     # Shutdown
#     print("🛑 Arrêt de l'API Art Detection...")
#
#
# # Création de l'application FastAPI
# app = FastAPI(
#     title="Art Detection API",
#     description="API de détection et identification d'œuvres d'art",
#     version="1.0.0",
#     docs_url="/docs" if settings.DEBUG else None,
#     redoc_url="/redoc" if settings.DEBUG else None,
#     lifespan=lifespan
# )
#
# # Configuration CORS pour le frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=settings.ALLOWED_ORIGINS,
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#     allow_headers=["*"],
# )
#
# # Routes principales
# app.include_router(health.router, prefix="/health", tags=["health"])
# app.include_router(detection.router, prefix="/api/detection", tags=["detection"])
# app.include_router(artworks.router, prefix="/api/artworks", tags=["artworks"])
#
#
# @app.get("/")
# async def root():
#     """Route racine de l'API"""
#     return {
#         "message": "🎨 Art Detection API",
#         "version": "1.0.0",
#         "status": "running",
#         "docs": "/docs" if settings.DEBUG else "disabled"
#     }
#
#
# @app.exception_handler(404)
# async def not_found_handler(request, exc):
#     """Gestionnaire d'erreur 404 personnalisé"""
#     return JSONResponse(
#         status_code=404,
#         content={
#             "error": "Endpoint non trouvé",
#             "message": f"L'endpoint {request.url.path} n'existe pas",
#             "available_endpoints": [
#                 "/",
#                 "/health",
#                 "/api/detection/detect",
#                 "/api/artworks"
#             ]
#         }
#     )
#
# if __name__ == "__main__":
#     uvicorn.run(
#         "app.main:app",
#         host="0.0.0.0",
#         port=8000,
#         reload=settings.DEBUG
#     )
