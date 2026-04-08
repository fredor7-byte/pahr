"use client";

import { StatsCard } from "@/components/admin/stats-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { OrdersTable } from "@/components/admin/orders-table";
import {
  DollarSign,
  ShoppingCart,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboard() {
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
          value="$3,774"
          description="Abril 2026"
          icon={DollarSign}
          trend={{ value: "12%", positive: true }}
        />
        <StatsCard
          title="Pedidos"
          value="24"
          description="Este mes"
          icon={ShoppingCart}
          trend={{ value: "8%", positive: true }}
        />
        <StatsCard
          title="Pendientes"
          value="3"
          description="Por verificar pago"
          icon={Clock}
        />
        <StatsCard
          title="Stock bajo"
          value="5"
          description="Productos por reabastecer"
          icon={AlertTriangle}
        />
      </div>

      {/* Chart */}
      <RevenueChart />

      {/* Recent Orders */}
      <OrdersTable limit={5} />
    </div>
  );
}
