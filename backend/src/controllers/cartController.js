const Cart = require('../models/Cart');

class CartController {
  // Get user's cart
  static async getCart(req, res) {
    try {
      const userId = req.userId || 1;
      const cart = await Cart.getCartWithItems(userId);
      
      res.json({
        success: true,
        data: cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching cart',
        error: error.message
      });
    }
  }

  // Add item to cart
  static async addItem(req, res) {
    try {
      const { product_id, quantity } = req.body;
      const userId = req.userId || 1;

      if (!product_id) {
        return res.status(400).json({
          success: false,
          message: 'Product ID is required'
        });
      }

      const cart = await Cart.addItem(userId, product_id, quantity || 1);

      res.status(201).json({
        success: true,
        message: 'Item added to cart',
        data: cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding item to cart',
        error: error.message
      });
    }
  }

  // Update cart item quantity
  static async updateItem(req, res) {
    try {
      const { product_id } = req.params;
      const { quantity } = req.body;
      const userId = req.userId || 1;

      if (quantity === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Quantity is required'
        });
      }

      const cart = await Cart.updateItem(userId, parseInt(product_id), parseInt(quantity));

      res.json({
        success: true,
        message: 'Cart updated',
        data: cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating cart',
        error: error.message
      });
    }
  }

  // Remove item from cart
  static async removeItem(req, res) {
    try {
      const { product_id } = req.params;
      const userId = req.userId || 1;

      const cart = await Cart.removeItem(userId, parseInt(product_id));

      res.json({
        success: true,
        message: 'Item removed from cart',
        data: cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error removing item from cart',
        error: error.message
      });
    }
  }
}

module.exports = CartController;
