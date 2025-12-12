-- Add in_stock column to product_variants table
ALTER TABLE product_variants ADD COLUMN in_stock BOOLEAN DEFAULT true COMMENT 'Track if variant is in stock';

-- Create index for better query performance
ALTER TABLE product_variants ADD INDEX idx_in_stock (in_stock);
