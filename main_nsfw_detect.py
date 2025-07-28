from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
from transformers import ViTImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch 
import io
import time
from torch.cuda.amp import autocast
import httpx
from typing import Tuple
from torch import amp

app = FastAPI()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow your Vue app's origin
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Explicitly allow OPTIONS
    allow_headers=["Content-Type"],  # Allow headers used in your request
)

processor = ViTImageProcessor.from_pretrained('AdamCodd/vit-base-nsfw-detector')
model = AutoModelForImageClassification.from_pretrained('AdamCodd/vit-base-nsfw-detector')

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")
model.to(device)

# Warm-up to initialize CUDA context and allocate memory
def warm_up():
    dummy_img = Image.new('RGB', (224, 224), color='white')
    inputs = processor(images=dummy_img, return_tensors="pt")
    inputs = {k: v.to(device) for k, v in inputs.items()}
    with torch.no_grad():
        with amp.autocast(device_type='cuda'):
            _ = model(**inputs)

warm_up()

class URLRequest(BaseModel):
    url: str

def preprocess_image(image: Image.Image) -> dict:
    image = image.convert("RGB")
    image = image.resize((224, 224))
    inputs = processor(images=image, return_tensors="pt")
    inputs = {k: v.to(device) for k, v in inputs.items()}
    return inputs

def predict(inputs: dict) -> Tuple[str, float]:
    start = time.time()
    with torch.no_grad():
        with amp.autocast(device_type='cuda'):
            outputs = model(**inputs)
    inference_time = time.time() - start
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()
    predicted_label = model.config.id2label[predicted_class_idx]
    return predicted_label, inference_time

@app.post("/classify/")
async def classify_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    try:
        image = Image.open(io.BytesIO(image_bytes))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    start = time.time()
    inputs = preprocess_image(image)
    preprocess_time = time.time() - start

    predicted_label, inference_time = predict(inputs)

    print(f"Preprocessing: {preprocess_time:.3f}s, Inference: {inference_time:.3f}s")

    return {
        "predicted_class": predicted_label,
        "device_used": str(next(model.parameters()).device),
        "preprocessing_time_s": round(preprocess_time, 3),
        "inference_time_s": round(inference_time, 3),
    }

@app.post("/classify_url/")
async def classify_image_url(data: URLRequest):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(data.url, timeout=10)
        response.raise_for_status()
        image = Image.open(io.BytesIO(response.content))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Unable to download or open image from URL: {e}")

    start = time.time()
    inputs = preprocess_image(image)
    preprocess_time = time.time() - start

    predicted_label, inference_time = predict(inputs)

    print(f"Preprocessing: {preprocess_time:.3f}s, Inference: {inference_time:.3f}s")

    return {
        "predicted_class": predicted_label,
        "device_used": str(next(model.parameters()).device),
        "preprocessing_time_s": round(preprocess_time, 3),
        "inference_time_s": round(inference_time, 3),
    }
