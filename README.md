# Tea Store

Monorepo with FastAPI backend, Next.js frontend, Postgres, Redis, Razorpay, WhatsApp, and Shiprocket stubs.

Quickstart (Docker):

1. Copy envs
   - cp apps/backend/.env.example apps/backend/.env
   - cp apps/frontend/.env.local.example apps/frontend/.env.local
2. docker compose up --build
   - Frontend: http://localhost:3000
   - Backend:  http://localhost:8000/docs

Local (no Docker): see scripts in scripts/ (Windows .bat)

Replace TODO blocks (Razorpay checkout hook, webhook signature, actual shipping calls) as you go.

