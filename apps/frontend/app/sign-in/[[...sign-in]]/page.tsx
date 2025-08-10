'use client'
import { SignIn } from '@clerk/nextjs'

export default function Page(){
  return (
    <div className="max-w-3xl mx-auto py-10">
      <SignIn routing="hash" appearance={{ variables: { colorPrimary: '#0D3B2E' } }} />
    </div>
  )
}



