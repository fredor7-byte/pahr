import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, getProducts, getPairsWellWith } from "@/actions/products";
import { getCurrentExchangeRate } from "@/actions/exchange-rate";
import { ProductDetails } from "@/components/storefront/product-details";
import { ProductGallery } from "@/components/storefront/product-gallery";
import { ProductCard } from "@/components/storefront/product-card";
import { PairsWellWith } from "@/components/storefront/pairs-well-with";
import { FadeIn } from "@/components/storefront/motion";
import { generateProductJsonLd } from "@/lib/jsonld";
import { ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: product.name,
    description:
      product.description ?? `${product.name} - Ropa de golf Pahr`,
    openGraph: {
      title: `${product.name} | Pahr`,
      description:
        product.description ?? `${product.name} - Ropa de golf Pahr`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products, pairs well with, and exchange rate
  const [{ products: allProducts }, pairsWellWith, exchangeRate] = await Promise.all([
    getProducts({ categoria: product.category?.slug }),
    getPairsWellWith(product),
    getCurrentExchangeRate(),
  ]);
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const jsonLd = generateProductJsonLd(product);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-charcoal-500 mb-8">
        <Link href="/catalogo" className="hover:text-charcoal-700">
          Catálogo
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        {product.category && (
          <>
            <Link
              href={`/catalogo?categoria=${product.category.slug}`}
              className="hover:text-charcoal-700"
            >
              {product.category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
        <span className="text-charcoal-950">{product.name}</span>
      </nav>

      {/* Product */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Image Gallery */}
        <ProductGallery
          images={product.images ?? []}
          productName={product.name}
        />

        {/* Details + Pairs Well With */}
        <div>
          <ProductDetails product={product} exchangeRate={exchangeRate?.rate_bs_per_usd} />
          <PairsWellWith products={pairsWellWith} />
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <FadeIn>
        <section>
          <h2 className="font-heading text-2xl font-semibold text-charcoal-900 mb-6">
            También te puede gustar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
        </FadeIn>
      )}
    </div>
  );
}
