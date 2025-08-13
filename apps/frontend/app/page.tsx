'use client'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      title: "Welcome to Your Wellness Journey",
      subtitle: "Discover the transformative power of A-ZEN herbal blend",
      bgGradient: "from-emerald-900 via-teal-800 to-green-900",
    },
    {
      title: "Ancient Wisdom for Modern Living",
      subtitle: "Hand-crafted with 5 sacred herbs for inner peace and radiant health",
      bgGradient: "from-green-900 via-emerald-800 to-teal-900",
    },
    {
      title: "Your Calm Ritual Awaits",
      subtitle: "Join thousands discovering the path to tranquility",
      bgGradient: "from-teal-900 via-green-800 to-emerald-900",
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  // Redirect authenticated users to products page
  useEffect(() => {
    if (isLoaded && user) {
      router.push('/products')
    }
  }, [user, isLoaded, router])

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
        <span className="text-white text-2xl">🍃</span>
      </div>
    </div>
  }

  // If user is authenticated, show loading while redirecting
  if (user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <span className="text-white text-2xl">🍃</span>
          </div>
          <p className="text-white text-lg">Welcome back! Redirecting to your products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix-style Hero Section */}
      <div className="relative">
        {/* Background with animated gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgGradient} transition-all duration-1000`}>
          {/* Animated tea leaves pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse text-4xl text-green-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                🍃
              </div>
            ))}
          </div>
        </div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>

        {/* Content Grid */}
        <div className="relative min-h-screen grid lg:grid-cols-2">
          {/* Left Side - Hero Content */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="max-w-lg text-center lg:text-left">
              {/* Brand Logo */}
              <div className="mb-8">
                <div className="inline-flex items-center space-x-3 group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <span className="text-white text-2xl animate-pulse">🍃</span>
                  </div>
                  <div className="text-left">
                    <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                      INNER VEDA
                    </h1>
                    <p className="text-sm text-gray-400 font-medium">Ancient wisdom for modern living</p>
                  </div>
                </div>
              </div>

              {/* Hero Text */}
              <div className="space-y-6 mb-8">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  {heroSlides[currentSlide].title}
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "🧘", text: "Mental Clarity" },
                  { icon: "✨", text: "Radiant Skin" },
                  { icon: "🌿", text: "Natural Herbs" }
                ].map((feature, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <div className="text-sm font-medium">{feature.text}</div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: "🎯", text: "Premium A-ZEN herbal blends" },
                  { icon: "📚", text: "Exclusive wellness guides" },
                  { icon: "🚚", text: "Fast, secure delivery" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-lg">{benefit.icon}</div>
                    <div className="text-gray-300 text-sm">{benefit.text}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  New to Inner Veda? 
                  <Link href="/sign-up" className="text-green-400 hover:text-green-300 ml-2 font-semibold transition-colors">
                    Create your account
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="w-full max-w-md">
              {/* Form Container */}
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-800">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Welcome Back</h3>
                  <p className="text-gray-400">Sign in to continue your wellness journey</p>
                </div>

                {/* Clerk SignIn Component */}
                <div className="clerk-signin-container">
                  <SignIn 
                    routing="hash" 
                    appearance={{
                      variables: {
                        colorPrimary: '#10b981', // emerald-500
                        colorPrimaryText: '#ffffff',
                        colorBackground: 'transparent',
                        colorInputBackground: '#1f2937', // gray-800
                        colorInputText: '#f9fafb', // gray-50
                        colorText: '#f9fafb',
                        colorTextSecondary: '#9ca3af', // gray-400
                        borderRadius: '0.75rem',
                      },
                      elements: {
                        rootBox: {
                          width: '100%',
                        },
                        card: {
                          backgroundColor: 'transparent',
                          boxShadow: 'none',
                          border: 'none',
                        },
                        headerTitle: {
                          display: 'none',
                        },
                        headerSubtitle: {
                          display: 'none',
                        },
                        socialButtonsBlockButton: {
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          color: '#f9fafb',
                          '&:hover': {
                            backgroundColor: '#374151',
                          }
                        },
                        formButtonPrimary: {
                          backgroundColor: '#10b981',
                          '&:hover': {
                            backgroundColor: '#059669',
                          }
                        },
                        footerActionLink: {
                          color: '#10b981',
                          '&:hover': {
                            color: '#059669',
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  By signing in, you agree to our{' '}
                  <Link href="/terms" className="text-green-400 hover:text-green-300 transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-green-400 hover:text-green-300 transition-colors">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-green-400 scale-125' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


