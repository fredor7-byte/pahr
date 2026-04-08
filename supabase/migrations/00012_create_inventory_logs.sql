CREATE TYPE inventory_action AS ENUM (
  'restock',
  'sale',
  'adjustment',
  'return'
);

CREATE TABLE inventory_logs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id     UUID NOT NULL REFERENCES product_variants(id),
  action         inventory_action NOT NULL,
  quantity       INTEGER NOT NULL,
  previous_stock INTEGER NOT NULL,
  new_stock      INTEGER NOT NULL,
  reason         TEXT,
  performed_by   UUID REFERENCES admin_users(id),
  order_id       UUID REFERENCES orders(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_inv_logs_variant ON inventory_logs(variant_id);
CREATE INDEX idx_inv_logs_date ON inventory_logs(created_at DESC);
