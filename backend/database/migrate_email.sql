-- Migration Script: Add Email to Orders
-- Run this SQL script to add the customer email column to the orders table

USE amazon_clone;

-- Add customerEmail column to orders table
ALTER TABLE orders ADD COLUMN customerEmail VARCHAR(255) AFTER shippingAddress;

-- Verify the column was added
DESCRIBE orders;
