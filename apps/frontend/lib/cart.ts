export type CartItem = {
  variantId: number
  qty: number
  name: string
  priceInr: number
  packSizeG?: number
  productSlug?: string
}

const CART_KEY = 'tea_cart_v1'

function read(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CART_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

function write(items: CartItem[]): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function getCart(): CartItem[] {
  return read()
}

export function clearCart(): void {
  write([])
}

export function addItem(item: CartItem): void {
  const items = read()
  const idx = items.findIndex(i => i.variantId === item.variantId)
  if (idx >= 0) {
    items[idx].qty += item.qty
  } else {
    items.push(item)
  }
  write(items)
}

export function updateQty(variantId: number, qty: number): void {
  const items = read().map(i => (i.variantId === variantId ? { ...i, qty } : i))
  write(items.filter(i => i.qty > 0))
}

export function removeItem(variantId: number): void {
  write(read().filter(i => i.variantId !== variantId))
}

export function getTotals(items: CartItem[]): { subtotal: number; shipping: number; tax: number; total: number } {
  const subtotal = items.reduce((s, i) => s + i.priceInr * i.qty, 0)
  const shipping = subtotal >= 499 ? 0 : 49
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax
  return { subtotal, shipping, tax, total }
}


