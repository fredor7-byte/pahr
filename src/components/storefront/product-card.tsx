import Link from "next/link";
import Image from "next/image";
import { formatUSD } from "@/lib/utils";
import type { ProductWithDetails } from "@/types/product";

interface ProductCardProps {
  product: ProductWithDetails;
}

export function ProductCard({ product }: ProductCardProps) {
  const totalStock = product.variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0;
  const colors = [
    ...new Map(
      product.variants
        ?.filter((v) => v.color_hex)
        .map((v) => [v.color, v.color_hex])
    ).entries(),
  ];

  const primaryImage = product.images?.find((img) => img.is_primary) ?? product.images?.[0];

  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className="group block"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-100 mb-3">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt_text ?? product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-jungle-800/20 to-amber-400/20 flex items-center justify-center">
            <span className="font-logo text-3xl text-white/30">Pahr</span>
          </div>
        )}
        {totalStock === 0 && (
          <div className="absolute top-3 left-3 bg-charcoal-900/80 text-white text-xs px-2 py-1">
            Agotado
          </div>
        )}
        {product.is_featured && totalStock > 0 && (
          <div className="absolute top-3 left-3 bg-gold-500 text-white text-xs font-medium px-2 py-1">
            Destacado
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-[10px] text-mist-500 uppercase tracking-[0.2em]">
          {product.category?.name}
        </p>
        <h3 className="text-sm font-medium text-jungle-950 group-hover:text-gold-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-jungle-900">
          {formatUSD(product.base_price_usd)}
        </p>

        {/* Color swatches */}
        {colors.length > 0 && (
          <div className="flex gap-1.5 pt-1">
            {colors.map(([color, hex]) => (
              <span
                key={color}
                title={color}
                className="w-3.5 h-3.5 rounded-full border border-manatee-300"
                style={{ backgroundColor: hex ?? undefined }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
