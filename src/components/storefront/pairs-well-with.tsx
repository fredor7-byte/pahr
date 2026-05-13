import Link from "next/link";
import Image from "next/image";
import { formatUSD } from "@/lib/utils";
import { Plus } from "lucide-react";
import type { ProductWithDetails } from "@/types/product";

interface PairsWellWithProps {
  products: ProductWithDetails[];
}

export function PairsWellWith({ products }: PairsWellWithProps) {
  if (products.length === 0) return null;

  return (
    <div className="border-t border-manatee-200 pt-6">
      <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-mist-500 mb-4">
        Combina bien con
      </h3>
      <div className="grid sm:grid-cols-3 gap-3">
        {products.map((product) => {
          const colors = [
            ...new Map(
              product.variants
                ?.filter((v) => v.color_hex)
                .map((v) => [v.color, v.color_hex])
            ).entries(),
          ];
          const primaryImage =
            product.images?.find((img) => img.is_primary) ?? product.images?.[0];

          return (
            <Link
              key={product.id}
              href={`/catalogo/${product.slug}`}
              className="flex flex-col gap-3 p-3 rounded-lg border border-manatee-200 hover:border-gold-400 hover:shadow-sm transition-all group"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] bg-charcoal-100 rounded overflow-hidden">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt_text ?? product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-logo text-2xl text-charcoal-300">Pahr</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-mist-500 group-hover:bg-gold-500 group-hover:text-white transition-colors shadow-sm">
                  <Plus className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1">
                <p className="text-[10px] text-mist-500 uppercase tracking-[0.15em]">
                  {product.category?.name}
                </p>
                <p className="text-sm font-medium text-jungle-950 group-hover:text-gold-600 transition-colors line-clamp-1">
                  {product.name}
                </p>
                <p className="text-sm font-semibold text-jungle-900">
                  {formatUSD(product.base_price_usd)}
                </p>

                {/* Color swatches */}
                {colors.length > 0 && (
                  <div className="flex gap-1 pt-1">
                    {colors.slice(0, 4).map(([color, hex]) => (
                      <span
                        key={color}
                        title={color}
                        className="w-3 h-3 rounded-full border border-manatee-300"
                        style={{ backgroundColor: hex ?? undefined }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
