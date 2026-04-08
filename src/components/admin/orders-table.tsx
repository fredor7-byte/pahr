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

interface OrderRow {
  id: string;
  order_number: string;
  customer_name: string;
  status: keyof typeof ORDER_STATUSES;
  payment_method: keyof typeof PAYMENT_METHODS;
  total_usd: number;
  created_at: string;
}

const mockOrders: OrderRow[] = [
  {
    id: "o1",
    order_number: "PAHR-00001",
    customer_name: "Carlos Rodríguez",
    status: "pendiente",
    payment_method: "pago_movil",
    total_usd: 83.00,
    created_at: "2024-04-07T10:30:00",
  },
  {
    id: "o2",
    order_number: "PAHR-00002",
    customer_name: "María González",
    status: "pago_verificado",
    payment_method: "zelle",
    total_usd: 145.00,
    created_at: "2024-04-06T15:20:00",
  },
  {
    id: "o3",
    order_number: "PAHR-00003",
    customer_name: "Andrés Martínez",
    status: "enviado",
    payment_method: "transferencia",
    total_usd: 52.00,
    created_at: "2024-04-05T09:15:00",
  },
  {
    id: "o4",
    order_number: "PAHR-00004",
    customer_name: "Laura Pérez",
    status: "entregado",
    payment_method: "pago_movil",
    total_usd: 96.00,
    created_at: "2024-04-03T14:45:00",
  },
  {
    id: "o5",
    order_number: "PAHR-00005",
    customer_name: "Diego Herrera",
    status: "en_preparacion",
    payment_method: "zelle",
    total_usd: 38.00,
    created_at: "2024-04-07T08:00:00",
  },
];

const badgeVariant: Record<string, "default" | "success" | "warning" | "error" | "info"> = {
  pendiente: "warning",
  pago_verificado: "success",
  en_preparacion: "info",
  enviado: "info",
  entregado: "success",
  cancelado: "error",
};

export function OrdersTable({ limit }: { limit?: number }) {
  const orders = limit ? mockOrders.slice(0, limit) : mockOrders;

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
          {orders.map((order) => (
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
                <Badge variant={badgeVariant[order.status]}>
                  {ORDER_STATUSES[order.status].label}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-charcoal-500">
                {PAYMENT_METHODS[order.payment_method].label}
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
