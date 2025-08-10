'use client'
import { useEffect, useState } from 'react'
import { apiPost } from '@/lib/api'

export default function LeadCapture(){
  const [show, setShow] = useState(false)
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  useEffect(()=>{ const t = setTimeout(()=>setShow(true), 5000); return ()=>clearTimeout(t) },[])
  async function save(){
    await apiPost("/leads", { phone, email, source: "popup", marketing_optin: true, whatsapp_optin: true })
    setShow(false)
  }
  if(!show) return null
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[28rem]">
        <h3 className="font-heading text-2xl">Get 10% off + Brew Guide</h3>
        <p className="mt-2 text-sm">Enter details to receive WhatsApp/SMS updates.</p>
        <div className="mt-4 space-y-3">
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="w-full border rounded-lg px-3 py-2"/>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email (optional)" className="w-full border rounded-lg px-3 py-2"/>
          <button onClick={save} className="bg-tea-forest text-white rounded-lg px-4 py-2 w-full">Unlock</button>
        </div>
      </div>
    </div>
  )
}


