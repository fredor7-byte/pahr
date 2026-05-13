"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { formatUSD, formatBs, convertToBs } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import type { ProductWithDetails } from "@/types/product";
import { useCartStore } from "@/stores/cart-store";

interface ProductViewProps {
  product: ProductWithDetails;
  exchangeRate?: number;
}

export function ProductView({ product, exchangeRate = 86.5 }: ProductViewProps) {
  const rate = exchangeRate;
  const addItem = useCartStore((state) => state.addItem);

  // Unique colors and sizes
  const colors = useMemo(() => {
    const map = new Map<string, string | null>();
    product.variants?.forEach((v) => map.set(v.color, v.color_hex));
    return Array.from(map.entries());
  }, [product.variants]);

  const [selectedColor, setSelectedColor] = useState(colors[0]?.[0] ?? "");
  const [selectedSize, setSelectedSize] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Filter images by color: prioritize images whose alt_text contains the selected color
  const filteredImages = useMemo(() => {
    if (!product.images?.length) return [];
    if (!selectedColor) return product.images;

    const colorLower = selectedColor.toLowerCase();
    const matching = product.images.filter((img) =>
      img.alt_text?.toLowerCase().includes(colorLower)
    );

    // If matching images for this color, use them; otherwise show all
    return matching.length > 0 ? matching : product.images;
  }, [product.images, selectedColor]);

  // Reset gallery index when color changes (and filteredImages changes)
  useEffect(() => {
    setGalleryIndex(0);
  }, [selectedColor]);

  const currentImage = filteredImages[galleryIndex] ?? filteredImages[0];

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
  const hasDiscount =
    product.compare_at_price_usd != null && product.compare_at_price_usd > price;

  return (
    <div className="grid md:grid-cols-2 gap-10 mb-16">
      {/* Gallery */}
      <div className="space-y-3">
        {/* Main image */}
        <div className="relative aspect-square bg-charcoal-100 overflow-hidden">
          {currentImage ? (
            <Image
              key={currentImage.id}
              src={currentImage.url}
              alt={currentImage.alt_text ?? product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-opacity duration-300"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-logo text-6xl text-charcoal-300">Pahr</span>
            </div>
          )}
          {hasDiscount && (
            <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 tracking-wider">
              -{Math.round(((product.compare_at_price_usd! - price) / product.compare_at_price_usd!) * 100)}%
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {filteredImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {filteredImages.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setGalleryIndex(i)}
                className={`relative w-20 h-20 shrink-0 overflow-hidden border-2 transition-colors ${
                  i === galleryIndex
                    ? "border-gold-500"
                    : "border-transparent hover:border-manatee-300"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt_text ?? `${product.name} ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-6">
        {/* Category & Name */}
        <div>
          <p className="text-xs text-mist-500 uppercase tracking-[0.2em] mb-2">
            {product.category?.name}
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-jungle-950">
            {product.name}
          </h1>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <p className="font-heading text-3xl font-bold text-jungle-950">
              {formatUSD(price)}
            </p>
            {hasDiscount && (
              <>
                <p className="text-lg text-mist-500 line-through">
                  {formatUSD(product.compare_at_price_usd!)}
                </p>
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 tracking-wider">
                  -{Math.round(((product.compare_at_price_usd! - price) / product.compare_at_price_usd!) * 100)}%
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
          <p className="text-charcoal-600 leading-relaxed">{product.description}</p>
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
                      ? "border-gold-600 ring-2 ring-gold-200"
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
                      ? "bg-jungle-900 text-white border-jungle-900"
                      : isOutOfStock
                        ? "border-charcoal-200 text-charcoal-300 cursor-not-allowed line-through"
                        : "border-charcoal-300 text-charcoal-700 hover:border-gold-500"
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
                <h4 className="text-sm font-medium text-charcoal-700">Material</h4>
                <p className="text-sm text-charcoal-500">{metadata.material}</p>
              </div>
            )}
            {metadata.cuidados && (
              <div>
                <h4 className="text-sm font-medium text-charcoal-700">Cuidados</h4>
                <p className="text-sm text-charcoal-500">{metadata.cuidados}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
