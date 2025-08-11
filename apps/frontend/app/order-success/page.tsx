'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCart, getTotals, clearCart, CartItem } from '@/lib/cart';

export default function OrderSuccess() {
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    amount: 0,
    items: [] as CartItem[]
  });

  useEffect(() => {
    // Get actual cart items that were purchased
    const cartItems = getCart();
    const totals = getTotals(cartItems);
    
    // Generate a unique order ID
    const orderId = `ORD${Date.now()}`;
    
    setOrderDetails({
      orderId,
      amount: totals.total,
      items: cartItems
    });

    // Clear cart after successful order - standard e-commerce behavior
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-tea-cream to-green-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍃</span>
            <span className="text-xl font-bold text-tea-forest">Inner Veda</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-tea-forest mb-4">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600">Thank you for choosing Inner Veda. Your wellness journey begins now!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Details */}
            <div>
              <h2 className="text-2xl font-bold text-tea-forest mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Order ID:</span>
                  <span className="text-tea-forest font-mono">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Order Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment Status:</span>
                  <span className="text-green-600 font-semibold">✓ Confirmed</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Delivery Status:</span>
                  <span className="text-blue-600 font-semibold">📦 Processing</span>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            <div>
              <h2 className="text-2xl font-bold text-tea-forest mb-4">Items Ordered</h2>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600">Qty: {item.qty}</span>
                        <span className="font-semibold text-tea-forest">₹{item.priceInr * item.qty}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-lg font-bold text-tea-forest">₹{orderDetails.amount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gradient-to-r from-tea-forest to-green-800 rounded-2xl p-8 text-white text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-3xl">📧</div>
              <h3 className="font-semibold">Confirmation Email</h3>
              <p className="text-tea-cream text-sm">You'll receive an order confirmation email within 5 minutes</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">📦</div>
              <h3 className="font-semibold">Processing</h3>
              <p className="text-tea-cream text-sm">Your order will be processed and shipped within 1-2 business days</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🚚</div>
              <h3 className="font-semibold">Delivery</h3>
              <p className="text-tea-cream text-sm">Expected delivery in 3-5 business days</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-tea-forest mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">If you have any questions about your order, feel free to contact us:</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">📧</span>
              <span>innervedacare@gmail.com</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">📱</span>
              <span>9113920980</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">📷</span>
              <span>@innerveda.in</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link 
            href="/products" 
            className="bg-tea-forest text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors text-center"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/" 
            className="border-2 border-tea-forest text-tea-forest px-8 py-3 rounded-lg font-semibold hover:bg-tea-forest hover:text-white transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
