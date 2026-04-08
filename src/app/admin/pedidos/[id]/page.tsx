import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import PedidoDetailClient from "./pedido-detail-client";

export default async function PedidoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  // Fetch order with customer, items, and payment proofs
  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      customers (full_name, email, phone, cedula),
      order_items (
        id,
        product_name,
        variant_desc,
        quantity,
        unit_price_usd
      ),
      payment_proofs (
        id,
        reference_number,
        declared_amount,
        declared_currency,
        image_url
      )
    `)
    .eq("id", id)
    .single();

  if (error || !order) {
    notFound();
  }

  return <PedidoDetailClient order={order} />;
}
