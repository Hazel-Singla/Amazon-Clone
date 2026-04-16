const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

// GET /api/cart - Get user's cart
router.get('/', CartController.getCart);

// POST /api/cart/items - Add item to cart
router.post('/items', CartController.addItem);

// PUT /api/cart/items/:product_id - Update cart item quantity
router.put('/items/:product_id', CartController.updateItem);

// DELETE /api/cart/items/:product_id - Remove item from cart
router.delete('/items/:product_id', CartController.removeItem);

module.exports = router;
