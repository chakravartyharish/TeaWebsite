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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-tea-cream to-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-tea-forest/10 rounded-full px-6 py-3 mb-6">
            <span className="text-2xl">❓</span>
            <span className="text-sm font-bold text-tea-forest uppercase tracking-wide">SUPPORT CENTER</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-tea-forest to-green-600 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about A-ZEN, Inner Veda, and your wellness journey. 
            Can't find your answer? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Category Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-tea-forest/10 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-tea-forest mb-6">Browse by Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-tea-forest text-white shadow-lg'
                        : 'hover:bg-tea-forest/10 text-gray-700 hover:text-tea-forest'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                    <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">
                      {category.id === 'all' ? faqData.length : faqData.filter(faq => faq.category === category.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-tea-forest/10 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-tea-forest/5 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-tea-forest to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white">{item.icon}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                    </div>
                    <div className={`transform transition-transform duration-200 ${openItem === item.id ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-tea-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {openItem === item.id && (
                    <div className="px-6 pb-6">
                      <div className="pl-14 pr-4">
                        <div className="bg-gradient-to-r from-tea-forest/10 to-green-100/50 rounded-xl p-4 border border-tea-forest/20">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{item.answer}</p>
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
        <div className="mt-16 bg-gradient-to-r from-tea-forest via-green-700 to-green-800 rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🤝</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-tea-cream text-lg mb-8 leading-relaxed">
              Our wellness experts are here to help! Get personalized advice about A-ZEN, 
              your wellness journey, or any concerns you might have.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <a href="mailto:innervedacare@gmail.com" className="group bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-tea-cream text-sm">innervedacare@gmail.com</p>
              </a>
              
              <a href="tel:9113920980" className="group bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-bold mb-2">Call Us</h3>
                <p className="text-tea-cream text-sm">9113920980</p>
              </a>
              
              <a href="https://instagram.com/innerveda.in" className="group bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">📷</div>
                <h3 className="font-bold mb-2">Follow Us</h3>
                <p className="text-tea-cream text-sm">@innerveda.in</p>
              </a>
            </div>
            
            <div className="text-center">
              <p className="text-tea-cream mb-4">
                <span className="font-semibold">Contact Person:</span> Sonam Garg
              </p>
              <p className="text-tea-cream text-sm">
                Available Mon-Sat, 9 AM - 7 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-white/80 backdrop-blur-sm text-tea-forest px-6 py-3 rounded-full font-medium hover:bg-white hover:shadow-lg transition-all duration-300">
              Contact Support
            </Link>
            <Link href="/terms" className="bg-white/80 backdrop-blur-sm text-tea-forest px-6 py-3 rounded-full font-medium hover:bg-white hover:shadow-lg transition-all duration-300">
              Terms of Service
            </Link>
            <Link href="/privacy" className="bg-white/80 backdrop-blur-sm text-tea-forest px-6 py-3 rounded-full font-medium hover:bg-white hover:shadow-lg transition-all duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
