"use client";

import { OrdersTable } from "@/components/admin/orders-table";

export default function PedidosPage() {
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
      <OrdersTable />
    </div>
  );
}
