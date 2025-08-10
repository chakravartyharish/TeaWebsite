import { NextResponse } from 'next/server'

export async function POST(req: Request){
  const data = await req.json()
  // pretend saved and return a fake id
  return NextResponse.json({ id: 101 })
}

