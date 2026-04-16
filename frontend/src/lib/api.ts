const API_BASE_URL = (typeof window !== 'undefined' && (window as any).ENV?.NEXT_PUBLIC_API_URL) || 'http://localhost:5000/api';

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

// Product API calls
export const productAPI = {
  // Get all products with optional search and category filter
  getAll: async (search = '', category = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    
    const response = await fetch(`${API_BASE_URL}/products?${params}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Get single product by ID
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  // Get all categories
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  }
};

// Cart API calls
export const cartAPI = {
  // Get user's cart
  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  // Add item to cart
  addItem: async (productId: number, quantity: number = 1) => {
    console.log('Adding to cart:', { productId, quantity, url: `${API_BASE_URL}/cart/items` });
    const response = await fetch(`${API_BASE_URL}/cart/items`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ product_id: productId, quantity })
    });
    console.log('Cart response status:', response.status);
    const data = await response.json();
    console.log('Cart response data:', data);
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add item to cart');
    }
    return data;
  },

  // Update cart item quantity
  updateItem: async (productId: number, quantity: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/items/${productId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ quantity })
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return response.json();
  },

  // Remove item from cart
  removeItem: async (productId: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/items/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to remove item from cart');
    return response.json();
  }
};

// Order API calls
export const orderAPI = {
  // Create new order
  createOrder: async (shippingAddress: string, email: string) => {
    console.log('Creating order with address:', shippingAddress, 'email:', email);
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ shipping_address: shippingAddress, email })
    });
    console.log('Order response status:', response.status);
    const data = await response.json();
    console.log('Order response data:', data);
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create order');
    }
    return data;
  },

  // Get order by ID
  getOrder: async (orderId: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  // Get all orders for user
  getUserOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  }
};
