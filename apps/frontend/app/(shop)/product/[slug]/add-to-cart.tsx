'use client'
import { useState } from 'react'
import { addItem } from '@/lib/cart'

export default function AddToCart({ product }: { product: any }){
  const [variantId, setVariantId] = useState<number>(product?.variants?.[0]?.id)
  const selected = product?.variants?.find((v: any) => v.id === variantId)

  function add(){
    if(!selected) return
    addItem({
      variantId: selected.id,
      qty: 1,
      name: `${product.name} ${selected.pack_size_g}g`,
      priceInr: selected.price_inr,
      packSizeG: selected.pack_size_g,
      productSlug: product.slug,
    })
    alert('Added to cart')
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="flex gap-3">
        <select aria-label="Choose pack size" value={variantId} onChange={e=>setVariantId(parseInt(e.target.value))} className="border rounded-lg px-3 py-2">
          {product.variants?.map((v: any)=> (
            <option key={v.id} value={v.id}>{v.pack_size_g}g — ₹{v.price_inr}</option>
          ))}
        </select>
        <button onClick={add} className="bg-tea-forest text-white rounded-lg px-4 py-2">Add to cart</button>
      </div>
    </div>
  )
}


