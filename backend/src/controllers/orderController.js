const Order = require('../models/Order');
const EmailService = require('../utils/emailService');

class OrderController {
  // Create new order
  static async createOrder(req, res) {
    try {
      console.log('Creating order with body:', req.body);
      const { shipping_address, email } = req.body;
      const userId = req.userId || 1;

      if (!shipping_address) {
        return res.status(400).json({
          success: false,
          message: 'Shipping address is required'
        });
      }

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }

      console.log('Calling Order.createOrder...');
      const order = await Order.createOrder(userId, shipping_address, email);
      console.log('Order created successfully:', order);

      // Send email notification (non-blocking)
      EmailService.sendOrderConfirmation(order, email).catch(err => {
        console.error('Email notification failed:', err);
      });

      res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        data: order
      });
    } catch (error) {
      console.error('Error in createOrder controller:', error);
      console.error('Error stack:', error.stack);
      
      if (error.message === 'Cart is empty') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error creating order',
        error: error.message
      });
    }
  }

  // Get order by ID
  static async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.getOrderById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching order',
        error: error.message
      });
    }
  }

  // Get all orders for user
  static async getUserOrders(req, res) {
    try {
      const userId = req.userId || 1;
      const orders = await Order.getOrdersByUser(userId);

      res.json({
        success: true,
        count: orders.length,
        data: orders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching orders',
        error: error.message
      });
    }
  }
}

module.exports = OrderController;
