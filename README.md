# Spur – AI-Powered Customer Support Chat

Live here: https://spur-ai-frontend-one.vercel.app/

Spur is a lightweight AI-powered customer support chat application for an imaginary e-commerce store.  
It demonstrates **frontend + backend architecture**, **LLM integration**, **rate limiting**, **Redis usage**, and **clean system design**.

---

## 🧱 Tech Stack

- React + TypeScript
- Tanstack Query
- Redux
- Local state + browser storage for caching

---

## 🚀 How to run it locally ?

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

## LLM Notes

The backend integrates a Large Language Model (LLM) to act as an AI-powered customer support agent.  
The implementation focuses on **correctness, cost control, and predictable behavior**, rather than raw model capabilities.

### 🧠 Model Choice

- Uses **Groq (free tier)** with an OpenAI-compatible API
- Selected for:
  - Free usage for demos and assignments
  - Low latency
  - Familiar OpenAI-style API surface

The LLM can be swapped easily by updating the LLM service without touching business logic.

### 📝 Prompt Design

The LLM is called with a structured prompt consisting of:

1. **System Prompt**

   - Defines the AI’s role and behavior
   - Prevents hallucinations and unsafe answers

2. **Store FAQ Context**

   - Provides reliable domain knowledge
   - Ensures consistent answers to common questions

3. **Conversation History**
   - Recent messages are included to maintain context
   - History is truncated to avoid excessive token usage

This layered prompt approach ensures stable, predictable responses.

### ⚠️ Guardrails & Safety

- Explicit instructions to avoid hallucinating policies
- If unsure, the model is instructed to defer to a human agent
- Graceful fallback messages on:
  - API errors
  - Timeouts
  - Rate limits
  - Invalid API keys

Users always receive a friendly, non-technical error message.

### 💰 Cost Control

- Limits conversation history length
- Caps max tokens per response
- Caches common questions using Redis
- Avoids unnecessary LLM calls for repeated FAQs

This keeps usage predictable and cost-efficient.

### ⚡ Caching Strategy

- Redis is used to cache responses for:
  - Common FAQ-style questions
  - Identical or near-identical user inputs

Cache keys are normalized to improve hit rates.

This reduces:

- LLM latency
- Token usage
- External API dependency

### 🔄 Extensibility

The LLM logic is isolated in a dedicated service:

This allows easy future enhancements such as:

- Streaming responses
- Tool calling / function calling
- Retrieval-Augmented Generation (RAG)
- Multiple model fallback strategies

## ⏲️ If i had more time?
I would have built:
- Authentication and Authorization 
- Streaming
- Websockets
- Retrieval Augmented Generation and Embeddings

## 🏗 Architecture Overview

- User enters a message
- UI optimistically updates the message list
- Message is sent to the backend API
- Backend returns AI response + session ID
- Frontend updates the chat and persists it locally
