import { Suspense } from "react";
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  name: string;
  hero_image: string;
  price?: number;
  description?: string;
  benefits?: string[];
  category?: string;
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_USE_MOCK === '1' ? '' : (process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000");
    const useMock = process.env.NEXT_PUBLIC_USE_MOCK === '1' || process.env.NEXT_PUBLIC_USE_MOCK === 'true';
    const isServer = typeof window === 'undefined';
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    const url = useMock 
      ? (isServer ? `${SITE_URL}/api/products` : `/api/products`)
      : `${API_BASE}/products`;
    
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
    
    return Array.isArray(data) ? data.map(product => ({
      id: Number(product.id),
      slug: String(product.slug),
      name: String(product.name),
      hero_image: String(product.hero_image),
      price: product.price ? Number(product.price) : 249,
      description: String(product.description || "Hand crafted with 5 sacred herbs. Ancient wisdom for modern mind."),
      benefits: product.benefits || ["Calm & Focused Mind", "Radiant Skin", "Pure & Safe", "Plant Based"],
      category: String(product.category || "Sacred Herb Elixir")
    })) : [];
    
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return mock data for A-ZEN if API fails
    return [
      {
        id: 1,
        slug: "a-zen",
        name: "A-ZEN",
        hero_image: "/images/a-zen-product.jpg",
        price: 249,
        description: "Hand crafted with 5 sacred herbs. Ancient wisdom for modern mind. Just add hot milk/water.",
        benefits: ["Calm & Focused Mind", "Radiant Skin", "Pure & Safe", "Plant Based"],
        category: "Instant Tea/Latte Mix"
      }
    ];
  }
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-tea-forest via-emerald-800 to-tea-forest text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <span className="text-emerald-300">🍃</span>
            <span className="text-sm font-medium">INNER VEDA</span>
          </div>
          <h1 className="font-heading text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Sacred Herb Elixirs
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ancient Ayurvedic wisdom meets modern convenience. Transform your daily ritual with our premium tea blends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-emerald-200">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm">16 CUPS PER PACK</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-200">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm">PURE & SAFE</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-200">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm">PLANT BASED</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          BESTSELLER
        </span>
      </div>
      
      <div className="aspect-square bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-48 h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <span className="text-4xl">🍵</span>
          </div>
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          {[1, 2, 3, 4].map((dot) => (
            <div key={dot} className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: `${dot * 0.2}s` }}></div>
          ))}
        </div>
      </div>
      
      <div className="p-8">
        <div className="mb-4">
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="font-heading text-3xl font-bold text-gray-900 mt-1">
            {product.name}
          </h3>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {product.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-bold text-gray-900">
            ₹{product.price}
            <span className="text-lg text-gray-500 font-normal">/pack</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">16 cups</div>
            <div className="text-xs text-emerald-600">₹{Math.round((product.price || 249) / 16)}/cup</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Link 
            href="/products"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 block text-center"
          >
            Order Now - ₹{product.price}
          </Link>
          <Link 
            href={`/product/${product.slug}`}
            className="w-full border-2 border-emerald-600 text-emerald-600 py-4 px-6 rounded-2xl font-semibold hover:bg-emerald-50 transition-all duration-300 block text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: "🧘‍♂️",
      title: "Calm & Focused Mind",
      description: "Ancient herbs work synergistically to promote mental clarity and reduce stress naturally."
    },
    {
      icon: "✨",
      title: "Radiant Skin",
      description: "Antioxidant-rich ingredients support healthy, glowing skin from within."
    },
    {
      icon: "🌿",
      title: "Pure & Safe",
      description: "Carefully sourced, tested ingredients with no artificial additives or preservatives."
    },
    {
      icon: "🌱",
      title: "Plant Based",
      description: "100% natural, vegan-friendly formulation respecting traditional Ayurvedic principles."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Our Sacred Elixirs?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of ancient wisdom and modern convenience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Wellness Enthusiast",
      content: "A-ZEN has transformed my morning routine. The perfect blend of taste and wellness benefits!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Busy Professional",
      content: "Finally, a healthy alternative that actually tastes amazing. My stress levels have noticeably decreased.",
      rating: 5
    },
    {
      name: "Anita Patel",
      role: "Yoga Instructor",
      content: "I recommend A-ZEN to all my students. It's the perfect complement to a mindful lifestyle.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-600">
            Join our community of wellness enthusiasts
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-3xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Premium Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted range of sacred herb elixirs, each designed to enhance your well-being
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LoadingProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-100 rounded-3xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-8">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-6"></div>
                <div className="h-12 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function ShowcasePage() {
  const products = await fetchProducts();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <Suspense fallback={<LoadingProducts />}>
        <ProductsGrid products={products} />
      </Suspense>
      <TestimonialsSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-tea-forest to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Wellness Journey?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands who have discovered the power of ancient Ayurvedic wisdom in modern convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-white text-tea-forest py-4 px-8 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop All Products
            </Link>
            <Link 
              href="/"
              className="border-2 border-white text-white py-4 px-8 rounded-2xl font-bold hover:bg-white hover:text-tea-forest transition-all duration-300"
            >
              Explore More Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
