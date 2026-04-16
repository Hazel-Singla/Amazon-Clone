const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return {};
  
  try {
    const user = JSON.parse(userStr);
    if (user && user.id) {
      return { 'x-user-id': user.id.toString() };
    }
  } catch (e) {
    console.error('Error parsing user from localStorage:', e);
  }
  
  return {};
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: async () => {
    const res = await fetch(`${API_URL}/wishlist`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch wishlist');
    return res.json();
  },

  addToWishlist: async (productId: number) => {
    const res = await fetch(`${API_URL}/wishlist`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ product_id: productId })
    });
    if (!res.ok) throw new Error('Failed to add to wishlist');
    return res.json();
  },

  removeFromWishlist: async (productId: number) => {
    const res = await fetch(`${API_URL}/wishlist/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to remove from wishlist');
    return res.json();
  },

  checkWishlist: async (productId: number) => {
    const res = await fetch(`${API_URL}/wishlist/check/${productId}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to check wishlist');
    return res.json();
  }
};
