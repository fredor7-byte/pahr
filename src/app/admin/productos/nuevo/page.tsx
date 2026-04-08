"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { SIZES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import Link from "next/link";

interface VariantRow {
  id: string;
  size: string;
  color: string;
  color_hex: string;
  sku: string;
  stock: number;
}

interface Category {
  id: string;
  name: string;
}

export default function NuevoProductoPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [material, setMaterial] = useState("");
  const [cuidados, setCuidados] = useState("");
  const [variants, setVariants] = useState<VariantRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("categories")
      .select("id, name")
      .order("name")
      .then(({ data }) => {
        if (data) setCategories(data);
      });
  }, []);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value));
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: crypto.randomUUID(),
        size: "M",
        color: "",
        color_hex: "#000000",
        sku: "",
        stock: 0,
      },
    ]);
  };

  const updateVariant = (id: string, field: keyof VariantRow, value: string | number) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Server action to create product
    alert("Producto guardado (mock). Conectar Supabase para persistir.");
    router.push("/admin/productos");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/productos"
          className="p-2 hover:bg-charcoal-100 rounded-md transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
          Nuevo producto
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-lg border border-charcoal-200 p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold">
            Información básica
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="name"
              label="Nombre"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Polo Heritage"
            />
            <Input
              id="slug"
              label="Slug (URL)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="polo-heritage"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              id="category"
              label="Categoría"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              placeholder="Seleccionar"
              options={categories.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
            />
            <Input
              id="price"
              label="Precio base (USD)"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="38.00"
            />
          </div>
          <Textarea
            id="description"
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del producto..."
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="material"
              label="Material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="100% Algodón Piqué"
            />
            <Input
              id="cuidados"
              label="Cuidados"
              value={cuidados}
              onChange={(e) => setCuidados(e.target.value)}
              placeholder="Lavar a máquina en frío"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded border-charcoal-300 text-forest-600 focus:ring-forest-500"
            />
            <span className="text-sm text-charcoal-700">
              Producto destacado
            </span>
          </label>
        </div>

        {/* Variants */}
        <div className="bg-white rounded-lg border border-charcoal-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">Variantes</h2>
            <Button type="button" variant="outline" size="sm" onClick={addVariant}>
              <Plus className="h-4 w-4 mr-1" />
              Agregar variante
            </Button>
          </div>

          {variants.length === 0 ? (
            <p className="text-sm text-charcoal-400 text-center py-6">
              Agrega variantes (combinaciones de talla y color) para tu producto.
            </p>
          ) : (
            <div className="space-y-3">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="grid grid-cols-6 gap-3 items-end p-3 bg-charcoal-50 rounded-lg"
                >
                  <Select
                    id={`size-${variant.id}`}
                    label="Talla"
                    value={variant.size}
                    onChange={(e) =>
                      updateVariant(variant.id, "size", e.target.value)
                    }
                    options={SIZES.map((s) => ({ value: s, label: s }))}
                  />
                  <Input
                    id={`color-${variant.id}`}
                    label="Color"
                    value={variant.color}
                    onChange={(e) =>
                      updateVariant(variant.id, "color", e.target.value)
                    }
                    placeholder="Verde Bosque"
                  />
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-charcoal-700">
                      Hex
                    </label>
                    <input
                      type="color"
                      value={variant.color_hex}
                      onChange={(e) =>
                        updateVariant(variant.id, "color_hex", e.target.value)
                      }
                      className="h-10 w-full rounded border border-charcoal-300 cursor-pointer"
                    />
                  </div>
                  <Input
                    id={`sku-${variant.id}`}
                    label="SKU"
                    value={variant.sku}
                    onChange={(e) =>
                      updateVariant(variant.id, "sku", e.target.value)
                    }
                    placeholder="PAHR-POL-VRD-M"
                  />
                  <Input
                    id={`stock-${variant.id}`}
                    label="Stock"
                    type="number"
                    value={String(variant.stock)}
                    onChange={(e) =>
                      updateVariant(
                        variant.id,
                        "stock",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVariant(variant.id)}
                    className="text-red-500 hover:text-red-700 mb-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-3 justify-end">
          <Link href="/admin/productos">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Guardar producto
          </Button>
        </div>
      </form>
    </div>
  );
}
