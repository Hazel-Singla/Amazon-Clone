const db = require('./src/config/database');

(async () => {
  try {
    console.log('Starting user data migration...\n');

    // Get all users
    const [users] = await db.execute('SELECT id, name, email FROM users');
    console.log('Users found:', users.length);

    // Count old data
    const [oldOrders] = await db.execute('SELECT COUNT(*) as count FROM orders WHERE userId = 1');
    const [oldCarts] = await db.execute('SELECT COUNT(*) as count FROM carts WHERE user_id = 1');
    const [oldWishlists] = await db.execute('SELECT COUNT(*) as count FROM wishlists WHERE userId = 1');

    console.log('\nOld data with userId = 1:');
    console.log(`- Orders: ${oldOrders[0].count}`);
    console.log(`- Carts: ${oldCarts[0].count}`);
    console.log(`- Wishlists: ${oldWishlists[0].count}`);

    // Ask which user should get the old data
    // For now, we'll migrate to user ID 4 (Hazel Singla) as the primary user
    const targetUserId = 4; // Change this if needed

    console.log(`\nMigrating all data to userId = ${targetUserId}...\n`);

    // Update orders
    const [orderResult] = await db.execute(
      'UPDATE orders SET userId = ? WHERE userId = 1',
      [targetUserId]
    );
    console.log(`✓ Orders updated: ${orderResult.affectedRows} rows`);

    // For carts, we need to delete the new cart first, then update the old one
    // Delete the target user's current cart
    await db.execute('DELETE FROM carts WHERE user_id = ?', [targetUserId]);
    
    // Now update the old cart to the target user
    const [cartResult] = await db.execute(
      'UPDATE carts SET user_id = ? WHERE user_id = 1',
      [targetUserId]
    );
    console.log(`✓ Carts updated: ${cartResult.affectedRows} rows`);

    // For wishlists, delete duplicates first, then update
    // Delete wishlist items for target user that already exist
    await db.execute(`
      DELETE w1 FROM wishlists w1
      INNER JOIN wishlists w2 ON w1.productId = w2.productId
      WHERE w1.userId = ? AND w2.userId = 1
    `, [targetUserId]);
    
    // Now update the old wishlist items
    const [wishlistResult] = await db.execute(
      'UPDATE wishlists SET userId = ? WHERE userId = 1',
      [targetUserId]
    );
    console.log(`✓ Wishlists updated: ${wishlistResult.affectedRows} rows`);

    // Verify migration
    const [newOrders] = await db.execute(
      'SELECT COUNT(*) as count FROM orders WHERE userId = ?',
      [targetUserId]
    );
    const [newCarts] = await db.execute(
      'SELECT COUNT(*) as count FROM carts WHERE user_id = ?',
      [targetUserId]
    );
    const [newWishlists] = await db.execute(
      'SELECT COUNT(*) as count FROM wishlists WHERE userId = ?',
      [targetUserId]
    );

    console.log('\n✅ Migration completed successfully!');
    console.log(`\nData for userId = ${targetUserId}:`);
    console.log(`- Orders: ${newOrders[0].count}`);
    console.log(`- Carts: ${newCarts[0].count}`);
    console.log(`- Wishlists: ${newWishlists[0].count}`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
})();
