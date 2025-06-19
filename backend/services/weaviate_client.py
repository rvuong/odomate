import weaviate
from weaviate.connect import ConnectionParams
from weaviate.connect import ConnectionParams


def search_similar_artworks(embedding: list[float], top_k: int = 5):
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

    # Check connection
    if client.is_ready():
        print("Weaviate is ready and connected.")
        collection = client.collections.get("Artwork")
        print(f"Collection used: {collection.name}")

    match = collection.query.near_vector(embedding, limit=1, certainty=0.8).objects
    print(f"Found {len(match)} matches for the given embedding.")

    # Close the client connection
    client.close()

    return match
