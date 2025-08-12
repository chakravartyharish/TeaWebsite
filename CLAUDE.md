# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a Tea Store e-commerce application with a monorepo structure:

- **Backend**: FastAPI application using MongoDB Atlas (migrated from SQLite/PostgreSQL)
- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS, and Clerk authentication
- **Database**: MongoDB Atlas with Beanie ODM
- **Infrastructure**: Docker Compose with PostgreSQL and Redis (PostgreSQL currently unused)

## Development Commands

### Docker Development (Recommended)
```bash
# Start all services
docker compose up --build
# or
make up

# Seed database with sample data
docker compose exec backend bash -lc "python -m app.scripts.seed"
# or
make seed
```

### Local Development
```bash
# Frontend (port 3000)
cd apps/frontend
npm run dev

# Backend (port 8000) 
cd apps/backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Frontend linting
cd apps/frontend
npm run lint

# Frontend build
cd apps/frontend
npm run build
```

### Environment Setup
```bash
# Copy environment templates
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.local.example apps/frontend/.env.local
```

## Key Architecture Details

### Database Migration Status
The application is currently migrating from SQLite/PostgreSQL to MongoDB Atlas:
- **Active**: MongoDB models in `apps/backend/app/models/mongo_models.py`
- **Active**: MongoDB routers (`mongo_products`, `ai`, `webhooks`)
- **Disabled**: SQLite-dependent routers (auth, leads, payments, orders, addresses, admin_products)
- Setup script available at `apps/backend/app/scripts/setup_atlas.py`

### Backend Structure
- **Core**: Database connections (`mongodb.py`), settings, admin guards
- **Models**: Both old SQLAlchemy models and new MongoDB/Beanie models
- **Routers**: API endpoints (some disabled during migration)
- **Services**: Business logic (inventory, notifications, shipping)

### Frontend Structure
- **App Router**: Next.js 13+ app directory structure
- **Authentication**: Clerk integration
- **Payment**: Razorpay integration (with TODO blocks for webhooks)
- **Components**: Reusable UI components with Tailwind
- **API Routes**: Backend proxy and business logic

### Key Integration Points
- **Payment**: Razorpay integration (checkout hooks need implementation)
- **Shipping**: Shiprocket integration (API calls stubbed)
- **Notifications**: WhatsApp integration planned
- **AI**: OpenAI chatbot integration

### Development Notes
- MongoDB Atlas setup guide available in `MONGODB_ATLAS_SETUP.md`
- Windows-specific scripts available in `scripts/windows/`
- TODO blocks throughout codebase mark incomplete integrations
- Frontend uses Clerk for authentication, backend has auth system disabled during migration

### Service URLs
- Frontend: http://localhost:3000
- Backend API Docs: http://localhost:8000/docs
- MongoDB: Atlas cloud connection required