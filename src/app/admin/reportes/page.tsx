"use client";

import { StatsCard } from "@/components/admin/stats-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const paymentData = [
  { name: "Pago Móvil", value: 45, color: "#2D5016" },
  { name: "Zelle", value: 35, color: "#d49a22" },
  { name: "Transferencia", value: 20, color: "#C3B091" },
];

const topProducts = [
  { name: "Polo Heritage", units: 42 },
  { name: "Hoodie Forest", units: 35 },
  { name: "Pantalón Clubhouse", units: 28 },
  { name: "Franela Fairway", units: 22 },
  { name: "Polo Green Master", units: 18 },
];

export default function ReportesPage() {
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
          value="$12,450"
          description="Últimos 90 días"
          icon={DollarSign}
        />
        <StatsCard
          title="Pedidos"
          value="87"
          description="Últimos 90 días"
          icon={ShoppingCart}
        />
        <StatsCard
          title="Ticket promedio"
          value="$143"
          icon={TrendingUp}
        />
        <StatsCard
          title="Clientes únicos"
          value="52"
          description="Total registrados"
          icon={Users}
        />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <RevenueChart />

        {/* Payment Methods */}
        <div className="bg-white rounded-lg border border-charcoal-200 p-5">
          <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-charcoal-400" />
            Métodos de pago
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                  labelLine={false}
                >
                  {paymentData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-5">
        <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4 flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-charcoal-400" />
          Productos más vendidos
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e7e7" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12 }}
                width={130}
              />
              <Tooltip />
              <Bar dataKey="units" fill="#2D5016" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversion & Carts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-charcoal-200 p-5">
          <h3 className="font-heading text-lg font-semibold mb-3">
            Tasa de conversión
          </h3>
          <p className="text-4xl font-heading font-bold text-forest-700">
            3.2%
          </p>
          <p className="text-sm text-charcoal-500 mt-1">
            Compras / Sesiones totales
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-500">Sesiones</span>
              <span>2,718</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Agregaron al carrito</span>
              <span>312 (11.5%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Iniciaron checkout</span>
              <span>145 (5.3%)</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Compraron</span>
              <span>87 (3.2%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-charcoal-200 p-5">
          <h3 className="font-heading text-lg font-semibold mb-3">
            Carritos abandonados
          </h3>
          <p className="text-4xl font-heading font-bold text-yellow-600">58</p>
          <p className="text-sm text-charcoal-500 mt-1">
            Últimos 30 días
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-500">Valor promedio</span>
              <span>$67.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Valor total perdido</span>
              <span className="text-red-600">$3,915</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Producto más abandonado</span>
              <span>Pantalón Clubhouse</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
