# 🌍 O.D.O. Mate

A mobile-oriented PWA and backend system for real-time artwork recognition.

Designed to help low-sight individuals identify artworks using their smartphone camera, thus regaining a sense of autonomy and independence.

![version](https://img.shields.io/github/v/release/rvuong/odomate?sort=semver&label=version)
![CI](https://github.com/rvuong/odomate/actions/workflows/main.yml/badge.svg)

---

## 🗺️ Overview
**O.D.O. Mate** helps museum visitors to identify artworks in real time.
It is composed of:
- A Progressive Web App (PWA) that runs on smartphones
  - Uses the **native camera API** to capture images of artworks
  - Provides a user-friendly interface for identification
- An **admin dashboard** for museum staff to manage artworks
  - Allows listing images and metadata
- A backend service built with **FastAPI**
  - Handles image uploads and recognition requests
  - Uses **CLIP** (OpenAI) for image embeddings
  - Stores and searches artwork vectors in **Weaviate**
- A **Weaviate** vector database for similarity search

---

## 📁 Project Structure

```
odomate/
├── backend/
│   ├── api/
│   │   └── routes/           # FastAPI route handlers
│   ├── scripts/              # Weaviate schema/data initialization
│   ├── services/             # CLIP, Weaviate, image processing
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
│
├── frontend-admin/
│   ├── certs/
│   ├── public/
│   ├── src/
│   │   └── components/
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── frontend-public/
│   ├── certs/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   └── hooks/
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── compose.yaml             # Runs frontend, backend, weaviate
└── Makefile                 # Optional shortcuts for build/run/init
```

---

## 📚 Features
- Frontend: React PWA using native camera access, allowing users to take photos and require for identification.
  - Certainty threshold for filtering inaccurate matches
- Admin Dashboard: React app for staff to manage artworks, and upload new images.
- Backend: FastAPI API with upload & recognition endpoints
  - CLIP model (ViT-B-32, `laion2b_s34b_b79k`) for image embeddings
  - Weaviate for similarity search based on vector distance

---

## 🚀 Quick Start

### 1. Clone the repo
```bash
git clone --recurse-submodules https://github.com/rvuong/odomate.git
cd odomate
```

### 2. Run all services
```bash
make up
```

### 3. 1st boot: initialize Weaviate with sample artworks
```bash
make init-weaviate
```

### 4. Test API
- Upload an image using the frontend (PWA), or
- Use curl/Postman to POST to `/api/artpiece` and check the response.

---

## 📷 Recognition Endpoint
### POST `/api/artpiece`
**Body:** Multipart file upload
```http
Content-Type: multipart/form-data
artpiece: <image/jpeg>
```

**Returns:**
```json
{
  "status": "ok",
  "message": "The image (mona-lisa.jpg) was successfully processed.",
  "matches": [
    {
      "id": "4b9f07b5-fae5-4239-ae50-b2b350b2a128",
      "properties": {
        "embedding": [
          0.055572912096977234,
          0.06454084068536758,
          -0.0025106584653258324
        ],
        "title": "mona-lisa",
        "artist": null,
        "description": null,
        "year": null
      }
    }
  ]
}
```

---

## 🛠️ Tech Stack
- **Frontend**: React, PWA, camera API
- **Admin** (Staff Dashboard): React
- **Backend**: FastAPI, Python 3.11, Torch, OpenCLIP
- **Vector DB**: Weaviate 1.25+
- **Model**: CLIP ViT-B-32, pretrained on LAION-2B
- **Image Processing**: PIL, torchvision

---

## 📆 Roadmap (next)
- Add support for batch image import via CSV
- Improve UI to show image + metadata from matches
- Add fallback / no-match response in frontend
- Deploy to AWS (EC2 or ECS) + S3 static hosting
- Add test suite (Pytest, React Testing Library)

---

## 📜 License
MIT - see LICENSE file.

---

## 🙌 Acknowledgements
- [OpenAI CLIP](https://github.com/openai/CLIP)
- [LAION](https://laion.ai)
- [Weaviate](https://weaviate.io)

---
