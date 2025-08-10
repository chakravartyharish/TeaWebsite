'use client'
import { useState } from 'react'

export default function NewProduct(){
  const [form, setForm] = useState({ name:'', slug:'', story:'', ingredients:'', benefits:'', brew_temp_c:80, brew_time_min:3, hero_image:'' })
  async function save(){
    await fetch((process.env.NEXT_PUBLIC_API_BASE as string) + '/admin/products', { method:'POST', headers:{'Content-Type':'application/json','x-admin-key':process.env.NEXT_PUBLIC_ADMIN_KEY as string}, body: JSON.stringify(form) })
    alert('Created product')
  }
  return (
    <div className="max-w-2xl space-y-3">
      {Object.entries(form).map(([k,v])=> (
        <input key={k} placeholder={k} value={v as any} onChange={e=>setForm({...form,[k]: e.target.value})} className="w-full border rounded-lg px-3 py-2"/>
      ))}
      <button onClick={save} className="bg-tea-forest text-white px-4 py-2 rounded-lg">Save</button>
    </div>
  )
}


