# 🎥 VidSearch AI — YouTube Semantic Video Search Engine

> An advanced AI-powered platform that allows users to search YouTube videos **semantically** using natural language queries, powered by **transformer embeddings** and **FastAPI + React** stack.

---

## 🚀 Overview

**VidSearch AI** is a modern YouTube semantic search system that enables users to find videos based on **meaning**, not just keywords.  
It uses **SentenceTransformer** models to generate vector embeddings for video titles and transcripts, and then ranks the most relevant videos based on **cosine similarity**.

The system provides:
- A **FastAPI** backend for vector search and indexing
- A **React-based frontend** for interactive searching
- **SQLite** user authentication (Sign Up / Login)
- **Voice Search**, **Dark/Light mode**, and **Search History**

---

## 🧠 Features

✅ **Semantic Search:**  
Search YouTube videos using natural language — e.g., “Why do humans sleep?”  

✅ **Transformer-based Embeddings:**  
Built using `all-mpnet-base-v2` model from SentenceTransformers  

✅ **Optimized Ranking:**  
Supports cosine, Euclidean, and Manhattan similarity metrics  

✅ **User Authentication:**  
Secure sign-in / sign-up using SQLite and JWT  

✅ **Voice Search:**  
Search queries using your microphone input  

✅ **History Tracking:**  
View or delete your search history anytime  

✅ **Modern UI:**  
Fully responsive **React** frontend with **dark/light mode toggle**, powered by **Vite**  

✅ **FastAPI Backend:**  
Robust backend that handles embeddings, similarity search, and query responses  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite), TailwindCSS |
| **Backend** | FastAPI (Python 3.11) |
| **Model** | SentenceTransformer (`all-mpnet-base-v2`) |
| **Database** | SQLite (User Auth + History) |
| **API Integration** | YouTube Data API |
| **Embeddings Visualization** | PCA 2D Projection |
| **Deployment** | Docker / Render / Railway (optional) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/VidSearchAI.git
cd VidSearchAI
2️⃣ Backend Setup (FastAPI)
bash
Copy code
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
3️⃣ Frontend Setup (React)
bash
Copy code
cd frontend
npm install
npm run dev
The app will start at:
🔗 Frontend: http://localhost:5173
⚙️ Backend API: http://localhost:8000

🔍 Example Query
User Input: “Why do humans dream?”
Backend Process:

Encodes query using all-mpnet-base-v2

Computes cosine similarity with stored video embeddings

Returns top-5 most relevant videos with titles, links, and transcripts

📊 Model & Embedding Info
Model used: sentence-transformers/all-mpnet-base-v2

Embedding dimension: 768

Each video’s title and transcript are embedded

Embeddings stored in CSV/Parquet format for fast retrieval

Dimensionality visualization (PCA 2D) available

🧑‍💻 Authentication Features
Sign-up / Login required before access

Passwords securely hashed

JWT tokens used for protected routes

Personal history saved per user

🌙 UI Highlights
🎤 Voice Search

🌓 Dark / Light Mode Toggle

🧭 Search History Panel

🎞️ Paginated Results (6–8 videos per page)

👤 Profile & Settings Panel

🧾 Example Output
Query	Metric	Top-K	Best Score
"Human Evolution"	Cosine	5	0.73
"Stem Cells"	Euclidean	5	-0.82
"Spicy Food"	Manhattan	5	-18.78

📦 Deployment
Easily deploy with Docker Compose:

bash
Copy code
docker-compose up --build
Or host frontend on Vercel / Netlify and backend on Render / Railway.

📜 License
MIT License © 2025 [Your Name]

📸 Screenshots
Home	Search Results

💬 Acknowledgments
SentenceTransformers

FastAPI

React

YouTube Data API
