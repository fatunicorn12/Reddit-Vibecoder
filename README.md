# 🎧 Reddit-Vibecoder

I was tired of watching this *vibe coding revolution*.  
So I made a bot to **produce it** — generating new ideas and working programs from random Reddit posts.  

This project is a **multi-agent automation pipeline** that fetches a Reddit post, extracts a concept, transforms it into a project plan, generates executable code (Python/Pygame or HTML/JS), screenshots the result, and uploads everything to a new GitHub repository — all inside a **Dockerized environment**.

---

## 🧩 How It Works

### 📰 Fetch Reddit Content
Uses **PRAW** to retrieve a random Reddit post from a chosen subreddit.

### 💡 Generate an Idea (Gemini)
Sends the post to **Google Gemini** to brainstorm a creative project concept inspired by the post.

### 🧠 Create a Plan (Gemini)
Converts the idea into a structured, step-by-step execution plan.

### ⚙️ Generate Code (Claude)
Passes the plan to **Claude (Anthropic API)** to build a working prototype (e.g. Pygame or HTML app).

### 📸 Automate Screenshots
Uses **Selenium** and **Pillow** to automatically capture a screenshot of the generated project.

### 🚀 Deploy to GitHub
Leverages **PyGithub** to create a new GitHub repository and push the generated files automatically.

### 🐳 Run Anywhere with Docker
The entire system is containerized for consistent, reproducible runs and minimal setup.

---

## 🧰 Tech Stack

**Languages:**  
Python  

**AI Models:**  
Google Gemini, Anthropic Claude  

**Libraries:**  
- `praw` – Fetch Reddit posts  
- `google-genai` – Connect to Gemini  
- `anthropic` – Connect to Claude  
- `PyGithub` – Automate GitHub repo creation  
- `selenium`, `Pillow` – Capture project screenshots  
- `pygame` – Generate interactive programs  
- `python-dotenv` – Manage API keys and configuration  
- `docker` – Containerization  

---

## ⚙️ Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/<your-username>/reddit-vibecoder.git
cd reddit-vibecoder
```

### 2️⃣ Set up environment variables
```bash
cp .env.example .env
```

Fill in your API keys or use a different model of your choice:
```bash
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
GOOGLE_API_KEY=
ANTHROPIC_API_KEY=
GITHUB_TOKEN=
```

### 3️⃣ Build and run with Docker
```bash
docker build -t reddit-vibecoder .
docker run --env-file .env reddit-vibecoder
```

Then sit back and watch a random Reddit post become a functional web app or game :)
