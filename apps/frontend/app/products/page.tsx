'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem, getCart, addItem, removeItem, getTotals } from '@/lib/cart';
import { getProducts, Product } from '@/lib/api';

export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuantities, setSelectedQuantities] = useState<{[key: string]: number}>({});
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage and fetch products on component mount
  useEffect(() => {
    setCart(getCart());
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    const quantity = selectedQuantities[product.id] || 1;
    
    // Add to centralized cart
    // Create unique numeric ID from MongoDB ObjectId string
    const uniqueVariantId = parseInt(product.id.substring(product.id.length - 8), 16) || Date.now();
    
    addItem({
      variantId: uniqueVariantId, // Use hex conversion of last 8 chars for unique number
      qty: quantity,
      name: product.name,
      priceInr: product.price,
      productSlug: product.slug
    });
    
    // Update local state to reflect changes
    setCart(getCart());
    
    // Reset quantity selector
    setSelectedQuantities({ ...selectedQuantities, [product.id]: 1 });
    
    // Show cart briefly
    setShowCart(true);
    setTimeout(() => setShowCart(false), 2000);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setSelectedQuantities({ ...selectedQuantities, [productId]: quantity });
  };

  const removeFromCart = (variantId: number) => {
    // Remove from centralized cart
    removeItem(variantId);
    // Update local state
    setCart(getCart());
  };

  const getTotalPrice = () => {
    const totals = getTotals(cart);
    return totals.total;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.qty, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🍃</span>
              <span className="text-xl font-bold text-white">Inner Veda</span>
            </Link>
            
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative bg-red-600 text-white px-6 py-2 rounded-sm hover:bg-red-700 transition-all duration-300 font-medium"
            >
              🛒 Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 transition-all duration-300">
          <div className="fixed right-0 top-0 h-full w-96 bg-gray-900 shadow-xl p-6 overflow-y-auto border-l border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.variantId} className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:bg-gray-700">
                      <div className="w-16 h-16 bg-tea-forest rounded-lg flex items-center justify-center text-white font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-white">{item.name}</h3>
                        <p className="text-gray-400 text-sm">₹{item.priceInr} × {item.qty}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.variantId)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-white">Total: ₹{getTotalPrice()}</span>
                  </div>
                  <Link 
                    href="/checkout"
                    className="w-full bg-red-600 text-white py-3 rounded-sm font-semibold hover:bg-red-700 transition-all duration-300 block text-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-tea-forest/80 via-transparent to-transparent"></div>
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Premium Tea<br />Collection
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Discover our handcrafted selection of premium teas, each carefully sourced and blended for the perfect experience.
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-black px-8 py-3 rounded-sm font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2">
                  <span>▶</span>
                  <span>Shop Now</span>
                </button>
                <button className="bg-gray-600/60 text-white px-8 py-3 rounded-sm font-semibold hover:bg-gray-600/80 transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-tea-forest/40 via-tea-leaf/30 to-tea-gold/20"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Loading State */}
        {loading && (
          <div className="py-12">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Loading Popular Teas...</h2>
              <p className="text-gray-400">Discovering your perfect blend</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-gray-900 rounded-sm overflow-hidden animate-pulse">
                  <div className="aspect-[2/3] bg-gray-800"></div>
                  <div className="p-2 md:p-3 space-y-2">
                    <div className="h-4 bg-gray-800 rounded"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-800 rounded w-16"></div>
                      <div className="h-3 bg-gray-800 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4 text-lg">⚠️ {error}</div>
            <button 
              onClick={fetchProducts}
              className="bg-red-600 text-white px-6 py-3 rounded-sm hover:bg-red-700 transition-all duration-300 font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Popular on Inner Veda</h2>
          <p className="text-gray-400">Premium teas loved by our customers</p>
        </div>

        {/* Products Grid */}
        {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {products.map(product => (
            <div key={product.id} className="group relative bg-gray-900 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10">
              {/* Product Image */}
              <div className="relative aspect-[2/3] bg-gradient-to-br from-tea-forest to-tea-leaf flex items-center justify-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl md:text-5xl text-white font-bold">{product.name.charAt(0)}</span>
                </div>
                {product.original_price && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                  </div>
                )}
                {!product.in_stock && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="text-white font-bold text-sm md:text-base">Out of Stock</span>
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 md:p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center space-x-1 mb-2">
                      <span className="text-yellow-400 text-sm">⭐</span>
                      <span className="text-white text-sm">{product.rating}</span>
                      <span className="text-gray-300 text-xs">({product.reviews})</span>
                    </div>
                    <h3 className="text-white font-bold text-sm md:text-base mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-300 text-xs mb-2 line-clamp-2">{product.description}</p>
                    
                    {/* Benefits */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.benefits.slice(0, 2).map((benefit, index) => (
                        <span key={index} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info - Always visible */}
              <div className="p-2 md:p-3">
                <h3 className="text-white font-semibold text-sm md:text-base mb-1 line-clamp-1 group-hover:hidden">{product.name}</h3>
                <div className="flex items-center justify-between group-hover:hidden">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold text-sm md:text-base">₹{product.price}</span>
                    {product.original_price && (
                      <span className="text-gray-500 text-xs line-through">₹{product.original_price}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                {/* Hover actions */}
                <div className="hidden group-hover:block">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold text-lg">₹{product.price}</span>
                      {product.original_price && (
                        <span className="text-gray-500 text-sm line-through">₹{product.original_price}</span>
                      )}
                    </div>
                  </div>
                  
                  {product.in_stock ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center border border-gray-600 rounded bg-gray-800">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(product.id, Math.max(1, (selectedQuantities[product.id] || 1) - 1));
                          }}
                          className="px-2 py-1 text-white hover:bg-gray-700 transition-colors text-sm"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-white text-sm border-x border-gray-600">
                          {selectedQuantities[product.id] || 1}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(product.id, (selectedQuantities[product.id] || 1) + 1);
                          }}
                          className="px-2 py-1 text-white hover:bg-gray-700 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="flex-1 bg-red-600 text-white py-1 px-3 rounded text-sm font-semibold hover:bg-red-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <button 
                      disabled
                      className="w-full bg-gray-700 text-gray-400 py-1 px-3 rounded text-sm font-semibold cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
)}
        {/* Featured Section */}
        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 lg:p-12 text-white border border-gray-700">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Inner Veda?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="space-y-3 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl">🌿</div>
              <h3 className="text-xl font-semibold">100% Natural</h3>
              <p className="text-gray-300">All our teas are sourced from organic farms with no artificial additives.</p>
            </div>
            <div className="space-y-3 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl">🚚</div>
              <h3 className="text-xl font-semibold">Free Shipping</h3>
              <p className="text-gray-300">Free delivery on orders above ₹500. Fast and secure packaging.</p>
            </div>
            <div className="space-y-3 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-4xl">💯</div>
              <h3 className="text-xl font-semibold">Quality Guaranteed</h3>
              <p className="text-gray-300">30-day money-back guarantee if you're not completely satisfied.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
