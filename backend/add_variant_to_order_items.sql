-- Add variant tracking to order_items table
-- This migration adds columns to store which variant was ordered

ALTER TABLE order_items ADD COLUMN variant_id BIGINT COMMENT 'ID of the selected variant';
ALTER TABLE order_items ADD COLUMN variant_name VARCHAR(100) COMMENT 'Name/description of the selected variant (e.g., color, weight)';

-- Add indexes for better query performance
ALTER TABLE order_items ADD INDEX idx_variant_id (variant_id);
ALTER TABLE order_items ADD INDEX idx_product_variant (product_id, variant_id);

-- Optional: Add a comment to the table
ALTER TABLE order_items COMMENT = 'Order items with variant tracking support';
