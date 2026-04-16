'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { orderAPI } from '@/lib/api';
import Image from 'next/image';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getOrder(id as string);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <button onClick={() => router.push('/')} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Success Message */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-2 text-green-600">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-4">Thank you for your purchase</p>
        <div className="bg-gray-50 p-4 rounded inline-block">
          <span className="text-sm text-gray-600">Order ID: </span>
          <span className="text-xl font-bold">#{order.id}</span>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-600">Order Date:</span>
            <p className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-gray-600">Order ID:</span>
            <p className="font-bold">{order.orderId}</p>
          </div>
          <div>
            <span className="text-gray-600">Shipping Address:</span>
            <p className="font-bold">{typeof order.shippingAddress === 'string' ? order.shippingAddress : order.shippingAddress}</p>
          </div>
          <div>
            <span className="text-gray-600">Payment Method:</span>
            <p className="font-bold">{order.paymentMethod}</p>
          </div>
          <div>
            <span className="text-gray-600">Items Price:</span>
            <p className="font-bold">₹{Math.floor(parseFloat(order.itemsPrice)).toLocaleString('en-IN')}</p>
          </div>
          <div>
            <span className="text-gray-600">Shipping:</span>
            <p className="font-bold">₹{Math.floor(parseFloat(order.shippingPrice)).toLocaleString('en-IN')}</p>
          </div>
          <div>
            <span className="text-gray-600">Tax:</span>
            <p className="font-bold">₹{Math.floor(parseFloat(order.taxPrice)).toLocaleString('en-IN')}</p>
          </div>
          <div>
            <span className="text-gray-600">Total Amount:</span>
            <p className="font-bold text-xl">₹{Math.floor(parseFloat(order.totalPrice)).toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Items Ordered</h2>
        <div className="space-y-4">
          {order.items && order.items.length > 0 ? (
            order.items.map((item: any) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4 last:border-0">
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded">
                  <Image
                    src={item.image_urls && item.image_urls.length > 0 ? item.image_urls[0] : (item.image || '/placeholder.jpg')}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600">Quantity: {item.qty || item.quantity}</p>
                  <p className="text-lg font-bold mt-1">
                    <span className="text-sm align-super">₹</span>
                    {Math.floor(item.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No items found</p>
          )}
        </div>
      </div>

      {/* Continue Shopping Button */}
      <div className="text-center">
        <button onClick={() => router.push('/')} className="btn-primary text-lg px-8 py-3">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
