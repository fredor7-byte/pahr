"use client";

import { useCartStore } from "@/stores/cart-store";
import { formatUSD, formatBs, convertToBs } from "@/lib/utils";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, clearCart, totalUSD } =
    useCartStore();
  const { rate } = useExchangeRate();
  const total = totalUSD();
  const totalBs = convertToBs(total, rate);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-charcoal-300 mx-auto mb-6" />
        <h1 className="font-heading text-2xl font-semibold text-charcoal-900 mb-2">
          Tu carrito está vacío
        </h1>
        <p className="text-charcoal-500 mb-6">
          Explora nuestro catálogo y encuentra tu estilo.
        </p>
        <Link href="/catalogo">
          <Button size="lg">Ver Catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-semibold text-charcoal-900">
          Carrito
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-charcoal-500 hover:text-red-600 transition-colors"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const price =
              item.variant.price_override_usd ?? item.product.base_price_usd;
            return (
              <div
                key={item.variant.id}
                className="flex gap-4 p-4 bg-white rounded-lg border border-charcoal-200"
              >
                {/* Image placeholder */}
                <div className="w-24 h-28 rounded-md bg-charcoal-100 shrink-0 flex items-center justify-center">
                  <span className="font-heading text-sm text-charcoal-400">
                    PAHR
                  </span>
                </div>

                <div className="flex-1">
                  <Link
                    href={`/catalogo/${item.product.slug}`}
                    className="font-medium text-charcoal-900 hover:text-forest-700"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-charcoal-500 mt-0.5">
                    {item.variant.color} / {item.variant.size}
                  </p>
                  <p className="font-semibold mt-2">{formatUSD(price)}</p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.variant.id,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center border border-charcoal-300 rounded hover:bg-sand-100"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.variant.id,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center border border-charcoal-300 rounded hover:bg-sand-100"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.variant.id)}
                      className="p-2 text-charcoal-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg border border-charcoal-200 p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-heading text-lg font-semibold mb-4">Resumen</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-500">Subtotal</span>
              <span>{formatUSD(total)}</span>
            </div>
            <div className="flex justify-between text-charcoal-500">
              <span>En bolívares</span>
              <span>{formatBs(totalBs)}</span>
            </div>
            <div className="text-xs text-charcoal-400">
              Tasa: {rate} Bs/$
            </div>
          </div>
          <div className="border-t border-charcoal-200 mt-4 pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="font-heading">{formatUSD(total)}</span>
            </div>
          </div>
          <Link href="/checkout" className="block mt-4">
            <Button size="lg" className="w-full">
              Proceder al pago
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
