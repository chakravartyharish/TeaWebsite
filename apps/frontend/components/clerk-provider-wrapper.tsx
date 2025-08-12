'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

export default function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  try {
    return (
      <ClerkProvider afterSignOutUrl="/">
        {children}
      </ClerkProvider>
    )
  } catch (error) {
    // If there's any error with Clerk, just render children
    console.warn('Clerk provider error (suppressed):', error)
    return <>{children}</>
  }
}