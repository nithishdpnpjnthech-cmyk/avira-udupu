-- Database Migration Script
-- This script removes fields from product table that should only be in product_variants table
-- Run this script on your database before starting the updated application

-- Backup recommendation: Create a backup of your database before running this script

USE avira_udupu;

-- Remove columns from product table that belong in product_variants
ALTER TABLE product 
DROP COLUMN IF EXISTS price,
DROP COLUMN IF EXISTS original_price,
DROP COLUMN IF EXISTS stock_quantity,
DROP COLUMN IF EXISTS color,
DROP COLUMN IF EXISTS weight,
DROP COLUMN IF EXISTS image_url,
DROP COLUMN IF EXISTS image_public_id,
DROP COLUMN IF EXISTS sub_image1,
DROP COLUMN IF EXISTS sub_image2,
DROP COLUMN IF EXISTS sub_image3,
DROP COLUMN IF EXISTS ingredients,
DROP COLUMN IF EXISTS benefits;

-- Verify the product table now has only:
-- id, name, description, category, subcategory, fabric, in_stock, is_active
DESCRIBE product;

-- Verify product_variants table has:
-- id, product_id, price, original_price, stock_quantity, color, 
-- main_image, sub_image1, sub_image2, sub_image3, weight_value, weight_unit
DESCRIBE product_variants;
