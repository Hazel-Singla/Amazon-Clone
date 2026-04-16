'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productAPI } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import ImageCarousel from '@/components/ImageCarousel';
import { FaStar, FaHeart } from 'react-icons/fa';
import { wishlistAPI } from '@/lib/wishlistApi';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getById(id as string);
        setProduct(response.data);
        
        // Check if in wishlist
        try {
          const wishlistRes = await wishlistAPI.checkWishlist(parseInt(id as string));
          setInWishlist(wishlistRes.data.in_wishlist);
        } catch (error) {
          console.error('Error checking wishlist:', error);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(product.id, quantity);
      // Show success feedback
      const buttons = document.querySelectorAll('button');
      const addToCartButton = Array.from(buttons).find(b => b.textContent === 'Add to Cart');
      if (addToCartButton) {
        const originalText = addToCartButton.textContent;
        addToCartButton.textContent = 'Added to Cart!';
        addToCartButton.classList.add('bg-green-500');
        setTimeout(() => {
          addToCartButton.textContent = originalText;
          addToCartButton.classList.remove('bg-green-500');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      // Show error feedback
      const buttons = document.querySelectorAll('button');
      const addToCartButton = Array.from(buttons).find(b => b.textContent?.includes('Add to Cart'));
      if (addToCartButton) {
        const originalText = addToCartButton.textContent;
        addToCartButton.textContent = 'Failed!';
        addToCartButton.classList.add('bg-red-500');
        setTimeout(() => {
          addToCartButton.textContent = originalText;
          addToCartButton.classList.remove('bg-red-500');
        }, 2000);
      }
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      // Redirect to checkout with product details in URL
      router.push(`/checkout?buyNow=true&productId=${product.id}&quantity=${quantity}`);
    } catch (error) {
      console.error('Error in Buy Now:', error);
      alert('Failed to proceed to checkout');
    }
  };

  const handleWishlist = async () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <button onClick={() => router.push('/')} className="btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-amazon-blue mb-4">
        <span className="cursor-pointer hover:underline" onClick={() => router.push('/')}>Home</span>
        {' > '}
        <span 
          className="cursor-pointer hover:underline" 
          onClick={() => {
            const encodedCategory = encodeURIComponent(product.category);
            router.push(`/?category=${encodedCategory}`);
          }}
        >
          {product.category}
        </span>
        {' > '}
        <span className="text-gray-600">{product.name}</span>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Carousel */}
          <div className="lg:col-span-2">
            <ImageCarousel images={product.image_urls} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold flex-1">{product.name}</h1>
              <button
                onClick={handleWishlist}
                className="ml-4 bg-white border border-gray-300 rounded-full p-2 hover:shadow-lg transition-shadow"
              >
                <FaHeart
                  className={`text-2xl ${
                    inWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex star-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(product.rating) ? 'text-amazon-orange' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-amazon-blue">{product.rating} ratings</span>
            </div>

            <hr />

            {/* Price */}
            <div>
              <span className="text-sm text-gray-600">Price:</span>
              <div className="text-3xl font-bold mt-1">
                <span className="text-sm align-super">₹</span>
                {Math.floor(product.price).toLocaleString('en-IN')}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-bold mb-2">About this item:</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div>
              {product.stock_quantity > 0 ? (
                <p className="text-green-600 font-bold text-lg">In Stock</p>
              ) : (
                <p className="text-red-600 font-bold text-lg">Out of Stock</p>
              )}
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="font-bold mr-2">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2"
              >
                {[...Array(Math.min(10, product.stock_quantity || 0))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0 || addingToCart}
                className="btn-primary w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock_quantity === 0}
                className="btn-secondary w-full"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
