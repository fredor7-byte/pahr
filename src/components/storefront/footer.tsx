import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-jungle-950 text-mist-400 py-16 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-3xl font-logo text-white">
              Pahr
            </span>
            <p className="text-xs mt-2 text-mist-500 leading-relaxed">
              Golf Apparel. Estilo vintage moderno para el green y más allá.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Tienda</h4>
            <nav className="flex flex-col gap-2.5 text-xs tracking-wider">
              <Link href="/catalogo?categoria=hoodies" className="hover:text-gold-500 transition-colors duration-300">Hoodies</Link>
              <Link href="/catalogo?categoria=franelas" className="hover:text-gold-500 transition-colors duration-300">Franelas</Link>
              <Link href="/catalogo?categoria=polos" className="hover:text-gold-500 transition-colors duration-300">Polos</Link>
              <Link href="/catalogo?categoria=pantalones" className="hover:text-gold-500 transition-colors duration-300">Pantalones</Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Info</h4>
            <nav className="flex flex-col gap-2.5 text-xs tracking-wider">
              <Link href="/nosotros" className="hover:text-gold-500 transition-colors duration-300">Nosotros</Link>
              <Link href="/contacto" className="hover:text-gold-500 transition-colors duration-300">Contacto</Link>
              <Link href="/faq" className="hover:text-gold-500 transition-colors duration-300">Preguntas Frecuentes</Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Síguenos</h4>
            <nav className="flex flex-col gap-2.5 text-xs tracking-wider">
              <span className="hover:text-gold-500 transition-colors duration-300 cursor-pointer">Instagram</span>
              <span className="hover:text-gold-500 transition-colors duration-300 cursor-pointer">TikTok</span>
            </nav>
          </div>
        </div>

        <div className="border-t border-jungle-800 pt-10 text-center text-xs text-mist-600">
          <p>&copy; {new Date().getFullYear()} Pahr. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
