from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from pathlib import Path
from functools import lru_cache


# ---- Config ----
MODEL_NAME = "all-mpnet-base-v2"

# ---- Load data (parquet + embeddings) ----
BASE_DIR = Path(__file__).resolve().parent
PARQUET_PATH = BASE_DIR / "data" / "video_index_mpnet.parquet"

df = pd.read_parquet(PARQUET_PATH)

EMB_COLS = [c for c in df.columns if c.startswith("emb_")]
EMB = df[EMB_COLS].values.astype("float32")
EMB = EMB / (np.linalg.norm(EMB, axis=1, keepdims=True) + 1e-10)


# ---- FastAPI app ----
app = FastAPI(title="YouTube Semantic Search API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",               # local dev
        "https://query-tube-ai.vercel.app",   # your Vercel frontend (no slash)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Query(BaseModel):
    text: str
    top_k: int = 5


# Lazy-load the model so startup is fast on Render
@lru_cache()
def get_model():
    return SentenceTransformer(MODEL_NAME)


@app.get("/health")
def health():
    return {"ok": True, "rows": len(df)}


@app.post("/search")
async def search(query: Query):
    model = get_model()
    q_emb = model.encode(query.text, normalize_embeddings=True)

    scores = EMB @ q_emb
    top_idx = np.argsort(-scores)[:query.top_k]

    results = []
    for i in top_idx:
        row = df.iloc[i]
        results.append({
            "video_id": row["video_id"],
            "title": row["title"],
            "published_at": str(row["datetime"]),
            "transcript": row["transcript"][:200] + "...",
            "score": float(scores[i]),
            "preview_url": f"https://www.youtube.com/watch?v={row['video_id']}",
        })

    return {"query": query.text, "results": results}
