"use client";

import { use } from "react";
import Link from "next/link";
import { formatUSD } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MapPin, ShoppingCart } from "lucide-react";

export default function ClienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Mock customer
  const customer = {
    id,
    full_name: "Carlos Rodríguez",
    email: "carlos@email.com",
    phone: "0412-555-1234",
    cedula: "V-12.345.678",
    state: "Distrito Capital",
    total_orders: 3,
    total_spent_usd: 221.00,
    first_order_at: "2024-02-15",
    last_order_at: "2024-04-07",
    orders: [
      { order_number: "PAHR-00001", total_usd: 83.00, status: "pendiente", date: "2024-04-07" },
      { order_number: "PAHR-00010", total_usd: 90.00, status: "entregado", date: "2024-03-20" },
      { order_number: "PAHR-00015", total_usd: 48.00, status: "entregado", date: "2024-02-15" },
    ],
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/clientes"
          className="p-2 hover:bg-charcoal-100 rounded-md"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
            {customer.full_name}
          </h1>
          <p className="text-sm text-charcoal-500">
            Cliente desde{" "}
            {new Date(customer.first_order_at).toLocaleDateString("es-VE", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-charcoal-200 p-4">
          <p className="text-sm text-charcoal-500">CLV</p>
          <p className="text-xl font-heading font-bold">
            {formatUSD(customer.total_spent_usd)}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-charcoal-200 p-4">
          <p className="text-sm text-charcoal-500">Pedidos</p>
          <p className="text-xl font-heading font-bold">
            {customer.total_orders}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-charcoal-200 p-4">
          <p className="text-sm text-charcoal-500">Ticket promedio</p>
          <p className="text-xl font-heading font-bold">
            {formatUSD(customer.total_spent_usd / customer.total_orders)}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-5 space-y-3">
        <h3 className="font-semibold">Datos de contacto</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-charcoal-600">
            <Mail className="h-4 w-4 text-charcoal-400" />
            {customer.email}
          </div>
          <div className="flex items-center gap-2 text-charcoal-600">
            <Phone className="h-4 w-4 text-charcoal-400" />
            {customer.phone}
          </div>
          <div className="flex items-center gap-2 text-charcoal-600">
            <MapPin className="h-4 w-4 text-charcoal-400" />
            {customer.state}
          </div>
          <div className="flex items-center gap-2 text-charcoal-600">
            <ShoppingCart className="h-4 w-4 text-charcoal-400" />
            Cédula: {customer.cedula}
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-5">
        <h3 className="font-semibold mb-3">Historial de pedidos</h3>
        <div className="space-y-2">
          {customer.orders.map((o) => (
            <Link
              key={o.order_number}
              href={`/admin/pedidos/${o.order_number}`}
              className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg hover:bg-sand-100 transition-colors"
            >
              <div>
                <span className="font-mono text-sm text-forest-700">
                  {o.order_number}
                </span>
                <span className="text-xs text-charcoal-400 ml-2">
                  {new Date(o.date).toLocaleDateString("es-VE")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    o.status === "entregado"
                      ? "success"
                      : o.status === "pendiente"
                        ? "warning"
                        : "info"
                  }
                >
                  {o.status}
                </Badge>
                <span className="font-medium text-sm">
                  {formatUSD(o.total_usd)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
