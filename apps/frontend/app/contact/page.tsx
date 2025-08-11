'use client'
import { useState } from 'react'
import Link from 'next/link'
import { apiPost } from '@/lib/api'

interface ContactResponse {
  success: boolean
  message: string
  data?: {
    submissionId: string
    autoReply: string
    estimatedResponseTime: string
    nextSteps: string[]
    contactInfo: {
      email: string
      phone: string
      hours: string
      socialMedia: string
    }
  }
  error?: string
  fallbackContact?: {
    email: string
    phone: string
  }
}

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [responseData, setResponseData] = useState<ContactResponse['data'] | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const response = await apiPost<ContactResponse>('/contact', formData)
      
      if (response.success) {
        setSubmitted(true)
        setResponseData(response.data || null)
      } else {
        setSubmitError(response.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitError(
        'Unable to send message at this time. Please contact us directly at innervedacare@gmail.com or call 9113920980.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-tea-cream to-green-100">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-tea-forest to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
              <span className="text-white text-5xl">✓</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-tea-forest mb-4">Message Sent Successfully!</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Thank you for reaching out to Inner Veda. We've received your message and are excited to help you on your wellness journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Auto Reply */}
            {responseData?.autoReply && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-tea-forest/10 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-tea-forest/10 rounded-full flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <h2 className="text-2xl font-bold text-tea-forest">Auto-Reply Message</h2>
                </div>
                <div className="bg-gradient-to-r from-tea-cream/30 to-green-100/30 rounded-2xl p-6">
                  <p className="text-gray-700 leading-relaxed">{responseData.autoReply}</p>
                </div>
              </div>
            )}

            {/* Response Time */}
            {responseData?.estimatedResponseTime && (
              <div className="bg-gradient-to-br from-tea-forest to-green-700 rounded-3xl shadow-xl p-8 text-white">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl">⏰</span>
                  </div>
                  <h2 className="text-2xl font-bold">Response Timeline</h2>
                </div>
                <div className="bg-white/10 rounded-2xl p-6">
                  <p className="text-tea-cream mb-2">Expected Response Time:</p>
                  <p className="text-2xl font-bold">{responseData.estimatedResponseTime}</p>
                  <p className="text-tea-cream text-sm mt-2">
                    We prioritize personalized responses and may reply sooner based on your inquiry type.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Next Steps */}
          {responseData?.nextSteps && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-tea-forest/10 p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-tea-forest/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
                <h2 className="text-2xl font-bold text-tea-forest">What Happens Next</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {responseData.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-tea-cream/20 rounded-xl">
                    <div className="w-8 h-8 bg-tea-forest rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info */}
          {responseData?.contactInfo && (
            <div className="bg-gradient-to-r from-tea-cream/50 to-green-100/50 rounded-3xl p-8 border border-tea-forest/10 mb-8">
              <h3 className="text-2xl font-bold text-tea-forest mb-6 text-center">Alternative Contact Methods</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-tea-forest/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">📧</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                  <p className="text-tea-forest font-medium text-sm">{responseData.contactInfo.email}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-tea-forest/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">📞</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                  <p className="text-tea-forest font-medium text-sm">{responseData.contactInfo.phone}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-tea-forest/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🕒</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">Hours</h4>
                  <p className="text-tea-forest font-medium text-sm">{responseData.contactInfo.hours}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-tea-forest/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">📷</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">Social</h4>
                  <p className="text-tea-forest font-medium text-sm">{responseData.contactInfo.socialMedia}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => {
                  setSubmitted(false)
                  setResponseData(null)
                  setFormData({
                    name: '', email: '', phone: '', subject: '', category: 'general', message: ''
                  })
                }}
                className="bg-tea-forest text-white px-8 py-4 rounded-full font-semibold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Send Another Message
              </button>
              <Link href="/" className="border-2 border-tea-forest text-tea-forest px-8 py-4 rounded-full font-medium hover:bg-tea-forest hover:text-white transition-all duration-300">
                Back to Home
              </Link>
              <Link href="/faq" className="bg-white/80 backdrop-blur-sm text-tea-forest px-8 py-4 rounded-full font-medium hover:bg-white hover:shadow-lg transition-all duration-300">
                Browse FAQs
              </Link>
            </div>
            
            {responseData?.submissionId && (
              <p className="text-xs text-gray-500 mt-6">
                Reference ID: {responseData.submissionId}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-tea-cream to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-tea-forest/10 rounded-full px-6 py-3 mb-6">
            <span className="text-2xl">📞</span>
            <span className="text-sm font-bold text-tea-forest uppercase tracking-wide">CONTACT SUPPORT</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-tea-forest to-green-600 bg-clip-text text-transparent mb-6">
            We're Here to Help
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about A-ZEN or need wellness guidance? Our dedicated team is ready to support your journey to better health and mindfulness.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-tea-forest/10 p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-tea-forest/10 rounded-full flex items-center justify-center">
                <span className="text-xl">💬</span>
              </div>
              <h2 className="text-2xl font-bold text-tea-forest">Send us a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-tea-forest focus:ring-2 focus:ring-tea-forest/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-tea-forest focus:ring-2 focus:ring-tea-forest/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-tea-forest focus:ring-2 focus:ring-tea-forest/20 transition-all bg-gray-50 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-tea-forest focus:ring-2 focus:ring-tea-forest/20 transition-all bg-gray-50 focus:bg-white"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Questions</option>
                    <option value="order">Order Support</option>
                    <option value="health">Health & Wellness</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="media">Media & Press</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-tea-forest focus:ring-2 focus:ring-tea-forest/20 transition-all bg-gray-50 focus:bg-white"
                    placeholder="Brief subject line"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-tea-forest focus:ring-2 focus:ring-tea-forest/20 transition-all bg-gray-50 focus:bg-white resize-none"
                  placeholder="Tell us how we can help you on your wellness journey..."
                />
              </div>

              {/* Error Display */}
              {submitError && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">⚠️</span>
                    <div>
                      <h4 className="font-bold text-red-800 mb-2">Unable to Send Message</h4>
                      <p className="text-red-700 text-sm leading-relaxed">{submitError}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-tea-forest to-green-700 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-800 hover:to-green-900 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span>📤</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-tea-forest/10 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-tea-forest/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-tea-forest">Direct Contact</h3>
              </div>
              
              <div className="space-y-6">
                <a href="mailto:innervedacare@gmail.com" className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-tea-forest/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-tea-forest to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Email Support</h4>
                    <p className="text-tea-forest font-medium">innervedacare@gmail.com</p>
                    <p className="text-sm text-gray-600">Response within 24 hours</p>
                  </div>
                </a>

                <a href="tel:9113920980" className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-tea-forest/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-tea-forest to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Phone Support</h4>
                    <p className="text-tea-forest font-medium">9113920980</p>
                    <p className="text-sm text-gray-600">Mon-Sat, 9 AM - 7 PM IST</p>
                  </div>
                </a>

                <a href="https://instagram.com/innerveda.in" className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-tea-forest/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-tea-forest to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-white text-xl">📷</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Social Media</h4>
                    <p className="text-tea-forest font-medium">@innerveda.in</p>
                    <p className="text-sm text-gray-600">Follow for wellness tips</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Person */}
            <div className="bg-gradient-to-br from-tea-forest to-green-700 rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <h3 className="text-2xl font-bold">Your Wellness Guide</h3>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🧘‍♀️</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Sonam Garg</h4>
                    <p className="text-tea-cream">Wellness Consultant & Founder</p>
                  </div>
                </div>
                <p className="text-tea-cream mt-4 leading-relaxed">
                  "I'm here to personally guide you on your wellness journey with A-ZEN. 
                  Whether you have questions about our products or need lifestyle advice, 
                  I'm committed to helping you achieve inner peace and radiant health."
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-tea-forest/10 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-tea-forest/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">🕐</span>
                </div>
                <h3 className="text-2xl font-bold text-tea-forest">Business Hours</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Monday - Friday</span>
                  <span className="text-tea-forest font-bold">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Saturday</span>
                  <span className="text-tea-forest font-bold">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-700">Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-tea-forest/5 rounded-xl">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> We typically respond to emails within 24 hours, 
                  even outside business hours. For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ CTA */}
        <div className="bg-gradient-to-r from-tea-cream/50 to-green-100/50 rounded-3xl p-8 text-center border border-tea-forest/10">
          <h3 className="text-2xl font-bold text-tea-forest mb-4">Looking for Quick Answers?</h3>
          <p className="text-gray-600 mb-6">
            Check out our comprehensive FAQ section for instant answers to common questions about A-ZEN and wellness.
          </p>
          <Link href="/faq" className="bg-tea-forest text-white px-8 py-4 rounded-full font-semibold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Browse FAQs
          </Link>
        </div>
      </div>
    </div>
  )
}
