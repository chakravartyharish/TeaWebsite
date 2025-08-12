'use client'
import "../styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot-widget";
import { ClerkProvider } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Check if current path should have custom layout (auth pages)
  const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up')
  
  if (!isClient) {
    return <div className="min-h-screen bg-black">{children}</div>
  }
  
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-black text-white">
        <main className="min-h-screen">{children}</main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-tea-cream to-green-100 text-[#1b1b1b]">
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </ClerkProvider>
  )
}


