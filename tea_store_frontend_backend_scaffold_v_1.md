# Tea Store — Frontend & Backend Scaffold v1

Sophisticated tea storefront inspired by Forest Essentials. Includes: Next.js frontend, FastAPI backend, PostgreSQL schema, Razorpay (payments), WhatsApp/SMS (notifications), Shiprocket (shipping), AI chatbot, and lead capture for non-buyers.

---

## 0) Quickstart (local, Docker)

```bash
# 1) Clone empty repos (or copy these folders into your workspace)
mkdir tea-store && cd tea-store

# 2) Create .env files from examples
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.local.example apps/frontend/.env.local

# 3) Start everything (frontend + backend + db + redis)
docker compose up --build
# Frontend: http://localhost:3000
# Backend:  http://localhost:8000/docs
```

> If you don’t use Docker: run Postgres 15 and Redis locally, then start backend and frontend individually as shown in sections below.

---

## 1) Monorepo structure

```
tea-store/
├─ apps/
│  ├─ backend/                # FastAPI + SQLAlchemy + Alembic + Celery (optional)
│  │  ├─ alembic/
│  │  ├─ app/
│  │  │  ├─ core/             # settings, db, security
│  │  │  ├─ models/           # SQLAlchemy models
│  │  │  ├─ schemas/          # Pydantic schemas
│  │  │  ├─ routers/          # FastAPI routers (auth, products, orders, payments, webhooks, leads)
│  │  │  ├─ services/         # otp, payments (Razorpay), shipping (Shiprocket), notify (WhatsApp/SMS)
│  │  │  ├─ workers/          # background jobs (Celery/RQ)
│  │  │  └─ main.py
│  │  ├─ tests/
│  │  ├─ requirements.txt
│  │  └─ .env.example
│  └─ frontend/               # Next.js (App Router) + Tailwind + shadcn/ui
│     ├─ app/
│     │  ├─ (shop)/           # layout routes for shop
│     │  │  ├─ page.tsx       # Home
│     │  │  ├─ collections/   # Collections listing
│     │  │  └─ product/[slug]/page.tsx
│     │  ├─ cart/page.tsx
│     │  ├─ checkout/page.tsx
│     │  ├─ account/page.tsx
│     │  ├─ orders/[id]/page.tsx
│     │  ├─ api/checkout/route.ts  # (optional) thin proxy to backend
│     │  └─ layout.tsx
│     ├─ components/
│     │  ├─ ui/               # shadcn components
│     │  ├─ header.tsx footer.tsx
│     │  ├─ chatbot-widget.tsx
│     │  ├─ lead-capture-modal.tsx
│     │  ├─ product-card.tsx
│     │  └─ toast-provider.tsx
│     ├─ lib/
│     │  ├─ api.ts            # fetch wrapper to backend
│     │  └─ theme.ts          # colors/typography
│     ├─ public/
│     ├─ styles/globals.css
│     ├─ tailwind.config.ts
│     ├─ postcss.config.js
│     ├─ package.json
│     └─ .env.local.example
├─ docker-compose.yml
└─ README.md
```

---

## 2) Docker Compose

```yaml
# docker-compose.yml
version: "3.9"
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: teastore
      POSTGRES_USER: teastore
      POSTGRES_PASSWORD: teastore
    ports: ["5432:5432"]
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports: ["6379:6379"]

  backend:
    build: ./apps/backend
    env_file: ./apps/backend/.env
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    ports: ["8000:8000"]
    depends_on: [db, redis]

  frontend:
    build: ./apps/frontend
    env_file: ./apps/frontend/.env.local
    ports: ["3000:3000"]
    command: npm run dev
    depends_on: [backend]

volumes:
  pgdata:
```

---

## 3) Backend (FastAPI)

### 3.1 requirements

```txt
# apps/backend/requirements.txt
fastapi==0.112.1
uvicorn[standard]==0.30.3
pydantic==2.8.2
SQLAlchemy==2.0.36
alembic==1.13.2
psycopg2-binary==2.9.9
python-dotenv==1.0.1
httpx==0.27.0
redis==5.0.8
celery==5.4.0
python-jose==3.3.0
passlib[bcrypt]==1.7.4
```

### 3.2 settings & db

```python
# apps/backend/app/core/settings.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+psycopg2://teastore:teastore@db:5432/teastore"
    REDIS_URL: str = "redis://redis:6379/0"
    SECRET_KEY: str = "change-me"

    # OTP/Comms
    MSG91_API_KEY: str | None = None
    TWILIO_SID: str | None = None
    TWILIO_TOKEN: str | None = None
    WHATSAPP_TOKEN: str | None = None
    WHATSAPP_PHONE_ID: str | None = None

    # Payments
    RAZORPAY_KEY_ID: str | None = None
    RAZORPAY_KEY_SECRET: str | None = None

    # Shipping
    SHIPROCKET_TOKEN: str | None = None

    class Config:
        env_file = ".env"

settings = Settings()
```

```python
# apps/backend/app/core/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from .settings import settings

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

# dependency
from fastapi import Depends

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### 3.3 models (core tables)

```python
# apps/backend/app/models/user.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(20), unique=True, index=True, nullable=True)
    email = Column(String(255), unique=True, index=True, nullable=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    marketing_optin = Column(Boolean, default=False)
    whatsapp_optin = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
```

```python
# apps/backend/app/models/address.py
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.core.db import Base

class Address(Base):
    __tablename__ = "addresses"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    line1 = Column(String(255)); line2 = Column(String(255))
    city = Column(String(100)); state = Column(String(100))
    pincode = Column(String(20)); country = Column(String(100), default="India")
    is_default = Column(Boolean, default=False)
```

```python
# apps/backend/app/models/product.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.core.db import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    slug = Column(String(150), unique=True, index=True)
    name = Column(String(200), nullable=False)
    story = Column(Text)
    ingredients = Column(Text)
    benefits = Column(Text)
    brew_temp_c = Column(Integer)  # e.g., 80
    brew_time_min = Column(Float)  # e.g., 3.5
    hero_image = Column(String(500))

class Variant(Base):
    __tablename__ = "variants"
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"))
    pack_size_g = Column(Integer)
    price_inr = Column(Integer)
    mrp_inr = Column(Integer)
    sku = Column(String(100), unique=True)
    inventory_qty = Column(Integer, default=0)
```

```python
# apps/backend/app/models/cart_order.py
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Numeric
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.db import Base

class Cart(Base):
    __tablename__ = "carts"
    id = Column(Integer, primary_key=True)
    session_id = Column(String(64), unique=True, index=True)

class CartItem(Base):
    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey("carts.id", ondelete="CASCADE"))
    variant_id = Column(Integer)
    qty = Column(Integer)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String(30), default="created")
    subtotal = Column(Numeric(12,2)); shipping = Column(Numeric(12,2)); tax = Column(Numeric(12,2)); total = Column(Numeric(12,2))
    payment_status = Column(String(30), default="pending")
    payment_gateway = Column(String(30))
    gateway_order_id = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"))
    variant_id = Column(Integer)
    qty = Column(Integer)
    unit_price = Column(Numeric(12,2))
```

```python
# apps/backend/app/models/lead.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.db import Base

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True)
    phone = Column(String(20), index=True)
    email = Column(String(255))
    source = Column(String(100))  # popup/quiz/exit-intent
    tags = Column(String(255))
    marketing_optin = Column(Boolean, default=False)
    whatsapp_optin = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
```

### 3.4 Alembic init & migration

```bash
cd apps/backend
alembic init alembic
# edit alembic.ini sqlalchemy.url to use env var via script; create env.py to import settings.DATABASE_URL
alembic revision --autogenerate -m "init tables"
alembic upgrade head
```

### 3.5 routers (selected)

```python
# apps/backend/app/routers/products.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.product import Product, Variant

router = APIRouter(prefix="/products", tags=["products"])

@router.get("")
def list_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return [{
        "id": p.id, "slug": p.slug, "name": p.name, "hero_image": p.hero_image
    } for p in products]

@router.get("/{slug}")
def get_product(slug: str, db: Session = Depends(get_db)):
    p = db.query(Product).filter_by(slug=slug).first()
    if not p: return {"detail":"not found"}
    variants = db.query(Variant).filter_by(product_id=p.id).all()
    return {
        "id": p.id, "slug": p.slug, "name": p.name, "story": p.story,
        "ingredients": p.ingredients, "benefits": p.benefits,
        "brew_temp_c": p.brew_temp_c, "brew_time_min": p.brew_time_min,
        "hero_image": p.hero_image,
        "variants": [
            {"id": v.id, "pack_size_g": v.pack_size_g, "price_inr": int(v.price_inr), "mrp_inr": int(v.mrp_inr), "sku": v.sku, "inventory_qty": v.inventory_qty}
            for v in variants
        ]
    }
```

```python
# apps/backend/app/routers/leads.py
from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.lead import Lead

router = APIRouter(prefix="/leads", tags=["leads"])

class LeadIn(BaseModel):
    phone: str | None = None
    email: EmailStr | None = None
    source: str = "popup"
    marketing_optin: bool = False
    whatsapp_optin: bool = False

def upsert_lead(db: Session, payload: LeadIn):
    q = db.query(Lead)
    if payload.phone:
        q = q.filter(Lead.phone==payload.phone)
    elif payload.email:
        q = q.filter(Lead.email==payload.email)
    existing = q.first()
    if existing:
        for k,v in payload.model_dump(exclude_unset=True).items():
            setattr(existing, k, v)
        db.add(existing); db.commit(); db.refresh(existing)
        return existing
    new = Lead(**payload.model_dump())
    db.add(new); db.commit(); db.refresh(new)
    return new

@router.post("")
def create_or_update_lead(data: LeadIn, db: Session = Depends(get_db)):
    lead = upsert_lead(db, data)
    return {"id": lead.id}
```

```python
# apps/backend/app/routers/payments.py (Razorpay create order)
from fastapi import APIRouter
import httpx, os

router = APIRouter(prefix="/payments", tags=["payments"])

@router.post("/razorpay/order")
async def create_rzp_order(payload: dict):
    """ payload: {amount_inr: int, receipt: str, notes?: dict} """
    key_id = os.getenv("RAZORPAY_KEY_ID"); key_secret = os.getenv("RAZORPAY_KEY_SECRET")
    async with httpx.AsyncClient(auth=(key_id, key_secret)) as client:
        r = await client.post("https://api.razorpay.com/v1/orders", json={
            "amount": payload["amount_inr"] * 100,
            "currency": "INR",
            "receipt": payload.get("receipt", "rcpt1"),
            "notes": payload.get("notes", {}),
            "payment_capture": 1
        })
        r.raise_for_status()
        return r.json()
```

```python
# apps/backend/app/routers/webhooks.py (Razorpay + Shiprocket + WhatsApp)
from fastapi import APIRouter, Request

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

@router.post("/razorpay")
async def razorpay_webhook(req: Request):
    payload = await req.json()
    # TODO: verify signature from headers['x-razorpay-signature']
    # Update order/payment status and enqueue WhatsApp notification
    return {"ok": True}
```

```python
# apps/backend/app/routers/ai.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/ai", tags=["ai"])

class ChatIn(BaseModel):
    message: str
    context: dict | None = None

@router.post("/chat")
async def chat(msg: ChatIn):
    # TODO: call your preferred LLM provider with RAG over product/faq
    return {"reply": "Hi! Tell me how you like your tea—floral, bold, or herbal?"}
```

```python
# apps/backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import products, leads, payments, webhooks, ai

app = FastAPI(title="Tea Store API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(leads.router)
app.include_router(payments.router)
app.include_router(webhooks.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"status": "ok"}
```

### 3.6 .env example

```env
# apps/backend/.env.example
DATABASE_URL=postgresql+psycopg2://teastore:teastore@db:5432/teastore
REDIS_URL=redis://redis:6379/0
SECRET_KEY=replace-me

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# WhatsApp Cloud API
WHATSAPP_TOKEN=
WHATSAPP_PHONE_ID=

# MSG91/Twilio (optional)
MSG91_API_KEY=
TWILIO_SID=
TWILIO_TOKEN=

# Shiprocket (optional)
SHIPROCKET_TOKEN=
```

---

## 4) Frontend (Next.js 14, App Router)

### 4.1 package.json

```json
{
  "name": "tea-frontend",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "@clerk/nextjs": "^5.0.0",
    "tailwindcss": "^3.4.9",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.453.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.9",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "postcss": "^8.4.41",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.5",
    "typescript": "^5.5.4"
  }
}
```

### 4.2 Tailwind config & theme

```ts
// apps/frontend/tailwind.config.ts
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./styles/**/*.{css}"] ,
  theme: {
    extend: {
      colors: {
        tea: {
          forest: "#0D3B2E",   // deep green
          leaf: "#2E7D5B",
          gold: "#C9A227",
          cream: "#FAF7F2"
        }
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
export default config
```

```css
/* apps/frontend/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root{ background: #FAF7F2; }
```

### 4.3 API helper

```ts
// apps/frontend/lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function apiGet<T>(path: string): Promise<T> {
  const r = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
export async function apiPost<T>(path: string, body: any): Promise<T> {
  const r = await fetch(`${API_BASE}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)});
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
```

### 4.4 Layout & basic pages

```tsx
// apps/frontend/app/layout.tsx
import './styles.css';
import './globals.css';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot-widget";
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-tea-cream text-[#1b1b1b]">
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
          <Footer />
          <Chatbot />
        </body>
      </html>
    </ClerkProvider>
  )
}
```

```tsx
// apps/frontend/app/(shop)/page.tsx (Home)
import { apiGet } from "@/lib/api";

export default async function Home(){
  const products = await apiGet<any[]>("/products");
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-tea-forest text-white p-10">
        <h1 className="font-heading text-4xl">Single‑Origin Teas</h1>
        <p className="mt-2 opacity-90">Brewed with care. Sourced ethically.</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <a key={p.id} href={`/product/${p.slug}`} className="border bg-white rounded-xl overflow-hidden hover:shadow-md transition">
            <img src={p.hero_image} alt={p.name} className="aspect-square object-cover"/>
            <div className="p-4">
              <h3 className="font-heading text-xl">{p.name}</h3>
            </div>
          </a>
        ))}
      </section>
    </div>
  )
}
```

```tsx
// apps/frontend/app/(shop)/product/[slug]/page.tsx
import { apiGet } from "@/lib/api";

export default async function ProductPage({ params }: { params: { slug: string } }){
  const p = await apiGet<any>(`/products/${params.slug}`);
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <img src={p.hero_image} alt={p.name} className="rounded-xl"/>
      <div>
        <h1 className="font-heading text-3xl">{p.name}</h1>
        <p className="mt-4 whitespace-pre-line">{p.story}</p>
        <div className="mt-6 space-y-3">
          {p.variants?.map((v:any)=> (
            <div key={v.id} className="flex items-center justify-between border rounded-lg p-3">
              <div>{v.pack_size_g}g</div>
              <div className="font-semibold">₹{v.price_inr}</div>
              <button className="bg-tea-forest text-white rounded-lg px-4 py-2">Add to cart</button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-sm text-gray-700">
          <div>🫖 Brew: {p.brew_time_min} min @ {p.brew_temp_c}°C</div>
        </div>
      </div>
    </div>
  )
}
```

### 4.5 Checkout (Razorpay order via backend)

```tsx
// apps/frontend/app/checkout/page.tsx
'use client'
import { apiPost } from "@/lib/api";

export default function Checkout(){
  async function pay(){
    const order = await apiPost<any>("/payments/razorpay/order", { amount_inr: 499, receipt: "order_rcpt_11" });
    // TODO: load Razorpay checkout script and open with order.id
    alert(`Created RZP order: ${order.id}`)
  }
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-heading text-3xl mb-6">Checkout</h1>
      {/* TODO: Address form, summary */}
      <button onClick={pay} className="bg-tea-forest text-white rounded-lg px-5 py-3">Pay ₹499</button>
    </div>
  )
}
```

### 4.6 Chatbot & lead capture

```tsx
// apps/frontend/components/chatbot-widget.tsx
'use client'
import { useState } from 'react'
import { apiPost } from '@/lib/api'

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{role:'user'|'bot', text:string}[]>([])
  const [input, setInput] = useState("")

  async function send(){
    const reply = await apiPost<{reply:string}>("/ai/chat", { message: input })
    setMessages(m=>[...m,{role:'user', text:input},{role:'bot', text:reply.reply}])
    setInput("")
  }

  return (
    <div>
      <button onClick={()=>setOpen(!open)} className="fixed bottom-5 right-5 bg-tea-forest text-white rounded-full px-4 py-3 shadow-lg">Chat</button>
      {open && (
        <div className="fixed bottom-20 right-5 w-80 bg-white rounded-xl shadow-xl p-3 space-y-2">
          <div className="h-64 overflow-y-auto space-y-2">
            {messages.map((m,i)=> (
              <div key={i} className={m.role==='bot'? 'bg-tea-cream p-2 rounded-lg' : 'text-right'}>{m.text}</div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 border rounded-lg px-2 py-1" placeholder="Ask about teas..."/>
            <button onClick={send} className="bg-tea-forest text-white rounded-lg px-3">Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
```

```tsx
// apps/frontend/components/lead-capture-modal.tsx
'use client'
import { useEffect, useState } from 'react'
import { apiPost } from '@/lib/api'

export default function LeadCapture(){
  const [show, setShow] = useState(false)
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  useEffect(()=>{ const t = setTimeout(()=>setShow(true), 5000); return ()=>clearTimeout(t) },[])
  async function save(){
    await apiPost("/leads", { phone, email, source: "popup", marketing_optin: true, whatsapp_optin: true })
    setShow(false)
  }
  if(!show) return null
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[28rem]">
        <h3 className="font-heading text-2xl">Get 10% off + Brew Guide</h3>
        <p className="mt-2 text-sm">Enter details to receive WhatsApp/SMS updates.</p>
        <div className="mt-4 space-y-3">
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="w-full border rounded-lg px-3 py-2"/>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email (optional)" className="w-full border rounded-lg px-3 py-2"/>
          <button onClick={save} className="bg-tea-forest text-white rounded-lg px-4 py-2 w-full">Unlock</button>
        </div>
      </div>
    </div>
  )
}
```

### 4.7 .env.local example

```env
# apps/frontend/.env.local.example
NEXT_PUBLIC_API_BASE=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

---

## 5) Notifications (WhatsApp/SMS)

```python
# apps/backend/app/services/notify.py (WhatsApp Cloud API minimal)
import httpx, os

WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN")
WHATSAPP_PHONE_ID = os.getenv("WHATSAPP_PHONE_ID")

async def send_whatsapp(to_phone: str, template: str, variables: list[str] = []):
    url = f"https://graph.facebook.com/v19.0/{WHATSAPP_PHONE_ID}/messages"
    headers = {"Authorization": f"Bearer {WHATSAPP_TOKEN}", "Content-Type": "application/json"}
    data = {
        "messaging_product": "whatsapp",
        "to": to_phone,
        "type": "template",
        "template": {"name": template, "language": {"code": "en"},
          "components": [{"type":"body","parameters": [{"type":"text","text":v} for v in variables]}]
        }
    }
    async with httpx.AsyncClient() as client:
        r = await client.post(url, json=data, headers=headers)
        r.raise_for_status()
        return r.json()
```

> Create templates in WhatsApp Manager (e.g., `order_placed`, `order_shipped`, `order_delivered`).

---

## 6) Shipping (Shiprocket stub)

```python
# apps/backend/app/services/shipping.py (stub)
import httpx, os

SHIPROCKET_TOKEN = os.getenv("SHIPROCKET_TOKEN")

async def create_shipment(order_id: int, payload: dict):
    # TODO: call Shiprocket orders API with payload
    return {"tracking_id": "SR123"}
```

---

## 7) AI Chatbot (RAG-ready skeleton)

- Endpoint: `POST /ai/chat` (see router). Plug any Large Language Model provider.
- Suggested approach: store `faq.md`, `policies.md`, `brew-guides/*.md`, `products` table fields in an embedding store later (e.g., pgvector/Weaviate/Meilisearch). Start simple: rule-based answers for FAQs; switch to retrieval-augmented generation later.

---

## 8) Styling cues (Forest Essentials inspiration)

- Palette: deep forest green (#0D3B2E), gold accents (#C9A227), off‑white cream (#FAF7F2), rich imagery, subtle shadows, rounded‑2xl.
- Typography: Playfair Display (headings) + Inter (body). Generous whitespace, delicate borders, tasteful hover effects.

---

## 9) Dev scripts (without Docker)

### Backend

```bash
cd apps/backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd apps/frontend
npm i
cp .env.local.example .env.local
npm run dev
```

---

## 10) Deployment notes

- **Frontend**: Vercel → set `NEXT_PUBLIC_API_BASE` to your API URL.
- **Backend**: GCP Cloud Run (container). Configure env vars; set min instances; connect to managed Postgres (Cloud SQL) or a hosted Postgres.
- **DB**: Cloud SQL (Postgres) with private IP; run Alembic migrations in CI.
- **Domains**: www + apex, HTTPS; add CDN caching for images.
- **Observability**: Sentry (frontend+backend), structured JSON logs, uptime checks.

---

## 11) Roadmap after MVP

- Phone OTP auth + address book UI;
- Razorpay checkout UI;
- WhatsApp transactional flows;
- Admin portal (product CRUD, inventory, coupons);
- Subscriptions & bundles;
- Reviews & UGC;
- Search upgrade (Meilisearch/Algolia);
- RAG chatbot with embeddings.

---

### README (short)

- Start with Docker Compose.
- Seed initial products via `/products` insert (add a temporary admin route or via SQL).
- Replace `TODO` blocks (Razorpay checkout script; webhook signature verification; Shiprocket API calls; OTP provider bindings).

**You now have a working skeleton for a luxury tea store with AI chat, lead capture, payments, and notifications.**

---

## 12) Phone OTP Auth (MVP)

### 12.1 Backend routes (Redis-backed, provider-agnostic)

```python
# apps/backend/app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.db import get_db
import os, random, time, redis

router = APIRouter(prefix="/auth", tags=["auth"])
_r = redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"))

class OTPRequest(BaseModel):
    phone: str

class OTPVerify(BaseModel):
    phone: str
    code: str

def _otp_key(phone: str):
    return f"otp:{phone}"

@router.post("/otp/request")
def request_otp(data: OTPRequest):
    # rate-limit: 1/min, 5/day (simple)
    k = _otp_key(data.phone)
    if _r.ttl(k) > 240:  # recently sent
        raise HTTPException(429, "Please wait before requesting another OTP")
    code = f"{random.randint(100000, 999999)}"
    _r.setex(k, 300, code)  # 5 minutes
    # TODO: integrate MSG91/Twilio to send SMS/WhatsApp
    print("DEBUG OTP:", code)
    return {"ok": True}

@router.post("/otp/verify")
def verify_otp(data: OTPVerify, db: Session = Depends(get_db)):
    k = _otp_key(data.phone)
    saved = _r.get(k)
    if not saved or data.code != saved.decode():
        raise HTTPException(400, "Invalid or expired OTP")
    _r.delete(k)
    # TODO: create/find user by phone and issue session/JWT
    return {"ok": True, "phone": data.phone}
```

> Plug MSG91/Twilio in `request_otp` (provider SDK call) and later issue a JWT session in `verify_otp`.

Add to `main.py`:

```python
from app.routers import auth
app.include_router(auth.router)
```

---

## 13) Checkout wired with Razorpay CheckoutJS

### 13.1 Frontend: load CheckoutJS and open widget

```tsx
// apps/frontend/app/checkout/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { apiPost } from '@/lib/api'

declare global { interface Window { Razorpay: any } }

export default function Checkout(){
  const [scriptReady, setScriptReady] = useState(false)
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string

  useEffect(()=>{
    const id = 'rzp-checkout'
    if(document.getElementById(id)) { setScriptReady(true); return }
    const s = document.createElement('script')
    s.id = id
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = ()=> setScriptReady(true)
    document.body.appendChild(s)
  },[])

  async function pay(){
    const order = await apiPost<any>('/payments/razorpay/order', { amount_inr: 499, receipt: 'rcpt_demo' })
    const options = {
      key,
      amount: order.amount,
      currency: order.currency,
      name: 'Tea Store',
      description: 'Order payment',
      order_id: order.id,
      handler: async (resp: any) => {
        // Optionally send to backend for signature verify & order capture
        const r = await apiPost('/payments/razorpay/verify', resp)
        alert('Payment success! ' + JSON.stringify(r))
      },
      prefill: { name: '', email: '', contact: '' },
      theme: { color: '#0D3B2E' }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-heading text-3xl mb-6">Checkout</h1>
      <button disabled={!scriptReady} onClick={pay} className="bg-tea-forest text-white rounded-lg px-5 py-3 disabled:opacity-60">Pay ₹499</button>
    </div>
  )
}
```

### 13.2 Backend: verify payment signature

```python
# apps/backend/app/routers/payments_verify.py
from fastapi import APIRouter, HTTPException
import os, hmac, hashlib

router = APIRouter(prefix="/payments", tags=["payments"]) 

@router.post('/razorpay/verify')
async def verify(resp: dict):
    order_id = resp.get('razorpay_order_id')
    payment_id = resp.get('razorpay_payment_id')
    signature = resp.get('razorpay_signature')
    secret = os.getenv('RAZORPAY_KEY_SECRET', '')
    body = f"{order_id}|{payment_id}".encode()
    expected = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, signature or ''):
        raise HTTPException(400, 'Invalid signature')
    return {"ok": True, "order_id": order_id, "payment_id": payment_id}
```

Add to `main.py`:

```python
from app.routers import payments_verify
app.include_router(payments_verify.router)
```

### 13.3 Webhook verification (server-to-server)

```python
# apps/backend/app/routers/webhooks.py (append)
import hmac, hashlib, os
from fastapi import Header, HTTPException

@router.post('/razorpay')
async def razorpay_webhook(req: Request, x_razorpay_signature: str = Header(None)):
    body = await req.body()
    secret = os.getenv('RAZORPAY_WEBHOOK_SECRET', '')
    expected = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, x_razorpay_signature or ''):
        raise HTTPException(400, 'Bad signature')
    payload = await req.json()
    # TODO: update order, enqueue WhatsApp notification
    return {"ok": True}
```

---

## 14) Address API + Checkout form

### 14.1 Backend router

```python
# apps/backend/app/routers/addresses.py
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.address import Address

router = APIRouter(prefix='/addresses', tags=['addresses'])

class AddressIn(BaseModel):
    user_id: int | None = None
    line1: str; line2: str | None = None
    city: str; state: str; pincode: str; country: str = 'India'
    is_default: bool = True

@router.post('')
def create_address(data: AddressIn, db: Session = Depends(get_db)):
    addr = Address(**data.model_dump())
    db.add(addr); db.commit(); db.refresh(addr)
    return {"id": addr.id}
```

Add to `main.py`:

```python
from app.routers import addresses
app.include_router(addresses.router)
```

### 14.2 Frontend form snippet

```tsx
// apps/frontend/app/checkout/address-form.tsx
'use client'
import { useState } from 'react'
import { apiPost } from '@/lib/api'

export default function AddressForm(){
  const [f, setF] = useState({ line1:'', line2:'', city:'', state:'', pincode:'', country:'India' })
  async function save(){ await apiPost('/addresses', f); alert('Address saved') }
  return (
    <div className="space-y-3">
      {['line1','line2','city','state','pincode','country'].map(k=> (
        <input key={k} placeholder={k} value={(f as any)[k]||''} onChange={e=>setF({...f,[k]:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
      ))}
      <button onClick={save} className="bg-tea-forest text-white rounded-lg px-4 py-2">Save address</button>
    </div>
  )
}
```

---

## 15) Minimal Admin (API-key protected) — Product & Variant CRUD

### 15.1 Backend

```python
# apps/backend/app/core/admin_guard.py
import os
from fastapi import Header, HTTPException

def admin_guard(x_admin_key: str | None = Header(None)):
    if x_admin_key != os.getenv('ADMIN_API_KEY'):
        raise HTTPException(401, 'Unauthorized')
```

```python
# apps/backend/app/routers/admin_products.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.admin_guard import admin_guard
from app.models.product import Product, Variant

router = APIRouter(prefix='/admin', tags=['admin'])

@router.post('/products', dependencies=[Depends(admin_guard)])
def create_product(data: dict, db: Session = Depends(get_db)):
    p = Product(**data); db.add(p); db.commit(); db.refresh(p); return {"id": p.id}

@router.post('/variants', dependencies=[Depends(admin_guard)])
def create_variant(data: dict, db: Session = Depends(get_db)):
    v = Variant(**data); db.add(v); db.commit(); db.refresh(v); return {"id": v.id}
```

Add to `main.py`:

```python
from app.routers import admin_products
app.include_router(admin_products.router)
```

### 15.2 Frontend (very minimal)

```tsx
// apps/frontend/app/admin/new-product/page.tsx
'use client'
import { useState } from 'react'

export default function NewProduct(){
  const [form, setForm] = useState({ name:'', slug:'', story:'', ingredients:'', benefits:'', brew_temp_c:80, brew_time_min:3, hero_image:'' })
  async function save(){
    await fetch(process.env.NEXT_PUBLIC_API_BASE + '/admin/products', { method:'POST', headers:{'Content-Type':'application/json','x-admin-key':process.env.NEXT_PUBLIC_ADMIN_KEY as string}, body: JSON.stringify(form) })
    alert('Created product')
  }
  return (
    <div className="max-w-2xl space-y-3">
      {Object.entries(form).map(([k,v])=> (
        <input key={k} placeholder={k} value={v as any} onChange={e=>setForm({...form,[k]: e.target.value})} className="w-full border rounded-lg px-3 py-2"/>
      ))}
      <button onClick={save} className="bg-tea-forest text-white px-4 py-2 rounded-lg">Save</button>
    </div>
  )
}
```

---

## 16) Seed script (sample products)

```python
# apps/backend/scripts/seed.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from app.core.db import Base
from app.models.product import Product, Variant

DB = os.getenv('DATABASE_URL')
engine = create_engine(DB)
Base.metadata.create_all(engine)

with Session(engine) as s:
    t = Product(slug='darjeeling-first-flush', name='Darjeeling First Flush', story='Spring pluck, floral', ingredients='Camellia sinensis', benefits='Light, uplifting', brew_temp_c=85, brew_time_min=3, hero_image='https://picsum.photos/seed/tea1/800')
    s.add(t); s.flush()
    s.add_all([
        Variant(product_id=t.id, pack_size_g=50, price_inr=399, mrp_inr=449, sku='DJ-FF-50', inventory_qty=100),
        Variant(product_id=t.id, pack_size_g=100, price_inr=699, mrp_inr=799, sku='DJ-FF-100', inventory_qty=80),
    ])
    s.commit()
print('Seeded!')
```

Run:

```bash
docker compose exec backend bash -lc "python -c 'from app.core.db import Base, engine; Base.metadata.create_all(engine)'"
docker compose exec backend bash -lc "python -m app.scripts.seed"
```

---

## 17) Env keys checklist

**Backend (.env):**

- `DATABASE_URL` (Postgres)
- `REDIS_URL`
- `SECRET_KEY`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`
- `MSG91_API_KEY` *or* `TWILIO_SID` + `TWILIO_TOKEN`
- `SHIPROCKET_TOKEN`
- `ADMIN_API_KEY`

**Frontend (.env.local):**

- `NEXT_PUBLIC_API_BASE`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `NEXT_PUBLIC_ADMIN_KEY` (for minimal admin page — replace with real auth later)
 - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

---

## 23) User Authentication with Clerk (Optional)

### 23.1 Install and configure

```bash
cd apps/frontend
npm i @clerk/nextjs
```

Set env:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

Wrap `app/layout.tsx` with `ClerkProvider` (shown above).

### 23.2 Routes and middleware

- Add `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx` with Clerk `<SignIn/>` and `<SignUp/>`.
- Add `middleware.ts` with `authMiddleware` to optionally protect routes.
- Add a Sign-in link in `components/header.tsx`.

### 23.3 Backend notes

You can later protect backend routes by verifying Clerk JWTs via JWKS (`settings.CLERK_JWKS_URL`) in FastAPI. MVP keeps admin endpoints protected via `ADMIN_API_KEY` only.

---

## 18) Privacy & Consent (must‑have)

- Separate transactional vs marketing opt-ins; store in `users`/`leads`.
- Provide unsubscribe/STOP handling for SMS/WhatsApp.
- Add /privacy and /terms pages; link in footer and capture modals.

---

## 19) Makefile (quality of life)

```makefile
# Makefile at repo root
up: ; docker compose up --build
seed: ; docker compose exec backend bash -lc "python -m app.scripts.seed"
fmt: ; docker compose exec backend bash -lc "ruff check . --fix || true"
```

---

## 20) Next upgrades

- Session/JWT issuance post-OTP; account area.
- Abandoned cart via WhatsApp (template opt-in).
- Shiprocket order sync on payment\_success webhook.
- Reviews, wishlist, subscriptions.
- Swap to real admin auth (NextAuth/Keycloak) and RBAC.

---

## 21) Orders API (server‑side checkout flow)

### 21.1 Create order from posted items

```python
# apps/backend/app/routers/orders.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.models.cart_order import Order, OrderItem
from app.models.product import Variant
from decimal import Decimal

router = APIRouter(prefix="/orders", tags=["orders"])

class OrderItemIn(BaseModel):
    variant_id: int
    qty: int

class OrderIn(BaseModel):
    user_id: int | None = None
    items: list[OrderItemIn]
    address_id: int | None = None
    notes: dict | None = None

@router.post("")
def create_order(data: OrderIn, db: Session = Depends(get_db)):
    if not data.items:
        raise HTTPException(400, "No items")
    subtotal = Decimal('0.00')
    order = Order(user_id=data.user_id, status='created', payment_status='pending', subtotal=0, shipping=0, tax=0, total=0)
    db.add(order); db.flush()
    for it in data.items:
        v = db.get(Variant, it.variant_id)
        if not v or v.inventory_qty < it.qty:
            raise HTTPException(400, f"Variant {it.variant_id} unavailable")
        line_total = Decimal(v.price_inr) * it.qty
        subtotal += line_total
        db.add(OrderItem(order_id=order.id, variant_id=v.id, qty=it.qty, unit_price=v.price_inr))
    shipping = Decimal('0.00') if subtotal >= 499 else Decimal('49.00')
    tax = (subtotal * Decimal('0.05')).quantize(Decimal('1.00'))  # placeholder 5%
    total = subtotal + shipping + tax
    order.subtotal, order.shipping, order.tax, order.total = subtotal, shipping, tax, total
    db.commit(); db.refresh(order)
    return {"id": order.id, "subtotal": float(subtotal), "shipping": float(shipping), "tax": float(tax), "total": float(total)}
```

Add to `main.py`:

```python
from app.routers import orders
app.include_router(orders.router)
```

### 21.2 Reserve inventory on payment success

```python
# apps/backend/app/services/inventory.py
from sqlalchemy.orm import Session
from app.models.cart_order import OrderItem
from app.models.product import Variant

def deduct_inventory(db: Session, order_id: int):
    items = db.query(OrderItem).filter(OrderItem.order_id==order_id).all()
    for it in items:
        v = db.get(Variant, it.variant_id)
        if v:
            v.inventory_qty = max(0, (v.inventory_qty or 0) - it.qty)
            db.add(v)
```

Call from webhook after verifying payment.

---

## 22) WhatsApp notifications end‑to‑end

### 22.1 Notification orchestration

```python
# apps/backend/app/services/notifications_flow.py
from sqlalchemy.orm import Session
from app.services.notify import send_whatsapp

async def notify_order_placed(phone: str, order_id: int, amount_inr: int):
    # Template in WhatsApp Manager: order_placed(body: {{1}} order_id, {{2}} amount)
    await send_whatsapp(phone, template="order_placed", variables=[str(order_id), f"₹{amount_inr}"])

async def notify_order_shipped(phone: str, order_id: int, tracking: str):
    await send_whatsapp(phone, template="order_shipped", variables=[str(order_id), tracking])

async def notify_order_delivered(phone: str, order_id: int):
    await send_whatsapp(phone, template="order_delivered", variables=[str(order_id)])
```

### 22.2 Trigger on Razorpay webhook

```python
# apps/backend/app/routers/webhooks.py (append to verified branch)
from sqlalchemy.orm import Session
from app.core.db import get_db, SessionLocal
from app.models.cart_order import Order
from app.services.inventory import deduct_inventory
from app.services.notifications_flow import notify_order_placed

@router.post('/razorpay')
async def razorpay_webhook(req: Request, x_razorpay_signature: str = Header(None)):
    body = await req.body()
    secret = os.getenv('RAZORPAY_WEBHOOK_SECRET', '')
    expected = hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, x_razorpay_signature or ''):
        raise HTTPException(400, 'Bad signature')
    payload = await req.json()
    event = payload.get('event')
    if event == 'payment.captured':
        order_id = int(payload['payload']['payment']['entity']['notes'].get('order_id', 0)) if payload['payload']['payment']['entity']['notes'] else 0
        amount = int(payload['payload']['payment']['entity']['amount']) // 100
        phone = payload['payload']['payment']['entity'].get('contact')
        with SessionLocal() as db:
            order = db.get(Order, order_id)
            if order:
                order.payment_status = 'paid'; order.status = 'confirmed'
                db.add(order)
                deduct_inventory(db, order.id)
                db.commit()
        if phone and order_id:
            await notify_order_placed(phone, order_id, amount)
    return {"ok": True}
```
