'use client'
import Header from "@/components/header";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot-widget";
import ErrorBoundary from "@/components/error-boundary";
import ErrorSuppression from "@/components/error-suppression";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  const { user, isLoaded } = useUser()
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Check if current path should have custom layout (auth pages and homepage sign-in)
  const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up')
  const isHomePageSignIn = pathname === '/' && isLoaded && !user
  
  if (!isClient) {
    return <div className="min-h-screen bg-black">{children}</div>
  }
  
  if (isAuthPage || isHomePageSignIn) {
    return (
      <div className="min-h-screen bg-black text-white">
        <main className="min-h-screen">{children}</main>
      </div>
    )
  }
  
  
  return (
    <ErrorBoundary>
      <ErrorSuppression />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-tea-cream to-green-100 text-[#1b1b1b]">
        <Header />
        <main className="min-h-screen pt-14">{children}</main>
        <Footer />
        <Chatbot />
      </div>
    </ErrorBoundary>
  )
}