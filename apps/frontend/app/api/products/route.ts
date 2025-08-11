import { NextResponse } from 'next/server'

// This mock API route is no longer needed - using MongoDB backend
export async function GET(){
  return NextResponse.json({ 
    message: "This mock API is deprecated. Use MongoDB backend at /api/products/",
    redirect: "http://localhost:8000/api/products/"
  }, { status: 410 })
}

