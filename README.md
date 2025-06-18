# 🌍 O.D.O. Mate

A mobile-oriented PWA and backend system for real-time artwork recognition.

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
make init_weaviate
```

### 4. Test API
- Upload an image using the frontend (PWA), or
- Use curl/Postman to POST to `/artworks`

---

## 📷 Recognition Endpoint
### POST `/artworks`
**Body:** Multipart file upload
```http
Content-Type: multipart/form-data
artwork: <image/jpeg>
```

**Returns:**
```json
{
  "matches": [
    {
      "id": "...",
      "properties": {
        "title": "mona-lisa",
        "artist": "Leonardo da Vinci"
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
