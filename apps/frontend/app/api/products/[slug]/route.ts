import { NextResponse } from 'next/server'

const db: Record<string, any> = {
  'darjeeling-first-flush': {
    id: 1,
    slug: 'darjeeling-first-flush',
    name: 'Darjeeling First Flush',
    story: 'Spring pluck, floral',
    ingredients: 'Camellia sinensis',
    benefits: 'Light, uplifting',
    brew_temp_c: 85,
    brew_time_min: 3,
    hero_image: 'https://picsum.photos/seed/tea1/800',
    variants: [
      { id: 11, pack_size_g: 50, price_inr: 399, mrp_inr: 449, sku: 'DJ-FF-50', inventory_qty: 100 },
      { id: 12, pack_size_g: 100, price_inr: 699, mrp_inr: 799, sku: 'DJ-FF-100', inventory_qty: 80 }
    ]
  },
  'assam-ctc-strong': {
    id: 2,
    slug: 'assam-ctc-strong',
    name: 'Assam CTC Strong',
    story: 'Bold and brisk',
    ingredients: 'Camellia sinensis',
    benefits: 'Strong, energizing',
    brew_temp_c: 95,
    brew_time_min: 4,
    hero_image: 'https://picsum.photos/seed/tea2/800',
    variants: [
      { id: 21, pack_size_g: 250, price_inr: 299, mrp_inr: 349, sku: 'AS-CTC-250', inventory_qty: 200 }
    ]
  }
}

export async function GET(_: Request, ctx: { params: { slug: string }}){
  const p = db[ctx.params.slug]
  if(!p) return NextResponse.json({ detail: 'not found' }, { status: 404 })
  return NextResponse.json(p)
}

