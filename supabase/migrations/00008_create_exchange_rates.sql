CREATE TABLE exchange_rates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rate_bs_per_usd NUMERIC(12,2) NOT NULL,
  set_by          UUID NOT NULL REFERENCES admin_users(id),
  notes           TEXT,
  is_current      BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_exchange_current ON exchange_rates(is_current) WHERE is_current = true;
