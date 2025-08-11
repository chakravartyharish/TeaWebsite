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

app = FastAPI(title="Tea Store API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(mongo_products.router)  # MongoDB products API
app.include_router(ai.router)
app.include_router(webhooks.router)
# Temporarily disabled SQLite-dependent routers


@app.get("/")
def root():
    return {"status": "ok"}

