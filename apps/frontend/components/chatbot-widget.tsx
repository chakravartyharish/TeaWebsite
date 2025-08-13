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
      <div className="relative group">
        <button 
          onClick={()=>setOpen(!open)} 
          className="bg-netflix-black border-2 border-netflix-red text-netflix-white rounded-full w-16 h-16 shadow-2xl hover:shadow-netflix-red/30 transition-all duration-300 transform hover:scale-110 flex items-center justify-center hover:border-netflix-accent hover:bg-netflix-dark relative before:absolute before:inset-0 before:rounded-full before:bg-netflix-red/20 before:scale-0 hover:before:scale-100 before:transition-transform before:duration-300"
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
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-netflix-red rounded-full animate-pulse"></div>
            )}
          </div>
        </button>
        {!open && (
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-netflix-black border border-netflix-red text-netflix-text text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
              Chat with AI Assistant
            </div>
          </div>
        )}
      </div>

      {/* Chat Widget */}
      {open && (
        <div className={`absolute bottom-20 right-0 w-96 bg-netflix-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-netflix-red/30 overflow-hidden transition-all duration-500 ease-out ${isMinimized ? 'h-16' : 'h-[500px]'} hover:shadow-netflix-red/20 hover:border-netflix-red/50`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-netflix-black to-netflix-dark border-b border-netflix-red/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-netflix-red/20 border border-netflix-red/40 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🍃</span>
                </div>
                <div className="text-netflix-white">
                  <h3 className="font-bold text-lg">AI Assistant</h3>
                  <p className="text-netflix-text text-sm opacity-90">
                    {isLoading ? 'Processing...' : 'How can I help you today? ✨'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={()=>setIsMinimized(!isMinimized)} 
                  className="text-netflix-text hover:text-netflix-white hover:bg-netflix-red/20 rounded-lg w-8 h-8 flex items-center justify-center transition-all"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  <span className="text-lg">{isMinimized ? '□' : '−'}</span>
                </button>
                <button 
                  onClick={()=>setOpen(false)} 
                  className="text-netflix-text hover:text-netflix-white hover:bg-netflix-red/20 rounded-lg w-8 h-8 flex items-center justify-center transition-all"
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
              <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4 bg-gradient-to-b from-netflix-dark to-netflix-gray">
                {messages.length === 0 && (
                  <div className="space-y-4">
                    <div className="bg-netflix-gray/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-netflix-red/20">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-netflix-red/20 border border-netflix-red/40 rounded-lg flex items-center justify-center">
                          <span className="text-netflix-text text-sm">🍃</span>
                        </div>
                        <span className="font-semibold text-netflix-white">Welcome to Inner Veda AI!</span>
                      </div>
                      <p className="text-netflix-text leading-relaxed">
                        I'm your AI-powered assistant! I can help you with:
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-netflix-text">
                          <span>🌿</span>
                          <span>Tea varieties & recommendations</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-netflix-text">
                          <span>☕</span>
                          <span>Brewing techniques & tips</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-netflix-text">
                          <span>💚</span>
                          <span>Health benefits & wellness advice</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-netflix-text">
                          <span>🧘</span>
                          <span>A-ZEN blend guidance</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => setInput("What are the benefits of A-ZEN?")}
                        className="bg-netflix-red/20 hover:bg-netflix-red/30 border border-netflix-red/40 hover:border-netflix-red/60 text-netflix-text hover:text-netflix-white px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden"
                      >
                        <span className="relative z-10">About A-ZEN 🍃</span>
                      </button>
                      <button 
                        onClick={() => setInput("How do I brew the perfect cup?")}
                        className="bg-netflix-accent/20 hover:bg-netflix-accent/30 border border-netflix-accent/40 hover:border-netflix-accent/60 text-netflix-text hover:text-netflix-white px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden"
                      >
                        <span className="relative z-10">Brewing Tips ☕</span>
                      </button>
                    </div>
                  </div>
                )}

                {messages.map((m,i)=> (
                  <div key={i} className={`flex ${m.role==='user' ? 'justify-end' : 'justify-start'} group`}>
                    <div className={`max-w-[75%] ${m.role==='user' ? 'order-2' : 'order-1'}`}>
                      <div className={`p-4 rounded-2xl shadow-lg border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        m.role==='bot'
                          ? m.error 
                            ? 'bg-netflix-red/20 border-netflix-red/40 text-netflix-red hover:bg-netflix-red/30' 
                            : 'bg-netflix-lightGray/90 backdrop-blur-sm border-netflix-accent/30 hover:bg-netflix-lightGray/100 hover:border-netflix-accent/50'
                          : 'bg-gradient-to-br from-netflix-red to-netflix-red/80 text-netflix-white border-netflix-red/40 hover:from-netflix-red/90 hover:to-netflix-red/70'
                      }`}>
                        {m.role === 'bot' && !m.error && (
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-netflix-red/20 border border-netflix-red/40 rounded-lg flex items-center justify-center">
                              <span className="text-netflix-text text-xs">🤖</span>
                            </div>
                            <span className="text-netflix-white font-medium text-sm">AI Assistant</span>
                          </div>
                        )}
                        <p className={`leading-relaxed ${m.role==='bot' && !m.error ? 'text-netflix-text' : ''}`}>
                          {m.text}
                        </p>
                        {m.timestamp && (
                          <div className={`text-xs mt-2 opacity-70 ${m.role==='user' ? 'text-netflix-text/80' : 'text-netflix-text/60'}`}>
                            {formatTime(m.timestamp)}
                          </div>
                        )}
                      </div>
                    </div>
                    {m.role === 'user' && (
                      <div className="w-8 h-8 bg-netflix-accent/20 border border-netflix-accent/40 rounded-lg flex items-center justify-center ml-3 flex-shrink-0 order-3">
                        <span className="text-netflix-white text-sm">👤</span>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-netflix-lightGray/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-netflix-accent/30 max-w-[75%]">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-netflix-red/20 border border-netflix-red/40 rounded-lg flex items-center justify-center">
                          <span className="text-netflix-text text-xs">🤖</span>
                        </div>
                        <span className="text-netflix-white font-medium text-sm">AI Assistant</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-netflix-red rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-netflix-red rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-netflix-red rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-netflix-text italic">Processing your request...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-netflix-gray/90 backdrop-blur-sm border-t border-netflix-red/20">
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <input 
                      ref={inputRef}
                      value={input} 
                      onChange={e=>setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      className="w-full bg-netflix-lightGray border-2 border-netflix-red/40 rounded-2xl px-4 py-3 focus:border-netflix-red focus:ring-2 focus:ring-netflix-red/20 focus:bg-netflix-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed text-netflix-text placeholder-netflix-text/60" 
                      placeholder="Ask me about tea varieties, brewing tips, or A-ZEN..."
                      maxLength={500}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-netflix-text/60">
                      {input.length}/500
                    </div>
                  </div>
                  <button 
                    onClick={send} 
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-br from-netflix-red to-netflix-red/80 text-netflix-white rounded-2xl px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:from-netflix-red/90 hover:to-netflix-red/70 hover:scale-105 transition-all disabled:hover:scale-100 shadow-lg flex items-center space-x-2 font-medium border border-netflix-red/40"
                    title="Send message"
                  >
                    {isLoading ? (
                      <div className="animate-spin">
                        <span>⏳</span>
                      </div>
                    ) : (
                      <>
                        <span>Send</span>
                        <span>🚀</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-netflix-text/70">
                  <span>Press Enter to send • Shift+Enter for new line</span>
                  <span className="flex items-center space-x-1">
                    <span>Powered by</span>
                    <span className="text-netflix-red font-semibold">Inner Veda AI</span>
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


