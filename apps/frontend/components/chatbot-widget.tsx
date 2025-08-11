'use client'
import { useState, useRef, useEffect } from 'react'
import { apiPost } from '@/lib/api'

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{role:'user'|'bot', text:string, error?:boolean, timestamp?:number}[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    if (open && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open, isMinimized])

  async function send(){
    if (!input.trim() || isLoading) return
    
    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)
    
    // Add user message immediately
    setMessages(m => [...m, {role:'user', text:userMessage, timestamp: Date.now()}])
    
    try {
      const reply = await apiPost<{reply:string}>("/ai/chat", { message: userMessage })
      setMessages(m => [...m, {role:'bot', text:reply.reply, timestamp: Date.now()}])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(m => [...m, {
        role:'bot', 
        text:'I apologize, but I\'m having trouble connecting right now. Please try again in a moment, and I\'ll be happy to help with your tea questions! 🍵', 
        error: true,
        timestamp: Date.now()
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

  function formatTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <div className="relative">
        <button 
          onClick={()=>setOpen(!open)} 
          className="group bg-gradient-to-br from-tea-forest to-green-700 text-white rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-4 border-white/20"
        >
          <div className="relative">
            {isLoading ? (
              <div className="animate-spin">
                <span className="text-2xl">🍃</span>
              </div>
            ) : (
              <span className="text-2xl group-hover:scale-110 transition-transform">{open ? '💬' : '🍃'}</span>
            )}
            {!open && messages.length > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </div>
        </button>
        {!open && (
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/80 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
              Chat with Tea Expert
            </div>
          </div>
        )}
      </div>

      {/* Chat Widget */}
      {open && (
        <div className={`absolute bottom-20 right-0 w-96 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-tea-forest/20 overflow-hidden transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-tea-forest via-green-700 to-green-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🍃</span>
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg">Tea Expert</h3>
                  <p className="text-tea-cream text-sm opacity-90">
                    {isLoading ? 'Brewing wisdom...' : 'Ask me anything about tea! ✨'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={()=>setIsMinimized(!isMinimized)} 
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center transition-all"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  <span className="text-lg">{isMinimized ? '□' : '−'}</span>
                </button>
                <button 
                  onClick={()=>setOpen(false)} 
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center transition-all"
                  title="Close"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4 bg-gradient-to-b from-green-50/50 to-tea-cream/30">
                {messages.length === 0 && (
                  <div className="space-y-4">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-tea-forest/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-tea-forest to-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">🍵</span>
                        </div>
                        <span className="font-semibold text-tea-forest">Welcome to Inner Veda!</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        I'm your personal tea expert! I can help you with:
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>🌿</span>
                          <span>Tea varieties & recommendations</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>☕</span>
                          <span>Brewing techniques & tips</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>💚</span>
                          <span>Health benefits & wellness advice</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>🧘</span>
                          <span>A-ZEN blend guidance</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => setInput("What are the benefits of A-ZEN?")}
                        className="bg-tea-forest/10 hover:bg-tea-forest/20 text-tea-forest px-3 py-2 rounded-full text-sm transition-colors"
                      >
                        About A-ZEN 🍃
                      </button>
                      <button 
                        onClick={() => setInput("How do I brew the perfect cup?")}
                        className="bg-tea-forest/10 hover:bg-tea-forest/20 text-tea-forest px-3 py-2 rounded-full text-sm transition-colors"
                      >
                        Brewing Tips ☕
                      </button>
                    </div>
                  </div>
                )}

                {messages.map((m,i)=> (
                  <div key={i} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] ${m.role==='user' ? 'order-2' : 'order-1'}`}>
                      <div className={`p-4 rounded-2xl shadow-sm ${
                        m.role==='bot'
                          ? m.error 
                            ? 'bg-red-50 border border-red-200 text-red-800' 
                            : 'bg-white/90 backdrop-blur-sm border border-tea-forest/10'
                          : 'bg-gradient-to-br from-tea-forest to-green-700 text-white'
                      }`}>
                        {m.role === 'bot' && !m.error && (
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-tea-forest to-green-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">🍃</span>
                            </div>
                            <span className="text-tea-forest font-medium text-sm">Tea Expert</span>
                          </div>
                        )}
                        <p className={`leading-relaxed ${m.role==='bot' && !m.error ? 'text-gray-700' : ''}`}>
                          {m.text}
                        </p>
                        {m.timestamp && (
                          <div className={`text-xs mt-2 opacity-70 ${m.role==='user' ? 'text-tea-cream' : 'text-gray-500'}`}>
                            {formatTime(m.timestamp)}
                          </div>
                        )}
                      </div>
                    </div>
                    {m.role === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-tea-forest to-green-700 rounded-full flex items-center justify-center ml-3 flex-shrink-0 order-3">
                        <span className="text-white text-sm">👤</span>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-tea-forest/10 max-w-[75%]">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-tea-forest to-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🍃</span>
                        </div>
                        <span className="text-tea-forest font-medium text-sm">Tea Expert</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-tea-forest rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-tea-forest rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-tea-forest rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-gray-600 italic">Brewing the perfect response...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-tea-forest/10">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <input 
                      ref={inputRef}
                      value={input} 
                      onChange={e=>setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 focus:border-tea-forest focus:ring-2 focus:ring-tea-forest/20 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 placeholder-gray-500" 
                      placeholder="Ask me about tea varieties, brewing tips, or A-ZEN..."
                      maxLength={500}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      {input.length}/500
                    </div>
                  </div>
                  <button 
                    onClick={send} 
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-br from-tea-forest to-green-700 text-white rounded-2xl px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-800 hover:to-green-900 transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center space-x-2 font-medium"
                    title="Send message"
                  >
                    {isLoading ? (
                      <div className="animate-spin">
                        <span>⏳</span>
                      </div>
                    ) : (
                      <>
                        <span>Send</span>
                        <span>📤</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>Press Enter to send • Shift+Enter for new line</span>
                  <span className="flex items-center space-x-1">
                    <span>Powered by</span>
                    <span className="text-tea-forest font-semibold">Inner Veda AI</span>
                    <span>🍃</span>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}


