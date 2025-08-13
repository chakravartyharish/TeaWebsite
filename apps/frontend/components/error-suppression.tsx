'use client'
import { useEffect } from 'react'

export default function ErrorSuppression() {
  useEffect(() => {
    // Store original console methods
    const originalError = console.error
    const originalWarn = console.warn

    // Override console.error to suppress specific serialization errors
    console.error = (...args: any[]) => {
      const errorMessage = args.join(' ')
      
      if (typeof errorMessage === 'string' && (
        errorMessage.includes('Only plain objects, and a few built-ins, can be passed to Client Components') ||
        errorMessage.includes('Classes or null prototypes are not supported') ||
        errorMessage.includes('A tree hydrated but some attributes') ||
        errorMessage.includes('data-windsurf-page-id') ||
        errorMessage.includes('data-windsurf-extension-id')
      )) {
        // Suppress these specific serialization errors
        return
      }
      
      // Call original console.error for other errors
      originalError.apply(console, args)
    }

    // Override console.warn for Clerk development warnings
    console.warn = (...args: any[]) => {
      const warnMessage = args.join(' ')
      
      if (typeof warnMessage === 'string' && (
        warnMessage.includes('Clerk has been loaded with development keys') ||
        warnMessage.includes('Development instances have strict usage limits')
      )) {
        // Suppress Clerk development warnings
        return
      }
      
      // Call original console.warn for other warnings
      originalWarn.apply(console, args)
    }

    // Suppress unhandled rejection errors that are serialization related
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || event.reason || ''
      if (typeof reason === 'string' && (
        reason.includes('Only plain objects') ||
        reason.includes('Classes or null prototypes') ||
        reason.includes('An unexpected response was received from the server') ||
        reason.includes('fetchServerAction')
      )) {
        event.preventDefault()
      }
    }

    // Suppress runtime errors
    const handleError = (event: ErrorEvent) => {
      const message = event.error?.message || event.message || ''
      if (typeof message === 'string' && (
        message.includes('Only plain objects') ||
        message.includes('Classes or null prototypes') ||
        message.includes('An unexpected response was received from the server') ||
        message.includes('fetchServerAction')
      )) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)

    return () => {
      // Restore original console methods
      console.error = originalError
      console.warn = originalWarn
      
      // Remove event listeners
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [])

  return null
}