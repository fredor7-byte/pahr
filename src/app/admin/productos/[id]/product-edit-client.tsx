"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatUSD } from "@/lib/utils";
import { ArrowLeft, Edit, Trash2, Save, X, Check } from "lucide-react";
import { updateProduct, updateVariantStock, deleteProduct } from "@/actions/admin-products";

interface Variant {
  id: string;
  color: string;
  color_hex: string | null;
  size: string;
  sku: string;
  stock: number;
  low_stock_threshold: number;
}

interface ProductEditClientProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    base_price_usd: number;
    is_active: boolean;
    is_featured: boolean;
    category: { name: string } | null;
    variants: Variant[];
  };
}

export default function ProductEditClient({ product }: ProductEditClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Editable fields
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description ?? "");
  const [price, setPrice] = useState(String(product.base_price_usd));
  const [isActive, setIsActive] = useState(product.is_active);
  const [isFeatured, setIsFeatured] = useState(product.is_featured);

  // Stock editing per variant
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [stockValue, setStockValue] = useState<number>(0);
  const [updatingStock, setUpdatingStock] = useState(false);

  const handleSaveProduct = async () => {
    setSaving(true);
    const result = await updateProduct(product.id, {
      name,
      description: description || null,
      base_price_usd: parseFloat(price),
      is_active: isActive,
      is_featured: isFeatured,
    });
    setSaving(false);

    if (result.success) {
      setIsEditing(false);
      router.refresh();
    } else {
      alert("Error: " + result.error);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`¿Seguro que quieres desactivar "${product.name}"? Ya no aparecerá en el catálogo.`)) {
      return;
    }
    setDeleting(true);
    const result = await deleteProduct(product.id);
    setDeleting(false);

    if (result.success) {
      router.push("/admin/productos");
    } else {
      alert("Error: " + result.error);
    }
  };

  const handleSaveStock = async (variantId: string) => {
    setUpdatingStock(true);
    const result = await updateVariantStock(variantId, stockValue);
    setUpdatingStock(false);

    if (result.success) {
      setEditingVariantId(null);
      router.refresh();
    } else {
      alert("Error: " + result.error);
    }
  };

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
              {name}
            </h1>
            <p className="text-sm text-charcoal-500">{product.category?.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete} disabled={deleting}>
                <Trash2 className="h-4 w-4 mr-1" />
                {deleting ? "..." : "Eliminar"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-1" />
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSaveProduct} disabled={saving}>
                <Save className="h-4 w-4 mr-1" />
                {saving ? "Guardando..." : "Guardar"}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Product info */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-6 space-y-4">
        <div className="flex gap-2 items-center">
          {isEditing ? (
            <>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded"
                />
                Activo
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded"
                />
                Destacado
              </label>
            </>
          ) : (
            <>
              {product.is_active && <Badge variant="success">Activo</Badge>}
              {product.is_featured && <Badge variant="warning">Destacado</Badge>}
              {!product.is_active && <Badge variant="error">Inactivo</Badge>}
            </>
          )}
        </div>

        {isEditing && (
          <Input
            id="name"
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-charcoal-500 mb-1">Precio base (USD)</p>
            {isEditing ? (
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            ) : (
              <p className="text-xl font-heading font-bold">
                {formatUSD(product.base_price_usd)}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm text-charcoal-500 mb-1">Slug</p>
            <p className="text-sm font-mono">{product.slug}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-charcoal-500 mb-1">Descripción</p>
          {isEditing ? (
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          ) : (
            <p className="text-sm text-charcoal-700">{product.description}</p>
          )}
        </div>
      </div>

      {/* Variants - editable stock */}
      <div className="bg-white rounded-lg border border-charcoal-200 p-6">
        <h2 className="font-heading text-lg font-semibold mb-4">
          Variantes ({product.variants?.length})
        </h2>
        <p className="text-xs text-charcoal-400 mb-3">
          Click sobre el stock para editarlo
        </p>
        <div className="grid gap-2">
          {product.variants?.map((v) => (
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
              <div className="flex items-center gap-2">
                {editingVariantId === v.id ? (
                  <>
                    <input
                      type="number"
                      min="0"
                      value={stockValue}
                      onChange={(e) => setStockValue(parseInt(e.target.value) || 0)}
                      className="w-20 h-8 px-2 text-sm border border-charcoal-300 rounded text-right"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveStock(v.id)}
                      disabled={updatingStock}
                      className="p-1.5 bg-forest-700 text-white rounded hover:bg-forest-800 disabled:opacity-50"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingVariantId(null)}
                      className="p-1.5 bg-charcoal-200 text-charcoal-700 rounded hover:bg-charcoal-300"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditingVariantId(v.id);
                      setStockValue(v.stock);
                    }}
                    className={`text-sm font-medium px-3 py-1 rounded hover:bg-white border border-transparent hover:border-charcoal-300 transition-colors ${
                      v.stock === 0
                        ? "text-red-600"
                        : v.stock <= v.low_stock_threshold
                          ? "text-yellow-600"
                          : "text-forest-600"
                    }`}
                  >
                    Stock: {v.stock}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
