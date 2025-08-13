import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.routers import mongo_products, ai, webhooks
# Temporarily disabled SQLite-dependent routers: leads, payments, auth, addresses, orders, admin_products
from app.core.mongodb import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

app = FastAPI(title="Inner Veda Tea Store API", lifespan=lifespan)

# Production CORS configuration
allowed_origins = [
    "https://innerveda.netlify.app",
    "https://innerveda.in", 
    "https://www.innerveda.in",
    "http://localhost:3000",  # For development
]

# Use environment variable for allowed origins in production
if os.getenv("ALLOWED_ORIGINS"):
    allowed_origins = os.getenv("ALLOWED_ORIGINS").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(mongo_products.router)  # MongoDB products API
app.include_router(ai.router)
app.include_router(webhooks.router)
# Temporarily disabled SQLite-dependent routers


@app.get("/")
def root():
    return {"status": "ok", "message": "Inner Veda Tea Store API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "Inner Veda Tea Store API"}

