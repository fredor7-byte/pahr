CREATE TABLE shipments (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id           UUID NOT NULL REFERENCES orders(id),
  carrier            TEXT NOT NULL,
  tracking_number    TEXT,
  tracking_url       TEXT,
  status             TEXT NOT NULL DEFAULT 'preparando' CHECK (status IN ('preparando', 'en_transito', 'entregado')),
  shipped_at         TIMESTAMPTZ,
  estimated_delivery TIMESTAMPTZ,
  delivered_at       TIMESTAMPTZ,
  notes              TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_shipments_order ON shipments(order_id);
