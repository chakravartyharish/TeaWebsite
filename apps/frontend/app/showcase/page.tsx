import Link from "next/link";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-tea-forest via-emerald-800 to-tea-forest text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <span className="text-emerald-300">🍃</span>
            <span className="text-sm font-medium">INNER VEDA</span>
          </div>
          <h1 className="font-heading text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Sacred Herb Elixirs
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Ancient Ayurvedic wisdom meets modern convenience. Transform your daily ritual with our premium tea blends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-emerald-200">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm">16 CUPS PER PACK</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-200">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm">PURE & SAFE</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-200">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm">PLANT BASED</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
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
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Our Sacred Elixirs?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of ancient wisdom and modern convenience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-600">
            Join our community of wellness enthusiasts
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-3xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
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
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />

      <TestimonialsSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-tea-forest to-emerald-800 text-white">
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
              className="bg-white text-tea-forest py-4 px-8 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop All Products
            </Link>
            <Link 
              href="/"
              className="border-2 border-white text-white py-4 px-8 rounded-2xl font-bold hover:bg-white hover:text-tea-forest transition-all duration-300"
            >
              Explore More Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
