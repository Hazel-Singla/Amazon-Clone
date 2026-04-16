const db = require('./src/config/database');

(async () => {
  try {
    const [products] = await db.execute('SELECT id, name, category FROM products');
    console.log('Products in database:\n');
    products.forEach(p => console.log(`ID: ${p.id}, Name: ${p.name}, Category: ${p.category}`));
    
    console.log('\n\nTesting search for "book":');
    const [bookResults] = await db.execute(
      'SELECT id, name FROM products WHERE name LIKE ? OR description LIKE ?',
      ['%book%', '%book%']
    );
    console.log(`Found ${bookResults.length} results:`);
    bookResults.forEach(p => console.log(`  - ${p.name}`));
    
    console.log('\n\nTesting search for "laptop":');
    const [laptopResults] = await db.execute(
      'SELECT id, name FROM products WHERE name LIKE ? OR description LIKE ?',
      ['%laptop%', '%laptop%']
    );
    console.log(`Found ${laptopResults.length} results:`);
    laptopResults.forEach(p => console.log(`  - ${p.name}`));
    
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
})();
