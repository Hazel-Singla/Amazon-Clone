const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// POST /api/orders - Create new order
router.post('/', OrderController.createOrder);

// GET /api/orders/:id - Get order by ID
router.get('/:id', OrderController.getOrder);

// GET /api/orders - Get all orders for user
router.get('/', OrderController.getUserOrders);

module.exports = router;
