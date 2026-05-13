export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  base_price_usd: number;
  cost_usd: number | null;
  compare_at_price_usd: number | null;
  is_featured: boolean;
  is_active: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  category?: Category;
  variants?: ProductVariant[];
  images?: ProductImage[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size: string;
  color: string;
  color_hex: string | null;
  sku: string;
  stock: number;
  low_stock_threshold: number;
  price_override_usd: number | null;
  is_active: boolean;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
}

export interface ProductWithDetails extends Product {
  category: Category;
  variants: ProductVariant[];
  images: ProductImage[];
}

export interface ProductFilters {
  categoria?: string;
  talla?: string;
  color?: string;
  orden?: "precio-asc" | "precio-desc" | "nombre" | "reciente";
  pagina?: number;
}
