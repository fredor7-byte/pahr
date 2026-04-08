import { createAdminClient } from "@/lib/supabase/admin";
import { formatUSD } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";

export default async function ProductosPage() {
  const supabase = createAdminClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(*), variants:product_variants(*), images:product_images(*)")
    .order("created_at", { ascending: false });

  const items = products ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
            Productos
          </h1>
          <p className="text-sm text-charcoal-500">
            {items.length} productos
          </p>
        </div>
        <Link href="/admin/productos/nuevo">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo producto
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-charcoal-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((product) => {
              const totalStock =
                product.variants?.reduce((s: number, v: { stock: number }) => s + v.stock, 0) ?? 0;
              const lowStock = product.variants?.some(
                (v: { stock: number; low_stock_threshold: number }) => v.stock > 0 && v.stock <= v.low_stock_threshold
              );
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-charcoal-100 flex items-center justify-center shrink-0">
                        <span className="text-[8px] font-heading text-charcoal-400">
                          PAHR
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-charcoal-400">
                          {product.variants?.length ?? 0} variantes
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-charcoal-600">
                    {product.category?.name}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {formatUSD(product.base_price_usd)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-sm font-medium ${
                        totalStock === 0
                          ? "text-red-600"
                          : lowStock
                            ? "text-yellow-600"
                            : "text-forest-600"
                      }`}
                    >
                      {totalStock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {product.is_active ? (
                        <Badge variant="success">Activo</Badge>
                      ) : (
                        <Badge variant="default">Inactivo</Badge>
                      )}
                      {product.is_featured && (
                        <Badge variant="warning">Destacado</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/productos/${product.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
