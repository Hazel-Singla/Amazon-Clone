-- Migration Script: Transfer all data from userId=1 to your actual user ID
-- Run this ONLY if your first user has a different ID than 1

-- Step 1: Check your actual user ID
-- Run this query first to find your user ID:
-- SELECT id, name, email FROM users WHERE email = 'your-email@example.com';

-- Step 2: Replace YOUR_ACTUAL_USER_ID below with your real user ID

SET @old_user_id = 1;
SET @new_user_id = YOUR_ACTUAL_USER_ID; -- <-- CHANGE THIS TO YOUR USER ID

-- Update orders
UPDATE orders SET userId = @new_user_id WHERE userId = @old_user_id;

-- Update carts
UPDATE carts SET user_id = @new_user_id WHERE user_id = @old_user_id;

-- Update wishlists
UPDATE wishlists SET user_id = @new_user_id WHERE user_id = @old_user_id;

-- Verify the changes
SELECT 'Orders updated' as Status, COUNT(*) as Count FROM orders WHERE userId = @new_user_id
UNION ALL
SELECT 'Carts updated', COUNT(*) FROM carts WHERE user_id = @new_user_id
UNION ALL
SELECT 'Wishlists updated', COUNT(*) FROM wishlists WHERE user_id = @new_user_id;
