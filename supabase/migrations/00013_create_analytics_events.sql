CREATE TABLE analytics_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  TEXT NOT NULL,
  event_type  TEXT NOT NULL,
  page_path   TEXT,
  product_id  UUID REFERENCES products(id),
  variant_id  UUID REFERENCES product_variants(id),
  order_id    UUID REFERENCES orders(id),
  metadata    JSONB DEFAULT '{}',
  ip_address  INET,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_analytics_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_date ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_product ON analytics_events(product_id) WHERE product_id IS NOT NULL;
