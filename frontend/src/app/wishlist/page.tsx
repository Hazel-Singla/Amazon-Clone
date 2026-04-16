'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { wishlistAPI } from '@/lib/wishlistApi';
import Link from 'next/link';
import { FaTrash, FaShoppingCart, FaHeart } from 'react-icons/fa';

interface WishlistItem {
  id: number;
  product_id: number;
  name: string;
  price: string;
  category: string;
  rating: string;
  stock_quantity: number;
  image_urls: string[];
  created_at: string;
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [movingToCart, setMovingToCart] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistAPI.getWishlist();
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      setItems(items.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const moveToCart = async (productId: number) => {
    try {
      setMovingToCart(productId);
      
      // Add to cart
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity: 1 })
      });

      // Remove from wishlist
      await wishlistAPI.removeFromWishlist(productId);
      setItems(items.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error moving to cart:', error);
    } finally {
      setMovingToCart(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-xl">Loading wishlist...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <FaHeart className="text-3xl text-red-500" />
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
          <span className="text-gray-500">({items.length} items)</span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you love to your wishlist</p>
            <button
              onClick={() => router.push('/')}
              className="bg-amazon-yellow hover:bg-yellow-500 px-6 py-3 rounded-lg font-bold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <Link href={`/product/${item.product_id}`} className="flex-shrink-0">
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                    {item.image_urls && item.image_urls.length > 0 ? (
                      <img
                        src={item.image_urls[0]}
                        alt={item.name}
                        className="w-full h-full object-contain hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="text-gray-400 text-6xl">📦</div>
                    )}
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1">
                  <Link href={`/product/${item.product_id}`}>
                    <h3 className="text-lg font-bold text-amazon-blue hover:text-amazon-orange hover:underline line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="mt-2">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{item.category}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${
                            star <= Math.round(parseFloat(item.rating))
                              ? 'text-amazon-orange'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-amazon-blue text-sm hover:underline cursor-pointer">
                      {item.rating}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{Math.floor(parseFloat(item.price)).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Stock Status */}
                  <div className="mt-2">
                    {parseInt(item.stock_quantity as any) > 0 ? (
                      <span className="text-green-600 text-sm font-semibold">In Stock</span>
                    ) : (
                      <span className="text-red-600 text-sm font-semibold">Out of Stock</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => moveToCart(item.product_id)}
                      disabled={movingToCart === item.product_id}
                      className="bg-amazon-yellow hover:bg-yellow-500 disabled:bg-gray-400 px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                    >
                      <FaShoppingCart />
                      {movingToCart === item.product_id ? 'Moving...' : 'Move to Cart'}
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.product_id)}
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <FaTrash className="text-red-500" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
