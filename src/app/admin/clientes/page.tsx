"use client";

import { formatUSD } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";

const mockCustomers = [
  { id: "c1", full_name: "Carlos Rodríguez", email: "carlos@email.com", phone: "0412-555-1234", state: "Distrito Capital", total_orders: 3, total_spent_usd: 221.00, last_order_at: "2024-04-07" },
  { id: "c2", full_name: "María González", email: "maria@email.com", phone: "0414-333-5678", state: "Miranda", total_orders: 2, total_spent_usd: 145.00, last_order_at: "2024-04-06" },
  { id: "c3", full_name: "Andrés Martínez", email: "andres@email.com", phone: "0424-111-9012", state: "Carabobo", total_orders: 1, total_spent_usd: 52.00, last_order_at: "2024-04-05" },
  { id: "c4", full_name: "Laura Pérez", email: "laura@email.com", phone: "0412-777-3456", state: "Zulia", total_orders: 4, total_spent_usd: 312.00, last_order_at: "2024-04-03" },
  { id: "c5", full_name: "Diego Herrera", email: "diego@email.com", phone: "0416-222-7890", state: "Aragua", total_orders: 1, total_spent_usd: 38.00, last_order_at: "2024-04-07" },
];

export default function ClientesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
          Clientes
        </h1>
        <p className="text-sm text-charcoal-500">
          {mockCustomers.length} clientes registrados
        </p>
      </div>

      <div className="bg-white rounded-lg border border-charcoal-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Pedidos</TableHead>
              <TableHead>Total gastado</TableHead>
              <TableHead>Último pedido</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCustomers.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <Link
                    href={`/admin/clientes/${c.id}`}
                    className="hover:text-forest-700"
                  >
                    <p className="font-medium text-sm">{c.full_name}</p>
                    <p className="text-xs text-charcoal-400">{c.email}</p>
                  </Link>
                </TableCell>
                <TableCell className="text-sm text-charcoal-600">
                  {c.state}
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {c.total_orders}
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {formatUSD(c.total_spent_usd)}
                </TableCell>
                <TableCell className="text-sm text-charcoal-500">
                  {new Date(c.last_order_at).toLocaleDateString("es-VE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
