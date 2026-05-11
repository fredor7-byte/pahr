import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/constants";
import {
  HeroText,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/storefront/motion";

// Map categories to their best photos
const categoryImages: Record<string, string> = {
  hoodies: "/images/products/signature-hoodie/green-1.jpg",
  jerseys: "/images/products/signature-jersey/offwhite-1.jpg",
  tees: "/images/products/sunday-tees/black-1.jpg",
  polos: "/images/products/pique-polo/beige-2.jpg",
  pants: "/images/products/fred-elegance-pants/navy-1.jpg",
};

export default function Home() {
  return (
    <main>
      {/* Hero Section - with real photo background */}
      <section className="relative flex items-center justify-center min-h-[90vh] text-white overflow-hidden">
        <Image
          src="/images/products/lifestyle/hero.jpg"
          alt="Pahr Golf Apparel"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jungle-950/85 via-jungle-950/50 to-jungle-950/30" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-20">
          <HeroText delay={0}>
            <Image
              src="/images/paticas.png"
              alt="Pahr"
              width={140}
              height={120}
              className="mx-auto mb-4 brightness-0 invert opacity-90"
            />
          </HeroText>
          <HeroText delay={0.15}>
            <h1 className="text-6xl md:text-8xl font-logo text-white mb-4">
              Pahr
            </h1>
          </HeroText>
          <HeroText delay={0.3}>
            <p className="text-lg md:text-xl font-light tracking-widest uppercase text-amber-200 mb-1">
              Golf Apparel
            </p>
          </HeroText>
          <HeroText delay={0.35}>
            <p className="text-sm md:text-base font-light tracking-[0.3em] uppercase text-mist-400 mb-10">
              &amp; Lifestyle
            </p>
          </HeroText>
          <HeroText delay={0.55}>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center h-12 px-10 bg-cta-500 text-white font-light tracking-widest uppercase text-sm hover:bg-cta-400 transition-all duration-300"
            >
              Ver Colección
            </Link>
          </HeroText>
        </div>
      </section>

      {/* Lookbook Strip - product photos */}
      <FadeIn>
        <section className="grid grid-cols-4 md:grid-cols-4 gap-0">
          {[
            { src: "/images/products/signature-hoodie/grey-1.jpg", alt: "Signature Hoodie Grey" },
            { src: "/images/products/signature-jersey/graphite-1.jpg", alt: "Signature Jersey Graphite" },
            { src: "/images/products/pique-polo/beige-2.jpg", alt: "Piqué Polo Beige" },
            { src: "/images/products/sunday-tees/black-detail.jpg", alt: "Sunday Tees detail" },
          ].map((img) => (
            <div key={img.src} className="relative aspect-square overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="25vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </section>
      </FadeIn>

      {/* Categories Grid - with real photos */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-center mb-14 text-jungle-900">
            Categorías
          </h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((category) => (
            <StaggerItem key={category.slug}>
              <Link
                href={`/catalogo?categoria=${category.slug}`}
                className="group relative flex items-end h-80 overflow-hidden p-5 transition-transform duration-300 hover:scale-[1.02]"
              >
                <Image
                  src={categoryImages[category.slug] ?? "/images/products/lifestyle/lifestyle-hero.jpg"}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jungle-950/80 via-jungle-950/10 to-transparent" />
                <h3 className="relative z-10 text-xs font-light tracking-[0.2em] uppercase text-white group-hover:text-gold-500 transition-colors duration-300">
                  {category.name}
                </h3>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Featured Lookbook - editorial style */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-center mb-14 text-jungle-900">
              Colección #2
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.1}>
            {/* Large feature image */}
            <StaggerItem className="md:col-span-2 md:row-span-2">
              <Link href="/catalogo/pique-polo" className="group block relative h-full min-h-[400px] overflow-hidden">
                <Image
                  src="/images/products/pique-polo/beige-2.jpg"
                  alt="Piqué Polo Beige"
                  fill
                  sizes="(max-width: 768px) 50vw, 66vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-jungle-950/70 to-transparent">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-amber-200">Polos</p>
                  <p className="text-white text-lg font-light">Piqué Polo</p>
                </div>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link href="/catalogo/sunday-tees" className="group block relative aspect-square overflow-hidden">
                <Image
                  src="/images/products/sunday-tees/white-2.jpg"
                  alt="Sunday Tees White"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-jungle-950/70 to-transparent">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-amber-200">Tees</p>
                  <p className="text-white text-sm font-light">Sunday Tees</p>
                </div>
              </Link>
            </StaggerItem>

            <StaggerItem>
              <Link href="/catalogo/fred-elegance-pants" className="group block relative aspect-square overflow-hidden">
                <Image
                  src="/images/products/fred-elegance-pants/navy-detail.jpg"
                  alt="Fred Elegance Pants detail"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-jungle-950/70 to-transparent">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-amber-200">Pants</p>
                  <p className="text-white text-sm font-light">Fred Elegance</p>
                </div>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase mb-6 text-jungle-900">
              Clásico Reimaginado
            </h2>
            <p className="text-base text-mist-500 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
              En Pahr fusionamos la tradición del golf con el diseño
              contemporáneo. Cada pieza está pensada para quienes valoran la
              elegancia sin sacrificar la comodidad.
            </p>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-12" staggerDelay={0.15}>
            <StaggerItem>
              <div className="w-14 h-14 rounded-full border border-gold-500 flex items-center justify-center mx-auto mb-5">
                <span className="text-gold-500 text-lg font-light">P</span>
              </div>
              <h3 className="text-sm font-medium tracking-widest uppercase mb-3">
                Premium
              </h3>
              <p className="text-mist-500 text-sm font-light leading-relaxed">
                Materiales seleccionados y acabados de alta calidad en cada
                prenda.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="w-14 h-14 rounded-full border border-gold-500 flex items-center justify-center mx-auto mb-5">
                <span className="text-gold-500 text-lg font-light">A</span>
              </div>
              <h3 className="text-sm font-medium tracking-widest uppercase mb-3">
                Atemporal
              </h3>
              <p className="text-mist-500 text-sm font-light leading-relaxed">
                Diseños que trascienden temporadas. Clásicos que nunca pasan de
                moda.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="w-14 h-14 rounded-full border border-gold-500 flex items-center justify-center mx-auto mb-5">
                <span className="text-gold-500 text-lg font-light">H</span>
              </div>
              <h3 className="text-sm font-medium tracking-widest uppercase mb-3">
                Hecho para ti
              </h3>
              <p className="text-mist-500 text-sm font-light leading-relaxed">
                Del green al día a día. Ropa versátil que se adapta a tu estilo.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-jungle-950 text-mist-400 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <Image
                src="/images/paticas.png"
                alt="Pahr"
                width={32}
                height={28}
                className="brightness-0 invert opacity-70"
              />
              <span className="text-3xl font-logo text-white">
                Pahr
              </span>
            </div>
            <nav className="flex gap-8 text-xs tracking-widest uppercase">
              <Link href="/catalogo" className="hover:text-gold-500 transition-colors duration-300">
                Catálogo
              </Link>
              <Link href="/nosotros" className="hover:text-gold-500 transition-colors duration-300">
                Nosotros
              </Link>
              <Link href="/contacto" className="hover:text-gold-500 transition-colors duration-300">
                Contacto
              </Link>
              <Link href="/faq" className="hover:text-gold-500 transition-colors duration-300">
                FAQ
              </Link>
            </nav>
          </div>
          <div className="border-t border-jungle-800 mt-10 pt-10 text-center text-xs text-mist-600">
            <p>
              &copy; {new Date().getFullYear()} Pahr. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
