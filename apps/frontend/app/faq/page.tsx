'use client'
import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
  icon: string
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const faqData: FAQItem[] = [
    // A-ZEN Product Questions
    {
      id: '1',
      category: 'product',
      question: 'What is A-ZEN and what makes it special?',
      answer: 'A-ZEN is our premium instant tea/latte mix crafted with 5 sacred Ayurvedic herbs. It combines ancient wisdom with modern convenience to support both mental clarity (calm & focused mind) and radiant skin. Simply add hot milk or water - no complicated brewing required!',
      icon: '🍃'
    },
    {
      id: '2',
      category: 'product',
      question: 'What are the 5 sacred herbs in A-ZEN?',
      answer: 'Our A-ZEN blend contains carefully selected Ayurvedic herbs known for their wellness properties: Ashwagandha (stress relief), Brahmi (mental clarity), Tulsi (adaptogenic), Shankhpushpi (cognitive support), and Jatamansi (calming). Each herb is sourced for purity and potency.',
      icon: '🌿'
    },
    {
      id: '3',
      category: 'product',
      question: 'How many servings are in one A-ZEN package?',
      answer: 'Each 40g package provides approximately 16 cups. With each serving being 2.5g, you can enjoy A-ZEN twice daily for 8 days, or once daily for 16 days. Perfect for establishing a consistent wellness routine.',
      icon: '☕'
    },
    {
      id: '4',
      category: 'usage',
      question: 'How do I prepare the perfect cup of A-ZEN?',
      answer: 'Step 1: Whisk 1/2 tsp (2.5g) A-ZEN in 50ml hot milk/water. Step 2: Pour remaining 100ml hot liquid and stir. Step 3: Add honey if desired. Enjoy your calm ritual! The key is whisking first to avoid lumps.',
      icon: '🥄'
    },
    {
      id: '5',
      category: 'usage',
      question: 'Can I drink A-ZEN with cold beverages?',
      answer: 'While A-ZEN is designed for hot preparation to extract maximum herbal benefits, you can create a refreshing iced version. Prepare as usual with hot liquid first, then add ice or chill. The herbs absorb better in warm conditions.',
      icon: '🧊'
    },
    {
      id: '6',
      category: 'usage',
      question: 'How often should I drink A-ZEN?',
      answer: 'Enjoy A-ZEN up to twice daily, like you would tea or coffee. Morning consumption supports focus for the day, while evening consumption promotes relaxation. Consistency enhances the stress-combating abilities of your mind and body.',
      icon: '⏰'
    },
    {
      id: '7',
      category: 'health',
      question: 'What are the health benefits of A-ZEN?',
      answer: 'A-ZEN supports: Mental clarity and focus, Stress reduction and calm, Radiant skin health, Improved sleep quality, Enhanced cognitive function, and Overall wellness. The adaptogenic herbs work synergistically to balance mind and body.',
      icon: '💚'
    },
    {
      id: '8',
      category: 'health',
      question: 'Is A-ZEN safe for everyone?',
      answer: 'A-ZEN is made with natural, plant-based ingredients. However, we recommend consulting your physician if you are pregnant, nursing, under medication, or have specific health conditions. Natural doesn\'t always mean suitable for everyone.',
      icon: '⚕️'
    },
    {
      id: '9',
      category: 'health',
      question: 'Does A-ZEN contain caffeine?',
      answer: 'No, A-ZEN is completely caffeine-free. Our herbal blend uses traditional Ayurvedic herbs that provide natural energy and focus without caffeine. Perfect for evening consumption or those avoiding caffeine.',
      icon: '🚫'
    },
    {
      id: '10',
      category: 'general',
      question: 'How should I store A-ZEN?',
      answer: 'Store in a cool, dry place away from direct sunlight. Keep the container tightly sealed to maintain freshness and potency. Proper storage ensures your A-ZEN stays fresh for the full 8-month shelf life.',
      icon: '📦'
    },
    {
      id: '11',
      category: 'general',
      question: 'What is the shelf life of A-ZEN?',
      answer: 'A-ZEN has a shelf life of 8 months from the date of manufacture. Each package displays the "Best Before" date. For maximum potency and flavor, consume within this timeframe.',
      icon: '📅'
    },
    {
      id: '12',
      category: 'general',
      question: 'Is Inner Veda certified organic?',
      answer: 'We are committed to the highest quality standards and are working toward organic certification. Our herbs are carefully sourced from trusted suppliers who follow sustainable and ethical farming practices.',
      icon: '🌱'
    },
    {
      id: '13',
      category: 'order',
      question: 'How can I place an order?',
      answer: 'You can order A-ZEN directly through our website or contact us via email at innervedacare@gmail.com or phone at 9113920980. We offer secure online payment and cash on delivery options.',
      icon: '🛍️'
    },
    {
      id: '14',
      category: 'order',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including UPI, credit/debit cards, net banking, and digital wallets through our secure Razorpay integration. We also offer Cash on Delivery (COD) for your convenience.',
      icon: '💳'
    },
    {
      id: '15',
      category: 'order',
      question: 'How fast is delivery?',
      answer: 'We process orders within 1-2 business days and deliver within 3-5 business days across India. You\'ll receive tracking information via email once your order ships. Express delivery options may be available in select cities.',
      icon: '🚚'
    },
    {
      id: '16',
      category: 'order',
      question: 'What is your return policy?',
      answer: 'We want you to love your A-ZEN experience! If you\'re not completely satisfied, contact us within 7 days of delivery. We\'ll work with you to resolve any quality issues or concerns about your purchase.',
      icon: '↩️'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Questions', icon: '📋' },
    { id: 'product', name: 'About A-ZEN', icon: '🍃' },
    { id: 'usage', name: 'How to Use', icon: '☕' },
    { id: 'health', name: 'Health & Wellness', icon: '💚' },
    { id: 'order', name: 'Orders & Delivery', icon: '🛍️' },
    { id: 'general', name: 'General Info', icon: '❓' }
  ]

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Netflix-style background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #dc2626 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #059669 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, #7c3aed 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full mb-6 shadow-2xl shadow-red-500/25">
            <span className="text-4xl text-white">❓</span>
          </div>
          
          <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-red-500 via-white to-red-400 bg-clip-text text-transparent">
              FAQ
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about A-ZEN, our premium Ayurvedic tea blend, 
            and your wellness journey with Inner Veda.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/25 border border-red-500'
                    : 'bg-gray-800/80 backdrop-blur-sm text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-gray-600'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {categories.find(cat => cat.id === selectedCategory)?.name || 'All Questions'}
            </h2>
            <p className="text-gray-400">
              {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="grid gap-4">
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 group"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-6 focus:outline-none focus:ring-4 focus:ring-red-500/20 rounded-xl group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 border border-red-500/30">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                            {item.question}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full font-medium border border-red-500/30">
                              {categories.find(cat => cat.id === item.category)?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <svg
                        className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                          openItem === item.id ? 'rotate-180 text-red-400' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {openItem === item.id && (
                    <div className="px-6 pb-6">
                      <div className="pl-14 pr-4">
                        <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-xl p-4 border border-gray-600/50">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-line">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-red-900/80 via-gray-900 to-red-900/80 rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl shadow-red-500/10 border border-red-500/20">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-red-600/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50">
              <span className="text-3xl">🤝</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-white">Still Have Questions?</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Our wellness experts are here to help! Get personalized advice about A-ZEN, 
              your wellness journey, or any concerns you might have.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <a href="mailto:innervedacare@gmail.com" className="group bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-red-500/50">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-bold mb-2 text-white">Email Us</h3>
                <p className="text-gray-300 text-sm">innervedacare@gmail.com</p>
              </a>
              
              <a href="tel:9113920980" className="group bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-red-500/50">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-bold mb-2 text-white">Call Us</h3>
                <p className="text-gray-300 text-sm">9113920980</p>
              </a>
              
              <a href="https://instagram.com/innerveda.in" className="group bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-red-500/50">
                <div className="text-3xl mb-3">📷</div>
                <h3 className="font-bold mb-2 text-white">Follow Us</h3>
                <p className="text-gray-300 text-sm">@innerveda.in</p>
              </a>
            </div>
            
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                <span className="font-semibold text-white">Contact Person:</span> Sonam Garg
              </p>
              <p className="text-gray-400 text-sm">
                Available Mon-Sat, 9 AM - 7 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-gray-800/80 backdrop-blur-sm text-gray-300 px-6 py-3 rounded-full font-medium hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border border-gray-700 hover:border-red-500/50">
              Contact Support
            </Link>
            <Link href="/terms" className="bg-gray-800/80 backdrop-blur-sm text-gray-300 px-6 py-3 rounded-full font-medium hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border border-gray-700 hover:border-red-500/50">
              Terms of Service
            </Link>
            <Link href="/privacy" className="bg-gray-800/80 backdrop-blur-sm text-gray-300 px-6 py-3 rounded-full font-medium hover:bg-gray-700 hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border border-gray-700 hover:border-red-500/50">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
