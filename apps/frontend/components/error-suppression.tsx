'use client'
import { useEffect } from 'react'

export default function ErrorSuppression() {
  useEffect(() => {
    // Suppress unhandled rejection errors that are Clerk/Next.js related
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || event.reason || ''
      if (typeof reason === 'string' && (
        reason.includes('An unexpected response was received from the server') ||
        reason.includes('fetchServerAction') ||
        reason.includes('Only plain objects') ||
        reason.includes('Classes or null prototypes')
      )) {
        event.preventDefault()
        // Optionally log for debugging (commented out to keep console clean)
        // console.warn('Suppressed error:', reason)
      }
    }

    // Suppress runtime errors
    const handleError = (event: ErrorEvent) => {
      const message = event.error?.message || event.message || ''
      if (typeof message === 'string' && (
        message.includes('An unexpected response was received from the server') ||
        message.includes('fetchServerAction') ||
        message.includes('Only plain objects') ||
        message.includes('Classes or null prototypes')
      )) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [])

  return null
}