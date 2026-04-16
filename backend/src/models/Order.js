const db = require('../config/database');
const Cart = require('./Cart');

class Order {
  // Create new order from cart
  static async createOrder(userId = 1, shippingAddress, customerEmail = null) {
    console.log('Order.createOrder called with userId:', userId, 'shippingAddress:', shippingAddress, 'customerEmail:', customerEmail);
    const connection = await db.getConnection();
    console.log('Database connection obtained');
    
    try {
      await connection.beginTransaction();
      console.log('Transaction started');

      // Get cart with items
      const cart = await Cart.getCartWithItems(userId);
      console.log('Cart retrieved:', cart);

      if (!cart.items || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      // Calculate prices
      const itemsPrice = cart.items.reduce((sum, item) => {
        return sum + (parseFloat(item.price) * item.quantity);
      }, 0);

      const shippingPrice = 5.99;
      const taxPrice = itemsPrice * 0.08;
      const totalPrice = itemsPrice + shippingPrice + taxPrice;

      // Generate unique order ID
      const orderId = `ORD-${Date.now()}-${userId}`;

      // Parse shipping address
      const shippingAddressObj = typeof shippingAddress === 'string' 
        ? { fullAddress: shippingAddress }
        : shippingAddress;

      console.log('Inserting order with:', { orderId, userId, itemsPrice, shippingPrice, taxPrice, totalPrice, customerEmail });
      
      // Create order - check if customerEmail column exists
      let orderResult;
      try {
        // Try with customerEmail column
        [orderResult] = await connection.execute(
          'INSERT INTO orders (orderId, userId, shippingAddress, customerEmail, itemsPrice, shippingPrice, taxPrice, totalPrice, paymentMethod, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
          [orderId, userId, JSON.stringify(shippingAddressObj), customerEmail, itemsPrice, shippingPrice, taxPrice, totalPrice, 'COD']
        );
      } catch (err) {
        // If customerEmail column doesn't exist, insert without it
        if (err.message && err.message.includes('customerEmail')) {
          console.log('customerEmail column not found, inserting without it');
          [orderResult] = await connection.execute(
            'INSERT INTO orders (orderId, userId, shippingAddress, itemsPrice, shippingPrice, taxPrice, totalPrice, paymentMethod, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [orderId, userId, JSON.stringify(shippingAddressObj), itemsPrice, shippingPrice, taxPrice, totalPrice, 'COD']
          );
        } else {
          throw err;
        }
      }

      const orderIdDb = orderResult.insertId;
      console.log('Order inserted with ID:', orderIdDb);

      // Create order items and update stock
      for (const item of cart.items) {
        console.log('Creating order item for product:', item.product_id, 'quantity:', item.quantity);
        await connection.execute(
          'INSERT INTO order_items (orderId, productId, name, qty, image, price, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
          [orderIdDb, item.product_id, item.name, item.quantity, item.image_urls[0] || '', item.price]
        );

        // Update product stock
        await connection.execute(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.product_id]
        );
      }

      // Clear cart
      await Cart.clearCart(userId);
      console.log('Cart cleared');

      await connection.commit();
      console.log('Transaction committed');

      // Get the created order with items
      return await this.getOrderById(orderIdDb);

    } catch (error) {
      console.error('Error in Order.createOrder:', error);
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Get order by ID with items
  static async getOrderById(orderId) {
    const [orders] = await db.execute('SELECT * FROM orders WHERE id = ?', [orderId]);
    
    if (orders.length === 0) {
      return null;
    }

    const order = orders[0];

    const [items] = await db.execute(
      `SELECT oi.*, p.images
       FROM order_items oi
       JOIN products p ON oi.productId = p.id
       WHERE oi.orderId = ?`,
      [orderId]
    );

    return {
      ...order,
      shippingAddress: typeof order.shippingAddress === 'string' 
        ? JSON.parse(order.shippingAddress).fullAddress 
        : order.shippingAddress.fullAddress || JSON.stringify(order.shippingAddress),
      items: items.map(item => ({
        ...item,
        product_id: item.productId,
        image_urls: typeof item.images === 'string' ? JSON.parse(item.images) : (item.images || [item.image || ''])
      }))
    };
  }

  // Get all orders for user
  static async getOrdersByUser(userId = 1) {
    const [orders] = await db.execute(
      'SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC',
      [userId]
    );

    // Fetch items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const [items] = await db.execute(
          `SELECT oi.*, p.images
           FROM order_items oi
           JOIN products p ON oi.productId = p.id
           WHERE oi.orderId = ?`,
          [order.id]
        );

        return {
          ...order,
          shippingAddress: typeof order.shippingAddress === 'string' 
            ? JSON.parse(order.shippingAddress).fullAddress 
            : order.shippingAddress?.fullAddress || JSON.stringify(order.shippingAddress || {}),
          items: items.map(item => ({
            ...item,
            product_id: item.productId,
            quantity: item.qty,
            image_urls: typeof item.images === 'string' ? JSON.parse(item.images) : (item.images || [item.image || ''])
          }))
        };
      })
    );

    return ordersWithItems;
  }

  // Update order status
  static async updateStatus(orderId, status) {
    await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
    return true;
  }
}

module.exports = Order;
