import { NextResponse } from 'next/server'

// Mock product database removed - now using MongoDB backend
export async function GET(_: Request, ctx: { params: { slug: string }}){
  return NextResponse.json({ 
    message: "This mock API is deprecated. Use MongoDB backend for product details.",
    redirect: `http://localhost:8000/api/products/${ctx.params.slug}`,
    slug: ctx.params.slug
  }, { status: 410 })
}

