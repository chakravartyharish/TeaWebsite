'use client'
import { useState } from 'react'
import { apiPost } from '@/lib/api'

export default function AddressForm(){
  const [f, setF] = useState({ line1:'', line2:'', city:'', state:'', pincode:'', country:'India' })
  async function save(){ await apiPost('/addresses', f); alert('Address saved') }
  return (
    <div className="space-y-3">
      {['line1','line2','city','state','pincode','country'].map(k=> (
        <input key={k} placeholder={k} value={(f as any)[k]||''} onChange={e=>setF({...f,[k]:e.target.value})} className="w-full border rounded-lg px-3 py-2" />
      ))}
      <button onClick={save} className="bg-tea-forest text-white rounded-lg px-4 py-2">Save address</button>
    </div>
  )
}


