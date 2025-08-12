'use client'
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log errors that are not Clerk/Next.js development related
    const errorMessage = error.message || ''
    if (!errorMessage.includes('Only plain objects') && 
        !errorMessage.includes('Classes or null prototypes') &&
        !errorMessage.includes('An unexpected response was received from the server') &&
        !errorMessage.includes('fetchServerAction')) {
      console.error('Uncaught error:', error, errorInfo)
    }
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI - in this case, just render children anyway
      return this.props.children
    }

    return this.props.children
  }
}

export default ErrorBoundary