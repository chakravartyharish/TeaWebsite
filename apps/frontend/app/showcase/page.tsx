import Link from "next/link";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white">
      <div className="absolute inset-0 bg-red-900/5"></div>
      <div className="relative px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-red-600/30">
            <span className="text-red-400">🍃</span>
            <span className="text-sm font-medium tracking-wider">INNER VEDA</span>
          </div>
          <h1 className="font-heading text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
            Sacred Herb Elixirs
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ancient Ayurvedic wisdom meets modern convenience. Transform your daily ritual with our premium tea blends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-red-300">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-sm">16 CUPS PER PACK</span>
            </div>
            <div className="flex items-center gap-2 text-red-300">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-sm">PURE & SAFE</span>
            </div>
            <div className="flex items-center gap-2 text-red-300">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-sm">PLANT BASED</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent"></div>
    </section>
  );
}



function BenefitsSection() {
  const benefits = [
    {
      icon: "🧘‍♂️",
      title: "Calm & Focused Mind",
      description: "Ancient herbs work synergistically to promote mental clarity and reduce stress naturally."
    },
    {
      icon: "✨",
      title: "Radiant Skin",
      description: "Antioxidant-rich ingredients support healthy, glowing skin from within."
    },
    {
      icon: "🌿",
      title: "Pure & Safe",
      description: "Carefully sourced, tested ingredients with no artificial additives or preservatives."
    },
    {
      icon: "🌱",
      title: "Plant Based",
      description: "100% natural, vegan-friendly formulation respecting traditional Ayurvedic principles."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose Our Sacred Elixirs?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the perfect blend of ancient wisdom and modern convenience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-zinc-800 border border-red-800/30 rounded-2xl shadow-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-red-900/20 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  // Dynamic testimonials could be fetched from MongoDB in the future
  // For now using minimal curated testimonials relevant to tea wellness
  const testimonials = [
    {
      name: "Tea Enthusiast",
      role: "Customer",
      content: "Excellent quality teas with authentic flavors and wonderful health benefits.",
      rating: 5
    },
    {
      name: "Wellness Seeker", 
      role: "Customer",
      content: "Great selection of premium teas that truly enhance my daily wellness routine.",
      rating: 5
    },
    {
      name: "Tea Connoisseur",
      role: "Customer", 
      content: "Outstanding craftsmanship in every blend. Highly recommend for tea lovers.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-300">
            Join our community of wellness enthusiasts
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-3xl shadow-2xl border border-red-900/20">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





export default function ShowcasePage() {

  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <BenefitsSection />

      <TestimonialsSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-black via-zinc-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Wellness Journey?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands who have discovered the power of ancient Ayurvedic wisdom in modern convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop All Products
            </Link>
            <Link 
              href="/"
              className="border-2 border-red-600 text-red-400 hover:text-white py-4 px-8 rounded-2xl font-bold hover:bg-red-600 transition-all duration-300"
            >
              Explore More Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
