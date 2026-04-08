-- Seed categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Hoodies', 'hoodies', 'Hoodies de golf con estilo vintage moderno', 1),
  ('Franelas', 'franelas', 'Franelas casuales para el día a día en el green', 2),
  ('Polos', 'polos', 'Polos clásicos con el toque Pahr', 3),
  ('Pantalones', 'pantalones', 'Pantalones técnicos y con estilo', 4);

-- Seed products (using subqueries for category_id)
INSERT INTO products (category_id, name, slug, description, base_price_usd, is_featured, metadata) VALUES
  ((SELECT id FROM categories WHERE slug = 'hoodies'), 'Hoodie Forest Classic', 'hoodie-forest-classic', 'Hoodie premium con bordado Pahr en el pecho. Algodón 100% peinado, ideal para las mañanas frescas en el campo.', 45.00, true, '{"material": "100% Algodón peinado", "cuidados": "Lavar a máquina en frío"}'),
  ((SELECT id FROM categories WHERE slug = 'hoodies'), 'Hoodie Sand Dune', 'hoodie-sand-dune', 'Hoodie color arena con detalles en tono dorado. Corte relajado y tejido suave.', 48.00, false, '{"material": "80% Algodón, 20% Poliéster", "cuidados": "Lavar a máquina en frío"}'),
  ((SELECT id FROM categories WHERE slug = 'franelas'), 'Franela Fairway', 'franela-fairway', 'Franela de algodón con logo Pahr minimalista. Perfecta para usar dentro y fuera del campo.', 25.00, true, '{"material": "100% Algodón", "cuidados": "Lavar a máquina"}'),
  ((SELECT id FROM categories WHERE slug = 'franelas'), 'Franela Birdie', 'franela-birdie', 'Diseño exclusivo con gráfico de birdie vintage. Algodón suave y corte regular.', 28.00, false, '{"material": "100% Algodón", "cuidados": "Lavar a máquina"}'),
  ((SELECT id FROM categories WHERE slug = 'polos'), 'Polo Heritage', 'polo-heritage', 'Polo de piqué premium con cuello clásico y bordado Pahr. El polo que todo golfista necesita.', 38.00, true, '{"material": "100% Algodón Piqué", "cuidados": "Lavar a máquina en frío, no usar secadora"}'),
  ((SELECT id FROM categories WHERE slug = 'polos'), 'Polo Green Master', 'polo-green-master', 'Polo técnico con tecnología de secado rápido. Diseño limpio y elegante.', 42.00, true, '{"material": "92% Poliéster, 8% Elastano", "cuidados": "Lavar a máquina"}'),
  ((SELECT id FROM categories WHERE slug = 'pantalones'), 'Pantalón Clubhouse', 'pantalon-clubhouse', 'Pantalón chino slim con stretch. Del campo al clubhouse sin perder el estilo.', 52.00, true, '{"material": "97% Algodón, 3% Elastano", "cuidados": "Lavar a máquina en frío"}'),
  ((SELECT id FROM categories WHERE slug = 'pantalones'), 'Pantalón Links', 'pantalon-links', 'Pantalón técnico ligero con protección UV. Ideal para rondas bajo el sol.', 55.00, false, '{"material": "90% Nylon, 10% Elastano", "cuidados": "Lavar a máquina"}');

-- Seed product variants
-- Hoodie Forest Classic
INSERT INTO product_variants (product_id, size, color, color_hex, sku, stock, low_stock_threshold) VALUES
  ((SELECT id FROM products WHERE slug = 'hoodie-forest-classic'), 'S', 'Verde Bosque', '#2D5016', 'PAHR-HOO-VRD-S', 10, 3),
  ((SELECT id FROM products WHERE slug = 'hoodie-forest-classic'), 'M', 'Verde Bosque', '#2D5016', 'PAHR-HOO-VRD-M', 15, 3),
  ((SELECT id FROM products WHERE slug = 'hoodie-forest-classic'), 'L', 'Verde Bosque', '#2D5016', 'PAHR-HOO-VRD-L', 12, 3),
  ((SELECT id FROM products WHERE slug = 'hoodie-forest-classic'), 'XL', 'Verde Bosque', '#2D5016', 'PAHR-HOO-VRD-XL', 8, 3),
  ((SELECT id FROM products WHERE slug = 'hoodie-forest-classic'), 'S', 'Negro', '#1a1a1a', 'PAHR-HOO-NEG-S', 10, 3),
  ((SELECT id FROM products WHERE slug = 'hoodie-forest-classic'), 'M', 'Negro', '#1a1a1a', 'PAHR-HOO-NEG-M', 15, 3),
  ((SELECT id FROM products WHERE slug = 'hoodie-forest-classic'), 'L', 'Negro', '#1a1a1a', 'PAHR-HOO-NEG-L', 12, 3),
  ((SELECT id FROM products WHERE slug = 'hoodie-forest-classic'), 'XL', 'Negro', '#1a1a1a', 'PAHR-HOO-NEG-XL', 8, 3);

-- Polo Heritage
INSERT INTO product_variants (product_id, size, color, color_hex, sku, stock, low_stock_threshold) VALUES
  ((SELECT id FROM products WHERE slug = 'polo-heritage'), 'S', 'Blanco', '#FFFFFF', 'PAHR-POL-BLA-S', 20, 5),
  ((SELECT id FROM products WHERE slug = 'polo-heritage'), 'M', 'Blanco', '#FFFFFF', 'PAHR-POL-BLA-M', 25, 5),
  ((SELECT id FROM products WHERE slug = 'polo-heritage'), 'L', 'Blanco', '#FFFFFF', 'PAHR-POL-BLA-L', 20, 5),
  ((SELECT id FROM products WHERE slug = 'polo-heritage'), 'XL', 'Blanco', '#FFFFFF', 'PAHR-POL-BLA-XL', 15, 5),
  ((SELECT id FROM products WHERE slug = 'polo-heritage'), 'S', 'Verde Bosque', '#2D5016', 'PAHR-POL-VRD-S', 15, 5),
  ((SELECT id FROM products WHERE slug = 'polo-heritage'), 'M', 'Verde Bosque', '#2D5016', 'PAHR-POL-VRD-M', 20, 5),
  ((SELECT id FROM products WHERE slug = 'polo-heritage'), 'L', 'Verde Bosque', '#2D5016', 'PAHR-POL-VRD-L', 18, 5),
  ((SELECT id FROM products WHERE slug = 'polo-heritage'), 'XL', 'Verde Bosque', '#2D5016', 'PAHR-POL-VRD-XL', 12, 5);

-- Franela Fairway
INSERT INTO product_variants (product_id, size, color, color_hex, sku, stock, low_stock_threshold) VALUES
  ((SELECT id FROM products WHERE slug = 'franela-fairway'), 'S', 'Beige', '#D5C6B0', 'PAHR-FRA-BEI-S', 18, 5),
  ((SELECT id FROM products WHERE slug = 'franela-fairway'), 'M', 'Beige', '#D5C6B0', 'PAHR-FRA-BEI-M', 22, 5),
  ((SELECT id FROM products WHERE slug = 'franela-fairway'), 'L', 'Beige', '#D5C6B0', 'PAHR-FRA-BEI-L', 20, 5),
  ((SELECT id FROM products WHERE slug = 'franela-fairway'), 'XL', 'Beige', '#D5C6B0', 'PAHR-FRA-BEI-XL', 14, 5);

-- Pantalón Clubhouse
INSERT INTO product_variants (product_id, size, color, color_hex, sku, stock, low_stock_threshold) VALUES
  ((SELECT id FROM products WHERE slug = 'pantalon-clubhouse'), 'S', 'Khaki', '#C3B091', 'PAHR-PAN-KHA-S', 10, 3),
  ((SELECT id FROM products WHERE slug = 'pantalon-clubhouse'), 'M', 'Khaki', '#C3B091', 'PAHR-PAN-KHA-M', 15, 3),
  ((SELECT id FROM products WHERE slug = 'pantalon-clubhouse'), 'L', 'Khaki', '#C3B091', 'PAHR-PAN-KHA-L', 12, 3),
  ((SELECT id FROM products WHERE slug = 'pantalon-clubhouse'), 'XL', 'Khaki', '#C3B091', 'PAHR-PAN-KHA-XL', 8, 3),
  ((SELECT id FROM products WHERE slug = 'pantalon-clubhouse'), 'M', 'Negro', '#1a1a1a', 'PAHR-PAN-NEG-M', 15, 3),
  ((SELECT id FROM products WHERE slug = 'pantalon-clubhouse'), 'L', 'Negro', '#1a1a1a', 'PAHR-PAN-NEG-L', 12, 3);
