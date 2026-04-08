"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueDataPoint {
  date: string;
  revenue: number;
}

export function RevenueChart({ data = [] }: { data?: RevenueDataPoint[] }) {
  return (
    <div className="bg-white rounded-lg border border-charcoal-200 p-5">
      <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4">
        Ingresos (USD)
      </h3>
      <div className="h-64">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-charcoal-400">
            Sin datos de ingresos aún
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D5016" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2D5016" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e7e7" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#6d6d6d" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6d6d6d" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, "Ingresos"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #d1d1d1",
                  fontSize: "13px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2D5016"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
