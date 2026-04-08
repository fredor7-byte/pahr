"use client";

import { formatUSD } from "@/lib/utils";
import { RevenueChart } from "@/components/admin/revenue-chart";
import {
  CreditCard,
  ShoppingBag,
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

interface ReportesChartsProps {
  revenueData: { date: string; revenue: number }[];
  paymentData: { name: string; value: number; color: string }[];
  topProducts: { name: string; units: number }[];
  conversionRate: string;
  sessions: number;
  addedToCart: number;
  startedCheckout: number;
  purchased: number;
  abandonedCount: number;
  abandonedAvg: number;
  abandonedTotal: number;
}

export default function ReportesCharts({
  revenueData,
  paymentData,
  topProducts,
  conversionRate,
  sessions,
  addedToCart,
  startedCheckout,
  purchased,
  abandonedCount,
  abandonedAvg,
  abandonedTotal,
}: ReportesChartsProps) {
  return (
    <>
      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <RevenueChart data={revenueData} />

        {/* Payment Methods */}
        <div className="bg-white rounded-lg border border-charcoal-200 p-5">
          <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-charcoal-400" />
            Métodos de pago
          </h3>
          <div className="h-64 flex items-center justify-center">
            {paymentData.length === 0 ? (
              <p className="text-sm text-charcoal-400">Sin datos</p>
            ) : (
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
            )}
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
          {topProducts.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-charcoal-400">
              Sin datos de ventas aún
            </div>
          ) : (
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
          )}
        </div>
      </div>

      {/* Conversion & Carts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-charcoal-200 p-5">
          <h3 className="font-heading text-lg font-semibold mb-3">
            Tasa de conversión
          </h3>
          <p className="text-4xl font-heading font-bold text-forest-700">
            {conversionRate}%
          </p>
          <p className="text-sm text-charcoal-500 mt-1">
            Compras / Sesiones totales
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-500">Sesiones</span>
              <span>{sessions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Agregaron al carrito</span>
              <span>
                {addedToCart} ({sessions > 0 ? ((addedToCart / sessions) * 100).toFixed(1) : 0}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Iniciaron checkout</span>
              <span>
                {startedCheckout} ({sessions > 0 ? ((startedCheckout / sessions) * 100).toFixed(1) : 0}%)
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Compraron</span>
              <span>
                {purchased} ({conversionRate}%)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-charcoal-200 p-5">
          <h3 className="font-heading text-lg font-semibold mb-3">
            Carritos abandonados
          </h3>
          <p className="text-4xl font-heading font-bold text-yellow-600">
            {abandonedCount}
          </p>
          <p className="text-sm text-charcoal-500 mt-1">
            Últimos 30 días
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-500">Valor promedio</span>
              <span>{formatUSD(abandonedAvg)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Valor total perdido</span>
              <span className="text-red-600">{formatUSD(abandonedTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
