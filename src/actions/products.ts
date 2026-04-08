"use server";

import { createClient } from "@/lib/supabase/server";
import type { ProductFilters, ProductWithDetails, Category } from "@/types/product";

export async function getProducts(
  filters: ProductFilters = {}
): Promise<{ products: ProductWithDetails[]; total: number }> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*),
      images:product_images(*)
    `)
    .eq("is_active", true);

  if (filters.categoria) {
    query = query.eq("category.slug", filters.categoria);
  }

  switch (filters.orden) {
    case "precio-asc":
      query = query.order("base_price_usd", { ascending: true });
      break;
    case "precio-desc":
      query = query.order("base_price_usd", { ascending: false });
      break;
    case "nombre":
      query = query.order("name", { ascending: true });
      break;
    case "reciente":
      query = query.order("created_at", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }

  let products = (data ?? []) as ProductWithDetails[];

  // Filter by category slug (inner join doesn't filter nulls properly with PostgREST)
  if (filters.categoria) {
    products = products.filter((p) => p.category?.slug === filters.categoria);
  }

  // Filter by size (client-side since it's a nested filter)
  if (filters.talla) {
    products = products.filter((p) =>
      p.variants?.some((v) => v.size === filters.talla && v.stock > 0)
    );
  }

  // Filter by color
  if (filters.color) {
    products = products.filter((p) =>
      p.variants?.some(
        (v) => v.color.toLowerCase() === filters.color!.toLowerCase() && v.stock > 0
      )
    );
  }

  return { products, total: products.length };
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithDetails | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*),
      images:product_images(*)
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return null;

  return data as ProductWithDetails;
}

export async function getFeaturedProducts(): Promise<ProductWithDetails[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*),
      images:product_images(*)
    `)
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(8);

  if (error) return [];
  return (data ?? []) as ProductWithDetails[];
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data ?? []) as Category[];
}

export async function getAvailableColors(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product_variants")
    .select("color")
    .eq("is_active", true)
    .gt("stock", 0);

  if (error) return [];

  const colors = new Set<string>();
  data?.forEach((v) => colors.add(v.color));
  return Array.from(colors).sort();
}

export async function getPairsWellWith(
  product: ProductWithDetails
): Promise<ProductWithDetails[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*),
      images:product_images(*)
    `)
    .eq("is_active", true)
    .neq("category_id", product.category_id)
    .neq("id", product.id)
    .order("is_featured", { ascending: false })
    .limit(3);

  if (error) return [];
  return (data ?? []) as ProductWithDetails[];
}
