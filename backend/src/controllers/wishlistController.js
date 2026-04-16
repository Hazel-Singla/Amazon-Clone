const Wishlist = require('../models/Wishlist');

class WishlistController {
  // Get user's wishlist
  static async getWishlist(req, res) {
    try {
      const userId = req.userId || 1;
      const items = await Wishlist.getWishlist(userId);
      
      res.json({
        success: true,
        count: items.length,
        data: items
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching wishlist',
        error: error.message
      });
    }
  }

  // Add to wishlist
  static async addToWishlist(req, res) {
    try {
      const { product_id } = req.body;
      const userId = req.userId || 1;

      if (!product_id) {
        return res.status(400).json({
          success: false,
          message: 'Product ID is required'
        });
      }

      await Wishlist.addToWishlist(userId, product_id);

      res.status(201).json({
        success: true,
        message: 'Added to wishlist'
      });
    } catch (error) {
      if (error.message === 'Product already in wishlist') {
        return res.status(409).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error adding to wishlist',
        error: error.message
      });
    }
  }

  // Remove from wishlist
  static async removeFromWishlist(req, res) {
    try {
      const { product_id } = req.params;
      const userId = req.userId || 1;

      await Wishlist.removeFromWishlist(userId, parseInt(product_id));

      res.json({
        success: true,
        message: 'Removed from wishlist'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error removing from wishlist',
        error: error.message
      });
    }
  }

  // Check if product is in wishlist
  static async checkWishlist(req, res) {
    try {
      const { product_id } = req.params;
      const userId = req.userId || 1;
      const inWishlist = await Wishlist.isInWishlist(userId, parseInt(product_id));

      res.json({
        success: true,
        data: { in_wishlist: inWishlist }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error checking wishlist',
        error: error.message
      });
    }
  }
}

module.exports = WishlistController;
