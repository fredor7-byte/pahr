import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatUSD } from "@/lib/utils";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

export default async function EditProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(*), variants:product_variants(*), images:product_images(*)")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/productos"
            className="p-2 hover:bg-charcoal-100 rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
              {product.name}
            </h1>
            <p className="text-sm text-charcoal-500">{product.category?.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button variant="danger" size="sm">
            <Trash2 className="h-4 w-4 mr-1" />
            Eliminar
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-6 space-y-4">
        <div className="flex gap-2">
          {product.is_active && <Badge variant="success">Activo</Badge>}
          {product.is_featured && <Badge variant="warning">Destacado</Badge>}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-charcoal-500">Precio base</p>
            <p className="text-xl font-heading font-bold">
              {formatUSD(product.base_price_usd)}
            </p>
          </div>
          <div>
            <p className="text-sm text-charcoal-500">Slug</p>
            <p className="text-sm font-mono">{product.slug}</p>
          </div>
        </div>
        {product.description && (
          <div>
            <p className="text-sm text-charcoal-500 mb-1">Descripción</p>
            <p className="text-sm text-charcoal-700">{product.description}</p>
          </div>
        )}
      </div>

      {/* Variants */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-6">
        <h2 className="font-heading text-lg font-semibold mb-4">
          Variantes ({product.variants?.length})
        </h2>
        <div className="grid gap-2">
          {product.variants?.map((v: { id: string; color_hex?: string; color: string; size: string; sku: string; stock: number; low_stock_threshold: number }) => (
            <div
              key={v.id}
              className="flex items-center justify-between p-3 bg-charcoal-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {v.color_hex && (
                  <span
                    className="w-6 h-6 rounded-full border border-charcoal-300"
                    style={{ backgroundColor: v.color_hex }}
                  />
                )}
                <span className="text-sm font-medium">
                  {v.color} / {v.size}
                </span>
                <span className="text-xs text-charcoal-400 font-mono">
                  {v.sku}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-sm font-medium ${
                    v.stock === 0
                      ? "text-red-600"
                      : v.stock <= v.low_stock_threshold
                        ? "text-yellow-600"
                        : "text-forest-600"
                  }`}
                >
                  Stock: {v.stock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
