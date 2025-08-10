import { NextResponse } from 'next/server'

export async function POST(req: Request){
  const _ = await req.json()
  return NextResponse.json({ reply: 'Hi! Tell me how you like your tea—floral, bold, or herbal?' })
}

