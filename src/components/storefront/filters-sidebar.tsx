"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Category } from "@/types/product";

const SHIRT_SIZES = ["S", "M", "L", "XL"];
const PANT_SIZES = ["30/30", "32/30", "32/32", "34/32", "36/32", "38/32"];

interface FiltersSidebarProps {
  categories: Category[];
  availableColors: string[];
}

export function FiltersSidebar({
  categories,
  availableColors,
}: FiltersSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("categoria") ?? "";
  const currentSize = searchParams.get("talla") ?? "";
  const currentColor = searchParams.get("color") ?? "";
  const currentOrder = searchParams.get("orden") ?? "";

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/catalogo?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push("/catalogo");
  }, [router]);

  const hasFilters = currentCategory || currentSize || currentColor || currentOrder;

  // Show pant sizes only when category is "pants" or no category
  const showPantSizes = currentCategory === "pants" || !currentCategory;
  const showShirtSizes = currentCategory !== "pants";

  return (
    <aside className="space-y-8">
      <div className="flex items-center justify-between border-b border-charcoal-200 pb-3">
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-jungle-950">
          Filtros
        </h2>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-gold-600 hover:text-gold-700 underline"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-charcoal-700 mb-3">
          Categoría
        </h3>
        <div className="space-y-0.5">
          <button
            onClick={() => updateFilter("categoria", "")}
            className={`block w-full text-left text-sm px-3 py-2 rounded-md transition-all duration-200 ${
              !currentCategory
                ? "bg-jungle-900 text-white font-medium"
                : "text-charcoal-600 hover:bg-amber-100 hover:text-jungle-900"
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("categoria", cat.slug)}
              className={`block w-full text-left text-sm px-3 py-2 rounded-md transition-all duration-200 ${
                currentCategory === cat.slug
                  ? "bg-jungle-900 text-white font-medium"
                  : "text-charcoal-600 hover:bg-amber-100 hover:text-jungle-900"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Size - Shirts */}
      {showShirtSizes && (
        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-charcoal-700 mb-3">
            Talla
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {SHIRT_SIZES.map((size) => (
              <button
                key={size}
                onClick={() =>
                  updateFilter("talla", currentSize === size ? "" : size)
                }
                className={`px-3 py-1.5 text-xs rounded border transition-all duration-200 ${
                  currentSize === size
                    ? "bg-jungle-900 text-white border-jungle-900"
                    : "border-charcoal-300 text-charcoal-600 hover:border-gold-500 hover:bg-amber-50 hover:text-jungle-900"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size - Pants */}
      {showPantSizes && (
        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-charcoal-700 mb-3">
            {showShirtSizes ? "Talla pantalón" : "Talla"}
          </h3>
          <div className="grid grid-cols-3 gap-1.5">
            {PANT_SIZES.map((size) => (
              <button
                key={size}
                onClick={() =>
                  updateFilter("talla", currentSize === size ? "" : size)
                }
                className={`px-2 py-1.5 text-xs rounded border transition-all duration-200 ${
                  currentSize === size
                    ? "bg-jungle-900 text-white border-jungle-900"
                    : "border-charcoal-300 text-charcoal-600 hover:border-gold-500 hover:bg-amber-50 hover:text-jungle-900"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      <div>
        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-charcoal-700 mb-3">
          Color
        </h3>
        <div className="space-y-0.5">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() =>
                updateFilter("color", currentColor === color ? "" : color)
              }
              className={`block w-full text-left text-sm px-3 py-2 rounded-md transition-all duration-200 ${
                currentColor === color
                  ? "bg-jungle-900 text-white font-medium"
                  : "text-charcoal-600 hover:bg-amber-100 hover:text-jungle-900"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-charcoal-700 mb-3">
          Ordenar
        </h3>
        <select
          value={currentOrder}
          onChange={(e) => updateFilter("orden", e.target.value)}
          className="w-full text-sm border border-charcoal-300 rounded-md px-3 py-2 bg-white hover:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-colors cursor-pointer"
        >
          <option value="">Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="nombre">Nombre A-Z</option>
          <option value="reciente">Más recientes</option>
        </select>
      </div>
    </aside>
  );
}
