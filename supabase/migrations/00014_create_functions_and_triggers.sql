-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_admin_users_updated BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_product_variants_updated BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_customers_updated BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_carts_updated BEFORE UPDATE ON carts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_cart_items_updated BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_shipments_updated BEFORE UPDATE ON shipments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Generate order_number automatically
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number = 'PAHR-' || LPAD(nextval('order_number_seq')::TEXT, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_order_number BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- Deactivate previous exchange rates when inserting new current one
CREATE OR REPLACE FUNCTION deactivate_old_rates()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_current = true THEN
    UPDATE exchange_rates SET is_current = false
    WHERE id != NEW.id AND is_current = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_exchange_rate BEFORE INSERT ON exchange_rates
  FOR EACH ROW EXECUTE FUNCTION deactivate_old_rates();

-- Decrement stock when payment is verified
CREATE OR REPLACE FUNCTION decrement_stock_on_verification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'pago_verificado' AND OLD.status = 'pendiente' THEN
    -- Decrement stock
    UPDATE product_variants pv
    SET stock = pv.stock - oi.quantity
    FROM order_items oi
    WHERE oi.order_id = NEW.id AND oi.variant_id = pv.id;

    -- Log inventory changes
    INSERT INTO inventory_logs (variant_id, action, quantity, previous_stock, new_stock, order_id)
    SELECT
      oi.variant_id,
      'sale',
      -oi.quantity,
      pv.stock + oi.quantity,
      pv.stock,
      NEW.id
    FROM order_items oi
    JOIN product_variants pv ON pv.id = oi.variant_id
    WHERE oi.order_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_stock_decrement AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION decrement_stock_on_verification();

-- Update customer stats when payment is verified
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'pago_verificado' AND OLD.status = 'pendiente' THEN
    UPDATE customers SET
      total_orders = total_orders + 1,
      total_spent_usd = total_spent_usd + NEW.total_usd,
      last_order_at = now(),
      first_order_at = COALESCE(first_order_at, now())
    WHERE id = NEW.customer_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_customer_stats AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_customer_stats();

-- Dashboard stats view
CREATE OR REPLACE VIEW v_dashboard_stats AS
SELECT
  COUNT(DISTINCT id) FILTER (WHERE status != 'cancelado') as total_orders,
  SUM(total_usd) FILTER (WHERE status IN ('pago_verificado','en_preparacion','enviado','entregado')) as total_revenue_usd,
  AVG(total_usd) FILTER (WHERE status IN ('pago_verificado','en_preparacion','enviado','entregado')) as avg_ticket_usd,
  COUNT(DISTINCT customer_id) as unique_customers
FROM orders
WHERE created_at >= date_trunc('month', now());
