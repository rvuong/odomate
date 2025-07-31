import os
import weaviate
from fastapi import UploadFile
from io import BytesIO
from pathlib import Path
from PIL import Image
from services.recognition import extract_image_embedding
from services.storage import upload_artwork_image
from weaviate.connect import ConnectionParams
from weaviate.classes.config import Configure, DataType, Property

print("Initializing Weaviate...")

sample_dir = Path("scripts/sample")

# Client initialization
http_host = os.getenv("WEAVIATE_HTTP_HOST", "weaviate")
http_port = int(os.getenv("WEAVIATE_HTTP_PORT", 8080))

client = weaviate.WeaviateClient(
    connection_params=ConnectionParams.from_params(
        http_host="weaviate",
        http_port=8080,
        http_secure=False,
        grpc_host="weaviate",
        grpc_port=50051,
        grpc_secure=False,
    ),
    skip_init_checks=False,
)
client.connect()

if client.collections.exists("Artwork"):
    client.collections.delete("Artwork")

client.collections.create(
    name="Artwork",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
        Property(name="artist", data_type=DataType.TEXT),
        Property(name="year", data_type=DataType.INT),
        Property(name="description", data_type=DataType.TEXT),
        Property(name="image", data_type=DataType.BLOB),
    ],
    vectorizer_config=Configure.Vectorizer.none(),
)

# 2. Check connection
if client.is_ready():
    print("Weaviate is ready and connected.")
    print("✅ Weaviate initialized.")

# 3. Load sample data
print("Loading sample data...")

for img_path in sample_dir.glob("*.[jp][pn]g"):
    print(f"Processing \"{img_path.name}\"...")
    image = Image.open(img_path).convert("RGB")
    embedding = extract_image_embedding(image)

    # Store the image in the upload folder
    with open(img_path, "rb") as file:
        image_bytes = file.read()
    fake_upload = UploadFile(filename=img_path.name, file=BytesIO(image_bytes))
    uploaded = upload_artwork_image(fake_upload, content=image_bytes)

    # Custom values for specific artworks
    match img_path.stem:
        case "mona-lisa":
            obj = {
                "title": "La Joconde",
                "artist": "Léonard de Vinci",
                "year": 1506,
                "description": "Portrait représentant une femme avec un sourire mystérieux, exposé au musée du Louvre à Paris.",
                "uri": uploaded["image_uri"],
            }
        case "le-cri":
            obj = {
                "title": "Le Cri",
                "artist": "Edvard Munch",
                "year": 1917,
                "description": "Peinture expressionniste représentant une figure hurlante sur un pont, symbole de l'angoisse humaine.",
                "uri": uploaded["image_uri"],
            }
        case _:
            obj = {
                "title": img_path.stem,
                "artist": "Unknown artist",
                "year": 1970,
                "description": "To be determined later.",
                "uri": uploaded["image_uri"],
            }

    client.collections.get("Artwork").data.insert(obj, vector=embedding.tolist())
    print(f"✅ \"{img_path.name}\" successfully inserted into Weaviate.")

# 4. Close the client connection
client.close()
