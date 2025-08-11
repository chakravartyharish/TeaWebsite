'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CartItem, getCart, getTotals } from '@/lib/cart';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart data from localStorage
  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const totals = getTotals(cartItems);
  const { subtotal, shipping, total } = totals;

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error('Failed to load Razorpay script');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createRazorpayOrder = async () => {
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded) {
      alert('Payment system is loading. Please try again in a moment.');
      return;
    }

    try {
      setIsProcessing(true);
      const orderData = await createRazorpayOrder();

      if (!orderData.success) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Inner Veda',
        description: 'Premium Tea Collection',
        order_id: orderData.order_id,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              alert('🎉 Payment successful! Your order has been placed. You will receive a confirmation email shortly.');
              // Here you would typically redirect to a success page or clear the cart
              window.location.href = '/order-success';
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        theme: {
          color: '#0D3B2E', // tea-forest color
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleCODOrder = async () => {
    setIsProcessing(true);
    
    // Simulate COD order processing
    setTimeout(() => {
      alert('🎉 Order placed successfully with Cash on Delivery! You will receive a confirmation call shortly.');
      setIsProcessing(false);
      // Here you would typically save the order and redirect
      window.location.href = '/order-success';
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    if (paymentMethod === 'razorpay') {
      await handleRazorpayPayment();
    } else {
      await handleCODOrder();
    }
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
            <Link href="/products" className="text-tea-forest hover:text-green-800">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-tea-forest mb-8 text-center">Checkout</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some premium teas to your cart before checkout.</p>
            <Link href="/products" className="bg-tea-forest text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-tea-forest mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.variantId} className="flex items-center space-x-4 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 bg-tea-forest rounded-lg flex items-center justify-center text-white font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.priceInr * item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              {shipping === 0 && (
                <p className="text-sm text-green-600">🎉 Free shipping on orders above ₹500!</p>
              )}
              <div className="flex justify-between text-xl font-bold pt-2 border-t">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-tea-forest mb-6">Shipping Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tea-forest focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tea-forest focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tea-forest focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tea-forest focus:border-transparent"
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tea-forest focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tea-forest focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tea-forest focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tea-forest focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="bg-tea-cream rounded-lg p-4">
                <h3 className="font-semibold text-tea-forest mb-3">Payment Method</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="razorpay" 
                      name="payment" 
                      value="razorpay" 
                      checked={paymentMethod === 'razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="razorpay" className="text-sm font-medium">💳 Online Payment (Razorpay)</label>
                  </div>
                  <p className="text-xs text-gray-600 ml-6">Pay securely with UPI, Cards, Net Banking, Wallets</p>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="cod" 
                      name="payment" 
                      value="cod" 
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="cod" className="text-sm font-medium">💵 Cash on Delivery (COD)</label>
                  </div>
                  <p className="text-xs text-gray-600 ml-6">Pay when your order arrives at your doorstep</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || (paymentMethod === 'razorpay' && !razorpayLoaded)}
                className="w-full bg-tea-forest text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing 
                  ? 'Processing...' 
                  : paymentMethod === 'razorpay' 
                    ? `Pay Now - ₹${total}` 
                    : `Place Order (COD) - ₹${total}`
                }
              </button>
              
              {paymentMethod === 'razorpay' && !razorpayLoaded && (
                <p className="text-sm text-gray-500 text-center">Loading payment system...</p>
              )}

              <p className="text-xs text-gray-500 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}


