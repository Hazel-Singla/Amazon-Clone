'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* Back to top */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="w-full bg-amazon-light hover:bg-gray-700 text-white text-center py-3 text-sm transition-colors block"
      >
        Back to top
      </a>

      {/* Footer Links */}
      <div className="bg-amazon-light text-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-3">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#" className="hover:underline">Careers</Link></li>
              <li><Link href="#" className="hover:underline">Blog</Link></li>
              <li><Link href="#" className="hover:underline">About Amazon.clone</Link></li>
              <li><Link href="#" className="hover:underline">Investor Relations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#" className="hover:underline">Sell products</Link></li>
              <li><Link href="#" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link href="#" className="hover:underline">Advertise Your Products</Link></li>
              <li><Link href="#" className="hover:underline">Self-Publish with Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Payment Products</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#" className="hover:underline">Business Card</Link></li>
              <li><Link href="#" className="hover:underline">Shop with Points</Link></li>
              <li><Link href="#" className="hover:underline">Reload Your Balance</Link></li>
              <li><Link href="#" className="hover:underline">Currency Converter</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/account" className="hover:underline">Your Account</Link></li>
              <li><Link href="/orders" className="hover:underline">Your Orders</Link></li>
              <li><Link href="/wishlist" className="hover:underline">Your Wishlist</Link></li>
              <li><Link href="/cart" className="hover:underline">Shopping Cart</Link></li>
              <li><Link href="#" className="hover:underline">Shipping Rates & Policies</Link></li>
              <li><Link href="#" className="hover:underline">Returns & Replacements</Link></li>
              <li><Link href="#" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-amazon-dark text-white py-6 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; 2026 Amazon.clone - SDE Intern Assignment. All rights reserved.</p>
          <p className="text-gray-400 mt-2">This is a demo project for educational purposes.</p>
        </div>
      </div>
    </footer>
  );
}
