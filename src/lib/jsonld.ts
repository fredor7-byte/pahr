import type { ProductWithDetails } from "@/types/product";

export function generateProductJsonLd(product: ProductWithDetails) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pahr.com";

  const totalStock = product.variants?.reduce((s, v) => s + v.stock, 0) ?? 0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: `${baseUrl}/catalogo/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "Pahr",
    },
    category: product.category?.name,
    offers: {
      "@type": "Offer",
      price: product.base_price_usd,
      priceCurrency: "USD",
      availability:
        totalStock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Pahr Golf",
      },
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pahr",
    description: "Ropa de golf con estilo vintage moderno. Hecho en Venezuela.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pahr.com",
  };
}
