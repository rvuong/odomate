# Backend Dockerfile - Python FastAPI
FROM python:3-slim AS base

# Variables d'environnement
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libopencv-dev \
    python3-opencv \
    wget \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Créer un utilisateur non-root
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de requirements
COPY requirements.txt .

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Stage de développement
FROM base AS development

COPY . .

# Create a writable cache directory
# RUN mkdir -p /app/cache && chmod -R 777 /app/cache
# ENV HF_HOME=/app/cache

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

## Stage de production
#FROM base AS production
#
#COPY . .
#
## Créer les dossiers nécessaires
#RUN mkdir -p /app/uploads /app/logs && \
#    chown -R appuser:appuser /app
#
#USER appuser
#
#EXPOSE 8000
#
## Healthcheck
#HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
#    CMD curl -f http://localhost:8000/health || exit 1
#
#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
