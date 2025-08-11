import Image from 'next/image';
import Link from 'next/link';

export default function AZenLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-tea-cream to-green-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-tea-forest/90 to-green-900/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-2xl">🍃</span>
                  <span className="text-sm font-medium">INNER VEDA</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                  A-ZEN
                </h1>
                <p className="text-xl lg:text-2xl font-light opacity-90">
                  CALM & FOCUSED MIND + RADIANT SKIN
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-semibold">
                  INSTANT TEA/LATTE MIX
                </h2>
                <p className="text-lg opacity-90 max-w-md">
                  Hand crafted with 5 sacred herbs. Ancient wisdom for modern mind.
                  Just add hot milk/water.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-sm font-medium">16 CUPS</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-sm font-medium">PURE & SAFE</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-sm font-medium">PLANT BASED</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/products" className="bg-white text-tea-forest px-8 py-4 rounded-full font-semibold text-lg hover:bg-tea-cream transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                  Order Now - ₹249
                </Link>
                <Link href="/showcase" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-tea-forest transition-all duration-300 text-center">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Content - Product Image */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-full blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🍃</span>
                    </div>
                    <div>
                      <h3 className="text-white text-2xl font-bold mb-2">INNER VEDA</h3>
                      <h2 className="text-white text-4xl font-black tracking-wider mb-4">A-ZEN</h2>
                      <p className="text-white/90 text-sm mb-6">CALM & FOCUSED MIND + RADIANT SKIN</p>
                    </div>
                    
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-2xl">
                        <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center">
                          <span className="text-4xl">☕</span>
                        </div>
                      </div>
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-green-500 rounded-full"></div>
                      <div className="absolute -top-1 -right-3 w-6 h-6 bg-green-400 rounded-full"></div>
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-600 rounded-full"></div>
                      <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 rounded-full"></div>
                    </div>
                    
                    <div className="text-white space-y-2">
                      <h4 className="text-xl font-bold">INSTANT TEA/LATTE MIX</h4>
                      <p className="text-sm opacity-90">JUST ADD HOT MILK/WATER</p>
                      <p className="text-xs opacity-75">HAND CRAFTED WITH 5 SACRED HERBS, ANCIENT WISDOM FOR MODERN MIND</p>
                      <p className="text-sm font-semibold">16 CUPS / PURE & SAFE / PLANT BASED</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-tea-forest mb-4">CALM BLEND</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Five sacred herbs carefully selected for their unique properties to bring you peace, focus, and radiant skin.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-tea-cream rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { name: "Shankhpushpi", title: "The Quieter", benefit: "Eases mental noise and reduces anxiety in 30 minutes." },
                { name: "Brahmi", title: "The Builder", benefit: "Nourishes memory, clarity, and mindful focus." },
                { name: "Tulsi", title: "The Shield", benefit: "Protects your peace from stress." },
                { name: "Rose Petals", title: "The Soother", benefit: "Energizes skin to glow from within." },
                { name: "Yashtimadhu", title: "The Harmonizer", benefit: "Gently sweetens without impacting insulin." }
              ].map((ingredient, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-tea-forest rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {ingredient.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-tea-forest">{ingredient.name}</h3>
                  <p className="text-sm italic text-gray-600">{ingredient.title}</p>
                  <p className="text-sm text-gray-700">{ingredient.benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="bg-amber-100 border border-amber-300 rounded-2xl p-6 max-w-4xl mx-auto">
                <p className="text-amber-800 font-medium italic text-lg">
                  "When your mind reaches for a quick fix – reach inward instead. This is your calm ritual – no jitters, no crashes."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-gradient-to-br from-tea-forest to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">How to Prepare Your A-ZEN</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center text-3xl">
                🥄
              </div>
              <h3 className="text-xl font-semibold">Step 1</h3>
              <p>Whisk 1/2 tsp (2.5 gms) in 50 ml hot milk/water</p>
            </div>
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center text-3xl">
                💧
              </div>
              <h3 className="text-xl font-semibold">Step 2</h3>
              <p>Pour remaining 100 ml hot liquid</p>
            </div>
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center text-3xl">
                🍯
              </div>
              <h3 className="text-xl font-semibold">Step 3</h3>
              <p>Add honey if desired. Enjoy your calm ritual!</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <p className="text-lg">
              Enjoy up to twice a day, like tea/coffee. Consistency enhances stress combating ability of mind and body.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Product Details</h4>
              <p>NET WT: 40g</p>
              <p>BEST BEFORE: 8 months</p>
              <p>MRP: ₹249</p>
              <p>DATE: 23/07/2025</p>
            </div>
            <div className="bg-amber-100/20 border border-amber-300/30 rounded-xl p-4">
              <h4 className="font-semibold mb-2 text-amber-200">CAUTION:</h4>
              <p className="text-amber-100">Consult your physician if pregnant, nursing, or under medication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Order Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-tea-forest mb-8">Ready to Begin Your Calm Journey?</h2>
          
          <div className="bg-gradient-to-r from-tea-forest to-green-800 text-white rounded-3xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-4">Order Your A-ZEN Today</h3>
            <p className="text-xl mb-6">Transform your daily routine with ancient wisdom</p>
            <Link href="/products" className="bg-white text-tea-forest px-12 py-4 rounded-full font-bold text-xl hover:bg-tea-cream transition-all duration-300 transform hover:scale-105 shadow-lg text-center inline-block">
              Order Now - ₹249
            </Link>
          </div>

          <div className="space-y-4 text-tea-forest">
            <h3 className="text-2xl font-semibold mb-6">Place your orders and share your feedback on:</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">📧</span>
                <span>careinnerveda@gmail.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">📱</span>
                <span>+919538571515</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">📷</span>
                <span>@inner.veda</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">FSSAI: 11424999000075</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tea-forest text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🍃</span>
            <span className="text-xl font-bold">INNER VEDA</span>
          </div>
          <p className="text-tea-cream">Ancient wisdom for modern living</p>
        </div>
      </footer>
    </div>
  );
}
