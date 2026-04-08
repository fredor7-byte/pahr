import { ORDER_STATUSES, PAYMENT_METHODS } from "@/lib/constants";
import { formatUSD } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";

export interface OrderRow {
  id: string;
  order_number: string;
  customer_name: string;
  status: string;
  payment_method: string;
  total_usd: number;
  created_at: string;
}

const badgeVariant: Record<string, "default" | "success" | "warning" | "error" | "info"> = {
  pendiente: "warning",
  pago_verificado: "success",
  en_preparacion: "info",
  enviado: "info",
  entregado: "success",
  cancelado: "error",
};

export function OrdersTable({ orders, limit }: { orders: OrderRow[]; limit?: number }) {
  const displayed = limit ? orders.slice(0, limit) : orders;

  return (
    <div className="bg-white rounded-lg border border-charcoal-200">
      <div className="p-4 border-b border-charcoal-200 flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-charcoal-900">
          {limit ? "Últimos pedidos" : "Pedidos"}
        </h3>
        {limit && (
          <Link
            href="/admin/pedidos"
            className="text-sm text-forest-700 hover:underline"
          >
            Ver todos
          </Link>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Pago</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayed.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-charcoal-400 py-8">
                No hay pedidos aún
              </TableCell>
            </TableRow>
          ) : (
            displayed.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link
                    href={`/admin/pedidos/${order.id}`}
                    className="font-mono text-sm text-forest-700 hover:underline"
                  >
                    {order.order_number}
                  </Link>
                </TableCell>
                <TableCell className="text-sm">{order.customer_name}</TableCell>
                <TableCell>
                  <Badge variant={badgeVariant[order.status] ?? "default"}>
                    {ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]?.label ?? order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-charcoal-500">
                  {PAYMENT_METHODS[order.payment_method as keyof typeof PAYMENT_METHODS]?.label ?? order.payment_method}
                </TableCell>
                <TableCell className="text-right font-medium text-sm">
                  {formatUSD(order.total_usd)}
                </TableCell>
                <TableCell className="text-sm text-charcoal-500">
                  {new Date(order.created_at).toLocaleDateString("es-VE", {
                    day: "2-digit",
                    month: "short",
                  })}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
