import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"
import Link from "next/link"

export default function Header(){
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-tea-forest/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-tea-forest to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-white text-lg">🍃</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-tea-forest to-green-600 bg-clip-text text-transparent">
              INNER VEDA
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-tea-forest font-medium transition-colors duration-200 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tea-forest group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-tea-forest font-medium transition-colors duration-200 relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tea-forest group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-tea-forest font-medium transition-colors duration-200 relative group flex items-center space-x-1">
              <span>Cart</span>
              <span className="w-2 h-2 bg-tea-forest rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tea-forest group-hover:w-full transition-all duration-200"></span>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-tea-forest text-white px-6 py-2 rounded-full font-medium hover:bg-green-800 transition-all duration-200 transform hover:scale-105 shadow-md">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton redirectUrl="/">
                <button className="text-gray-700 hover:text-tea-forest font-medium transition-colors duration-200 px-4 py-2 border border-gray-200 rounded-full hover:border-tea-forest">
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>

            {/* Mobile Menu Button */}
            <button className="md:hidden w-8 h-8 flex items-center justify-center">
              <div className="w-5 h-0.5 bg-gray-600 relative">
                <span className="absolute -top-1.5 left-0 w-5 h-0.5 bg-gray-600"></span>
                <span className="absolute top-1.5 left-0 w-5 h-0.5 bg-gray-600"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}


