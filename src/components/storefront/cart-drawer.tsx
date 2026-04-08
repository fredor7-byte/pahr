"use client";

import { useCartStore, type CartItem } from "@/stores/cart-store";
import { formatUSD } from "@/lib/utils";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalUSD, totalItems } =
    useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-charcoal-950/50 z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-charcoal-200">
          <h2 className="font-heading text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Carrito ({totalItems()})
          </h2>
          <button
            onClick={closeCart}
            className="p-1 hover:bg-sand-100 rounded transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-charcoal-300 mx-auto mb-4" />
              <p className="text-charcoal-500">Tu carrito está vacío</p>
              <Link
                href="/catalogo"
                onClick={closeCart}
                className="text-forest-700 hover:underline text-sm mt-2 inline-block"
              >
                Explorar catálogo
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.variant.id}
                  item={item}
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-charcoal-200 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-charcoal-600">Subtotal</span>
              <span className="font-heading text-xl font-bold">
                {formatUSD(totalUSD())}
              </span>
            </div>
            <Link href="/checkout" onClick={closeCart}>
              <Button size="lg" className="w-full">
                Ir al checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: (variantId: string) => void;
  onUpdateQuantity: (variantId: string, qty: number) => void;
}) {
  const price =
    item.variant.price_override_usd ?? item.product.base_price_usd;

  return (
    <div className="flex gap-3">
      {/* Thumbnail placeholder */}
      <div className="w-16 h-20 rounded bg-charcoal-100 shrink-0 flex items-center justify-center">
        <span className="text-xs text-charcoal-400 font-heading">PAHR</span>
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={`/catalogo/${item.product.slug}`}
          className="text-sm font-medium text-charcoal-900 hover:text-forest-700 truncate block"
        >
          {item.product.name}
        </Link>
        <p className="text-xs text-charcoal-500 mt-0.5">
          {item.variant.color} / {item.variant.size}
        </p>
        <p className="text-sm font-semibold mt-1">{formatUSD(price)}</p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() =>
              onUpdateQuantity(item.variant.id, item.quantity - 1)
            }
            className="w-7 h-7 flex items-center justify-center border border-charcoal-300 rounded text-charcoal-600 hover:bg-sand-100"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-sm w-6 text-center">{item.quantity}</span>
          <button
            onClick={() =>
              onUpdateQuantity(item.variant.id, item.quantity + 1)
            }
            className="w-7 h-7 flex items-center justify-center border border-charcoal-300 rounded text-charcoal-600 hover:bg-sand-100"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      <button
        onClick={() => onRemove(item.variant.id)}
        className="self-start p-1 text-charcoal-400 hover:text-red-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
