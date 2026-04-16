const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');

// GET /api/wishlist - Get user's wishlist
router.get('/', WishlistController.getWishlist);

// POST /api/wishlist - Add to wishlist
router.post('/', WishlistController.addToWishlist);

// DELETE /api/wishlist/:product_id - Remove from wishlist
router.delete('/:product_id', WishlistController.removeFromWishlist);

// GET /api/wishlist/check/:product_id - Check if product is in wishlist
router.get('/check/:product_id', WishlistController.checkWishlist);

module.exports = router;
