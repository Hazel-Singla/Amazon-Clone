'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { orderAPI } from '@/lib/api';
import Link from 'next/link';

interface Order {
  id: number;
  orderId?: string;
  userId?: number;
  total_amount?: string;
  totalPrice?: string;
  shipping_address?: string;
  shippingAddress?: string;
  status?: string;
  created_at?: string;
  createdAt?: string;
  itemsPrice?: string;
  shippingPrice?: string;
  taxPrice?: string;
  paymentMethod?: string;
  items?: Array<{
    id: number;
    name: string;
    price: string;
    quantity: number;
    qty?: number;
    image_urls?: string[];
    images?: string;
    image?: string;
    productId?: number;
    product_id?: number;
  }>;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getUserOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-xl">Loading your orders...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h1 className="text-3xl font-bold">Your Orders</h1>
        {user && (
          <p className="text-gray-600 mt-2">
            Showing orders for: <span className="font-bold">{user.name}</span> ({user.email})
          </p>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-lg border border-gray-200 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <button
            onClick={() => router.push('/')}
            className="bg-amazon-yellow hover:bg-yellow-500 px-6 py-3 rounded-lg font-bold"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">
                      <span className="font-bold">ORDER PLACED:</span>{' '}
                      {new Date(order.created_at || order.createdAt || Date.now()).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-sm">
                      <span className="font-bold">ORDER ID:</span>{' '}
                      <span className="text-amazon-blue">#{order.orderId || order.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="text-xl font-bold">
                      ₹{Math.floor(parseFloat(order.total_amount || order.totalPrice || '0')).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Items */}
                  <div className="md:col-span-2">
                    <h3 className="font-bold mb-2">Items</h3>
                    {order.items && order.items.length > 0 ? (
                      <div className="space-y-2">
                        {order.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex gap-3 items-center">
                            <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                              {item.image_urls && item.image_urls.length > 0 ? (
                                <img
                                  src={item.image_urls[0]}
                                  alt={item.name}
                                  className="w-full h-full object-contain p-1"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full text-2xl">
                                  📦
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.name}</p>
                              <p className="text-xs text-gray-600">Qty: {item.quantity || item.qty}</p>
                              <p className="text-sm font-bold">
                                ₹{Math.floor(parseFloat(item.price)).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-sm text-amazon-blue">
                            + {order.items.length - 3} more item(s)
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">No items found</p>
                    )}
                  </div>

                  {/* Shipping & Status */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold mb-1 text-sm">Shipping Address</h3>
                      <p className="text-sm text-gray-700">{order.shipping_address || order.shippingAddress || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 text-sm">Order Status</h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-700'
                            : order.status === 'confirmed'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                      </span>
                    </div>
                    <Link
                      href={`/order-confirmation/${order.id}`}
                      className="block text-center bg-amazon-yellow hover:bg-yellow-500 px-4 py-2 rounded-lg font-bold text-sm"
                    >
                      View Order Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
