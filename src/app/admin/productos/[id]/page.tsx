import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import ProductEditClient from "./product-edit-client";

export default async function EditProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(*), variants:product_variants(*), images:product_images(*)")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return <ProductEditClient product={product} />;
}
