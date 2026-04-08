import type { Category, ProductWithDetails } from "@/types/product";

export const MOCK_CATEGORIES: Category[] = [
  { id: "cat-1", name: "Hoodies", slug: "hoodies", description: "Signature hoodies para el campo y la ciudad", image_url: null, sort_order: 1, is_active: true },
  { id: "cat-2", name: "Jerseys", slug: "jerseys", description: "Long sleeve jerseys con estilo Pahr", image_url: null, sort_order: 2, is_active: true },
  { id: "cat-3", name: "Tees", slug: "tees", description: "Sunday tees para el día a día", image_url: null, sort_order: 3, is_active: true },
  { id: "cat-4", name: "Polos", slug: "polos", description: "Piqué y Essential polos para el green", image_url: null, sort_order: 4, is_active: true },
  { id: "cat-5", name: "Pants", slug: "pants", description: "Fred pants para jugar con estilo", image_url: null, sort_order: 5, is_active: true },
];

export const MOCK_PRODUCTS: ProductWithDetails[] = [
  // === HOODIES ===
  {
    id: "prod-1", category_id: "cat-1", name: "Signature Hoodie", slug: "signature-hoodie",
    description: "Hoodie premium con logo Pahr bordado en la espalda. Diseñado para las mañanas frescas en el campo y las tardes en la ciudad.",
    base_price_usd: 45.00, is_featured: true, is_active: true, created_at: "2024-01-01",
    metadata: { material: "100% Algodón peinado", cuidados: "Lavar a máquina en frío" },
    category: { id: "cat-1", name: "Hoodies", slug: "hoodies", description: null, image_url: null, sort_order: 1, is_active: true },
    variants: [
      { id: "v-1", product_id: "prod-1", size: "S", color: "Light Green", color_hex: "#8B9F7B", sku: "PAHR-SH-LGR-S", stock: 10, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-2", product_id: "prod-1", size: "M", color: "Light Green", color_hex: "#8B9F7B", sku: "PAHR-SH-LGR-M", stock: 15, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-3", product_id: "prod-1", size: "L", color: "Light Green", color_hex: "#8B9F7B", sku: "PAHR-SH-LGR-L", stock: 12, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-4", product_id: "prod-1", size: "XL", color: "Light Green", color_hex: "#8B9F7B", sku: "PAHR-SH-LGR-XL", stock: 8, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-5", product_id: "prod-1", size: "S", color: "Grey", color_hex: "#C4C4C4", sku: "PAHR-SH-GRY-S", stock: 10, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-6", product_id: "prod-1", size: "M", color: "Grey", color_hex: "#C4C4C4", sku: "PAHR-SH-GRY-M", stock: 15, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-7", product_id: "prod-1", size: "L", color: "Grey", color_hex: "#C4C4C4", sku: "PAHR-SH-GRY-L", stock: 12, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-8", product_id: "prod-1", size: "XL", color: "Grey", color_hex: "#C4C4C4", sku: "PAHR-SH-GRY-XL", stock: 2, low_stock_threshold: 3, price_override_usd: null, is_active: true },
    ],
    images: [
      { id: "img-1a", product_id: "prod-1", url: "/images/products/lifestyle/lifestyle-hero.jpg", alt_text: "Signature Hoodie", sort_order: 0, is_primary: true },
    ],
  },

  // === JERSEYS ===
  {
    id: "prod-2", category_id: "cat-2", name: "Signature Jersey", slug: "signature-jersey",
    description: "Jersey de manga larga con logo PAHR en el pecho. Algodón premium, corte relajado y perfecto para cualquier ocasión.",
    base_price_usd: 35.00, is_featured: true, is_active: true, created_at: "2024-01-02",
    metadata: { material: "100% Algodón", cuidados: "Lavar a máquina en frío" },
    category: { id: "cat-2", name: "Jerseys", slug: "jerseys", description: null, image_url: null, sort_order: 2, is_active: true },
    variants: [
      { id: "v-9", product_id: "prod-2", size: "S", color: "Off White", color_hex: "#F0EDE8", sku: "PAHR-SJ-OFW-S", stock: 14, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-10", product_id: "prod-2", size: "M", color: "Off White", color_hex: "#F0EDE8", sku: "PAHR-SJ-OFW-M", stock: 18, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-11", product_id: "prod-2", size: "L", color: "Off White", color_hex: "#F0EDE8", sku: "PAHR-SJ-OFW-L", stock: 16, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-12", product_id: "prod-2", size: "XL", color: "Off White", color_hex: "#F0EDE8", sku: "PAHR-SJ-OFW-XL", stock: 10, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-13", product_id: "prod-2", size: "S", color: "Graphite", color_hex: "#4A4453", sku: "PAHR-SJ-GRA-S", stock: 12, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-14", product_id: "prod-2", size: "M", color: "Graphite", color_hex: "#4A4453", sku: "PAHR-SJ-GRA-M", stock: 20, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-15", product_id: "prod-2", size: "L", color: "Graphite", color_hex: "#4A4453", sku: "PAHR-SJ-GRA-L", stock: 15, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-16", product_id: "prod-2", size: "XL", color: "Graphite", color_hex: "#4A4453", sku: "PAHR-SJ-GRA-XL", stock: 8, low_stock_threshold: 5, price_override_usd: null, is_active: true },
    ],
    images: [
      { id: "img-2a", product_id: "prod-2", url: "/images/products/lifestyle/lifestyle-2.jpg", alt_text: "Signature Jersey", sort_order: 0, is_primary: true },
    ],
  },

  // === TEES ===
  {
    id: "prod-3", category_id: "cat-3", name: "Sunday Tees", slug: "sunday-tees",
    description: "La franela esencial de Pahr. Logo de las paticas bordado en el pecho. Algodón suave, corte regular, perfecta para los domingos.",
    base_price_usd: 25.00, is_featured: true, is_active: true, created_at: "2024-01-03",
    metadata: { material: "100% Algodón peinado", cuidados: "Lavar a máquina" },
    category: { id: "cat-3", name: "Tees", slug: "tees", description: null, image_url: null, sort_order: 3, is_active: true },
    variants: [
      { id: "v-17", product_id: "prod-3", size: "S", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-ST-BLK-S", stock: 20, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-18", product_id: "prod-3", size: "M", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-ST-BLK-M", stock: 25, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-19", product_id: "prod-3", size: "L", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-ST-BLK-L", stock: 22, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-20", product_id: "prod-3", size: "XL", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-ST-BLK-XL", stock: 15, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-21", product_id: "prod-3", size: "S", color: "White", color_hex: "#FFFFFF", sku: "PAHR-ST-WHT-S", stock: 20, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-22", product_id: "prod-3", size: "M", color: "White", color_hex: "#FFFFFF", sku: "PAHR-ST-WHT-M", stock: 25, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-23", product_id: "prod-3", size: "L", color: "White", color_hex: "#FFFFFF", sku: "PAHR-ST-WHT-L", stock: 22, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-24", product_id: "prod-3", size: "XL", color: "White", color_hex: "#FFFFFF", sku: "PAHR-ST-WHT-XL", stock: 15, low_stock_threshold: 5, price_override_usd: null, is_active: true },
    ],
    images: [
      { id: "img-3a", product_id: "prod-3", url: "/images/products/sunday-tees/black-1.jpg", alt_text: "Sunday Tees Black", sort_order: 0, is_primary: true },
      { id: "img-3b", product_id: "prod-3", url: "/images/products/sunday-tees/black-detail.jpg", alt_text: "Sunday Tees Black detail", sort_order: 1, is_primary: false },
      { id: "img-3c", product_id: "prod-3", url: "/images/products/sunday-tees/white-1.jpg", alt_text: "Sunday Tees White", sort_order: 2, is_primary: false },
      { id: "img-3d", product_id: "prod-3", url: "/images/products/sunday-tees/white-2.jpg", alt_text: "Sunday Tees White lifestyle", sort_order: 3, is_primary: false },
    ],
  },

  // === POLOS ===
  {
    id: "prod-4", category_id: "cat-4", name: "Piqué Polo", slug: "pique-polo",
    description: "Polo de piqué premium con cuello clásico y la P de Pahr bordada. Diseñado para el green y el clubhouse.",
    base_price_usd: 38.00, is_featured: true, is_active: true, created_at: "2024-01-04",
    metadata: { material: "100% Algodón Piqué", cuidados: "Lavar a máquina en frío, no usar secadora" },
    category: { id: "cat-4", name: "Polos", slug: "polos", description: null, image_url: null, sort_order: 4, is_active: true },
    variants: [
      { id: "v-25", product_id: "prod-4", size: "S", color: "Beige", color_hex: "#E8D9C5", sku: "PAHR-PP-BEI-S", stock: 12, low_stock_threshold: 4, price_override_usd: null, is_active: true },
      { id: "v-26", product_id: "prod-4", size: "M", color: "Beige", color_hex: "#E8D9C5", sku: "PAHR-PP-BEI-M", stock: 18, low_stock_threshold: 4, price_override_usd: null, is_active: true },
      { id: "v-27", product_id: "prod-4", size: "L", color: "Beige", color_hex: "#E8D9C5", sku: "PAHR-PP-BEI-L", stock: 15, low_stock_threshold: 4, price_override_usd: null, is_active: true },
      { id: "v-28", product_id: "prod-4", size: "XL", color: "Beige", color_hex: "#E8D9C5", sku: "PAHR-PP-BEI-XL", stock: 10, low_stock_threshold: 4, price_override_usd: null, is_active: true },
      { id: "v-29", product_id: "prod-4", size: "S", color: "Green", color_hex: "#B8C9B3", sku: "PAHR-PP-GRN-S", stock: 10, low_stock_threshold: 4, price_override_usd: null, is_active: true },
      { id: "v-30", product_id: "prod-4", size: "M", color: "Green", color_hex: "#B8C9B3", sku: "PAHR-PP-GRN-M", stock: 15, low_stock_threshold: 4, price_override_usd: null, is_active: true },
      { id: "v-31", product_id: "prod-4", size: "L", color: "Green", color_hex: "#B8C9B3", sku: "PAHR-PP-GRN-L", stock: 12, low_stock_threshold: 4, price_override_usd: null, is_active: true },
      { id: "v-32", product_id: "prod-4", size: "S", color: "Lila", color_hex: "#C4B7CC", sku: "PAHR-PP-LIL-S", stock: 10, low_stock_threshold: 4, price_override_usd: null, is_active: true },
      { id: "v-33", product_id: "prod-4", size: "M", color: "Lila", color_hex: "#C4B7CC", sku: "PAHR-PP-LIL-M", stock: 14, low_stock_threshold: 4, price_override_usd: null, is_active: true },
      { id: "v-34", product_id: "prod-4", size: "L", color: "Lila", color_hex: "#C4B7CC", sku: "PAHR-PP-LIL-L", stock: 11, low_stock_threshold: 4, price_override_usd: null, is_active: true },
    ],
    images: [
      { id: "img-4a", product_id: "prod-4", url: "/images/products/pique-polo/beige-1.jpg", alt_text: "Piqué Polo Beige", sort_order: 0, is_primary: true },
      { id: "img-4b", product_id: "prod-4", url: "/images/products/pique-polo/green-1.jpg", alt_text: "Piqué Polo Green", sort_order: 1, is_primary: false },
      { id: "img-4c", product_id: "prod-4", url: "/images/products/pique-polo/green-2.jpg", alt_text: "Piqué Polo Green lifestyle", sort_order: 2, is_primary: false },
      { id: "img-4d", product_id: "prod-4", url: "/images/products/pique-polo/lila-1.jpg", alt_text: "Piqué Polo Lila", sort_order: 3, is_primary: false },
      { id: "img-4e", product_id: "prod-4", url: "/images/products/pique-polo/lila-2.jpg", alt_text: "Piqué Polo Lila lifestyle", sort_order: 4, is_primary: false },
      { id: "img-4f", product_id: "prod-4", url: "/images/products/pique-polo/lila-detail.jpg", alt_text: "Piqué Polo detail P bordada", sort_order: 5, is_primary: false },
      { id: "img-4g", product_id: "prod-4", url: "/images/products/pique-polo/lila-detail2.jpg", alt_text: "Piqué Polo manga bordado", sort_order: 6, is_primary: false },
    ],
  },
  {
    id: "prod-5", category_id: "cat-4", name: "Essential Polo", slug: "essential-polo",
    description: "Polo técnico con la P de Pahr bordada. Secado rápido, diseño limpio y elegante para el campo.",
    base_price_usd: 42.00, is_featured: true, is_active: true, created_at: "2024-01-05",
    metadata: { material: "92% Poliéster, 8% Elastano", cuidados: "Lavar a máquina" },
    category: { id: "cat-4", name: "Polos", slug: "polos", description: null, image_url: null, sort_order: 4, is_active: true },
    variants: [
      { id: "v-35", product_id: "prod-5", size: "S", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-EP-BLK-S", stock: 15, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-36", product_id: "prod-5", size: "M", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-EP-BLK-M", stock: 20, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-37", product_id: "prod-5", size: "L", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-EP-BLK-L", stock: 18, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-38", product_id: "prod-5", size: "XL", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-EP-BLK-XL", stock: 12, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-39", product_id: "prod-5", size: "S", color: "Aquamarine", color_hex: "#6B9B97", sku: "PAHR-EP-AQU-S", stock: 12, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-40", product_id: "prod-5", size: "M", color: "Aquamarine", color_hex: "#6B9B97", sku: "PAHR-EP-AQU-M", stock: 16, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-41", product_id: "prod-5", size: "L", color: "Aquamarine", color_hex: "#6B9B97", sku: "PAHR-EP-AQU-L", stock: 14, low_stock_threshold: 5, price_override_usd: null, is_active: true },
      { id: "v-42", product_id: "prod-5", size: "XL", color: "Aquamarine", color_hex: "#6B9B97", sku: "PAHR-EP-AQU-XL", stock: 8, low_stock_threshold: 5, price_override_usd: null, is_active: true },
    ],
    images: [
      { id: "img-5a", product_id: "prod-5", url: "/images/products/lifestyle/lifestyle-3.jpg", alt_text: "Essential Polo", sort_order: 0, is_primary: true },
    ],
  },

  // === PANTS ===
  {
    id: "prod-6", category_id: "cat-5", name: "Fred Elegance Pants", slug: "fred-elegance-pants",
    description: "Pantalón de vestir con corte slim y stretch. Del campo al clubhouse sin perder el estilo. Elegancia clásica con la comodidad que necesitas.",
    base_price_usd: 55.00, is_featured: true, is_active: true, created_at: "2024-01-06",
    metadata: { material: "97% Algodón, 3% Elastano", cuidados: "Lavar a máquina en frío" },
    category: { id: "cat-5", name: "Pants", slug: "pants", description: null, image_url: null, sort_order: 5, is_active: true },
    variants: [
      { id: "v-43", product_id: "prod-6", size: "S", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-FE-BLK-S", stock: 10, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-44", product_id: "prod-6", size: "M", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-FE-BLK-M", stock: 15, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-45", product_id: "prod-6", size: "L", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-FE-BLK-L", stock: 12, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-46", product_id: "prod-6", size: "XL", color: "Black", color_hex: "#1a1a1a", sku: "PAHR-FE-BLK-XL", stock: 8, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-47", product_id: "prod-6", size: "S", color: "Navy Blue", color_hex: "#1B2A4A", sku: "PAHR-FE-NAV-S", stock: 10, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-48", product_id: "prod-6", size: "M", color: "Navy Blue", color_hex: "#1B2A4A", sku: "PAHR-FE-NAV-M", stock: 14, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-49", product_id: "prod-6", size: "L", color: "Navy Blue", color_hex: "#1B2A4A", sku: "PAHR-FE-NAV-L", stock: 11, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-50", product_id: "prod-6", size: "XL", color: "Navy Blue", color_hex: "#1B2A4A", sku: "PAHR-FE-NAV-XL", stock: 7, low_stock_threshold: 3, price_override_usd: null, is_active: true },
    ],
    images: [
      { id: "img-6a", product_id: "prod-6", url: "/images/products/fred-elegance-pants/navy-1.jpg", alt_text: "Fred Elegance Pants Navy Blue", sort_order: 0, is_primary: true },
      { id: "img-6b", product_id: "prod-6", url: "/images/products/fred-elegance-pants/black-1.jpg", alt_text: "Fred Elegance Pants Black", sort_order: 1, is_primary: false },
      { id: "img-6c", product_id: "prod-6", url: "/images/products/fred-elegance-pants/navy-detail.jpg", alt_text: "Fred Elegance Pants detail P bordada", sort_order: 2, is_primary: false },
    ],
  },
  {
    id: "prod-7", category_id: "cat-5", name: "Fred Pants", slug: "fred-pants",
    description: "Pantalón técnico ligero con corte recto. Perfecto para la ronda de golf o el día a día. Comodidad y estilo en cada paso.",
    base_price_usd: 50.00, is_featured: false, is_active: true, created_at: "2024-01-07",
    metadata: { material: "90% Nylon, 10% Elastano", cuidados: "Lavar a máquina" },
    category: { id: "cat-5", name: "Pants", slug: "pants", description: null, image_url: null, sort_order: 5, is_active: true },
    variants: [
      { id: "v-51", product_id: "prod-7", size: "S", color: "Light Grey", color_hex: "#D4D4D4", sku: "PAHR-FP-LGR-S", stock: 10, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-52", product_id: "prod-7", size: "M", color: "Light Grey", color_hex: "#D4D4D4", sku: "PAHR-FP-LGR-M", stock: 15, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-53", product_id: "prod-7", size: "L", color: "Light Grey", color_hex: "#D4D4D4", sku: "PAHR-FP-LGR-L", stock: 12, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-54", product_id: "prod-7", size: "XL", color: "Light Grey", color_hex: "#D4D4D4", sku: "PAHR-FP-LGR-XL", stock: 8, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-55", product_id: "prod-7", size: "S", color: "Green", color_hex: "#6B7C42", sku: "PAHR-FP-GRN-S", stock: 10, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-56", product_id: "prod-7", size: "M", color: "Green", color_hex: "#6B7C42", sku: "PAHR-FP-GRN-M", stock: 14, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-57", product_id: "prod-7", size: "L", color: "Green", color_hex: "#6B7C42", sku: "PAHR-FP-GRN-L", stock: 11, low_stock_threshold: 3, price_override_usd: null, is_active: true },
      { id: "v-58", product_id: "prod-7", size: "XL", color: "Green", color_hex: "#6B7C42", sku: "PAHR-FP-GRN-XL", stock: 6, low_stock_threshold: 3, price_override_usd: null, is_active: true },
    ],
    images: [
      { id: "img-7a", product_id: "prod-7", url: "/images/products/lifestyle/lifestyle-1.jpg", alt_text: "Fred Pants", sort_order: 0, is_primary: true },
    ],
  },
];

// Mock exchange rate
export const MOCK_EXCHANGE_RATE = {
  id: "rate-1",
  rate_bs_per_usd: 86.50,
  is_current: true,
  created_at: "2024-04-08",
};
