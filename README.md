🚀 QueryTube-AI — Intelligent YouTube Semantic Search Platform
<p align="center">
  <img src="QueryTube-AI/Screenshots/ss2.png" alt="QueryTube-AI Banner" width="80%" />
</p>

<p align="center">
  <a href="https://fastapi.tiangolo.com/">
    <img src="https://img.shields.io/badge/FastAPI-latest-009688?style=flat&logo=fastapi" alt="FastAPI">
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-latest-646CFF?style=flat&logo=vite" alt="Vite">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/TailwindCSS-latest-06B6D4?style=flat&logo=tailwindcss">
  </a>
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/badge/Python-3.11-blue?style=flat&logo=python" alt="Python">
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-latest-339933?style=flat&logo=node.js" alt="Node.js">
  </a>
</p>

📖 Overview
QueryTube-AI is a semantic search platform for YouTube that allows users to search through video transcripts and metadata using natural language.  
Built with a FastAPI backend and a modern Vite + Tailwind frontend, it provides lightning-fast vector search, clean UI, and easy deployment options.

🌟 Features
🔍 Semantic Search — Find exact video moments using natural language queries  

🧠 Transcript & Metadata Processing — Automatic transcript fetching and embedding  

⚡ Vector Search — Fast similarity search powered by modern ML models  

🧰 Modern UI — Responsive frontend with TailwindCSS and Vite  

📊 Rich Video Metadata — Title, description, channel info, views, etc.  

🐳 Easy Deployment — Docker / Vercel support  

📝 Interactive API Docs — Swagger UI from FastAPI

🧱 Tech Stack
Frontend

Backend

Others

Vite

FastAPI (Python)

TailwindCSS

Node.js

Sentence Transformers

Vercel / Render

React

FAISS / Pinecone

Docker (optional)

🚀 Quick Start
🧰 Prerequisites
Node.js ≥ 16  

Python ≥ 3.10  

📦 Backend Setup (FastAPI - Python)
Open your first terminal window and run the following commands:

# Navigate to the project root directory
cd QueryTube-AI

# Create a Python virtual environment
python -m venv venv
source venv/bin/activate # Use 'venv\Scripts\activate' on Windows

# Install Python dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn app:app --reload
# The backend runs on http://localhost:8000

💻 Frontend Setup (Vite + React)
Open a second terminal window and run the following commands:

# Navigate to the project root directory
cd QueryTube-AI

# Install Node dependencies
npm install

# Start the development server
npm run dev
# The frontend runs on http://localhost:5173 by default, and communicates with the backend on port 8000.

📁 Project Structure
QueryTube-AI/
│── Screenshots/           # App screenshots
│── package.json           # Frontend dependencies
│── requirements.txt       # Backend dependencies
│── vite.config.js         # Vite configuration
│── tailwind.config.js     # Tailwind setup
│── index.html             # Entry point for frontend
│── vercel.json            # Vercel deployment configuration
└── ...

<p align="center"> Made with ❤️ using FastAPI, Vite, Tailwind, and AI. </p>
