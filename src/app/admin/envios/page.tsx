import { createAdminClient } from "@/lib/supabase/admin";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import EnviosActions from "./envios-actions";

const statusBadge: Record<string, { label: string; variant: "warning" | "info" | "success" }> = {
  pago_verificado: { label: "Preparando", variant: "warning" },
  en_preparacion: { label: "Preparando", variant: "warning" },
  enviado: { label: "En tránsito", variant: "info" },
  entregado: { label: "Entregado", variant: "success" },
};

export default async function EnviosPage() {
  const supabase = createAdminClient();

  const { data: ordersData } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      status,
      created_at,
      customers (full_name),
      shipments (carrier, tracking_number)
    `)
    .in("status", ["pago_verificado", "en_preparacion", "enviado"])
    .order("created_at", { ascending: false });

  const shipments = (ordersData ?? []).map((o: Record<string, unknown>) => {
    const customer = o.customers as Record<string, unknown> | null;
    const shipmentArr = o.shipments as Record<string, unknown>[] | null;
    const shipment = shipmentArr?.[0] ?? null;
    return {
      order_id: o.id as string,
      order_number: o.order_number as string,
      customer: (customer?.full_name as string) ?? "—",
      status: o.status as string,
      carrier: (shipment?.carrier as string) ?? "—",
      tracking: (shipment?.tracking_number as string) ?? "—",
      date: o.created_at as string,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
          Envíos
        </h1>
        <p className="text-sm text-charcoal-500">
          Gestiona tracking y estado de envíos
        </p>
      </div>

      <div className="bg-white rounded-lg border border-charcoal-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Tracking</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-sm text-charcoal-400 py-8">
                  No hay envíos pendientes
                </TableCell>
              </TableRow>
            ) : (
              shipments.map((s) => (
                <TableRow key={s.order_id}>
                  <TableCell className="font-mono text-sm text-forest-700">
                    {s.order_number}
                  </TableCell>
                  <TableCell className="text-sm">{s.customer}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadge[s.status]?.variant ?? "info"}>
                      {statusBadge[s.status]?.label ?? s.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{s.carrier}</TableCell>
                  <TableCell className="font-mono text-xs text-charcoal-500">
                    {s.tracking}
                  </TableCell>
                  <TableCell className="text-sm text-charcoal-500">
                    {new Date(s.date).toLocaleDateString("es-VE", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <EnviosActions
                      orderNumber={s.order_number}
                      status={s.status}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
