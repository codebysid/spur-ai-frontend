# Spur – AI-Powered Customer Support Chat

Spur is a lightweight AI-powered customer support chat application for an imaginary e-commerce store.  
It demonstrates **frontend + backend architecture**, **LLM integration**, **rate limiting**, **Redis usage**, and **clean system design**.

---

## 🧱 Tech Stack

### Frontend

- React + TypeScript
- Tanstack Query
- Redux
- Local state + browser storage for caching

### Backend

- Node.js
- Express.js
- TypeScript
- Supabase (PostgreSQL)
- Redis (Upstash)
- Free LLM API (Groq)

---

## 🚀 How to run it locally ?

#### 1. Frontend

#### Clone repo:

```bash
$ git clone <repo_url or ssh>
$ cd <directory>
```

#### Install dependencies:

```bash
$ pnpm install
```

#### Set environent variables:

```bash
$ VITE_BACKEND_URL=http://localhost:4000
```

#### Run dev Server:

```bash
$ pnpm run dev
```

#### Backend repo, setup and all details: https://github.com/codebysid/spur-ai-backend

## ✨ Features

- AI-powered customer support chat
- Session-based conversations (no authentication)
- Browser Caching for conversations and sessions
- Redux for global state store
- Tanstack query for efficient api calls and optimization

---

## 🏗 Architecture Overview

- User enters a message
- UI optimistically updates the message list
- Message is sent to the backend API
- Backend returns AI response + session ID
- Frontend updates the chat and persists it locally
