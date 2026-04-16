-- Add email column to orders table
ALTER TABLE orders ADD COLUMN customerEmail VARCHAR(255) AFTER shippingAddress;
