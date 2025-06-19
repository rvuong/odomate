import open_clip
import torch
from PIL import Image
from torchvision import transforms


model, _, preprocess = open_clip.create_model_and_transforms('ViT-B-32', pretrained='laion2b_s34b_b79k')
tokenizer = open_clip.get_tokenizer('ViT-B-32')

def extract_image_embedding(image: Image.Image) -> torch.Tensor:
    image_input = preprocess(image).unsqueeze(0)  # (1, 3, 224, 224)
    with torch.no_grad():
        image_features = model.encode_image(image_input)
        image_features /= image_features.norm(dim=-1, keepdim=True)
    return image_features.squeeze(0)
