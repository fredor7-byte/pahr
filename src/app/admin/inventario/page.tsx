"use client";

import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Package } from "lucide-react";

interface VariantWithProduct {
  id: string;
  sku: string;
  color: string;
  color_hex: string | null;
  size: string;
  stock: number;
  low_stock_threshold: number;
  product: {
    name: string;
    category: {
      name: string;
    } | null;
  } | null;
}

export default function InventarioPage() {
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");
  const [allVariants, setAllVariants] = useState<VariantWithProduct[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("product_variants")
      .select("*, product:products(name, category:categories(name))")
      .order("stock", { ascending: true })
      .then(({ data }) => {
        if (data) setAllVariants(data as VariantWithProduct[]);
      });
  }, []);

  const filtered = allVariants.filter((v) => {
    if (filter === "low") return v.stock > 0 && v.stock <= v.low_stock_threshold;
    if (filter === "out") return v.stock === 0;
    return true;
  });

  const lowCount = allVariants.filter(
    (v) => v.stock > 0 && v.stock <= v.low_stock_threshold
  ).length;
  const outCount = allVariants.filter((v) => v.stock === 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
          Inventario
        </h1>
        <p className="text-sm text-charcoal-500">
          {allVariants.length} variantes en total
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "primary" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Todos ({allVariants.length})
        </Button>
        <Button
          variant={filter === "low" ? "primary" : "outline"}
          size="sm"
          onClick={() => setFilter("low")}
        >
          Stock bajo ({lowCount})
        </Button>
        <Button
          variant={filter === "out" ? "primary" : "outline"}
          size="sm"
          onClick={() => setFilter("out")}
        >
          Agotados ({outCount})
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-charcoal-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Variante</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((v) => (
              <TableRow key={v.id}>
                <TableCell className="text-sm font-medium">
                  {v.product?.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    {v.color_hex && (
                      <span
                        className="w-4 h-4 rounded-full border border-charcoal-300"
                        style={{ backgroundColor: v.color_hex }}
                      />
                    )}
                    {v.color} / {v.size}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs text-charcoal-500">
                  {v.sku}
                </TableCell>
                <TableCell>
                  <span
                    className={`font-medium ${
                      v.stock === 0
                        ? "text-red-600"
                        : v.stock <= v.low_stock_threshold
                          ? "text-yellow-600"
                          : "text-forest-600"
                    }`}
                  >
                    {v.stock}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-charcoal-500">
                  {v.low_stock_threshold}
                </TableCell>
                <TableCell>
                  {v.stock === 0 ? (
                    <Badge variant="error">Agotado</Badge>
                  ) : v.stock <= v.low_stock_threshold ? (
                    <Badge variant="warning">Bajo</Badge>
                  ) : (
                    <Badge variant="success">OK</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      alert(`Ajustar stock de ${v.sku} (mock)`)
                    }
                  >
                    <Package className="h-3.5 w-3.5 mr-1" />
                    Ajustar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
