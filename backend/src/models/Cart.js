const db = require('../config/database');

class Cart {
  // Get or create cart for user
  static async getOrCreateCart(userId = 1) {
    // Check if cart exists
    let [carts] = await db.execute('SELECT * FROM carts WHERE user_id = ?', [userId]);
    
    if (carts.length === 0) {
      // Create new cart
      const [result] = await db.execute(
        'INSERT INTO carts (user_id, created_at, updated_at) VALUES (?, NOW(), NOW())', 
        [userId]
      );
      const cartId = result.insertId;
      return { id: cartId, user_id: userId };
    }
    
    return carts[0];
  }

  // Get cart with items
  static async getCartWithItems(userId = 1) {
    const cart = await this.getOrCreateCart(userId);
    
    const [items] = await db.execute(
      `SELECT ci.*, p.name, p.price, p.images, p.stock as stock_quantity
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = ?`,
      [cart.id]
    );

    return {
      ...cart,
      items: items.map(item => ({
        ...item,
        image_urls: typeof item.images === 'string' ? JSON.parse(item.images) : (item.images || []),
        images: undefined // Remove the images field since we have image_urls
      }))
    };
  }

  // Add item to cart
  static async addItem(userId = 1, productId, quantity = 1) {
    const cart = await this.getOrCreateCart(userId);
    
    // Check if item already exists in cart
    const [existingItems] = await db.execute(
      'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cart.id, productId]
    );

    if (existingItems.length > 0) {
      // Update quantity
      const newQuantity = existingItems[0].quantity + quantity;
      await db.execute(
        'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
        [newQuantity, cart.id, productId]
      );
    } else {
      // Add new item
      await db.execute(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
        [cart.id, productId, quantity]
      );
    }

    return this.getCartWithItems(userId);
  }

  // Update cart item quantity
  static async updateItem(userId = 1, productId, quantity) {
    const cart = await this.getOrCreateCart(userId);
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await db.execute('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', [cart.id, productId]);
    } else {
      await db.execute(
        'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
        [quantity, cart.id, productId]
      );
    }

    return this.getCartWithItems(userId);
  }

  // Remove item from cart
  static async removeItem(userId = 1, productId) {
    const cart = await this.getOrCreateCart(userId);
    await db.execute('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', [cart.id, productId]);
    return this.getCartWithItems(userId);
  }

  // Clear cart
  static async clearCart(userId = 1) {
    const cart = await this.getOrCreateCart(userId);
    await db.execute('DELETE FROM cart_items WHERE cart_id = ?', [cart.id]);
    return true;
  }
}

module.exports = Cart;
