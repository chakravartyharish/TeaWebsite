# Tea Store (Inner Veda) - Codebase Explanation

## Project Overview

**Inner Veda** is a full-stack e-commerce application specializing in selling "A-ZEN" - a premium herbal tea blend. The application is built as a modern monorepo with a FastAPI backend and Next.js frontend, currently undergoing a database migration from PostgreSQL to MongoDB Atlas.

### Business Domain
- **Product**: A-ZEN herbal tea blend (₹249 for 16 cups)
- **Benefits**: Calm & focused mind + radiant skin
- **Ingredients**: 5 sacred herbs (Shankhpushpi, Brahmi, Tulsi, Rose Petals, Yashtimadhu)
- **USP**: Instant tea/latte mix - just add hot milk/water

## Architecture Overview

### High-Level Architecture
```
Frontend (Next.js 15) ←→ Backend (FastAPI) ←→ MongoDB Atlas
                                 ↓
                              Redis Cache
                                 ↓
                           External Services
                           (Razorpay, Shiprocket, WhatsApp)
```

### Technology Stack

#### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB Atlas (migrated from PostgreSQL)
- **ODM**: Beanie (MongoDB object-document mapper)
- **Cache**: Redis
- **Server**: Uvicorn with async/await patterns
- **Task Queue**: Celery
- **Authentication**: Python-Jose, PassLib
- **HTTP Client**: httpx

#### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **State Management**: React hooks + localStorage
- **Payment**: Razorpay integration
- **AI Chat**: OpenAI integration

#### Infrastructure
- **Development**: Docker Compose
- **Database**: MongoDB Atlas (cloud)
- **Cache**: Redis
- **PostgreSQL**: Still in docker-compose but unused

## Directory Structure

```
├── apps/
│   ├── backend/           # FastAPI application
│   │   ├── app/
│   │   │   ├── core/      # Database, settings, guards
│   │   │   ├── models/    # Data models (SQLAlchemy + Beanie)
│   │   │   ├── routers/   # API endpoints
│   │   │   ├── services/  # Business logic
│   │   │   ├── scripts/   # Database setup and seeding
│   │   │   └── main.py    # FastAPI app initialization
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── frontend/          # Next.js application
│       ├── app/           # App Router structure
│       ├── components/    # Reusable UI components
│       ├── lib/           # Utility functions and API calls
│       ├── middleware.ts  # Clerk authentication
│       └── package.json
├── scripts/
│   └── windows/           # Windows batch scripts
├── docker-compose.yml
├── Makefile              # Development commands
└── CLAUDE.md            # AI assistant guidance
```

## Current Migration Status

⚠️ **CRITICAL**: The application is in active database migration from PostgreSQL to MongoDB Atlas.

### Active Components
- ✅ MongoDB models (`mongo_models.py`)
- ✅ MongoDB routers: `mongo_products`, `ai`, `webhooks`
- ✅ Frontend authentication via Clerk
- ✅ Product catalog with MongoDB

### Disabled/Incomplete Components
- ❌ SQLite-dependent routers: `auth`, `leads`, `payments`, `orders`, `addresses`, `admin_products`
- ❌ Backend authentication system
- ❌ Payment processing (Razorpay webhooks)
- ❌ Order management
- ❌ Shipping integration (Shiprocket)

## Backend Deep Dive

### Core Components

#### Database Layer (`app/core/`)
- `mongodb.py`: MongoDB Atlas connection using Motor async driver
- `db.py`: Legacy SQLAlchemy setup (disabled)
- `settings.py`: Environment configuration with Pydantic Settings
- `admin_guard.py`: API key-based admin authentication

#### Models (`app/models/`)
- `mongo_models.py`: Active MongoDB models using Beanie ODM
  - `Product`: Main product model with variants, categories, pricing
  - `Category`: Product categorization
  - `Variant`: Product variations (size, price, SKU)
- Legacy models: SQLAlchemy models for PostgreSQL (disabled)

#### API Routes (`app/routers/`)

**Active Routes:**
- `mongo_products.py`: Product CRUD operations
  - `GET /api/products/`: List products with filtering
  - `GET /api/products/{product_id}`: Get single product
  - `GET /api/products/slug/{slug}`: Get product by slug
- `ai.py`: OpenAI chatbot integration
- `webhooks.py`: External service webhooks

**Disabled Routes:**
- `auth.py`: User authentication
- `payments.py`: Razorpay payment processing
- `orders.py`: Order management
- `leads.py`: Lead capture
- `addresses.py`: User addresses

#### Services (`app/services/`)
- `inventory.py`: Stock management
- `shipping.py`: Shiprocket integration (stubbed)
- `notifications_flow.py`: WhatsApp notifications (planned)
- `notify.py`: Email notifications

#### Scripts (`app/scripts/`)
- `setup_atlas.py`: MongoDB Atlas initialization and seeding
- `seed.py`: Database seeding with sample data
- `migrate_products.py`: Data migration utilities

### API Endpoints (Active)

```python
# Products API
GET /api/products/                    # List products with filters
GET /api/products/{id}               # Get single product
GET /api/products/slug/{slug}        # Get product by slug

# AI Chatbot
POST /api/ai/chat                    # Chat with AI assistant

# Webhooks
POST /api/webhooks/razorpay          # Razorpay payment webhooks
POST /api/webhooks/shiprocket        # Shipping webhooks
```

## Frontend Deep Dive

### App Router Structure (`app/`)

```
app/
├── (shop)/                  # Shop layout group
│   ├── page.tsx            # Homepage with authentication
│   └── product/[slug]/     # Dynamic product pages
├── api/                    # API routes (backend proxy)
├── cart/                   # Shopping cart
├── checkout/               # Payment flow
├── products/               # Product listing
├── contact/                # Contact form
├── sign-in/, sign-up/     # Authentication pages
└── layout.tsx             # Root layout
```

### Key Components (`components/`)

- `clerk-provider-wrapper.tsx`: Authentication context
- `header.tsx`, `footer.tsx`: Layout components
- `chatbot-widget.tsx`: AI chat integration
- `lead-capture-modal.tsx`: Lead generation
- `error-boundary.tsx`: Error handling

### Library Functions (`lib/`)

- `api.ts`: Backend API calls and data fetching
- `cart.ts`: Shopping cart state management (localStorage)
- `email.ts`: Email service integration
- `openai.ts`: AI chatbot utilities

### Authentication Flow

```typescript
// Clerk-based authentication
1. User visits homepage → SignIn component if not authenticated
2. Clerk handles OAuth/email authentication
3. Frontend stores user session
4. Backend auth currently disabled during migration
```

### Shopping Cart System

```typescript
// localStorage-based cart (lib/cart.ts)
interface CartItem {
  variantId: number;
  qty: number;
  name: string;
  priceInr: number;
  productSlug: string;
}

// Cart operations
- addItem(item: CartItem)
- removeItem(variantId: number)
- getCart(): CartItem[]
- getTotals(): { items: number, total: number }
```

## Development Workflow

### Environment Setup

1. **Copy environment files:**
   ```bash
   cp apps/backend/.env.atlas.example apps/backend/.env
   cp apps/frontend/.env.local.example apps/frontend/.env.local
   ```

2. **Configure MongoDB Atlas:**
   - Create free Atlas account
   - Set up M0 Sandbox cluster
   - Update `MONGODB_URL` in backend `.env`

3. **Configure Clerk:**
   - Set up Clerk account
   - Update `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in frontend `.env.local`

### Development Commands

```bash
# Docker development (recommended)
make up                              # Start all services
make seed                           # Seed database

# Local development
cd apps/frontend && npm run dev     # Frontend (port 3000)
cd apps/backend && uvicorn app.main:app --reload  # Backend (port 8000)

# Frontend operations
cd apps/frontend && npm run lint    # Lint code
cd apps/frontend && npm run build   # Build for production

# Backend operations
cd apps/backend && python -m app.scripts.setup_atlas  # Setup MongoDB
cd apps/backend && python -m app.scripts.seed        # Seed data
```

### Windows Support

Windows-specific batch scripts in `scripts/windows/`:
- `prepare-envs.bat`: Copy environment files
- `setup-backend.bat`, `setup-frontend.bat`: Install dependencies
- `run-backend.bat`, `run-frontend.bat`: Start services
- `up-docker.bat`: Docker Compose startup

## Data Models

### Product Model (MongoDB)

```python
class Product(Document):
    name: str                    # Product name
    description: str             # Product description
    price: float                 # Current price
    original_price: float        # MRP/original price
    image: str                   # Product image URL
    category: str                # Product category
    benefits: List[str]          # Health benefits
    in_stock: bool              # Availability
    rating: float               # Average rating
    reviews: int                # Number of reviews
    slug: str                   # URL slug
    story: str                  # Product story/background
    ingredients: str            # Ingredient list
    brew_temp_c: int           # Brewing temperature
    brew_time_min: int         # Brewing time
    variants: List[Variant]     # Product variants
    created_at: datetime
    updated_at: datetime
```

### Variant Model

```python
class Variant(BaseModel):
    id: int                     # Variant ID
    pack_size_g: int           # Package size in grams
    price_inr: float           # Price in INR
    mrp_inr: float             # MRP in INR
    sku: str                   # Stock keeping unit
    inventory_qty: int         # Available quantity
```

## Integration Points

### Payment Integration (Razorpay)
- **Status**: Configured but webhooks incomplete
- **Frontend**: Razorpay checkout integration
- **Backend**: Webhook handlers for payment verification
- **TODO**: Complete webhook signature verification

### Shipping Integration (Shiprocket)
- **Status**: API calls stubbed
- **Purpose**: Automated shipping and tracking
- **TODO**: Implement actual API calls

### AI Chatbot (OpenAI)
- **Status**: Active
- **Integration**: OpenAI GPT for customer support
- **Frontend**: Floating chat widget
- **Backend**: Chat API with context management

### Notifications (WhatsApp)
- **Status**: Planned
- **Purpose**: Order updates and customer communication
- **TODO**: WhatsApp Business API integration

## Testing and Quality

### Current Status
- **Testing Framework**: None configured
- **Linting**: ESLint for frontend (with warnings)
- **Type Checking**: TypeScript strict mode
- **Code Quality**: Some ESLint errors need fixing

### ESLint Issues (Current)
- React unescaped entities in multiple files
- Image optimization warnings (using `<img>` instead of Next.js `<Image>`)

## Security Considerations

### Authentication
- **Frontend**: Clerk-managed authentication
- **Backend**: Admin API key authentication only
- **Issue**: Backend user authentication disabled during migration

### API Security
- CORS enabled for all origins (development setting)
- Admin endpoints protected by API key
- Rate limiting not implemented

### Data Security
- MongoDB Atlas with authentication
- Environment variables for sensitive config
- HTTPS in production (assumed)

## Performance Considerations

### Frontend
- Next.js App Router with React 19
- Image optimization warnings (need to use Next.js Image component)
- Client-side state management with localStorage

### Backend
- Async/await patterns throughout
- MongoDB with proper indexing
- Redis caching layer available but not heavily utilized

### Database
- MongoDB Atlas with geographic distribution
- Beanie ODM for object-document mapping
- Proper indexing on frequently queried fields

## Known Issues and TODOs

### Critical Issues
1. **Database Migration**: Many features disabled during PostgreSQL to MongoDB migration
2. **Authentication**: Backend user auth system needs MongoDB implementation
3. **Payment Flow**: Razorpay webhook verification incomplete
4. **Testing**: No test framework configured

### Code Quality Issues
1. **Frontend Linting**: 24 ESLint errors (mostly unescaped entities)
2. **Image Optimization**: Using `<img>` instead of Next.js `<Image>`
3. **Error Handling**: Limited error boundaries and handling

### Specific TODOs in Code

#### Backend TODOs
```python
# apps/backend/app/services/shipping.py
async def create_shipment(order_id: int, payload: dict):
    # TODO: integrate actual Shiprocket API
    return {"tracking_id": "SR123"}  # Currently stubbed

# apps/backend/app/routers/auth.py
# TODO: integrate MSG91/Twilio to send SMS/WhatsApp

# apps/backend/app/routers/ai.py
# TODO: plug LLM provider (OpenAI integration is working)
```

#### Frontend Integration Points
- **Razorpay**: Checkout integration active, webhook verification incomplete
- **Shipping**: Shiprocket API calls stubbed with mock responses
- **Authentication**: Clerk working for frontend, backend auth disabled

### Feature TODOs
1. **Shiprocket Integration**: Replace stubbed API calls with real shipping API
2. **WhatsApp Notifications**: Implement WhatsApp Business API for order updates
3. **Order Management**: Complete order lifecycle (currently disabled)
4. **Admin Dashboard**: Product and order management interface
5. **User Profiles**: Complete user management system
6. **Payment Webhooks**: Complete Razorpay webhook signature verification

## Development Roadmap

### Phase 1: Complete Migration
- [ ] Implement MongoDB-based user authentication
- [ ] Complete payment webhook verification
- [ ] Enable disabled routers (orders, payments, addresses)
- [ ] Test end-to-end purchase flow

### Phase 2: Core Features
- [ ] Implement proper order management
- [ ] Complete Shiprocket integration
- [ ] Add WhatsApp notifications
- [ ] Build admin dashboard

### Phase 3: Quality & Scale
- [ ] Add comprehensive testing
- [ ] Fix ESLint issues
- [ ] Implement proper error handling
- [ ] Add monitoring and logging
- [ ] Performance optimization

## Getting Started

For new developers joining the project:

1. **Read the migration status** in `CLAUDE.md`
2. **Set up MongoDB Atlas** using `MONGODB_ATLAS_SETUP.md`
3. **Copy environment files** and configure keys
4. **Use Docker development** with `make up` and `make seed`
5. **Focus on active components** (mongo_products, AI, webhooks)
6. **Avoid disabled routers** until migration completion

## Support Documentation

- `README.md`: Quick start guide
- `CLAUDE.md`: AI assistant guidance and architecture details
- `MONGODB_ATLAS_SETUP.md`: Database setup instructions
- `tea_store_frontend_backend_scaffold_v_1.md`: Original project scaffold

This codebase represents a sophisticated e-commerce platform in active development, with a clear focus on herbal wellness products and modern web technologies.