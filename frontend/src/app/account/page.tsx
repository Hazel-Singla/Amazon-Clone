'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setFormData({
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || ''
    });
    setLoading(false);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Update user in localStorage
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-xl">Loading account details...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h1 className="text-3xl font-bold">Your Account</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Account Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-amazon-blue hover:underline"
              >
                Edit
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
                />
              ) : (
                <p className="text-gray-700">{user?.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
                />
              ) : (
                <p className="text-gray-700">{user?.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
                />
              ) : (
                <p className="text-gray-700">{user?.phone || 'Not provided'}</p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  className="bg-amazon-yellow hover:bg-yellow-500 px-4 py-2 rounded-lg font-bold text-sm"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link
                href="/orders"
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-bold text-amazon-blue">Your Orders</div>
                <div className="text-sm text-gray-600">Track, return, or buy things again</div>
              </Link>

              <Link
                href="/wishlist"
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-bold text-amazon-blue">Your Wishlist</div>
                <div className="text-sm text-gray-600">View and manage your saved items</div>
              </Link>

              <Link
                href="/cart"
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="font-bold text-amazon-blue">Shopping Cart</div>
                <div className="text-sm text-gray-600">View items in your cart</div>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Account Actions</h2>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Order History Section */}
      <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <p className="text-gray-600 mb-4">View and track your recent orders</p>
        <button
          onClick={() => router.push('/orders')}
          className="bg-amazon-yellow hover:bg-yellow-500 px-6 py-2 rounded-lg font-bold"
        >
          View All Orders
        </button>
      </div>
    </div>
  );
}
