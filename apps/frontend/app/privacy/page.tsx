export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-red-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-950/10 via-transparent to-gray-900/30"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-red-600/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-red-500/30">
            <span className="text-2xl">🔒</span>
            <span className="text-sm font-bold text-red-400 uppercase tracking-wide">PRIVACY & SECURITY</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            Privacy Policy
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how Inner Veda collects, 
            uses, and protects your personal information.
          </p>
          
          <div className="mt-8 bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 shadow-2xl">
            <p className="text-sm text-gray-400">
              <strong className="text-red-400">Last Updated:</strong> January 2025 | 
              <strong className="ml-4 text-red-400">Effective Date:</strong> January 1, 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-red-500/20 p-8 lg:p-12 hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-500">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30 shadow-lg shadow-red-900/20">
                  <span className="text-lg">🍃</span>
                </div>
                <h2 className="text-2xl font-bold text-white m-0 drop-shadow-lg">Welcome to Inner Veda</h2>
              </div>
              
              <div className="bg-gradient-to-r from-red-900/30 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 shadow-xl">
                <p className="text-gray-300 leading-relaxed m-0">
                  Inner Veda ("we," "our," or "us") is committed to protecting your privacy and ensuring 
                  the security of your personal information. This Privacy Policy describes how we collect, 
                  use, disclose, and safeguard your information when you visit our website innerveda.in, 
                  use our services, or purchase our A-ZEN wellness products.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <section className="mb-12 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30 shadow-lg shadow-red-900/20">
                  <span className="text-lg">📊</span>
                </div>
                <h2 className="text-2xl font-bold text-white m-0 drop-shadow-lg">Information We Collect</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-xl hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-red-400 mb-4">Personal Information You Provide</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong className="text-red-400">Account Information:</strong> Username, password, preferences</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong className="text-red-400">Payment Information:</strong> Credit card details, billing address (processed securely)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong className="text-red-400">Health Information:</strong> Dietary preferences, wellness goals, health conditions (optional)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong className="text-red-400">Communication:</strong> Messages, reviews, feedback, customer service interactions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-xl hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-red-400 mb-4">Information Collected Automatically</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong className="text-red-400">Device Information:</strong> IP address, browser type, device type, operating system</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong className="text-red-400">Usage Data:</strong> Pages visited, time spent, click patterns, referral sources</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong className="text-red-400">Location Data:</strong> General location based on IP address (not precise location)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span><strong className="text-red-400">Cookies & Tracking:</strong> Website preferences, session data, analytics information</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30 shadow-lg shadow-red-900/20">
                  <span className="text-lg">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-white m-0 drop-shadow-lg">How We Use Your Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-xl hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-lg font-bold text-red-400 mb-4">🛍️ Order Processing</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Process and fulfill your A-ZEN orders</li>
                    <li>• Handle payments and transactions</li>
                    <li>• Arrange delivery and shipping</li>
                    <li>• Send order confirmations and updates</li>
                  </ul>
                </div>

                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-xl hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-lg font-bold text-red-400 mb-4">💬 Customer Service</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Respond to your inquiries and requests</li>
                    <li>• Provide wellness guidance and support</li>
                    <li>• Handle returns and refunds</li>
                    <li>• Resolve technical issues</li>
                  </ul>
                </div>

                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-xl hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-lg font-bold text-red-400 mb-4">📧 Communications</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Send promotional offers (with consent)</li>
                    <li>• Share wellness tips and content</li>
                    <li>• Notify about new products</li>
                    <li>• Send important account updates</li>
                  </ul>
                </div>

                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-xl hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-lg font-bold text-red-400 mb-4">🔍 Analytics</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Improve our website and services</li>
                    <li>• Understand user preferences</li>
                    <li>• Develop new products</li>
                    <li>• Ensure security and prevent fraud</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-12 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30 shadow-lg shadow-red-900/20">
                  <span className="text-lg">🤝</span>
                </div>
                <h2 className="text-2xl font-bold text-white m-0 drop-shadow-lg">Information Sharing</h2>
              </div>

              <div className="bg-gradient-to-r from-red-900/40 to-red-800/30 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30 mb-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">🛡️</span>
                  <h3 className="text-lg font-bold text-red-300">We Never Sell Your Personal Information</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Inner Veda does not sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </div>

              <h3 className="text-xl font-bold text-white mb-4">We may share your information with:</h3>
              <div className="space-y-4">
                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-4 border border-red-500/20 shadow-lg hover:shadow-red-900/20 hover:shadow-xl transition-all duration-300">
                  <h4 className="font-bold text-red-400 mb-2">🚚 Service Providers</h4>
                  <p className="text-gray-300 text-sm">Delivery partners, payment processors, and technology providers who help us operate our business.</p>
                </div>
                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-4 border border-red-500/20 shadow-lg hover:shadow-red-900/20 hover:shadow-xl transition-all duration-300">
                  <h4 className="font-bold text-red-400 mb-2">⚖️ Legal Requirements</h4>
                  <p className="text-gray-300 text-sm">When required by law, court order, or government regulation, or to protect our rights and safety.</p>
                </div>
                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-4 border border-red-500/20 shadow-lg hover:shadow-red-900/20 hover:shadow-xl transition-all duration-300">
                  <h4 className="font-bold text-red-400 mb-2">🔄 Business Transfers</h4>
                  <p className="text-gray-300 text-sm">In the event of a merger, acquisition, or sale of assets, with appropriate notice to you.</p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30 shadow-lg shadow-red-900/20">
                  <span className="text-lg">🔒</span>
                </div>
                <h2 className="text-2xl font-bold text-white m-0 drop-shadow-lg">Data Security</h2>
              </div>

              <div className="bg-gradient-to-r from-red-900/30 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 shadow-xl">
                <p className="text-gray-300 leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-red-400 text-lg">🔐</span>
                    <span className="text-sm text-gray-300">SSL encryption for data transmission</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-400 text-lg">🛡️</span>
                    <span className="text-sm text-gray-300">Secure server infrastructure</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-400 text-lg">👤</span>
                    <span className="text-sm text-gray-300">Access controls and authentication</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-400 text-lg">🔄</span>
                    <span className="text-sm text-gray-300">Regular security audits and updates</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30 shadow-lg shadow-red-900/20">
                  <span className="text-lg">⚖️</span>
                </div>
                <h2 className="text-2xl font-bold text-white m-0 drop-shadow-lg">Your Privacy Rights</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-xl hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400 text-xl mt-1">👁️</span>
                    <div>
                      <h3 className="font-bold text-red-400 mb-2">Access Your Data</h3>
                      <p className="text-gray-300 text-sm">Request a copy of the personal information we hold about you.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-xl hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400 text-xl mt-1">✏️</span>
                    <div>
                      <h3 className="font-bold text-red-400 mb-2">Update Your Information</h3>
                      <p className="text-gray-300 text-sm">Correct or update any inaccurate personal information.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-xl hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400 text-xl mt-1">🗑️</span>
                    <div>
                      <h3 className="font-bold text-red-400 mb-2">Delete Your Data</h3>
                      <p className="text-gray-300 text-sm">Request deletion of your personal information (subject to legal requirements).</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-xl hover:shadow-red-900/20 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-red-400 text-xl mt-1">📧</span>
                    <div>
                      <h3 className="font-bold text-red-400 mb-2">Opt-Out of Marketing</h3>
                      <p className="text-gray-300 text-sm">Unsubscribe from promotional emails and marketing communications.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-12 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30 shadow-lg shadow-red-900/20">
                  <span className="text-lg">🍪</span>
                </div>
                <h2 className="text-2xl font-bold text-white m-0 drop-shadow-lg">Cookies Policy</h2>
              </div>

              <div className="bg-gradient-to-r from-red-900/30 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 shadow-xl">
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use cookies to enhance your experience on our website. Cookies are small text files 
                  stored on your device that help us remember your preferences and improve our services.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-red-500/20 shadow-lg">
                    <h4 className="font-bold text-red-400 mb-2">Essential Cookies</h4>
                    <p className="text-sm text-gray-300">Required for basic website functionality</p>
                  </div>
                  <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-red-500/20 shadow-lg">
                    <h4 className="font-bold text-red-400 mb-2">Analytics Cookies</h4>
                    <p className="text-sm text-gray-300">Help us understand website usage</p>
                  </div>
                  <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 border border-red-500/20 shadow-lg">
                    <h4 className="font-bold text-red-400 mb-2">Preference Cookies</h4>
                    <p className="text-sm text-gray-300">Remember your settings and choices</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30 shadow-lg shadow-red-900/20">
                  <span className="text-lg">📞</span>
                </div>
                <h2 className="text-2xl font-bold text-white m-0 drop-shadow-lg">Contact Us About Privacy</h2>
              </div>

              <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 text-white shadow-2xl border border-red-500/30">
                <p className="text-gray-200 mb-6 leading-relaxed">
                  If you have any questions about this Privacy Policy or want to exercise your privacy rights, 
                  please don't hesitate to contact us:
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="font-bold text-white">Email</p>
                      <p className="text-gray-200 text-sm">innervedacare@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-bold text-white">Phone</p>
                      <p className="text-gray-200 text-sm">9113920980</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👤</span>
                    <div>
                      <p className="font-bold text-white">Contact Person</p>
                      <p className="text-gray-200 text-sm">Sonam Garg</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/terms" className="bg-gray-700/40 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium border border-red-500/20 hover:bg-red-600/20 hover:shadow-lg hover:shadow-red-900/20 hover:scale-105 transition-all duration-300">
              Terms of Service
            </a>
            <a href="/contact" className="bg-gray-700/40 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium border border-red-500/20 hover:bg-red-600/20 hover:shadow-lg hover:shadow-red-900/20 hover:scale-105 transition-all duration-300">
              Contact Support
            </a>
            <a href="/faq" className="bg-gray-700/40 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium border border-red-500/20 hover:bg-red-600/20 hover:shadow-lg hover:shadow-red-900/20 hover:scale-105 transition-all duration-300">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
