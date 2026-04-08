import { Suspense } from "react";
import { getProducts, getCategories, getAvailableColors } from "@/actions/products";
import { ProductCard } from "@/components/storefront/product-card";
import { FiltersSidebar } from "@/components/storefront/filters-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProductFilters } from "@/types/product";

interface CatalogoPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata = {
  title: "Catálogo",
  description:
    "Explora nuestra colección de ropa de golf. Hoodies, franelas, polos y pantalones con estilo vintage moderno.",
};

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;
  const filters: ProductFilters = {
    categoria: typeof params.categoria === "string" ? params.categoria : undefined,
    talla: typeof params.talla === "string" ? params.talla : undefined,
    color: typeof params.color === "string" ? params.color : undefined,
    orden: typeof params.orden === "string"
      ? (params.orden as ProductFilters["orden"])
      : undefined,
  };

  const [{ products, total }, categories, availableColors] = await Promise.all([
    getProducts(filters),
    getCategories(),
    getAvailableColors(),
  ]);

  const activeCategory = categories.find((c) => c.slug === filters.categoria);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb & Title */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-charcoal-900">
          {activeCategory ? activeCategory.name : "Catálogo"}
        </h1>
        <p className="text-charcoal-500 mt-1">
          {total} {total === 1 ? "producto" : "productos"}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-56 shrink-0">
          <Suspense fallback={<FiltersSkeleton />}>
            <FiltersSidebar
              categories={categories}
              availableColors={availableColors}
            />
          </Suspense>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-charcoal-500 text-lg">
                No se encontraron productos con estos filtros.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FiltersSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-20" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}
