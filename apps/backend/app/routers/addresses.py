from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.address import Address

router = APIRouter(prefix='/addresses', tags=['addresses'])


class AddressIn(BaseModel):
    user_id: int | None = None
    line1: str
    line2: str | None = None
    city: str
    state: str
    pincode: str
    country: str = 'India'
    is_default: bool = True


@router.post('')
def create_address(data: AddressIn, db: Session = Depends(get_db)):
    addr = Address(**data.model_dump())
    db.add(addr)
    db.commit()
    db.refresh(addr)
    return {"id": addr.id}


