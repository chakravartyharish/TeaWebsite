'use client'
import { useState } from 'react'
import { apiPost } from '@/lib/api'

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{role:'user'|'bot', text:string}[]>([])
  const [input, setInput] = useState("")

  async function send(){
    const reply = await apiPost<{reply:string}>("/ai/chat", { message: input })
    setMessages(m=>[...m,{role:'user', text:input},{role:'bot', text:reply.reply}])
    setInput("")
  }

  return (
    <div>
      <button onClick={()=>setOpen(!open)} className="fixed bottom-5 right-5 bg-tea-forest text-white rounded-full px-4 py-3 shadow-lg">Chat</button>
      {open && (
        <div className="fixed bottom-20 right-5 w-80 bg-white rounded-xl shadow-xl p-3 space-y-2">
          <div className="h-64 overflow-y-auto space-y-2">
            {messages.map((m,i)=> (
              <div key={i} className={m.role==='bot'? 'bg-tea-cream p-2 rounded-lg' : 'text-right'}>{m.text}</div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 border rounded-lg px-2 py-1" placeholder="Ask about teas..."/>
            <button onClick={send} className="bg-tea-forest text-white rounded-lg px-3">Send</button>
          </div>
        </div>
      )}
    </div>
  )
}


