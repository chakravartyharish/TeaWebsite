'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function LogoutPage() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          window.location.href = '/'
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-tea-cream to-green-100 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-tea-forest to-green-600 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-lg">
            <span className="text-white text-4xl">✓</span>
          </div>
          
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-tea-forest/10 rounded-full px-4 py-2">
              <span className="text-lg">🍃</span>
              <span className="text-sm font-medium text-tea-forest">SIGNED OUT</span>
            </div>
            
            <h1 className="text-3xl font-bold text-tea-forest">
              You've been signed out
            </h1>
            
            <p className="text-gray-600 leading-relaxed">
              Thank you for visiting Inner Veda. Your wellness journey continues whenever you're ready.
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-tea-forest/10 mb-8">
          <p className="text-gray-600 mb-4">
            Redirecting to homepage in
          </p>
          <div className="text-4xl font-bold text-tea-forest mb-4">
            {countdown}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-tea-forest to-green-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/" 
            className="block w-full bg-tea-forest text-white px-8 py-4 rounded-full font-semibold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Return to Homepage
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              href="/products" 
              className="flex-1 border-2 border-tea-forest text-tea-forest px-6 py-3 rounded-full font-medium hover:bg-tea-forest hover:text-white transition-all duration-300"
            >
              Shop Products
            </Link>
            <Link 
              href="/sign-in" 
              className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300"
            >
              Sign In Again
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-tea-forest/20">
          <p className="text-sm text-gray-600 mb-4">
            Questions? We're here to help
          </p>
          <div className="flex justify-center space-x-6 text-sm text-tea-forest">
            <a href="mailto:innervedacare@gmail.com" className="flex items-center space-x-1 hover:text-green-800">
              <span>📧</span>
              <span>Email</span>
            </a>
            <a href="tel:9113920980" className="flex items-center space-x-1 hover:text-green-800">
              <span>📱</span>
              <span>Call</span>
            </a>
            <a href="https://instagram.com/innerveda.in" className="flex items-center space-x-1 hover:text-green-800">
              <span>📷</span>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}