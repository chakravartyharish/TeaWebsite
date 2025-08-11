'use client'
import { useState } from 'react'
import { apiPost } from '@/lib/api'

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{role:'user'|'bot', text:string, error?:boolean}[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function send(){
    if (!input.trim() || isLoading) return
    
    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)
    
    // Add user message immediately
    setMessages(m => [...m, {role:'user', text:userMessage}])
    
    try {
      const reply = await apiPost<{reply:string}>("/ai/chat", { message: userMessage })
      setMessages(m => [...m, {role:'bot', text:reply.reply}])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(m => [...m, {
        role:'bot', 
        text:'Sorry, I\'m having trouble connecting right now. Please try again in a moment!', 
        error: true
      }])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div>
      <button 
        onClick={()=>setOpen(!open)} 
        className="fixed bottom-5 right-5 bg-tea-forest text-white rounded-full px-4 py-3 shadow-lg hover:bg-tea-forest/90 transition-colors"
      >
        {isLoading ? '💭' : '🍃'} Chat
      </button>
      {open && (
        <div className="fixed bottom-20 right-5 w-80 bg-white rounded-xl shadow-xl p-3 space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-tea-cream">
            <h3 className="font-semibold text-tea-forest">Tea Assistant</h3>
            <button 
              onClick={()=>setOpen(false)} 
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              ×
            </button>
          </div>
          <div className="h-64 overflow-y-auto space-y-2">
            {messages.length === 0 && (
              <div className="bg-tea-cream p-3 rounded-lg text-sm">
                👋 Hi! I'm your tea expert. Ask me about tea varieties, brewing tips, or get personalized recommendations!
              </div>
            )}
            {messages.map((m,i)=> (
              <div key={i} className={
                m.role==='bot'
                  ? `bg-tea-cream p-2 rounded-lg ${m.error ? 'border border-red-200 bg-red-50' : ''}`
                  : 'text-right bg-tea-forest text-white p-2 rounded-lg ml-8'
              }>
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-tea-cream p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-tea-forest rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-tea-forest rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-tea-forest rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">Tea expert is thinking...</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input 
              value={input} 
              onChange={e=>setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1 border rounded-lg px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed" 
              placeholder="Ask about teas, brewing, recommendations..."
            />
            <button 
              onClick={send} 
              disabled={isLoading || !input.trim()}
              className="bg-tea-forest text-white rounded-lg px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-tea-forest/90 transition-colors"
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


