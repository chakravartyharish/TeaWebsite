import { NextResponse } from 'next/server'

export async function POST(){
  // Return a minimal object that matches Razorpay order fields used by the UI
  return NextResponse.json({ id: 'order_mock_123', amount: 49900, currency: 'INR' })
}

