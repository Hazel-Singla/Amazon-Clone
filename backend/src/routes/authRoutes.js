const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// POST /api/auth/register - Register new user
router.post('/register', AuthController.register);

// POST /api/auth/login - Login user
router.post('/login', AuthController.login);

// GET /api/auth/profile/:userId - Get user profile
router.get('/profile/:userId', AuthController.getProfile);

// PUT /api/auth/profile/:userId - Update user profile
router.put('/profile/:userId', AuthController.updateProfile);

module.exports = router;
