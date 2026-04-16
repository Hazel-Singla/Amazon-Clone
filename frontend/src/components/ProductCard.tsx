'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { wishlistAPI } from '@/lib/wishlistApi';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    rating: number;
    image_urls?: string[];
    images?: string[];
    stock_quantity?: number;
    stock?: number;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [inWishlist, setInWishlist] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    checkWishlist();
  }, [product.id]);

  const checkWishlist = async () => {
    try {
      const response = await wishlistAPI.checkWishlist(product.id);
      setInWishlist(response.data.in_wishlist);
    } catch (error) {
      console.error('Error checking wishlist:', error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Capture button reference before async operation
    const button = e.currentTarget;
    const originalText = button.textContent;
    
    try {
      setAddingToCart(true);
      await addToCart(product.id, 1);
      // Show success message
      button.textContent = 'Added!';
      button.classList.add('bg-green-500');
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-500');
      }, 1500);
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      // Show error feedback
      button.textContent = 'Failed!';
      button.classList.add('bg-red-500');
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-red-500');
      }, 2000);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (inWishlist) {
        await wishlistAPI.removeFromWishlist(product.id);
        setInWishlist(false);
      } else {
        await wishlistAPI.addToWishlist(product.id);
        setInWishlist(true);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`inline ${i <= Math.round(rating) ? 'text-amazon-orange' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card bg-white border border-gray-200 rounded-lg p-4 h-full flex flex-col cursor-pointer relative">
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
        >
          <FaHeart
            className={`text-xl ${
              inWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </button>

        {/* Product Image */}
        <div className="relative w-full h-64 mb-3 bg-gray-50 rounded">
          <Image
            src={(product.image_urls || product.images || ['/placeholder.jpg'])[0]}
            alt={product.name}
            fill
            className="object-contain p-2"
          />
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-medium text-amazon-blue line-clamp-2 mb-2 hover:text-orange-600 hover:underline">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center star-rating">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-amazon-blue ml-1">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="mb-2">
          <span className="text-xs align-super">₹</span>
          <span className="text-2xl font-semibold">
            {Math.floor(product.price).toLocaleString('en-IN')}
          </span>
        </div>

        {/* Stock Status */}
        {(product.stock_quantity || product.stock || 0) > 0 && (product.stock_quantity || product.stock || 0) <= 10 && (
          <p className="text-sm text-red-600 mb-2">
            Only {product.stock_quantity || product.stock} left in stock
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={addingToCart}
          className="btn-primary w-full mt-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {addingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}
