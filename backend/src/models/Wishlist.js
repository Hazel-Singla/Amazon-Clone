const db = require('../config/database');

class Wishlist {
  // Get user's wishlist
  static async getWishlist(userId = 1) {
    const [items] = await db.execute(
      `SELECT w.id, w.productId as product_id, w.createdAt as created_at, 
              p.name, p.price, p.category, p.rating, p.stock, p.images
       FROM wishlists w
       JOIN products p ON w.productId = p.id
       WHERE w.userId = ?
       ORDER BY w.createdAt DESC`,
      [userId]
    );

    return items.map(item => ({
      ...item,
      image_urls: typeof item.images === 'string' ? JSON.parse(item.images) : item.images,
      stock_quantity: item.stock
    }));
  }

  // Add product to wishlist
  static async addToWishlist(userId = 1, productId) {
    try {
      await db.execute(
        'INSERT INTO wishlists (userId, productId, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())',
        [userId, productId]
      );
      return true;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Product already in wishlist');
      }
      throw error;
    }
  }

  // Remove product from wishlist
  static async removeFromWishlist(userId = 1, productId) {
    await db.execute(
      'DELETE FROM wishlists WHERE userId = ? AND productId = ?',
      [userId, productId]
    );
    return true;
  }

  // Check if product is in wishlist
  static async isInWishlist(userId = 1, productId) {
    const [rows] = await db.execute(
      'SELECT id FROM wishlists WHERE userId = ? AND productId = ?',
      [userId, productId]
    );
    return rows.length > 0;
  }
}

module.exports = Wishlist;
