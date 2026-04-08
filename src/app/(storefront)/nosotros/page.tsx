import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce la historia detrás de Pahr, marca venezolana de ropa de golf.",
};

export default function NosotrosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-heading text-4xl font-semibold text-charcoal-950 mb-6">
        Nosotros
      </h1>

      <div className="prose prose-charcoal max-w-none space-y-6 text-charcoal-600 leading-relaxed">
        <p className="text-lg">
          <strong className="text-charcoal-900">Pahr</strong> nace de la pasión por el golf y el
          buen vestir. Creemos que la ropa deportiva puede ser elegante sin perder
          funcionalidad, y que el estilo clásico nunca pasa de moda.
        </p>

        <p>
          Nuestro nombre representa ese momento perfecto en el green: la calma antes del
          swing, la precisión del golpe, la satisfacción del resultado. Así diseñamos cada
          prenda — con intención, cuidado y atención al detalle.
        </p>

        <div className="bg-forest-50 rounded-lg p-6 border border-forest-200">
          <h2 className="font-heading text-xl font-semibold text-forest-900 mb-3">
            Nuestra Filosofía
          </h2>
          <p className="text-forest-800">
            Fusionamos la estética vintage del golf clásico con el minimalismo
            contemporáneo. Materiales premium, cortes limpios y paletas de color
            atemporales. Prendas que funcionan tanto en el campo como en la ciudad.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-semibold text-charcoal-900 mt-8">
          Hecho en Venezuela
        </h2>
        <p>
          Somos una marca venezolana orgullosa de nuestras raíces. Trabajamos con
          proveedores locales y nos esforzamos por ofrecer la mejor calidad a precios
          accesibles. Cada pieza está pensada para el golfista venezolano y
          latinoamericano.
        </p>
      </div>
    </div>
  );
}
