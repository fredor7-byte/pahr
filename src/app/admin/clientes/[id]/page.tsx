import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import { formatUSD } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, ShoppingCart } from "lucide-react";

export default async function ClienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: customer, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !customer) {
    notFound();
  }

  // Fetch customer orders
  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, total_usd, status, created_at")
    .eq("customer_id", id)
    .order("created_at", { ascending: false });

  const customerOrders = orders ?? [];
  const totalOrders = customer.total_orders ?? customerOrders.length;
  const totalSpent = customer.total_spent_usd ?? 0;
  const firstOrderAt = customer.first_order_at ?? customer.created_at;

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
            {new Date(firstOrderAt).toLocaleDateString("es-VE", {
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
            {formatUSD(totalSpent)}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-charcoal-200 p-4">
          <p className="text-sm text-charcoal-500">Pedidos</p>
          <p className="text-xl font-heading font-bold">
            {totalOrders}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-charcoal-200 p-4">
          <p className="text-sm text-charcoal-500">Ticket promedio</p>
          <p className="text-xl font-heading font-bold">
            {totalOrders > 0 ? formatUSD(totalSpent / totalOrders) : "$0.00"}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-5 space-y-3">
        <h3 className="font-semibold">Datos de contacto</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-charcoal-600">
            <Mail className="h-4 w-4 text-charcoal-400" />
            {customer.email ?? "—"}
          </div>
          <div className="flex items-center gap-2 text-charcoal-600">
            <Phone className="h-4 w-4 text-charcoal-400" />
            {customer.phone ?? "—"}
          </div>
          <div className="flex items-center gap-2 text-charcoal-600">
            <MapPin className="h-4 w-4 text-charcoal-400" />
            {customer.state ?? "—"}
          </div>
          <div className="flex items-center gap-2 text-charcoal-600">
            <ShoppingCart className="h-4 w-4 text-charcoal-400" />
            Cédula: {customer.cedula ?? "—"}
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-5">
        <h3 className="font-semibold mb-3">Historial de pedidos</h3>
        <div className="space-y-2">
          {customerOrders.length === 0 ? (
            <p className="text-sm text-charcoal-400 py-4 text-center">
              Este cliente no tiene pedidos aún
            </p>
          ) : (
            customerOrders.map((o) => (
              <Link
                key={o.id}
                href={`/admin/pedidos/${o.id}`}
                className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg hover:bg-sand-100 transition-colors"
              >
                <div>
                  <span className="font-mono text-sm text-forest-700">
                    {o.order_number}
                  </span>
                  <span className="text-xs text-charcoal-400 ml-2">
                    {new Date(o.created_at).toLocaleDateString("es-VE")}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
