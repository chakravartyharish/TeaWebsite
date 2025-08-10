'use client'
import { useEffect, useState } from 'react'
import { CartItem, getCart, updateQty, removeItem, getTotals } from '@/lib/cart'

export default function CartPage(){
  const [items, setItems] = useState<CartItem[]>([])
  useEffect(()=>{ setItems(getCart()) }, [])

  function changeQty(id: number, qty: number){ updateQty(id, qty); setItems(getCart()) }
  function remove(id: number){ removeItem(id); setItems(getCart()) }

  const totals = getTotals(items)

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-heading text-3xl mb-6">Cart</h1>
      {items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {items.map(it => (
            <div key={it.variantId} className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-600">₹{it.priceInr}</div>
              </div>
              <div className="flex items-center gap-3">
                <input aria-label={`Quantity for ${it.name}`} type="number" min={1} value={it.qty} onChange={e=>changeQty(it.variantId, Math.max(1, parseInt(e.target.value||'1')))} className="w-20 border rounded-lg px-2 py-1"/>
                <button onClick={()=>remove(it.variantId)} className="text-red-600">Remove</button>
              </div>
            </div>
          ))}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{totals.subtotal}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>₹{totals.shipping}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>₹{totals.tax}</span></div>
            <div className="flex justify-between font-semibold mt-2"><span>Total</span><span>₹{totals.total}</span></div>
            <a href="/checkout" className="inline-block mt-4 bg-tea-forest text-white rounded-lg px-4 py-2">Proceed to Checkout</a>
          </div>
        </div>
      )}
    </div>
  )
}


