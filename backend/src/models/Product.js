const db = require('../config/database');

class Product {
  // Get all products with optional search and category filter
  static async getAll(search = '', category = '') {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (search) {
      // Search in name, description, and category (case-insensitive)
      query += ' AND (LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?) OR LOWER(category) LIKE LOWER(?))';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY createdAt DESC';

    const [rows] = await db.execute(query, params);
    
    // Map database fields to API response format
    return rows.map(row => ({
      ...row,
      image_urls: row.images ? (typeof row.images === 'string' ? JSON.parse(row.images) : row.images) : [],
      stock_quantity: row.stock
    }));
  }

  // Get single product by ID
  static async getById(id) {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    const product = rows[0];
    
    if (!product) return null;
    
    // Map database fields to API response format
    return {
      ...product,
      image_urls: product.images ? (typeof product.images === 'string' ? JSON.parse(product.images) : product.images) : [],
      stock_quantity: product.stock
    };
  }

  // Get all categories
  static async getCategories() {
    const [rows] = await db.execute('SELECT DISTINCT category FROM products ORDER BY category');
    return rows.map(row => row.category);
  }

  // Create new product
  static async create(productData) {
    const { name, description, price, category, stock_quantity, rating, image_urls } = productData;
    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, category, stock_quantity, rating, image_urls) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, category, stock_quantity, rating, JSON.stringify(image_urls)]
    );
    return result.insertId;
  }

  // Update product
  static async update(id, productData) {
    const { name, description, price, category, stock_quantity, rating, image_urls } = productData;
    await db.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, stock_quantity = ?, rating = ?, image_urls = ? WHERE id = ?',
      [name, description, price, category, stock_quantity, rating, JSON.stringify(image_urls), id]
    );
    return true;
  }

  // Delete product
  static async delete(id) {
    await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Product;
