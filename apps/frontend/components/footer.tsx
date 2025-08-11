import Link from "next/link"

export default function Footer(){
  return (
    <footer className="bg-gradient-to-br from-tea-forest via-green-800 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">🍃</span>
              </div>
              <span className="font-bold text-xl">INNER VEDA</span>
            </div>
            <p className="text-tea-cream mb-6 max-w-md leading-relaxed">
              Ancient wisdom for modern living. Experience the perfect blend of traditional Ayurvedic herbs 
              crafted for your wellness journey.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:innervedacare@gmail.com" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-lg">📧</span>
              </a>
              <a href="tel:9113920980" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-lg">📱</span>
              </a>
              <a href="https://instagram.com/innerveda.in" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-lg">📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-tea-cream">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/showcase" className="hover:text-white transition-colors">About A-ZEN</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-tea-cream">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Information Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8 text-sm text-tea-cream">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>innervedacare@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <span>9113920980</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📷</span>
                <span>@innerveda.in</span>
              </div>
            </div>
            <div className="text-sm text-tea-cream">
              Contact: Sonam Garg
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-tea-cream">
              © {new Date().getFullYear()} Inner Veda. All rights reserved.
            </div>
            <div className="text-sm text-tea-cream">
              Made with 🍃 for your wellness journey
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


