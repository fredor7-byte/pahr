import { createAdminClient } from "@/lib/supabase/admin";
import { formatUSD } from "@/lib/utils";
import { StatsCard } from "@/components/admin/stats-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
} from "lucide-react";
import ReportesCharts from "./reportes-charts";

export default async function ReportesPage() {
  const supabase = createAdminClient();

  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Fetch orders in last 90 days for stats
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("id, total_usd, payment_method, status, created_at")
    .gte("created_at", ninetyDaysAgo.toISOString())
    .in("status", ["pago_verificado", "en_preparacion", "enviado", "entregado"]);

  const orders90 = recentOrders ?? [];
  const totalRevenue = orders90.reduce((sum, o) => sum + ((o.total_usd as number) ?? 0), 0);
  const totalOrders = orders90.length;
  const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Count unique customers
  const { count: customerCount } = await supabase
    .from("customers")
    .select("id", { count: "exact", head: true });

  // Payment method distribution
  const paymentCounts: Record<string, number> = {};
  for (const o of orders90) {
    const method = o.payment_method as string;
    paymentCounts[method] = (paymentCounts[method] ?? 0) + 1;
  }
  const paymentMethodColors: Record<string, string> = {
    pago_movil: "#2D5016",
    zelle: "#d49a22",
    binance: "#F0B90B",
  };
  const paymentMethodLabels: Record<string, string> = {
    pago_movil: "Pago Móvil",
    zelle: "Zelle",
    binance: "Binance Pay",
  };
  const paymentData = Object.entries(paymentCounts).map(([method, count]) => ({
    name: paymentMethodLabels[method] ?? method,
    value: totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0,
    color: paymentMethodColors[method] ?? "#999",
  }));

  // Top products by units sold
  const { data: topItems } = await supabase
    .from("order_items")
    .select("product_name, quantity");

  const productUnits: Record<string, number> = {};
  for (const item of topItems ?? []) {
    const name = item.product_name as string;
    productUnits[name] = (productUnits[name] ?? 0) + ((item.quantity as number) ?? 0);
  }
  const topProducts = Object.entries(productUnits)
    .map(([name, units]) => ({ name, units }))
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);

  // Revenue chart data (last 30 days)
  const { data: revenueOrders } = await supabase
    .from("orders")
    .select("total_usd, created_at")
    .gte("created_at", thirtyDaysAgo.toISOString())
    .in("status", ["pago_verificado", "en_preparacion", "enviado", "entregado"])
    .order("created_at", { ascending: true });

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

  // Abandoned carts (last 30 days)
  const { data: abandonedCarts, count: abandonedCount } = await supabase
    .from("carts")
    .select("id, total_usd", { count: "exact" })
    .gte("created_at", thirtyDaysAgo.toISOString())
    .is("converted_at", null);

  const abandoned = abandonedCarts ?? [];
  const abandonedTotal = abandoned.reduce(
    (sum, c) => sum + (((c as Record<string, unknown>).total_usd as number) ?? 0),
    0
  );
  const abandonedAvg = (abandonedCount ?? 0) > 0 ? abandonedTotal / (abandonedCount ?? 1) : 0;

  // Analytics events for conversion funnel
  const { count: sessionCount } = await supabase
    .from("analytics_events")
    .select("id", { count: "exact", head: true })
    .eq("event_type", "session_start")
    .gte("created_at", ninetyDaysAgo.toISOString());

  const { count: addToCartCount } = await supabase
    .from("analytics_events")
    .select("id", { count: "exact", head: true })
    .eq("event_type", "add_to_cart")
    .gte("created_at", ninetyDaysAgo.toISOString());

  const { count: checkoutCount } = await supabase
    .from("analytics_events")
    .select("id", { count: "exact", head: true })
    .eq("event_type", "checkout_start")
    .gte("created_at", ninetyDaysAgo.toISOString());

  const sessions = sessionCount ?? 0;
  const addedToCart = addToCartCount ?? 0;
  const startedCheckout = checkoutCount ?? 0;
  const purchased = totalOrders;
  const conversionRate = sessions > 0 ? ((purchased / sessions) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
          Reportes
        </h1>
        <p className="text-sm text-charcoal-500">
          Analytics y métricas del negocio
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Ingresos totales"
          value={formatUSD(totalRevenue)}
          description="Últimos 90 días"
          icon={DollarSign}
        />
        <StatsCard
          title="Pedidos"
          value={String(totalOrders)}
          description="Últimos 90 días"
          icon={ShoppingCart}
        />
        <StatsCard
          title="Ticket promedio"
          value={formatUSD(avgTicket)}
          icon={TrendingUp}
        />
        <StatsCard
          title="Clientes únicos"
          value={String(customerCount ?? 0)}
          description="Total registrados"
          icon={Users}
        />
      </div>

      {/* Charts */}
      <ReportesCharts
        revenueData={revenueData}
        paymentData={paymentData}
        topProducts={topProducts}
        conversionRate={conversionRate}
        sessions={sessions}
        addedToCart={addedToCart}
        startedCheckout={startedCheckout}
        purchased={purchased}
        abandonedCount={abandonedCount ?? 0}
        abandonedAvg={abandonedAvg}
        abandonedTotal={abandonedTotal}
      />
    </div>
  );
}
