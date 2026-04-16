const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  // Register new user
  static async register(userData) {
    const { name, email, password, phone } = userData;
    
    // Check if user already exists
    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUsers.length > 0) {
      throw new Error('User already exists with this email');
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert new user
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, phone, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [name, email, hashedPassword, phone || null]
    );
    
    return {
      id: result.insertId,
      name,
      email,
      phone
    };
  }

  // Login user
  static async login(email, password) {
    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length === 0) {
      throw new Error('Invalid email or password');
    }
    
    const user = users[0];
    
    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    
    // Return user without password
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    };
  }

  // Get user by ID
  static async getById(id) {
    const [users] = await db.execute(
      'SELECT id, name, email, phone, address, created_at FROM users WHERE id = ?',
      [id]
    );
    
    return users[0] || null;
  }

  // Update user profile
  static async updateProfile(id, userData) {
    const { name, phone, address } = userData;
    
    await db.execute(
      'UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?',
      [name, phone, address, id]
    );
    
    return this.getById(id);
  }
}

module.exports = User;
