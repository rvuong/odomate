# 🌍 O.D.O. Mate

A mobile-oriented PWA and backend system for real-time artwork recognition.

Designed to help low-sight individuals identify artworks using their smartphone camera, thus regaining a sense of autonomy and independence.

![version](https://img.shields.io/github/v/release/rvuong/odomate?sort=semver&label=version)
![CI](https://github.com/rvuong/odomate/actions/workflows/main.yml/badge.svg)

---

## 📁 Project Structure

```
odomate/
├── backend/
│   ├── api/
│   │   └── routes/           # FastAPI route handlers
│   ├── models/               
│   ├── scripts/              # Weaviate schema/data initialization
│   ├── services/             # CLIP, Weaviate, image processing
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/                 # React PWA source
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
│
├── compose.yaml             # Runs frontend, backend, weaviate
├── Makefile                 # Optional shortcuts for build/run/init
└── README.md
```

---

## 🌐 Overview
**O.D.O. Mate** is a Progressive Web App for identifying artworks in real time:
- Uses **camera input** to capture artwork
- Sends the image to a **FastAPI backend**
- The backend uses **CLIP** (OpenAI) to extract embeddings
- **Weaviate** is used as a vector database to store and search artwork vectors

---

## 📚 Features
- Frontend: React PWA using native camera access
- Backend: FastAPI API with upload & recognition endpoints
- CLIP model (ViT-B-32, `laion2b_s34b_b79k`) for image embeddings
- Weaviate for similarity search based on vector distance
- Certainty threshold for filtering inaccurate matches

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

### 3. Initialize Weaviate with sample artworks
```bash
make init-weaviate
```

### 4. Test API
- Upload an image using the frontend (PWA), or
- Use curl/Postman to POST to `/api/artpiece`

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
          -0.0025106584653258324,
          ...
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

## 📊 Tech Stack
- **Frontend**: React, PWA, camera API
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

## 📅 License
MIT - see LICENSE file.

---

## 🙌 Acknowledgements
- [OpenAI CLIP](https://github.com/openai/CLIP)
- [LAION](https://laion.ai)
- [Weaviate](https://weaviate.io)

---
