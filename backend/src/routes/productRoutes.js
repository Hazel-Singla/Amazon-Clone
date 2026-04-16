const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// GET /api/products - Get all products with optional search and category filter
router.get('/', ProductController.getAllProducts);

// GET /api/products/categories - Get all categories
router.get('/categories', ProductController.getCategories);

// GET /api/products/:id - Get single product
router.get('/:id', ProductController.getProduct);

module.exports = router;
