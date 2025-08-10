const useMock = (process.env.NEXT_PUBLIC_USE_MOCK === '1' || process.env.NEXT_PUBLIC_USE_MOCK === 'true');
const isServer = typeof window === 'undefined'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const API_BASE = useMock ? '' : (process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000");

function toUrl(path: string) {
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


