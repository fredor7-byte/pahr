import { createAdminClient } from "@/lib/supabase/admin";
import { StatsCard } from "@/components/admin/stats-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { OrdersTable } from "@/components/admin/orders-table";
import { formatUSD } from "@/lib/utils";
import {
  DollarSign,
  ShoppingCart,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  // Fetch dashboard stats from the view
  const { data: statsRow } = await supabase
    .from("v_dashboard_stats")
    .select("*")
    .single();

  const stats = {
    revenue_month: (statsRow?.revenue_month as number) ?? 0,
    orders_month: (statsRow?.orders_month as number) ?? 0,
    pending_verification: (statsRow?.pending_verification as number) ?? 0,
    low_stock: (statsRow?.low_stock as number) ?? 0,
  };

  // Fetch recent orders with customer name
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("id, order_number, status, payment_method, total_usd, created_at, customers(full_name)")
    .order("created_at", { ascending: false })
    .limit(10);

  const orders = (recentOrders ?? []).map((o: Record<string, unknown>) => ({
    id: o.id as string,
    order_number: o.order_number as string,
    customer_name: ((o.customers as Record<string, unknown>)?.full_name as string) ?? "—",
    status: o.status as string,
    payment_method: o.payment_method as string,
    total_usd: o.total_usd as number,
    created_at: o.created_at as string,
  }));

  // Fetch revenue data for chart — daily totals for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: revenueOrders } = await supabase
    .from("orders")
    .select("total_usd, created_at")
    .gte("created_at", thirtyDaysAgo.toISOString())
    .in("status", ["pago_verificado", "en_preparacion", "enviado", "entregado"])
    .order("created_at", { ascending: true });

  // Aggregate by date
  const revenueByDate: Record<string, number> = {};
  for (const o of revenueOrders ?? []) {
    const date = new Date(o.created_at).toLocaleDateString("es-VE", {
      day: "numeric",
      month: "short",
    });
    revenueByDate[date] = (revenueByDate[date] ?? 0) + (o.total_usd as number);
  }
  const revenueData = Object.entries(revenueByDate).map(([date, revenue]) => ({
    date,
    revenue,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
          Dashboard
        </h1>
        <p className="text-sm text-charcoal-500">
          Resumen del negocio
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Ingresos del mes"
          value={formatUSD(stats.revenue_month)}
          description={new Date().toLocaleDateString("es-VE", { month: "long", year: "numeric" })}
          icon={DollarSign}
        />
        <StatsCard
          title="Pedidos"
          value={String(stats.orders_month)}
          description="Este mes"
          icon={ShoppingCart}
        />
        <StatsCard
          title="Pendientes"
          value={String(stats.pending_verification)}
          description="Por verificar pago"
          icon={Clock}
        />
        <StatsCard
          title="Stock bajo"
          value={String(stats.low_stock)}
          description="Productos por reabastecer"
          icon={AlertTriangle}
        />
      </div>

      {/* Chart */}
      <RevenueChart data={revenueData} />

      {/* Recent Orders */}
      <OrdersTable orders={orders} limit={5} />
    </div>
  );
}
