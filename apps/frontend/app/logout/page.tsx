'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Immediate redirect to homepage after sign out
    router.push('/')
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <span className="text-white text-2xl">🍃</span>
        </div>
        <p className="text-white text-lg">Redirecting to homepage...</p>
      </div>
    </div>
  )
}