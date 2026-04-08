"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOrderByNumber } from "@/actions/orders";
import { ORDER_STATUSES } from "@/lib/constants";
import { formatUSD, formatBs } from "@/lib/utils";
import { Search, Package, CheckCircle, Truck, MapPin, Clock } from "lucide-react";
import { useParams } from "next/navigation";

const statusIcons = {
  pendiente: Clock,
  pago_verificado: CheckCircle,
  en_preparacion: Package,
  enviado: Truck,
  entregado: MapPin,
  cancelado: Clock,
};

const statusOrder = [
  "pendiente",
  "pago_verificado",
  "en_preparacion",
  "enviado",
  "entregado",
] as const;

export default function PedidoPage() {
  const params = useParams();
  const orderNumberFromUrl = params.id as string;

  const [orderNumber, setOrderNumber] = useState(orderNumberFromUrl ?? "");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<Awaited<
    ReturnType<typeof getOrderByNumber>
  >["order"]>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!orderNumber || !email) return;
    setLoading(true);
    setError(null);
    const result = await getOrderByNumber(orderNumber, email);
    setLoading(false);
    if (result.order) {
      setOrder(result.order);
    } else {
      setError(result.error ?? "Pedido no encontrado");
      setOrder(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-heading text-3xl font-semibold text-charcoal-950 mb-2">
        Seguimiento de pedido
      </h1>
      <p className="text-charcoal-500 mb-8">
        Ingresa tu número de pedido y email para ver el estado de tu compra.
      </p>

      {/* Search form */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            id="orderNumber"
            label="Número de pedido"
            placeholder="PAHR-00001"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={!orderNumber || !email || loading}
          className="w-full"
        >
          <Search className="h-4 w-4 mr-2" />
          {loading ? "Buscando..." : "Buscar pedido"}
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800 mb-8">
          {error}
        </div>
      )}

      {/* Order details */}
      {order && (
        <div className="bg-white rounded-lg border border-charcoal-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-charcoal-500">Pedido</p>
              <p className="font-heading text-xl font-bold text-charcoal-950">
                {order.order_number}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${ORDER_STATUSES[order.status].color}`}
            >
              {ORDER_STATUSES[order.status].label}
            </span>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {statusOrder.map((s, i) => {
                const currentIndex = statusOrder.indexOf(order.status as typeof statusOrder[number]);
                const isActive = i <= currentIndex;
                const Icon = statusIcons[s];
                return (
                  <div key={s} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive
                          ? "bg-forest-600 text-white"
                          : "bg-charcoal-200 text-charcoal-400"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] text-charcoal-500 mt-1 text-center">
                      {ORDER_STATUSES[s].label}
                    </span>
                    {i < statusOrder.length - 1 && (
                      <div
                        className={`h-0.5 w-full mt-[-22px] mb-[22px] ${
                          i < currentIndex
                            ? "bg-forest-600"
                            : "bg-charcoal-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order items */}
          <div className="border-t border-charcoal-200 pt-4">
            <h3 className="font-medium text-sm text-charcoal-700 mb-3">
              Productos
            </h3>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>
                    {item.product_name} ({item.variant_desc}) x{item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatUSD(item.unit_price_usd * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-charcoal-200 mt-3 pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <div className="text-right">
                  <p>{formatUSD(order.total_usd)}</p>
                  <p className="text-xs text-charcoal-500 font-normal">
                    {formatBs(order.total_bs)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping info */}
          {order.shipment && (
            <div className="border-t border-charcoal-200 mt-4 pt-4">
              <h3 className="font-medium text-sm text-charcoal-700 mb-2">
                Envío
              </h3>
              <p className="text-sm">
                <span className="text-charcoal-500">Empresa:</span>{" "}
                {order.shipment.carrier}
              </p>
              <p className="text-sm">
                <span className="text-charcoal-500">Guía:</span>{" "}
                {order.shipment.tracking_number}
              </p>
              {order.shipment.tracking_url && (
                <a
                  href={order.shipment.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-forest-700 hover:underline mt-1 inline-block"
                >
                  Rastrear envío
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
