import os
import weaviate
from PIL import Image
from pathlib import Path
from services.recognition import extract_image_embedding
from weaviate.connect import ConnectionParams
from weaviate.classes.config import Configure, DataType, Property

# WEAVIATE_URL = "weaviate"
# CLASS_NAME = "Artwork"

print("Initializing Weaviate...")

sample_dir = Path("scripts/sample")

# Client initialization
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

    obj = {
        "title": img_path.stem,
        "embedding": embedding.tolist(),
    }

    client.collections.get("Artwork").data.insert(obj, vector=embedding.tolist())
    print(f"✅ \"{img_path.name}\" successfully inserted into Weaviate.")

print("✅ Sample data successfully loaded.")

# 4. Close the client connection
client.close()
