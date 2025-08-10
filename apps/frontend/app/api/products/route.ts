import { NextResponse } from 'next/server'

export async function GET(){
  return NextResponse.json([
    { id: 1, slug: 'darjeeling-first-flush', name: 'Darjeeling First Flush', hero_image: 'https://picsum.photos/seed/tea1/800' },
    { id: 2, slug: 'assam-ctc-strong', name: 'Assam CTC Strong', hero_image: 'https://picsum.photos/seed/tea2/800' },
  ])
}

