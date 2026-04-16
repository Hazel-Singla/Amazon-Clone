'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const { items, loading, updateQuantity, removeFromCart, getSubtotal } = useCart();
  const router = useRouter();

  const subtotal = getSubtotal();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <button onClick={() => router.push('/')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-3 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 flex gap-4">
              {/* Product Image */}
              <div className="relative w-32 h-32 flex-shrink-0 bg-gray-50 rounded">
                <Image
                  src={item.image_urls[0] || '/placeholder.jpg'}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h3
                  className="text-lg font-medium text-amazon-blue hover:underline cursor-pointer mb-2"
                  onClick={() => router.push(`/product/${item.product_id}`)}
                >
                  {item.name}
                </h3>
                <p className="text-green-600 text-sm mb-2">In Stock</p>
                <div className="text-2xl font-bold">
                  <span className="text-sm align-super">₹</span>
                  {Math.floor(item.price).toLocaleString('en-IN')}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="text-red-600 hover:text-red-700"
                  title="Remove item"
                >
                  <FaTrash />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="font-bold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    disabled={item.quantity >= item.stock_quantity}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items ({itemCount}):</span>
                <span className="font-bold">
                  ₹{Math.floor(subtotal).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Subtotal:</span>
              <span>
                ₹{Math.floor(subtotal).toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={() => router.push('/checkout')}
              className="btn-primary w-full"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
