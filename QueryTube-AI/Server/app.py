from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
MODEL_NAME = "all-mpnet-base-v2"   # match the one you used
model = SentenceTransformer(MODEL_NAME)

# ---- Load Data ----
PARQUET_PATH = "data/video_index_mpnet.parquet"

df = pd.read_parquet(PARQUET_PATH)

# Extract embedding matrix
EMB_COLS = [c for c in df.columns if c.startswith("emb_")]
EMB = df[EMB_COLS].values.astype("float32")

# Normalize embeddings (for cosine similarity)
EMB = EMB / (np.linalg.norm(EMB, axis=1, keepdims=True) + 1e-10)

# ---- FastAPI setup ----
app = FastAPI(title="YouTube Semantic Search API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow requests from the frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class Query(BaseModel):
    text: str
    top_k: int = 5

# ---- Simple text embedding (reuse model used to build parquet) ----
MODEL_NAME = "all-mpnet-base-v2"   # match the one you used
model = SentenceTransformer(MODEL_NAME)

@app.get("/health")
def health():
    return {"ok": True, "rows": len(df)}

@app.post("/search")
async def search(query: Query):
    q_emb = model.encode(query.text, normalize_embeddings=True)

    # Cosine similarity = dot product on normalized vectors
    scores = EMB @ q_emb
    top_idx = np.argsort(-scores)[:query.top_k]

    results = []
    for i in top_idx:
        row = df.iloc[i]
        results.append({
            "video_id": row["video_id"],
            "title": row["title"],
            "published_at": str(row["datetime"]),
            "transcript": row["transcript"][:200] + "...",  # truncate for frontend
            "score": float(scores[i]),
            "preview_url": f"https://www.youtube.com/watch?v={row['video_id']}"
        })

    return {"query": query.text, "results": results}

# Add an OPTIONS route to handle preflight requests
@app.options("/search")
async def options_search():
    return {"message": "Options request handled"}
