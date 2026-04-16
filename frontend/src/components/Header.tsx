'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header>
      {/* Main Header */}
      <div className="bg-amazon-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-white hover:border border-white border-solid p-1 rounded">
              amazon<span className="text-amazon-orange">.clone</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 flex max-w-3xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 text-black rounded-l focus:outline-none"
            />
            <button
              type="submit"
              className="bg-amazon-orange hover:bg-orange-400 px-4 py-2 rounded-r transition-colors"
            >
              <FaSearch className="text-amazon-dark" />
            </button>
          </form>

          {/* Right Navigation */}
          <div className="flex items-center gap-3">
            {/* User */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/orders" className="hover:border border-white border-solid p-2 rounded">
                  <div className="text-sm">
                    <div className="text-gray-300 text-xs">Returns</div>
                    <div className="font-bold">& Orders</div>
                  </div>
                </Link>
                <Link href="/account" className="hover:border border-white border-solid p-2 rounded">
                  <div className="text-sm">
                    <div className="text-gray-300 text-xs">Hello,</div>
                    <div className="font-bold">{user.name}</div>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:border border-white border-solid p-2 rounded text-xs text-amazon-orange hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" className="hover:border border-white border-solid p-2 rounded flex items-center gap-1">
                <FaUser />
                <div className="text-sm">
                  <div className="text-gray-300 text-xs">Hello, sign in</div>
                  <div className="font-bold">Account</div>
                </div>
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="hover:border border-white border-solid p-2 rounded flex items-center relative">
              <FaShoppingCart className="text-3xl" />
              <span className="absolute top-0 right-1 bg-amazon-orange text-amazon-dark font-bold rounded-full h-5 w-5 flex items-center justify-center text-sm">
                {cartCount}
              </span>
              <span className="font-bold text-sm mt-2">Cart</span>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="hover:border border-white border-solid p-2 rounded flex items-center gap-1">
              <FaHeart className="text-2xl" />
              <div className="text-sm">
                <div className="text-gray-300 text-xs">Your</div>
                <div className="font-bold">Wishlist</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-amazon-light text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4 overflow-x-auto">
          <button 
            onClick={() => router.push('/')}
            className="hover:border border-white border-solid p-2 rounded flex items-center gap-1 whitespace-nowrap cursor-pointer"
          >
            <FaBars />
            All
          </button>
          <button 
            onClick={() => router.push('/?category=Electronics')}
            className="hover:border border-white border-solid p-2 rounded whitespace-nowrap cursor-pointer bg-transparent text-white border-0"
          >
            Electronics
          </button>
          <button 
            onClick={() => router.push('/?category=Books')}
            className="hover:border border-white border-solid p-2 rounded whitespace-nowrap cursor-pointer bg-transparent text-white border-0"
          >
            Books
          </button>
          <button 
            onClick={() => router.push('/?category=Home%20%26%20Kitchen')}
            className="hover:border border-white border-solid p-2 rounded whitespace-nowrap cursor-pointer bg-transparent text-white border-0"
          >
            Home & Kitchen
          </button>
          <button 
            onClick={() => router.push('/?category=Fashion')}
            className="hover:border border-white border-solid p-2 rounded whitespace-nowrap cursor-pointer bg-transparent text-white border-0"
          >
            Fashion
          </button>
          <button 
            onClick={() => router.push('/?category=Sports')}
            className="hover:border border-white border-solid p-2 rounded whitespace-nowrap cursor-pointer bg-transparent text-white border-0"
          >
            Sports
          </button>
          <button 
            onClick={() => router.push('/')}
            className="hover:border border-white border-solid p-2 rounded whitespace-nowrap cursor-pointer bg-transparent text-white border-0"
          >
            Today's Deals
          </button>
        </div>
      </div>
    </header>
  );
}
