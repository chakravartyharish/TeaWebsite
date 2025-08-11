import { Suspense } from "react";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  name: string;
  hero_image: string;
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_USE_MOCK === '1' ? '' : (process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000");
    const useMock = process.env.NEXT_PUBLIC_USE_MOCK === '1' || process.env.NEXT_PUBLIC_USE_MOCK === 'true';
    const isServer = typeof window === 'undefined';
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    // Always use MongoDB API - no more mock mode
    const url = `${API_BASE}/api/products`;
    
    const response = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Ensure we return plain serializable objects
    return Array.isArray(data) ? data.map(product => ({
      id: Number(product.id),
      slug: String(product.slug),
      name: String(product.name),
      hero_image: String(product.hero_image)
    })) : [];
    
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <a key={product.id} href={`/product/${product.slug}`} className="border bg-white rounded-xl overflow-hidden hover:shadow-md transition">
          <img src={product.hero_image} alt={product.name} className="aspect-square object-cover"/>
          <div className="p-4">
            <h3 className="font-heading text-xl">{product.name}</h3>
          </div>
        </a>
      ))}
    </section>
  );
}

function LoadingProducts() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="border bg-gray-100 rounded-xl overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-200"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default async function Home(){
  const products = await fetchProducts();

  return (
    <div className="space-y-12">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-tea-forest via-emerald-800 to-tea-forest text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative p-10 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-emerald-300">🍃</span>
                <span className="text-sm font-medium">INNER VEDA</span>
              </div>
              <h1 className="font-heading text-4xl lg:text-6xl font-bold">
                Sacred Herb Elixirs
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Ancient Ayurvedic wisdom meets modern convenience. Transform your daily ritual with our premium tea blends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/products"
                  className="bg-white text-tea-forest px-8 py-4 rounded-2xl font-semibold hover:bg-tea-cream transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                >
                  Shop Now
                </Link>
                <Link 
                  href="/showcase"
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-tea-forest transition-all duration-300 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-6xl">🍵</span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                {[1, 2, 3, 4].map((dot) => (
                  <div key={dot} className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: `${dot * 0.2}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section>
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-2">Our Tea Collection</h2>
          <p className="text-gray-600">Brewed with care. Sourced ethically.</p>
        </div>
        <Suspense fallback={<LoadingProducts />}>
          <ProductGrid products={products} />
        </Suspense>
      </section>
    </div>
  )
}


