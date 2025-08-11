'use client'
import { useEffect, useState } from 'react'
import { CartItem, getCart, updateQty, removeItem, getTotals } from '@/lib/cart'
import Link from 'next/link'

export default function CartPage(){
  const [items, setItems] = useState<CartItem[]>([])
  useEffect(()=>{ setItems(getCart()) }, [])

  function changeQty(id: number, qty: number){ updateQty(id, qty); setItems(getCart()) }
  function remove(id: number){ removeItem(id); setItems(getCart()) }

  const totals = getTotals(items)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-tea-cream to-green-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-tea-forest/10 rounded-full px-4 py-2 mb-4">
            <span className="text-2xl">🛒</span>
            <span className="text-sm font-medium text-tea-forest">SHOPPING CART</span>
          </div>
          <h1 className="text-4xl font-bold text-tea-forest mb-2">Your Tea Collection</h1>
          <p className="text-gray-600">Review your selected wellness products</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-tea-forest/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🍃</span>
            </div>
            <h2 className="text-2xl font-semibold text-tea-forest mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Discover our premium tea collection and start your wellness journey</p>
            <Link href="/products" className="bg-tea-forest text-white px-8 py-4 rounded-full font-semibold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(it => (
                <div key={it.variantId} className="bg-white rounded-2xl p-6 shadow-sm border border-tea-forest/10 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    {/* Product Image Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-tea-forest to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">🍃</span>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-tea-forest text-lg">{it.name}</h3>
                      <p className="text-green-600 font-medium">₹{it.priceInr}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          onClick={() => changeQty(it.variantId, Math.max(1, it.qty - 1))}
                          className="px-3 py-2 text-gray-600 hover:text-tea-forest transition-colors"
                        >
                          −
                        </button>
                        <input 
                          aria-label={`Quantity for ${it.name}`} 
                          type="number" 
                          min={1} 
                          value={it.qty} 
                          onChange={e=>changeQty(it.variantId, Math.max(1, parseInt(e.target.value||'1')))} 
                          className="w-16 px-2 py-2 text-center border-0 focus:outline-none"
                        />
                        <button 
                          onClick={() => changeQty(it.variantId, it.qty + 1)}
                          className="px-3 py-2 text-gray-600 hover:text-tea-forest transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={()=>remove(it.variantId)} 
                        className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-tea-forest/10 sticky top-24">
                <h2 className="text-xl font-semibold text-tea-forest mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                    <span>₹{totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{totals.shipping === 0 ? 'Free' : `₹${totals.shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹{totals.tax}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-semibold text-tea-forest">
                      <span>Total</span>
                      <span>₹{totals.total}</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Link 
                      href="/checkout" 
                      className="w-full bg-tea-forest text-white py-4 rounded-full font-semibold text-center hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Checkout</span>
                      <span>→</span>
                    </Link>
                    <Link 
                      href="/products" 
                      className="w-full border-2 border-tea-forest text-tea-forest py-3 rounded-full font-medium text-center hover:bg-tea-forest hover:text-white transition-all duration-300 block"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-6 border-t">
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <span>🔒</span>
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>🚚</span>
                        <span>Fast Delivery</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>🌿</span>
                        <span>Pure & Natural</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>↩️</span>
                        <span>Easy Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


