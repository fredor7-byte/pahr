-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE auth_user_id = auth.uid() AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- CATEGORIES
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories visible to all" ON categories
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access categories" ON categories
  FOR ALL USING (is_admin());

-- PRODUCTS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products visible to all" ON products
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access products" ON products
  FOR ALL USING (is_admin());

-- PRODUCT_VARIANTS
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Variants visible to all" ON product_variants
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access variants" ON product_variants
  FOR ALL USING (is_admin());

-- PRODUCT_IMAGES
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Images visible to all" ON product_images
  FOR SELECT USING (true);
CREATE POLICY "Admin full access images" ON product_images
  FOR ALL USING (is_admin());

-- CUSTOMERS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access customers" ON customers
  FOR ALL USING (is_admin());
CREATE POLICY "Customers can insert themselves" ON customers
  FOR INSERT WITH CHECK (true);

-- CARTS
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cart access open" ON carts
  FOR ALL USING (true);

-- CART_ITEMS
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cart items access open" ON cart_items
  FOR ALL USING (true);

-- EXCHANGE_RATES
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Current rate visible" ON exchange_rates
  FOR SELECT USING (is_current = true);
CREATE POLICY "Admin full access rates" ON exchange_rates
  FOR ALL USING (is_admin());

-- ORDERS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access orders" ON orders
  FOR ALL USING (is_admin());
CREATE POLICY "Anyone can insert orders" ON orders
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Customers see own orders" ON orders
  FOR SELECT USING (
    customer_id IN (
      SELECT id FROM customers WHERE email = auth.jwt()->>'email'
    )
  );

-- ORDER_ITEMS
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access order items" ON order_items
  FOR ALL USING (is_admin());
CREATE POLICY "Anyone can insert order items" ON order_items
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read order items" ON order_items
  FOR SELECT USING (true);

-- PAYMENT_PROOFS
ALTER TABLE payment_proofs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can upload proof" ON payment_proofs
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manages proofs" ON payment_proofs
  FOR ALL USING (is_admin());

-- SHIPMENTS
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read shipments" ON shipments
  FOR SELECT USING (true);
CREATE POLICY "Admin full access shipments" ON shipments
  FOR ALL USING (is_admin());

-- INVENTORY_LOGS
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access inv logs" ON inventory_logs
  FOR ALL USING (is_admin());

-- ANALYTICS_EVENTS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log events" ON analytics_events
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin reads analytics" ON analytics_events
  FOR SELECT USING (is_admin());

-- ADMIN_USERS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin reads admin_users" ON admin_users
  FOR SELECT USING (is_admin());
