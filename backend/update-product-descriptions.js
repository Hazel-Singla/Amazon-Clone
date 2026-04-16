const db = require('./src/config/database');

(async () => {
  try {
    console.log('Updating product descriptions to improve search...\n');

    // Update MacBook Pro to include "laptop" in description
    const [result1] = await db.execute(
      `UPDATE products 
       SET description = 'Apple MacBook Pro 14-inch laptop with M3 Chip, 8GB RAM, 256GB SSD - Space Gray. Powerful laptop for professionals and students.'
       WHERE name LIKE '%MacBook Pro%'`,
    );
    console.log(`✓ Updated MacBook Pro: ${result1.affectedRows} rows`);

    // Verify the update
    const [check] = await db.execute(
      'SELECT id, name, description FROM products WHERE name LIKE "%MacBook%"'
    );
    console.log('\nUpdated MacBook Pro:');
    console.log(`Name: ${check[0].name}`);
    console.log(`Description: ${check[0].description}`);

    // Test search for "laptop"
    const [laptopResults] = await db.execute(
      'SELECT id, name FROM products WHERE LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?)',
      ['%laptop%', '%laptop%']
    );
    console.log(`\n\nSearch for "laptop" now finds ${laptopResults.length} results:`);
    laptopResults.forEach(p => console.log(`  - ${p.name}`));

    console.log('\n✅ Product descriptions updated successfully!');
    process.exit(0);
  } catch(e) {
    console.error('❌ Error:', e);
    process.exit(1);
  }
})();
