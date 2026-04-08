"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SIZES } from "@/lib/constants";
import type { Category } from "@/types/product";

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

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">Filtros</h2>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-forest-700 hover:text-forest-900 underline"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h3 className="text-sm font-medium text-charcoal-700 mb-2">
          Categoría
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter("categoria", "")}
            className={`block w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
              !currentCategory
                ? "bg-forest-100 text-forest-800 font-medium"
                : "text-charcoal-600 hover:bg-sand-100"
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("categoria", cat.slug)}
              className={`block w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
                currentCategory === cat.slug
                  ? "bg-forest-100 text-forest-800 font-medium"
                  : "text-charcoal-600 hover:bg-sand-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-sm font-medium text-charcoal-700 mb-2">Talla</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() =>
                updateFilter("talla", currentSize === size ? "" : size)
              }
              className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                currentSize === size
                  ? "bg-forest-700 text-white border-forest-700"
                  : "border-charcoal-300 text-charcoal-600 hover:border-forest-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="text-sm font-medium text-charcoal-700 mb-2">Color</h3>
        <div className="space-y-1">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() =>
                updateFilter(
                  "color",
                  currentColor === color ? "" : color
                )
              }
              className={`block w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
                currentColor === color
                  ? "bg-forest-100 text-forest-800 font-medium"
                  : "text-charcoal-600 hover:bg-sand-100"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-medium text-charcoal-700 mb-2">
          Ordenar por
        </h3>
        <select
          value={currentOrder}
          onChange={(e) => updateFilter("orden", e.target.value)}
          className="w-full text-sm border border-charcoal-300 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-forest-500"
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
