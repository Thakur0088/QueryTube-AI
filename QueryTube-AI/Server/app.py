from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
from pathlib import Path
from functools import lru_cache

# ---- Config ----
MODEL_NAME = "all-mpnet-base-v2"

BASE_DIR = Path(__file__).resolve().parent
PARQUET_PATH = BASE_DIR / "data" / "video_index_mpnet.parquet"

df = None
EMB = None


def load_index():
    """
    Load the parquet file and embedding matrix.
    If this fails, we log the error but DO NOT crash the app.
    """
    global df, EMB
    try:
        _df = pd.read_parquet(PARQUET_PATH)
        emb_cols = [c for c in _df.columns if c.startswith("emb_")]
        emb = _df[emb_cols].values.astype("float32")
        emb = emb / (np.linalg.norm(emb, axis=1, keepdims=True) + 1e-10)
        df = _df
        EMB = emb
        print(f"[startup] Loaded index with {len(df)} rows.")
    except Exception as e:
        print(f"[startup] Failed to load index: {e}")
        df = None
        EMB = None


# ---- FastAPI app ----
app = FastAPI(title="YouTube Semantic Search API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",              # local dev
        "https://query-tube-ai.vercel.app",   # Vercel frontend (no slash)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Query(BaseModel):
    text: str
    top_k: int = 5


@lru_cache()
def get_model():
    # Lazy load model (faster startup)
    print("[model] Loading SentenceTransformer model…")
    return SentenceTransformer(MODEL_NAME)


@app.on_event("startup")
def on_startup():
    print("[startup] Starting up…")
    load_index()
    print("[startup] Startup complete.")


@app.get("/health")
def health():
    return {
        "ok": df is not None and EMB is not None,
        "rows": len(df) if df is not None else 0,
        "index_loaded": df is not None,
    }


@app.post("/search")
async def search(query: Query):
    if df is None or EMB is None:
        raise HTTPException(
            status_code=500,
            detail="Index not loaded on server. Check that the parquet file exists on the server.",
        )

    model = get_model()
    q_emb = model.encode(query.text, normalize_embeddings=True)

    scores = EMB @ q_emb
    top_idx = np.argsort(-scores)[:query.top_k]

    results = []
    for i in top_idx:
        row = df.iloc[i]
        results.append(
            {
                "video_id": row["video_id"],
                "title": row["title"],
                "published_at": str(row["datetime"]),
                "transcript": row["transcript"][:200] + "...",
                "score": float(scores[i]),
                "preview_url": f"https://www.youtube.com/watch?v={row['video_id']}",
            }
        )

    return {"query": query.text, "results": results}
