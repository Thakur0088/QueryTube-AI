# 🎥 QueryTube-AI — Smart YouTube Video Search Platform

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.0-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.0-blue?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.11-yellow?style=flat&logo=python)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌐 Overview

**QueryTube-AI** is an intelligent semantic video search platform that lets users explore YouTube content using natural language queries.  
It integrates a **FastAPI backend** and a **React (Vite) frontend**, enabling fast and context-aware video discovery through transcript and metadata analysis.

> 🚀 Built with cutting-edge tech to redefine how you search YouTube.

---

## ✨ Features

- 🔍 **Semantic Video Search** — Find relevant YouTube clips using natural language
- 🧠 **AI-Powered Understanding** — Uses embeddings for context-aware search
- 🎨 **Modern UI** — Sleek React + TailwindCSS frontend
- ⚡ **FastAPI Backend** — Lightweight and high-performance Python API
- 🧩 **Reusable Components** — Modular structure for easy scalability
- 🐳 **Docker Ready** — Seamless deployment setup
- 📜 **Easy Local Setup** — Simple commands to run frontend and backend

---

## 🖥️ Screenshots

<p align="center">
  <img src="./Screenshots/ss1.png" width="750" alt="Homepage Screenshot">
</p>

<p align="center">
  <img src="./Screenshots/ss2.png" width="750" alt="Search Results Screenshot">
</p>

---

## ⚙️ Project Structure

QueryTube-AI/
├── QueryTube-AI/ # React + Vite frontend
│ ├── src/
│ ├── components/
│ ├── assets/
│ ├── App.jsx
│ ├── main.jsx
│ └── index.html
│
├── Server/ # FastAPI backend
│ ├── app.py
│ ├── requirements.txt
│ └── data/
│
├── Screenshots/ # Project images (ss1, ss2)
├── package.json
├── requirements.txt
├── README.md
└── vercel.json

---

## 🚀 Quick Start

### 🧩 Backend (FastAPI)
1. Navigate to the backend folder:
   ```bash
   cd Server
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Run the backend:

bash
Copy code
uvicorn app:app --reload
Server runs on: http://127.0.0.1:8000

💻 Frontend (React + Vite)
Navigate to frontend:

bash
Copy code
cd vidsearch-frontend
Install dependencies:

bash
Copy code
npm install
Start development server:

bash
Copy code
npm run dev
Frontend runs on: http://localhost:5173

🧠 Tech Stack
Layer	Technology
Frontend	React (Vite), TailwindCSS
Backend	FastAPI, Python
Deployment	Vercel / Docker
Styling	TailwindCSS
Package Manager	npm + pip

🧰 Development Notes
Keep your backend and frontend running simultaneously for full functionality.

API requests are served from FastAPI and consumed in the React app.

All dependencies are listed in their respective requirements.txt and package.json.

<p align="center"> Made with ❤️ by <b>Anshdeep</b> </p> ```
