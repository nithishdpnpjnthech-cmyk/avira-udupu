# Running the Variant Fix

## Step 1: Apply Database Migration

Run the SQL migration to add variant columns to the order_items table:

```bash
# Navigate to backend directory
cd backend

# Execute the migration using your database client
# Option A: If using MySQL CLI
mysql -u your_user -p your_database < add_variant_to_order_items.sql

# Option B: If using Spring Boot with Flyway, place the file in:
# src/main/resources/db/migration/
# And rename to: V001__Add_variant_to_order_items.sql
```

## Step 2: Rebuild Backend

```bash
cd backend
./mvnw clean package

# Or if using Windows:
mvnw.cmd clean package
```

## Step 3: Start Application

```bash
# Start backend
./mvnw spring-boot:run

# Or if using Windows:
mvnw.cmd spring-boot:run

# Start frontend (in a separate terminal)
cd frontend
npm run dev
```

## Step 4: Test the Fix

1. **Add Same Product with Different Variants**
   - Go to product detail page
   - Select variant 1 (e.g., "Red") → Add to cart
   - Go back and select variant 2 (e.g., "Blue") → Add to cart
   - Cart should show 2 separate items with different variants

2. **Verify Order Summary**
   - Go to checkout
   - Order Summary should display both variants:
     - "Product Name - Red • Qty: 1"
     - "Product Name - Blue • Qty: 1"

3. **Check Stock Deduction**
   - Before order: Product has Variant 1 (10 stock) and Variant 2 (8 stock)
   - Place order with 1 of each
   - After order: Variant 1 should have 9, Variant 2 should have 7
   - (NOT product-level stock)

4. **Verify Order History**
   - Go to "My Orders" section
   - Expand any order with variants
   - Should show: "Variant: Red • Qty: 1 • ₹150 each"

## Database Query to Verify

```sql
-- Check if migration was applied
DESCRIBE order_items;  -- Should show variant_id and variant_name columns

-- View orders with variants
SELECT oi.id, oi.product_id, oi.variant_id, oi.variant_name, oi.quantity, oi.price
FROM order_items oi
WHERE oi.variant_id IS NOT NULL;

-- Check variant stock after order
SELECT id, name, stock_quantity FROM products WHERE id = YOUR_PRODUCT_ID;
SELECT id, color, stock_quantity FROM product_variants WHERE product_id = YOUR_PRODUCT_ID;
```

## Troubleshooting

### Issue: Migration not applied
- Check MySQL connection and permissions
- Ensure database exists and is selected
- Run migration command with `-v` flag for verbose output

### Issue: Stock still deducted from product-level
- Ensure CartItem.variantId is being set when adding to cart
- Check backend logs for variant matching
- Verify product has variants with matching IDs

### Issue: Order summary not showing variants
- Clear browser cache
- Reload the application
- Check that CartContext properly sets variantName when adding items

## Files Changed

**Backend:**
- `src/main/java/com/eduprajna/service/OrderService.java` - Stock deduction logic
- `src/main/java/com/eduprajna/entity/OrderItem.java` - Added variant fields
- `add_variant_to_order_items.sql` - Database migration

**Frontend:**
- `src/pages/user-account-dashboard/components/OrderHistory.jsx` - Variant display

**Database:**
- `order_items` table - Added 2 new columns
