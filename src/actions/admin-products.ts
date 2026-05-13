"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    description?: string | null;
    base_price_usd?: number;
    cost_usd?: number | null;
    compare_at_price_usd?: number | null;
    is_active?: boolean;
    is_featured?: boolean;
  }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("products")
    .update(data)
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${id}`);
  revalidatePath("/catalogo");
  return { success: true };
}

export async function updateVariantStock(
  variantId: string,
  newStock: number
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  // Get previous stock for inventory log
  const { data: variant } = await supabase
    .from("product_variants")
    .select("stock, product_id")
    .eq("id", variantId)
    .single();

  if (!variant) return { success: false, error: "Variante no encontrada" };

  const { error } = await supabase
    .from("product_variants")
    .update({ stock: newStock })
    .eq("id", variantId);

  if (error) return { success: false, error: error.message };

  // Log inventory change
  await supabase.from("inventory_logs").insert({
    variant_id: variantId,
    action: "adjustment",
    quantity: newStock - variant.stock,
    previous_stock: variant.stock,
    new_stock: newStock,
    reason: "Ajuste manual desde admin",
  });

  revalidatePath("/admin/productos");
  revalidatePath("/admin/inventario");
  return { success: true };
}

export async function deleteProduct(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  // Soft delete: set is_active = false
  const { error } = await supabase
    .from("products")
    .update({ is_active: false })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/productos");
  revalidatePath("/catalogo");
  return { success: true };
}
