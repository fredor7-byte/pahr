import { createAdminClient } from "@/lib/supabase/admin";
import { OrdersTable } from "@/components/admin/orders-table";

export default async function PedidosPage() {
  const supabase = createAdminClient();

  const { data: ordersData } = await supabase
    .from("orders")
    .select("id, order_number, status, payment_method, total_usd, created_at, customers(full_name)")
    .order("created_at", { ascending: false });

  const orders = (ordersData ?? []).map((o: Record<string, unknown>) => ({
    id: o.id as string,
    order_number: o.order_number as string,
    customer_name: ((o.customers as Record<string, unknown>)?.full_name as string) ?? "—",
    status: o.status as string,
    payment_method: o.payment_method as string,
    total_usd: o.total_usd as number,
    created_at: o.created_at as string,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
          Pedidos
        </h1>
        <p className="text-sm text-charcoal-500">
          Gestiona y verifica los pedidos
        </p>
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
