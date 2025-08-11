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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-tea-cream to-green-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🍃</span>
              <span className="text-xl font-bold text-tea-forest">Inner Veda</span>
            </Link>
            
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative bg-tea-forest text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors"
            >
              🛒 Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-tea-forest">Your Cart</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.variantId} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      <div className="w-16 h-16 bg-tea-forest rounded-lg flex items-center justify-center text-white font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <p className="text-gray-600 text-sm">₹{item.priceInr} × {item.qty}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.variantId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total: ₹{getTotalPrice()}</span>
                  </div>
                  <Link 
                    href="/checkout"
                    className="w-full bg-tea-forest text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors block text-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-tea-forest mb-4">Premium Tea Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handcrafted selection of premium teas, each carefully sourced and blended for the perfect experience.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-tea-forest"></div>
            <p className="mt-4 text-gray-600">Loading premium teas...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">⚠️ {error}</div>
            <button 
              onClick={fetchProducts}
              className="bg-tea-forest text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-tea-forest to-green-800 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-6xl text-white font-bold">{product.name.charAt(0)}</span>
                </div>
                {product.original_price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹{product.original_price - product.price}
                  </div>
                )}
                {!product.in_stock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-tea-forest font-medium bg-tea-cream px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-tea-forest mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.benefits.slice(0, 2).map((benefit, index) => (
                    <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-tea-forest">₹{product.price}</span>
                  {product.original_price && (
                    <span className="text-lg text-gray-500 line-through">₹{product.original_price}</span>
                  )}
                </div>

                {/* Quantity and Add to Cart */}
                {product.in_stock ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(product.id, Math.max(1, (selectedQuantities[product.id] || 1) - 1))}
                        className="px-3 py-2 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300">
                        {selectedQuantities[product.id] || 1}
                      </span>
                      <button 
                        onClick={() => updateQuantity(product.id, (selectedQuantities[product.id] || 1) + 1)}
                        className="px-3 py-2 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-tea-forest text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <button 
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
)}
        {/* Featured Section */}
        <div className="mt-16 bg-gradient-to-r from-tea-forest to-green-800 rounded-3xl p-8 lg:p-12 text-white text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Inner Veda?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="space-y-3">
              <div className="text-4xl">🌿</div>
              <h3 className="text-xl font-semibold">100% Natural</h3>
              <p className="text-tea-cream">All our teas are sourced from organic farms with no artificial additives.</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl">🚚</div>
              <h3 className="text-xl font-semibold">Free Shipping</h3>
              <p className="text-tea-cream">Free delivery on orders above ₹500. Fast and secure packaging.</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl">💯</div>
              <h3 className="text-xl font-semibold">Quality Guaranteed</h3>
              <p className="text-tea-cream">30-day money-back guarantee if you're not completely satisfied.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
