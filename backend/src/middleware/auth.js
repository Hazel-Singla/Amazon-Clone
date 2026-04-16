// Simple authentication middleware
// Since we're not using JWT tokens, we'll pass userId in request headers

const authMiddleware = (req, res, next) => {
  // Get userId from request headers or query params
  // Frontend will send this after login
  const userId = req.headers['x-user-id'] || req.query.userId;

  if (!userId) {
    // For now, allow requests without userId but default to 1
    // In production, you should require authentication
    req.userId = 1;
    return next();
  }

  // Validate userId is a number
  const userIdNum = parseInt(userId);
  if (isNaN(userIdNum)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid user ID'
    });
  }

  req.userId = userIdNum;
  next();
};

module.exports = authMiddleware;
