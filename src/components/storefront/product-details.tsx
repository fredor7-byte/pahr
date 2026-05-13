"use client";

import { useState, useMemo } from "react";
import { formatUSD, formatBs, convertToBs } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import type { ProductWithDetails } from "@/types/product";
import { useCartStore } from "@/stores/cart-store";

interface ProductDetailsProps {
  product: ProductWithDetails;
  exchangeRate?: number;
}

export function ProductDetails({ product, exchangeRate = 86.5 }: ProductDetailsProps) {
  const rate = exchangeRate;
  const addItem = useCartStore((state) => state.addItem);

  // Get unique colors and sizes
  const colors = useMemo(() => {
    const map = new Map<string, string | null>();
    product.variants?.forEach((v) => map.set(v.color, v.color_hex));
    return Array.from(map.entries());
  }, [product.variants]);

  const sizes = useMemo(() => {
    const set = new Set<string>();
    product.variants?.forEach((v) => set.add(v.size));
    return Array.from(set);
  }, [product.variants]);

  const [selectedColor, setSelectedColor] = useState(colors[0]?.[0] ?? "");
  const [selectedSize, setSelectedSize] = useState("");

  // Find current variant
  const currentVariant = useMemo(
    () =>
      product.variants?.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      ),
    [product.variants, selectedColor, selectedSize]
  );

  // Available sizes for selected color
  const availableSizes = useMemo(
    () =>
      product.variants
        ?.filter((v) => v.color === selectedColor)
        .map((v) => ({ size: v.size, stock: v.stock })) ?? [],
    [product.variants, selectedColor]
  );

  const price = currentVariant?.price_override_usd ?? product.base_price_usd;
  const priceInBs = convertToBs(price, rate);

  const metadata = product.metadata as Record<string, string> | null;

  return (
    <div className="space-y-6">
      {/* Category & Name */}
      <div>
        <p className="text-sm text-charcoal-500 uppercase tracking-wider mb-1">
          {product.category?.name}
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-charcoal-950">
          {product.name}
        </h1>
      </div>

      {/* Price */}
      <div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <p className="font-heading text-3xl font-bold text-jungle-950">
            {formatUSD(price)}
          </p>
          {product.compare_at_price_usd && product.compare_at_price_usd > price && (
            <>
              <p className="text-lg text-mist-500 line-through">
                {formatUSD(product.compare_at_price_usd)}
              </p>
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 tracking-wider">
                -{Math.round(((product.compare_at_price_usd - price) / product.compare_at_price_usd) * 100)}%
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-charcoal-500 mt-1">
          {formatBs(priceInBs)} (Tasa: {rate} Bs/$)
        </p>
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-charcoal-600 leading-relaxed">
          {product.description}
        </p>
      )}

      {/* Color Selector */}
      {colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-charcoal-700 mb-2">
            Color: <span className="text-charcoal-950">{selectedColor}</span>
          </h3>
          <div className="flex gap-2">
            {colors.map(([color, hex]) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedSize("");
                }}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? "border-forest-600 ring-2 ring-forest-200"
                    : "border-charcoal-300 hover:border-charcoal-400"
                }`}
                style={{ backgroundColor: hex ?? "#ccc" }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      <div>
        <h3 className="text-sm font-medium text-charcoal-700 mb-2">Talla</h3>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map(({ size, stock }) => {
            const isOutOfStock = stock === 0;
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => !isOutOfStock && setSelectedSize(size)}
                disabled={isOutOfStock}
                className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                  isSelected
                    ? "bg-forest-700 text-white border-forest-700"
                    : isOutOfStock
                      ? "border-charcoal-200 text-charcoal-300 cursor-not-allowed line-through"
                      : "border-charcoal-300 text-charcoal-700 hover:border-forest-400"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock indicator */}
      {currentVariant && (
        <p
          className={`text-sm ${
            currentVariant.stock <= currentVariant.low_stock_threshold
              ? "text-red-600"
              : "text-forest-600"
          }`}
        >
          {currentVariant.stock <= currentVariant.low_stock_threshold
            ? `Quedan solo ${currentVariant.stock}`
            : "En stock"}
        </p>
      )}

      {/* Add to Cart */}
      <Button
        size="lg"
        className="w-full"
        disabled={!selectedSize || !currentVariant || currentVariant.stock === 0}
        onClick={() => {
          if (currentVariant) {
            addItem(product, currentVariant);
          }
        }}
      >
        <ShoppingBag className="h-5 w-5 mr-2" />
        {!selectedSize
          ? "Selecciona una talla"
          : currentVariant && currentVariant.stock === 0
            ? "Agotado"
            : "Agregar al carrito"}
      </Button>

      {/* Product Info */}
      {metadata && (
        <div className="border-t border-charcoal-200 pt-6 space-y-3">
          {metadata.material && (
            <div>
              <h4 className="text-sm font-medium text-charcoal-700">
                Material
              </h4>
              <p className="text-sm text-charcoal-500">{metadata.material}</p>
            </div>
          )}
          {metadata.cuidados && (
            <div>
              <h4 className="text-sm font-medium text-charcoal-700">
                Cuidados
              </h4>
              <p className="text-sm text-charcoal-500">{metadata.cuidados}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
