const useMock = (process.env.NEXT_PUBLIC_USE_MOCK === '1' || process.env.NEXT_PUBLIC_USE_MOCK === 'true');
const isServer = typeof window === 'undefined'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const API_BASE = useMock ? '' : (process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000");

function toUrl(path: string) {
  // Special handling for AI chat - always use frontend API route
  if (path.startsWith('/ai/chat')) {
    return isServer ? `${SITE_URL}/api${path}` : `/api${path}`
  }
  
  if (useMock) {
    return isServer ? `${SITE_URL}/api${path}` : `/api${path}`
  }
  return `${API_BASE}${path}`
}

export async function apiGet<T>(path: string): Promise<T> {
  const r = await fetch(toUrl(path), { cache: 'no-store' });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
export async function apiPost<T>(path: string, body: any): Promise<T> {
  const r = await fetch(toUrl(path), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)});
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

// Product-specific API functions
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image: string;
  category: string;
  benefits: string[];
  in_stock: boolean;
  rating: number;
  reviews: number;
  slug: string;
  story?: string;
  ingredients?: string;
  brew_temp_c?: number;
  brew_time_min?: number;
  hero_image?: string;
  variants?: any[];
}

export async function getProducts(params?: {
  category?: string;
  in_stock?: boolean;
  limit?: number;
  skip?: number;
}): Promise<Product[]> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set('category', params.category);
  if (params?.in_stock !== undefined) searchParams.set('in_stock', params.in_stock.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.skip) searchParams.set('skip', params.skip.toString());
  
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiGet<Product[]>(`/api/products/${query}`);
}

export async function getProduct(id: string): Promise<Product> {
  return apiGet<Product>(`/api/products/${id}`);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return apiGet<Product[]>(`/api/products/category/${category}`);
}


