from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models.mongo_models import Product, Category
import os
from dotenv import load_dotenv

load_dotenv()

class MongoDB:
    client: AsyncIOMotorClient = None
    database = None

mongodb = MongoDB()

async def connect_to_mongo():
    """Create database connection"""
    mongodb.client = AsyncIOMotorClient(
        os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    )
    mongodb.database = mongodb.client[os.getenv("MONGODB_DB", "tea_store")]
    
    # Initialize beanie with the Product model
    await init_beanie(
        database=mongodb.database,
        document_models=[Product, Category]
    )

async def close_mongo_connection():
    """Close database connection"""
    if mongodb.client:
        mongodb.client.close()

def get_database():
    return mongodb.database
