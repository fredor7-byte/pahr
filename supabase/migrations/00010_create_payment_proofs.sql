CREATE TABLE payment_proofs (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id          UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  image_url         TEXT NOT NULL,
  reference_number  TEXT,
  declared_amount   NUMERIC(14,2),
  declared_currency TEXT DEFAULT 'VES' CHECK (declared_currency IN ('VES', 'USD')),
  is_verified       BOOLEAN NOT NULL DEFAULT false,
  verified_at       TIMESTAMPTZ,
  verified_by       UUID REFERENCES admin_users(id),
  rejection_reason  TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payment_order ON payment_proofs(order_id);
