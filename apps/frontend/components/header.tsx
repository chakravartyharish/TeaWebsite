'use client'
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Header(){
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-xl border-b border-green-500/20 shadow-2xl' 
        : 'bg-gradient-to-r from-black/80 via-gray-900/90 to-black/80 backdrop-blur-md border-b border-white/10'
    }`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-emerald-800/10 to-green-900/20 opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Compact Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <span className="text-white text-lg animate-pulse">🍃</span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md group-hover:bg-green-400/40 transition-all duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-xl bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-green-300 transition-all duration-300">
                INNER VEDA
              </span>
            </div>
          </Link>

          {/* Compact Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { href: '/', label: 'Home', icon: '🏠' },
              { href: '/products', label: 'Products', icon: '🍃' },
              { href: '/showcase', label: 'A-ZEN', icon: '✨' },
              { href: '/cart', label: 'Cart', icon: '🛒' }
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`relative group px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${
                  isActive(item.href)
                    ? 'text-green-300 bg-green-600/20 border border-green-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                <span>{item.label}</span>
                
                {/* Active indicator */}
                {isActive(item.href) && (
                  <div className="absolute inset-0 bg-green-500/10 rounded-full animate-pulse"></div>
                )}
                
                {/* Hover line effect */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* Compact Auth & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="relative group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full font-bold text-sm hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl overflow-hidden">
                  {/* Button content */}
                  <div className="relative flex items-center space-x-1">
                    <span className="text-xs">🔐</span>
                    <span>Sign In</span>
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <SignOutButton redirectUrl="/">
                <button className="relative group text-gray-300 hover:text-white font-medium transition-all duration-300 px-4 py-2 border border-gray-600 hover:border-green-500 rounded-full hover:bg-green-500/10 overflow-hidden text-sm">
                  {/* Button content */}
                  <div className="relative flex items-center space-x-1">
                    <span className="text-xs">👋</span>
                    <span>Sign Out</span>
                  </div>
                  
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </SignOutButton>
            </SignedIn>

            {/* Compact Mobile Menu Button */}
            <button className="md:hidden relative group w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-green-600/20 transition-all duration-300">
              <div className="relative">
                <div className="w-4 h-0.5 bg-gray-300 group-hover:bg-green-400 transition-colors duration-300 relative">
                  <span className="absolute -top-1.5 left-0 w-4 h-0.5 bg-gray-300 group-hover:bg-green-400 transition-colors duration-300"></span>
                  <span className="absolute top-1.5 left-0 w-4 h-0.5 bg-gray-300 group-hover:bg-green-400 transition-colors duration-300"></span>
                </div>
              </div>
              
              {/* Mobile button glow */}
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}


