'use client'
import { useEffect, useState } from 'react'
import { apiPost } from '@/lib/api'

declare global { interface Window { Razorpay: any } }

export default function Checkout(){
  const [scriptReady, setScriptReady] = useState(false)
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string

  useEffect(()=>{
    const id = 'rzp-checkout'
    if(document.getElementById(id)) { setScriptReady(true); return }
    const s = document.createElement('script')
    s.id = id
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = ()=> setScriptReady(true)
    document.body.appendChild(s)
  },[])

  async function pay(){
    const order = await apiPost<any>('/payments/razorpay/order', { amount_inr: 499, receipt: 'rcpt_demo' })
    const options = {
      key,
      amount: order.amount,
      currency: order.currency,
      name: 'Tea Store',
      description: 'Order payment',
      order_id: order.id,
      handler: async (resp: any) => {
        const r = await apiPost('/payments/razorpay/verify', resp)
        alert('Payment success! ' + JSON.stringify(r))
      },
      prefill: { name: '', email: '', contact: '' },
      theme: { color: '#0D3B2E' }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-heading text-3xl mb-6">Checkout</h1>
      <button disabled={!scriptReady} onClick={pay} className="bg-tea-forest text-white rounded-lg px-5 py-3 disabled:opacity-60">Pay ₹499</button>
    </div>
  )
}


