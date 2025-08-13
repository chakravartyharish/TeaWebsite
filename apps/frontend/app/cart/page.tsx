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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-1 h-8 bg-red-600"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Your Cart</h1>
          </div>
          <p className="text-gray-400 text-lg">Review and manage your selected items</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700">
                <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">0</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto">Start adding some premium tea products to your cart and enjoy our wellness collection</p>
            <Link 
              href="/products" 
              className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-600/25"
            >
              <span>Browse Products</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  {items.length} {items.length === 1 ? 'Item' : 'Items'}
                </h2>
                <div className="text-gray-400">
                  Subtotal: <span className="text-white font-semibold">₹{totals.subtotal}</span>
                </div>
              </div>

              {items.map((it, index) => (
                <div key={it.variantId} 
                     className="group bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/10"
                     style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-lg flex items-center justify-center flex-shrink-0 border border-red-800/50">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{it.qty}</span>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-lg group-hover:text-red-400 transition-colors">{it.name}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-2xl font-bold text-red-400">₹{it.priceInr}</span>
                        <span className="text-gray-400">per item</span>
                      </div>
                      <div className="text-gray-300 mt-1">
                        Total: <span className="font-semibold text-white">₹{it.priceInr * it.qty}</span>
                      </div>
                    </div>

                    {/* Quantity & Remove Controls */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-gray-800 rounded-lg border border-gray-600 overflow-hidden">
                        <button 
                          onClick={() => changeQty(it.variantId, Math.max(1, it.qty - 1))}
                          className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <input 
                          aria-label={`Quantity for ${it.name}`} 
                          type="number" 
                          min={1} 
                          value={it.qty} 
                          onChange={e=>changeQty(it.variantId, Math.max(1, parseInt(e.target.value||'1')))} 
                          className="w-16 px-2 py-2 text-center bg-transparent text-white border-0 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                        <button 
                          onClick={() => changeQty(it.variantId, it.qty + 1)}
                          className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                      
                      <button 
                        onClick={()=>remove(it.variantId)} 
                        className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200 group"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 sticky top-8 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-1 h-6 bg-red-600"></div>
                  <h2 className="text-xl font-semibold text-white">Order Summary</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium">₹{totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className={`font-medium ${totals.shipping === 0 ? 'text-green-400' : ''}`}>
                      {totals.shipping === 0 ? 'Free' : `₹${totals.shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span className="font-medium">₹{totals.tax}</span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between text-2xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-red-400">₹{totals.total}</span>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <Link 
                      href="/checkout" 
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/50 flex items-center justify-center space-x-3"
                    >
                      <span>Proceed to Checkout</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link 
                      href="/products" 
                      className="w-full border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 py-3 rounded-lg font-medium text-center transition-all duration-300 block hover:border-gray-500"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-6 border-t border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-2 p-2 rounded bg-gray-800/50">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded bg-gray-800/50">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Fast Delivery</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded bg-gray-800/50">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <span>Premium Quality</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded bg-gray-800/50">
                        <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
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


