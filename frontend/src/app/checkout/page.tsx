'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { orderAPI, productAPI } from '@/lib/api';

interface BuyNowItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_urls: string[];
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, getSubtotal, clearCart, fetchCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const isBuyNow = searchParams.get('buyNow') === 'true';

  useEffect(() => {
    if (isBuyNow) {
      const productId = searchParams.get('productId');
      const quantity = parseInt(searchParams.get('quantity') || '1');
      
      if (productId) {
        fetchBuyNowProduct(parseInt(productId), quantity);
      }
    } else {
      setLoadingProduct(false);
    }
  }, [isBuyNow, searchParams]);

  const fetchBuyNowProduct = async (productId: number, quantity: number) => {
    try {
      const response = await productAPI.getById(productId.toString());
      const product = response.data;
      setBuyNowItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image_urls: product.image_urls || []
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product details');
      router.push('/');
    } finally {
      setLoadingProduct(false);
    }
  };

  // Calculate totals based on whether it's Buy Now or cart checkout
  const checkoutItems = isBuyNow ? (buyNowItem ? [buyNowItem] : []) : items;
  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 499 : 0; // ₹499 shipping
  const tax = subtotal * 0.18; // 18% GST for India
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const shippingAddress = `${formData.fullName}, ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, Phone: ${formData.phone}`;
      
      console.log('Submitting order...');
      const response = await orderAPI.createOrder(shippingAddress, formData.email);
      
      console.log('Order placed successfully:', response);
      
      // If this was a Buy Now purchase, don't clear the cart
      if (!isBuyNow) {
        clearCart();
      }
      
      router.push(`/order-confirmation/${response.data.id}`);
    } catch (error: any) {
      console.error('Error placing order:', error);
      alert(error.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">No items to checkout</h1>
          <button onClick={() => router.push('/')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {isBuyNow ? 'Buy Now' : 'Checkout'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-lg py-3 mt-6"
              >
                {loading ? 'Processing...' : `Place Order - ₹${Math.floor(total).toLocaleString('en-IN')}`}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4 text-sm">
              {checkoutItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{Math.floor(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <hr className="mb-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{Math.floor(subtotal).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{Math.floor(shipping).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span>₹{Math.floor(tax).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <hr className="mb-4" />

            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total:</span>
              <span>₹{Math.floor(total).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
