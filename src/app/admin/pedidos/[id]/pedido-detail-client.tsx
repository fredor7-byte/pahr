"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { formatUSD, formatBs } from "@/lib/utils";
import { ORDER_STATUSES, PAYMENT_METHODS } from "@/lib/constants";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  User,
  MapPin,
  CreditCard,
  FileImage,
} from "lucide-react";
import { useState } from "react";

interface OrderDetail {
  id: string;
  order_number: string;
  status: string;
  payment_method: string;
  subtotal_usd: number;
  total_usd: number;
  total_bs: number;
  exchange_rate_snapshot: number;
  shipping_address_street: string | null;
  shipping_address_city: string | null;
  shipping_address_state: string | null;
  shipping_address_reference: string | null;
  notes: string | null;
  admin_notes: string | null;
  created_at: string;
  customers: {
    full_name: string;
    email: string;
    phone: string;
    cedula: string;
  } | null;
  order_items: {
    id: string;
    product_name: string;
    variant_desc: string;
    quantity: number;
    unit_price_usd: number;
  }[];
  payment_proofs: {
    id: string;
    reference_number: string;
    declared_amount: number;
    declared_currency: string;
    image_url: string | null;
  }[];
}

export default function PedidoDetailClient({ order }: { order: OrderDetail }) {
  const [adminNotes, setAdminNotes] = useState(order.admin_notes ?? "");
  const [rejectionReason, setRejectionReason] = useState("");

  const customer = order.customers;
  const items = order.order_items ?? [];
  const proof = order.payment_proofs?.[0] ?? null;

  const exchangeRate = order.exchange_rate_snapshot ?? 0;
  const expectedBs = order.total_usd * exchangeRate;
  const declaredAmount = proof?.declared_amount ?? 0;
  const amountMatch =
    declaredAmount >= expectedBs * 0.99 && declaredAmount <= expectedBs * 1.01;

  const status = order.status as keyof typeof ORDER_STATUSES;
  const paymentMethod = order.payment_method as keyof typeof PAYMENT_METHODS;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pedidos"
            className="p-2 hover:bg-charcoal-100 rounded-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
              {order.order_number}
            </h1>
            <p className="text-sm text-charcoal-500">
              {new Date(order.created_at).toLocaleString("es-VE")}
            </p>
          </div>
        </div>
        <Badge
          variant={
            status === "pendiente"
              ? "warning"
              : status === "cancelado"
                ? "error"
                : "success"
          }
        >
          {ORDER_STATUSES[status]?.label ?? order.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="bg-white rounded-lg border border-charcoal-200 p-5 space-y-3">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <User className="h-4 w-4 text-charcoal-400" />
            Cliente
          </h3>
          <div className="text-sm space-y-1">
            <p className="font-medium">{customer?.full_name ?? "—"}</p>
            <p className="text-charcoal-500">{customer?.email ?? "—"}</p>
            <p className="text-charcoal-500">{customer?.phone ?? "—"}</p>
            <p className="text-charcoal-500">{customer?.cedula ?? "—"}</p>
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white rounded-lg border border-charcoal-200 p-5 space-y-3">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <MapPin className="h-4 w-4 text-charcoal-400" />
            Dirección de envío
          </h3>
          <div className="text-sm space-y-1 text-charcoal-600">
            <p>{order.shipping_address_street ?? "—"}</p>
            <p>
              {order.shipping_address_city ?? ""}{order.shipping_address_state ? `, ${order.shipping_address_state}` : ""}
            </p>
            {order.shipping_address_reference && (
              <p className="text-charcoal-400 italic">
                Ref: {order.shipping_address_reference}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-5">
        <h3 className="font-semibold text-sm mb-3">Productos</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm p-2 bg-charcoal-50 rounded">
              <div>
                <p className="font-medium">{item.product_name}</p>
                <p className="text-xs text-charcoal-500">
                  {item.variant_desc} x {item.quantity}
                </p>
              </div>
              <span className="font-medium">
                {formatUSD(item.unit_price_usd * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-charcoal-200 mt-3 pt-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-500">Subtotal USD</span>
            <span>{formatUSD(order.subtotal_usd ?? order.total_usd)}</span>
          </div>
          {exchangeRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-charcoal-500">Tasa aplicada</span>
              <span>{exchangeRate} Bs/$</span>
            </div>
          )}
          <div className="flex justify-between font-semibold pt-1">
            <span>Total</span>
            <div className="text-right">
              <p>{formatUSD(order.total_usd)}</p>
              {order.total_bs > 0 && (
                <p className="text-sm text-charcoal-500 font-normal">
                  {formatBs(order.total_bs)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Verification */}
      {proof && (
        <div className="bg-white rounded-lg border-2 border-gold-300 p-5 space-y-4">
          <h3 className="font-heading text-lg font-semibold flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gold-600" />
            Verificación de pago
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-sm">
                <span className="text-charcoal-500">Método: </span>
                <span className="font-medium">
                  {PAYMENT_METHODS[paymentMethod]?.label ?? order.payment_method}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-charcoal-500">Referencia: </span>
                <span className="font-mono font-medium">
                  {proof.reference_number}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-charcoal-500">Monto declarado: </span>
                <span className="font-medium">
                  {proof.declared_currency === "VES"
                    ? formatBs(declaredAmount)
                    : formatUSD(declaredAmount)}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-charcoal-500">Monto esperado: </span>
                <span className="font-medium">{formatBs(expectedBs)}</span>
              </div>

              {/* Amount comparison */}
              <div
                className={`p-3 rounded-lg text-sm ${
                  amountMatch
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                {amountMatch
                  ? "El monto declarado coincide con el total esperado."
                  : `Diferencia: ${formatBs(Math.abs(declaredAmount - expectedBs))}. Verificar manualmente.`}
              </div>
            </div>

            {/* Proof image */}
            <div>
              <p className="text-sm text-charcoal-500 mb-2 flex items-center gap-1">
                <FileImage className="h-4 w-4" />
                Comprobante
              </p>
              <div className="aspect-[3/4] bg-charcoal-100 rounded-lg flex items-center justify-center overflow-hidden">
                {proof.image_url ? (
                  <img
                    src={proof.image_url}
                    alt="Comprobante de pago"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-sm text-charcoal-400">
                    Imagen del comprobante
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          {status === "pendiente" && (
            <div className="border-t border-charcoal-200 pt-4 space-y-3">
              <Textarea
                id="rejectionReason"
                label="Motivo de rechazo (si aplica)"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Ej: El monto no coincide..."
                rows={2}
              />
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => alert("Pago aprobado")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aprobar pago
                </Button>
                <Button
                  variant="danger"
                  className="flex-1"
                  onClick={() => alert("Pago rechazado")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Rechazar pago
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Admin Notes */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-5">
        <Textarea
          id="adminNotes"
          label="Notas internas"
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          placeholder="Notas visibles solo para el equipo..."
          rows={3}
        />
        <Button variant="outline" size="sm" className="mt-2">
          Guardar notas
        </Button>
      </div>
    </div>
  );
}
