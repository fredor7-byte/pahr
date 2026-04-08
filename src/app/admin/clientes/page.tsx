import { createAdminClient } from "@/lib/supabase/admin";
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

export default async function ClientesPage() {
  const supabase = createAdminClient();

  const { data: customers } = await supabase
    .from("customers")
    .select("id, full_name, email, phone, state, total_orders, total_spent_usd, last_order_at")
    .order("total_spent_usd", { ascending: false });

  const list = customers ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
          Clientes
        </h1>
        <p className="text-sm text-charcoal-500">
          {list.length} clientes registrados
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
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-charcoal-400 py-8">
                  No hay clientes registrados aún
                </TableCell>
              </TableRow>
            ) : (
              list.map((c) => (
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
                    {c.state ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {c.total_orders ?? 0}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {formatUSD(c.total_spent_usd ?? 0)}
                  </TableCell>
                  <TableCell className="text-sm text-charcoal-500">
                    {c.last_order_at
                      ? new Date(c.last_order_at).toLocaleDateString("es-VE", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
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
