from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.routers import products, leads, payments, webhooks, ai, auth, payments_verify, addresses, orders, admin_products, mongo_products
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

app.include_router(products.router)
app.include_router(mongo_products.router)  # New MongoDB products API
app.include_router(leads.router)
app.include_router(payments.router)
app.include_router(webhooks.router)
app.include_router(ai.router)
app.include_router(auth.router)
app.include_router(payments_verify.router)
app.include_router(addresses.router)
app.include_router(orders.router)
app.include_router(admin_products.router)


@app.get("/")
def root():
    return {"status": "ok"}

