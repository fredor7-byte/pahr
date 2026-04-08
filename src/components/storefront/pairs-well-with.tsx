import Link from "next/link";
import { formatUSD } from "@/lib/utils";
import { Plus } from "lucide-react";
import type { ProductWithDetails } from "@/types/product";

interface PairsWellWithProps {
  products: ProductWithDetails[];
}

export function PairsWellWith({ products }: PairsWellWithProps) {
  if (products.length === 0) return null;

  return (
    <div className="border-t border-manatee-200 pt-6 mt-6">
      <h3 className="text-xs font-medium tracking-widest uppercase text-mist-500 mb-4">
        Combina bien con
      </h3>
      <div className="space-y-3">
        {products.map((product) => {
          const colors = [
            ...new Set(product.variants?.map((v) => v.color)),
          ];
          return (
            <Link
              key={product.id}
              href={`/catalogo/${product.slug}`}
              className="flex items-center gap-4 p-3 rounded-lg border border-manatee-200 hover:border-gold-400 transition-colors group"
            >
              {/* Thumbnail */}
              <div className="w-16 h-16 bg-charcoal-100 rounded flex items-center justify-center shrink-0">
                <span className="text-[8px] font-logo text-charcoal-300">
                  Pahr
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-jungle-950 group-hover:text-gold-600 transition-colors truncate">
                  {product.name}
                </p>
                <p className="text-xs text-mist-500 mt-0.5">
                  {colors.length > 0 && `Color: ${colors[0]}`}
                  {colors.length > 1 && ` +${colors.length - 1}`}
                </p>
                <p className="text-sm font-medium text-jungle-900 mt-0.5">
                  {formatUSD(product.base_price_usd)}
                </p>
              </div>

              {/* Add hint */}
              <div className="shrink-0 w-7 h-7 rounded-full border border-manatee-300 flex items-center justify-center text-mist-400 group-hover:border-gold-500 group-hover:text-gold-500 transition-colors">
                <Plus className="h-3.5 w-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
