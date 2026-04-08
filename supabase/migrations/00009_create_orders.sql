CREATE TYPE order_status AS ENUM (
  'pendiente',
  'pago_verificado',
  'en_preparacion',
  'enviado',
  'entregado',
  'cancelado'
);

CREATE TYPE payment_method AS ENUM (
  'pago_movil',
  'transferencia',
  'zelle'
);

CREATE SEQUENCE order_number_seq START 1;

CREATE TABLE orders (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number            TEXT NOT NULL UNIQUE,
  customer_id             UUID NOT NULL REFERENCES customers(id),
  status                  order_status NOT NULL DEFAULT 'pendiente',
  payment_method          payment_method NOT NULL,
  subtotal_usd            NUMERIC(10,2) NOT NULL,
  exchange_rate_id        UUID NOT NULL REFERENCES exchange_rates(id),
  exchange_rate_snapshot  NUMERIC(12,2) NOT NULL,
  total_usd               NUMERIC(10,2) NOT NULL,
  total_bs                NUMERIC(14,2) NOT NULL,
  shipping_address        JSONB NOT NULL,
  notes                   TEXT,
  admin_notes             TEXT,
  verified_at             TIMESTAMPTZ,
  verified_by             UUID REFERENCES admin_users(id),
  shipped_at              TIMESTAMPTZ,
  delivered_at            TIMESTAMPTZ,
  cancelled_at            TIMESTAMPTZ,
  cancellation_reason     TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

CREATE TABLE order_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  variant_id      UUID NOT NULL REFERENCES product_variants(id),
  product_name    TEXT NOT NULL,
  variant_desc    TEXT NOT NULL,
  quantity        INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_usd  NUMERIC(10,2) NOT NULL,
  subtotal_usd    NUMERIC(10,2) NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
