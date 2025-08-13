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

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Get actual cart items that were purchased
    const cartItems = getCart();
    const totals = getTotals(cartItems);
    
    // Generate a unique order ID
    const orderId = `ORD${Date.now().toString().slice(-8)}`;
    
    setOrderDetails({
      orderId,
      amount: totals.total,
      items: cartItems
    });

    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    // Clear cart after successful order - standard e-commerce behavior
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header with Animation */}
        <div className="text-center mb-16">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-2xl transform animate-pulse">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-5xl text-white animate-bounce">✓</span>
              </div>
            </div>
            {/* Ripple Effects */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-red-500/30 rounded-full animate-ping"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 border-2 border-red-500/20 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-500/30 rounded-full px-6 py-2 mb-4 backdrop-blur-sm">
              <span className="text-2xl">🎉</span>
              <span className="text-sm font-bold text-red-400 uppercase tracking-wide">ORDER CONFIRMED</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6">
              Success!
            </h1>
            
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-200 mb-4">
              Your Wellness Journey Begins Now
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Thank you for choosing Inner Veda. Your premium A-ZEN tea blend is on its way to transform your daily wellness routine.
            </p>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 p-8 lg:p-12 mb-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Order Details */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">📋</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Order Details</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-700/50 rounded-2xl p-6 border border-gray-600/30">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-400">Order ID</span>
                      <p className="text-xl font-bold text-red-400 font-mono">#{orderDetails.orderId}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-400">Order Date</span>
                      <p className="text-lg font-semibold text-gray-200">{new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-900/30 rounded-xl border border-green-700/50">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <span className="font-semibold text-gray-200">Payment Status</span>
                        <p className="text-sm text-green-400">Successfully processed</p>
                      </div>
                    </div>
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">CONFIRMED</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-900/30 rounded-xl border border-blue-700/50">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📦</span>
                      <div>
                        <span className="font-semibold text-gray-200">Delivery Status</span>
                        <p className="text-sm text-blue-400">Order being prepared</p>
                      </div>
                    </div>
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">PROCESSING</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🛍️</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Items Ordered</h2>
              </div>

              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-2xl p-6 border border-gray-600/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-2xl">🍃</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-100 mb-1">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 bg-gray-700 px-3 py-1 rounded-full text-sm">Qty: {item.qty}</span>
                          <span className="text-2xl font-bold text-red-400">₹{item.priceInr * item.qty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 rounded-2xl p-6 border-2 border-red-600/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">💰</span>
                      <span className="text-xl font-bold text-gray-200">Total Amount</span>
                    </div>
                    <span className="text-3xl font-bold text-red-400">₹{orderDetails.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next Timeline */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-3xl p-8 lg:p-12 text-white mb-12 shadow-2xl border border-gray-700/50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Happens Next?</h2>
            <p className="text-gray-300 text-lg">Your order journey from confirmation to delivery</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-red-500/30">
                <span className="text-4xl">📧</span>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/30">
                <h3 className="text-xl font-bold mb-2">Confirmation Email</h3>
                <p className="text-gray-300">You'll receive a detailed order confirmation within the next 5 minutes</p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-red-400">In Progress</span>
                </div>
              </div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-red-500/30">
                <span className="text-4xl">⚡</span>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/30">
                <h3 className="text-xl font-bold mb-2">Order Processing</h3>
                <p className="text-gray-300">Your A-ZEN blend will be carefully prepared and packaged within 1-2 business days</p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm font-medium text-yellow-400">Next Step</span>
                </div>
              </div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-red-500/30">
                <span className="text-4xl">🚚</span>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/30">
                <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                <p className="text-gray-300">Your wellness package will arrive at your doorstep within 3-5 business days</p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-400">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 p-8 lg:p-12 mb-12">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">We're Here to Help</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Have questions about your order or need assistance? Our wellness team is ready to support your journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <a href="mailto:innervedacare@gmail.com" className="group bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-600/30">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-xl">📧</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-100">Email Support</h3>
                  <p className="text-gray-400 text-sm">innervedacare@gmail.com</p>
                </div>
              </div>
            </a>

            <a href="tel:9113920980" className="group bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-600/30">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-xl">📱</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-100">Phone Support</h3>
                  <p className="text-gray-400 text-sm">9113920980</p>
                </div>
              </div>
            </a>

            <a href="https://instagram.com/innerveda.in" className="group bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-600/30">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white text-xl">📷</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-100">Follow Us</h3>
                  <p className="text-gray-400 text-sm">@innerveda.in</p>
                </div>
              </div>
            </a>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-300">
              <span className="font-semibold">Contact Person:</span> Sonam Garg | 
              <span className="text-red-400 font-medium"> Available Mon-Sat, 9 AM - 7 PM</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            href="/products" 
            className="group bg-red-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center flex items-center justify-center space-x-2"
          >
            <span>Continue Shopping</span>
            <span className="group-hover:translate-x-1 transition-transform">🛍️</span>
          </Link>
          <Link 
            href="/" 
            className="group border-3 border-gray-600 text-gray-300 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-700 hover:text-white transition-all duration-300 text-center flex items-center justify-center space-x-2"
          >
            <span className="group-hover:-translate-x-1 transition-transform">🏠</span>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Gratitude Message */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 bg-gray-800/60 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-gray-700/50">
            <span className="text-2xl">🙏</span>
            <span className="text-lg font-medium text-gray-200">Thank you for choosing Inner Veda</span>
            <span className="text-2xl">🍃</span>
          </div>
        </div>
      </div>
    </div>
  );
}
